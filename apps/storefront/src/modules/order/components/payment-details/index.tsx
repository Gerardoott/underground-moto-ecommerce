import { isStripeLike, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <div>
      <h2 className="flex flex-row font-display text-2xl uppercase text-bone my-6">
        Pago
      </h2>
      <div>
        {payment && (
          <div className="flex items-start gap-x-1 w-full font-mono text-sm">
            <div className="flex flex-col w-1/3">
              <span className="text-bone mb-1">Método de pago</span>
              <span className="text-bone-muted" data-testid="payment-method">
                {paymentInfoMap[payment.provider_id].title}
              </span>
            </div>
            <div className="flex flex-col w-2/3">
              <span className="text-bone mb-1">Detalles de pago</span>
              <div className="flex gap-2 text-bone-muted items-center">
                <span className="flex items-center h-7 w-fit p-2 bg-surface border border-line">
                  {paymentInfoMap[payment.provider_id].icon}
                </span>
                <span data-testid="payment-amount">
                  {isStripeLike(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} pagado el ${new Date(
                        payment.created_at ?? ""
                      ).toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8" />
    </div>
  )
}

export default PaymentDetails