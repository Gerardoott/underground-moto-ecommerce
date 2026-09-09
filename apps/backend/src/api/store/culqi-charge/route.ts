import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import Culqi from "culqi-node"

type RequestBody = {
  cart_id: string
  token: string
}

export async function POST(
  req: MedusaRequest<RequestBody>,
  res: MedusaResponse
) {
  const { cart_id, token } = req.body as RequestBody

  if (!cart_id || !token) {
    return res.status(400).json({
      message: "cart_id y token son requeridos",
    })
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const paymentModuleService = req.scope.resolve(Modules.PAYMENT)

  const { data: carts } = await query.graph({
    entity: "cart",
    filters: { id: cart_id },
    fields: [
      "id",
      "total",
      "currency_code",
      "email",
      "payment_collection.payment_sessions.*",
    ],
  })

  const cart = carts[0]

  console.log("CART_ID recibido:", cart_id)
  console.log(
    "PAYMENT COLLECTION:",
    JSON.stringify(cart?.payment_collection, null, 2)
  )

  const session = cart?.payment_collection?.payment_sessions?.find(
    (s: any) => s.provider_id === "pp_culqi_culqi"
  )

  if (!cart || !session) {
    return res.status(400).json({
      message: "No se encontró una sesión de pago de Culqi para este carrito",
    })
  }

  const culqi = new Culqi({
    privateKey: process.env.CULQI_SECRET_KEY,
  })

  const amountInCents = Math.round(Number(cart.total) * 100)

  try {
    const charge = await culqi.charges.createCharge({
      amount: amountInCents,
      currency_code: cart.currency_code.toUpperCase(),
      email: cart.email,
      source_id: token,
      capture: false,
    })

    await paymentModuleService.updatePaymentSession({
      id: session.id,
      currency_code: session.currency_code,
      amount: session.amount,
      data: {
        ...session.data,
        charge_id: charge.id,
      },
    })

    return res.status(200).json({ success: true })
  } catch (error: any) {
    return res.status(400).json({
      message: "Culqi rechazó el cargo",
      detail: error?.user_message || error?.message || "Error desconocido",
    })
  }
}