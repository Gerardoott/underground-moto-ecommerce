import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  name?: string
  "data-testid"?: string
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = true,
  onChange,
  label,
  name,
  "data-testid": dataTestId,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={onChange}
        name={name}
        data-testid={dataTestId}
        className={`w-5 h-5 flex items-center justify-center border transition-colors duration-150 ${
          checked ? "bg-violet border-violet" : "bg-transparent border-line"
        }`}
      >
        {checked && (
          <svg
            viewBox="0 0 12 12"
            className="w-3 h-3 fill-none stroke-black stroke-2"
          >
            <path
              d="M2 6l3 3 5-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <span
        onClick={onChange}
        className="font-mono text-sm text-bone-muted cursor-pointer"
      >
        {label}
      </span>
    </div>
  )
}

export default CheckboxWithLabel