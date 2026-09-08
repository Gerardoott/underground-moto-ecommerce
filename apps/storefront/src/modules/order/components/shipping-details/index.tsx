import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <h2 className="flex flex-row font-display text-2xl uppercase text-bone my-6">
        Envío
      </h2>
      <div className="flex items-start gap-x-8 font-mono text-sm">
        <div
          className="flex flex-col w-1/3"
          data-testid="shipping-address-summary"
        >
          <span className="text-bone mb-1">Dirección de envío</span>
          <span className="text-bone-muted">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </span>
          <span className="text-bone-muted">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </span>
          <span className="text-bone-muted">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </span>
          <span className="text-bone-muted">
            {order.shipping_address?.country_code?.toUpperCase()}
          </span>
        </div>

        <div
          className="flex flex-col w-1/3"
          data-testid="shipping-contact-summary"
        >
          <span className="text-bone mb-1">Contacto</span>
          <span className="text-bone-muted">
            {order.shipping_address?.phone}
          </span>
          <span className="text-bone-muted">{order.email}</span>
        </div>

        <div
          className="flex flex-col w-1/3"
          data-testid="shipping-method-summary"
        >
          <span className="text-bone mb-1">Método</span>
          <span className="text-bone-muted">
            {(order as any).shipping_methods[0]?.name} (
            {convertToLocale({
              amount: order.shipping_methods?.[0].total ?? 0,
              currency_code: order.currency_code,
            })}
            )
          </span>
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default ShippingDetails