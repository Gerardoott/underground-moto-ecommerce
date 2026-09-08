"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="font-display text-2xl uppercase text-bone mb-6">
        Únete a Tekko
      </h1>
      <p className="text-center font-mono text-sm text-bone-muted mb-4">
        Crea tu perfil y accede a una mejor experiencia de compra.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Nombre"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Apellido"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Celular"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Contraseña"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center font-mono text-xs text-bone-muted mt-6">
          Al crear una cuenta, aceptas la{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline text-violet"
          >
            Política de Privacidad
          </LocalizedClientLink>{" "}
          y los{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline text-violet"
          >
            Términos de Uso
          </LocalizedClientLink>{" "}
          de Tekko.
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          Unirme
        </SubmitButton>
      </form>
      <span className="text-center font-mono text-xs text-bone-muted mt-6">
        ¿Ya tienes cuenta?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline text-violet"
        >
          Inicia sesión
        </button>
        .
      </span>
    </div>
  )
}

export default Register