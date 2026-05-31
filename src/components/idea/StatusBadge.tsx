import { tv, type VariantProps } from "tailwind-variants"

const statusBadge = tv({
  base: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
  variants: {
    status: {
      draft:     "bg-muted text-muted-foreground",
      reviewing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      adopted:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      rejected:  "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    },
  },
  defaultVariants: {
    status: "draft",
  },
})

const STATUS_LABEL: Record<NonNullable<VariantProps<typeof statusBadge>["status"]>, string> = {
  draft:     "등록됨",
  reviewing: "심사중",
  adopted:   "채택",
  rejected:  "반려",
}

const STATUS_DOT: Record<NonNullable<VariantProps<typeof statusBadge>["status"]>, string> = {
  draft:     "bg-muted-foreground",
  reviewing: "bg-amber-500",
  adopted:   "bg-emerald-500",
  rejected:  "bg-red-500",
}

type StatusBadgeProps = VariantProps<typeof statusBadge> & {
  className?: string
  label?: string
}

function StatusBadge({ status = "draft", className, label }: StatusBadgeProps) {
  return (
    <span className={statusBadge({ status, class: className })}>
      <span className={`size-1.5 rounded-full ${STATUS_DOT[status!]}`} />
      {label ?? STATUS_LABEL[status!]}
    </span>
  )
}

export { StatusBadge, statusBadge }
export type { StatusBadgeProps }
