import { tv, type VariantProps } from "tailwind-variants"

const pointChip = tv({
  base: "inline-flex items-center gap-1 rounded-full font-semibold tabular-nums",
  variants: {
    size: {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3 py-1 text-base",
    },
    variant: {
      default: "bg-primary/10 text-primary",
      gold:    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      muted:   "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "default",
  },
})

type PointChipProps = VariantProps<typeof pointChip> & {
  points: number
  className?: string
}

function PointChip({ points, size, variant, className }: PointChipProps) {
  return (
    <span className={pointChip({ size, variant, class: className })}>
      <span aria-hidden>✦</span>
      {points.toLocaleString()}P
    </span>
  )
}

export { PointChip, pointChip }
export type { PointChipProps }
