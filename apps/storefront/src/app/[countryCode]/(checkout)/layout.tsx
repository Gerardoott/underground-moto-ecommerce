import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-black relative small:min-h-screen">
      <div className="h-16 bg-black border-b border-line">
        <nav className="flex h-full items-center content-container justify-between font-mono">
          <LocalizedClientLink
            href="/cart"
            className="text-xs text-bone-muted flex items-center gap-x-2 uppercase flex-1 basis-0 hover:text-bone transition-colors duration-150"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block">
              Volver al carrito
            </span>
            <span className="mt-px block small:hidden">Volver</span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="font-display text-bone hover:text-violet uppercase tracking-wide"
            data-testid="store-link"
          >
            Tekko
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
    </div>
  )
}