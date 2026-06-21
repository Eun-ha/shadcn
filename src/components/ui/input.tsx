import * as React from "react"
import { useRef, useState, useCallback } from "react"
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

function Input({
  className,
  type,
  ref: externalRef,
  error = false,
  errorMessage,
  onChange,
  onScroll,
  onBlur,
  onKeyUp,
  ...props
}: InputProps) {
  const [hasLeftOverflow, setHasLeftOverflow] = useState(false)
  const innerRef = useRef<HTMLInputElement>(null)

  const mergedRef = useCallback(
    (el: HTMLInputElement | null) => {
      innerRef.current = el
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(el)
        } else {
          ;(externalRef as React.MutableRefObject<HTMLInputElement | null>).current = el
        }
      }
    },
    [externalRef],
  )

  const checkOverflow = () => {
    const el = innerRef.current
    if (el) setHasLeftOverflow(el.scrollLeft > 0)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <input
          type={type}
          className={inputVariants({ error, class: className })}
          ref={mergedRef}
          aria-invalid={error}
          aria-describedby={errorMessage ? `${props.id}-error` : undefined}
          onChange={(e) => {
            checkOverflow()
            onChange?.(e)
          }}
          onScroll={(e) => {
            checkOverflow()
            onScroll?.(e)
          }}
          onKeyUp={(e) => {
            checkOverflow()
            onKeyUp?.(e)
          }}
          onBlur={(e) => {
            setHasLeftOverflow(false)
            onBlur?.(e)
          }}
          {...props}
        />
        {hasLeftOverflow && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-px left-px top-px flex select-none items-center rounded-l-[5px] bg-linear-to-r from-background via-background to-transparent pl-2 pr-4 text-sm text-muted-foreground"
          >
            …
          </span>
        )}
      </div>
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
