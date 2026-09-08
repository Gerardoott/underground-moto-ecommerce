const Radio = ({
  checked,
  "data-testid": dataTestId,
}: {
  checked: boolean
  "data-testid"?: string
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked="true"
      data-state={checked ? "checked" : "unchecked"}
      className="group relative flex h-5 w-5 items-center justify-center outline-none"
      data-testid={dataTestId || "radio-button"}
    >
      <div
        className={`flex h-[14px] w-[14px] items-center justify-center rounded-full border transition-all ${
          checked ? "border-violet bg-black" : "border-line bg-black"
        }`}
      >
        {checked && <div className="rounded-full h-1.5 w-1.5 bg-violet" />}
      </div>
    </button>
  )
}

export default Radio