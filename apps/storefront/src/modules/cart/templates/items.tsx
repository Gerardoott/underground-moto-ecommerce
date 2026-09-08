import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-3 flex items-center">
        <h2 className="font-display text-2xl uppercase text-bone">Carrito</h2>
      </div>
      <table className="w-full font-mono text-sm text-bone-muted">
        <thead>
          <tr className="uppercase text-xs border-b border-line">
            <th className="!pl-0 py-3 text-left font-normal">Producto</th>
            <th></th>
            <th className="py-3 text-left font-normal">Cantidad</th>
            <th className="hidden small:table-cell py-3 text-left font-normal">
              Precio
            </th>
            <th className="!pr-0 py-3 text-right font-normal">Total</th>
          </tr>
        </thead>
        <tbody>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </tbody>
      </table>
    </div>
  )
}

export default ItemsTemplate