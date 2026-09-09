"use client"

import { CulqiProvider } from "react-culqi-next"

type CulqiWrapperProps = {
  children: React.ReactNode
}

const culqiPublicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY

const CulqiWrapper: React.FC<CulqiWrapperProps> = ({ children }) => {
  if (!culqiPublicKey) {
    throw new Error(
      "Culqi public key is missing. Set NEXT_PUBLIC_CULQI_PUBLIC_KEY environment variable."
    )
  }

  return <CulqiProvider publicKey={culqiPublicKey}>{children}</CulqiProvider>
}

export default CulqiWrapper