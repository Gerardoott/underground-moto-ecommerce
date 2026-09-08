import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Página no encontrada",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)] bg-black">
      <h1 className="font-display text-2xl uppercase text-bone">
        Página no encontrada
      </h1>
      <p className="font-mono text-sm text-bone-muted">
        La página que buscas no existe.
      </p>
      <Link className="flex gap-x-1 items-center group text-violet" href="/">
        Volver al inicio
      </Link>
    </div>
  )
}