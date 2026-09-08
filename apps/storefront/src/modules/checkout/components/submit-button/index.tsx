"use client"

import React from "react"
import { useFormStatus } from "react-dom"
import { clx } from "@medusajs/ui"

const variantClasses: Record<string, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  transparent: "btn-ghost",
  danger:
    "bg-transparent text-danger border border-danger font-mono text-[13px] font-bold px-7 py-3.5 cursor-pointer hover:bg-danger hover:text-black transition-colors duration-150",
}

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={clx(variantClasses[variant || "primary"], className, {
        "opacity-60 cursor-wait": pending,
      })}
      data-testid={dataTestId}
    >
      {pending ? "Cargando..." : children}
    </button>
  )
}