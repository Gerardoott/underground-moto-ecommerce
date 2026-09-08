import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-6">
      <h3 className="font-display text-lg uppercase text-bone">
        ¿Necesitas ayuda?
      </h3>
      <div className="font-mono text-sm text-bone-muted my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink href="/contact" className="hover:text-violet">
              Contacto
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact" className="hover:text-violet">
              Devoluciones y cambios
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help