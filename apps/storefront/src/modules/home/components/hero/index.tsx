import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-line relative bg-black">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span className="flex flex-col gap-2">
          <span className="font-mono text-violet text-xs tracking-widest uppercase">
            Nuevo drop
          </span>
          <h1 className="font-display text-5xl small:text-7xl text-bone uppercase leading-none">
            Tekko
          </h1>
          <h2 className="font-mono text-sm text-bone-muted max-w-md mx-auto">
            Ropa para la cultura underground y motera
          </h2>
        </span>
        <LocalizedClientLink href="/store">
          <button className="btn-primary">Ver catálogo</button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero