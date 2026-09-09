import { HttpTypes } from "@medusajs/types"
import { formatDate } from "@lib/util/format-date"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const fulfillmentStatusMap: Record<string, string> = {
  not_fulfilled: "No despachado",
  partially_fulfilled: "Despachado parcialmente",
  fulfilled: "Despachado",
  partially_shipped: "Enviado parcialmente",
  shipped: "Enviado",
  partially_delivered: "Entregado parcialmente",
  delivered: "Entregado",
  canceled: "Cancelado",
}

const paymentStatusMap: Record<string, string> = {
  not_paid: "No pagado",
  awaiting: "Pendiente",
  captured: "Pagado",
  authorized: "Autorizado",
  partially_authorized: "Autorizado parcialmente",
  partially_captured: "Pagado parcialmente",
  partially_refunded: "Reembolsado parcialmente",
  refunded: "Reembolsado",
  canceled: "Cancelado",
  requires_action: "Requiere acción",
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatFulfillmentStatus = (str: string) =>
    fulfillmentStatusMap[str] ?? str

  const formatPaymentStatus = (str: string) => paymentStatusMap[str] ?? str

  return (
    <div className="font-mono text-sm text-bone-muted">
      <p>
        Enviamos los detalles de confirmación del pedido a{" "}
        <span className="text-bone font-bold" data-testid="order-email">
          {order.email}
        </span>
        .
      </p>
      <p className="mt-2">
        Fecha del pedido:{" "}
        <span data-testid="order-date">
          {formatDate(order.created_at)}
        </span>
      </p>
      <p className="mt-2 text-violet">
        Número de pedido: <span data-testid="order-id">{order.display_id}</span>
      </p>

      <div className="flex items-center gap-x-4 mt-4">
        {showStatus && (
          <>
            <p>
              Estado del pedido:{" "}
              <span className="text-bone-muted" data-testid="order-status">
                {formatFulfillmentStatus(order.fulfillment_status)}
              </span>
            </p>
            <p>
              Estado del pago:{" "}
              <span
                className="text-bone-muted"
                data-testid="order-payment-status"
              >
                {formatPaymentStatus(order.payment_status)}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails