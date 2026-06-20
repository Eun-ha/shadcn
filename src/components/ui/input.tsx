import * as React from "react"
import { tv } from "tailwind-variants"

const inputVariants = tv({
  base: "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors",
  variants: {
    error: {
      false: "border-input focus-visible:ring-ring",
      true: "border-destructive focus-visible:ring-destructive text-destructive placeholder:text-destructive/50",
    },
  },
  defaultVariants: {
    error: false,
  },
})

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean
  errorMessage?: string
}

function Input({ className, type, ref, error = false, errorMessage, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <input
        type={type}
        className={inputVariants({ error, class: className })}
        ref={ref}
        aria-invalid={error}
        aria-describedby={errorMessage ? `${props.id}-error` : undefined}
        {...props}
      />
      {error && errorMessage && (
        <p id={props.id ? `${props.id}-error` : undefined} className="text-xs text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
Input.displayName = "Input"

export { Input }
