import { AbstractPaymentProvider, MedusaError } from "@medusajs/framework/utils"
import { Logger } from "@medusajs/framework/types"
import {
  InitiatePaymentInput,
  InitiatePaymentOutput,
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
} from "@medusajs/framework/types"
import Culqi from "culqi-node"
import { randomUUID } from "crypto"

type Options = {
  secretKey: string
  publicKey: string
}

type InjectedDependencies = {
  logger: Logger
}

function toCulqiAmount(amount: number): number {
  return Math.round(amount * 100)
}

class CulqiPaymentProviderService extends AbstractPaymentProvider<Options> {
  static identifier = "culqi"

  protected logger_: Logger
  protected options_: Options
  protected client: any

  constructor(container: InjectedDependencies, options: Options) {
    // @ts-ignore
    super(...arguments)

    this.logger_ = container.logger
    this.options_ = options
    this.client = new Culqi({ privateKey: options.secretKey })
  }

  static validateOptions(options: Record<string, unknown>) {
    if (!options.secretKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Culqi requiere secretKey en las opciones del proveedor"
      )
    }
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const sessionId = randomUUID()
    return {
      id: sessionId,
      data: {
        session_id: sessionId,
      },
    }
  }

  async updatePayment(
    input: UpdatePaymentInput
  ): Promise<UpdatePaymentOutput> {
    return {
      data: input.data,
    }
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    const chargeId = input.data?.charge_id as string | undefined

    if (!chargeId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No se encontró un cargo de Culqi asociado a esta sesión de pago. El cliente debe ingresar su tarjeta antes de confirmar el pedido."
      )
    }

    // Captura automática: como el pedido se está confirmando ahora,
    // capturamos el cargo autorizado de inmediato en vez de dejarlo
    // pendiente de captura manual.
    const captured = await this.client.charges.captureCharge({
      id: chargeId,
    })

    return {
      data: {
        ...input.data,
        captured: true,
        culqi_capture_response: captured,
      },
      status: "captured",
    }
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    const chargeId = input.data?.charge_id as string | undefined

    if (!chargeId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No se puede capturar: falta charge_id"
      )
    }

    const captured = await this.client.charges.captureCharge({
      id: chargeId,
    })

    return {
      data: {
        ...input.data,
        captured: true,
        culqi_capture_response: captured,
      },
    }
  }

  async cancelPayment(
    input: CancelPaymentInput
  ): Promise<CancelPaymentOutput> {
    return {
      data: input.data,
    }
  }

  async refundPayment(
    input: RefundPaymentInput
  ): Promise<RefundPaymentOutput> {
    const chargeId = input.data?.charge_id as string | undefined

    if (!chargeId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No se puede reembolsar: falta charge_id"
      )
    }

    const amountValue =
      typeof input.amount === "object" && "numeric" in input.amount
        ? (input.amount as any).numeric
        : Number(input.amount)

    const refund = await this.client.refunds.createRefund({
      amount: toCulqiAmount(amountValue),
      charge_id: chargeId,
      reason: "solicitud_comprador",
    })

    return {
      data: {
        ...input.data,
        last_refund: refund,
      },
    }
  }

  async deletePayment(
    input: DeletePaymentInput
  ): Promise<DeletePaymentOutput> {
    return {
      data: input.data,
    }
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    const chargeId = input.data?.charge_id as string | undefined

    if (!chargeId) {
      return input.data as Record<string, unknown>
    }

    const charge = await this.client.charges.getCharge({ id: chargeId })
    return charge as Record<string, unknown>
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    const chargeId = input.data?.charge_id as string | undefined

    if (!chargeId) {
      return { status: "pending" }
    }

    const charge = await this.client.charges.getCharge({ id: chargeId })

    if (charge.capture) {
      return { status: "captured", data: charge }
    }

    if (charge.outcome?.type === "venta_exitosa") {
      return { status: "authorized", data: charge }
    }

    return { status: "pending", data: charge }
  }
}

export default CulqiPaymentProviderService