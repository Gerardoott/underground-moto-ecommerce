import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <h1 className="font-display text-3xl uppercase text-bone">
        Carrito
      </h1>
      <p className="font-mono text-sm text-bone-muted mt-4 mb-6 max-w-[32rem]">
        Todavía no tienes nada en tu carrito. Explora el catálogo y encuentra
        tu próxima prenda.
      </p>
      <div>
        <LocalizedClientLink href="/store" className="btn-primary">
          Explorar catálogo
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage