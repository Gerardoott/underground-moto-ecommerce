import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-black flex items-center justify-between">
      <div>
        <h2 className="font-display text-xl uppercase text-bone">
          ¿Ya tienes cuenta?
        </h2>
        <p className="font-mono text-sm text-bone-muted mt-2">
          Inicia sesión para una mejor experiencia.
        </p>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <button className="btn-secondary h-10" data-testid="sign-in-button">
            Iniciar sesión
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt