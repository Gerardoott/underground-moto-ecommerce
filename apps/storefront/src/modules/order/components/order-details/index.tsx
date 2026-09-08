import { HttpTypes } from "@medusajs/types"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

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
          {new Date(order.created_at).toDateString()}
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
                {formatStatus(order.fulfillment_status)}
              </span>
            </p>
            <p>
              Estado del pago:{" "}
              <span
                className="text-bone-muted"
                data-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails