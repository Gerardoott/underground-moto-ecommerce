const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <span
      className={`inline-block font-mono text-[10px] border border-danger text-danger px-2 py-0.5 ${className ?? ""}`}
    >
      <span className="font-bold">Atención:</span> solo para fines de prueba.
    </span>
  )
}

export default PaymentTest