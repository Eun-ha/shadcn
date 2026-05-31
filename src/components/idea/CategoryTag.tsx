import { tv, type VariantProps } from "tailwind-variants"

const categoryTag = tv({
  base: "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
  variants: {
    color: {
      gray:    "bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20",
      blue:    "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/20",
      green:   "bg-green-50 text-green-700 ring-green-600/10 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20",
      yellow:  "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20",
      purple:  "bg-purple-50 text-purple-700 ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/20",
      pink:    "bg-pink-50 text-pink-700 ring-pink-700/10 dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-400/20",
      orange:  "bg-orange-50 text-orange-700 ring-orange-600/10 dark:bg-orange-400/10 dark:text-orange-400 dark:ring-orange-400/20",
      teal:    "bg-teal-50 text-teal-700 ring-teal-600/10 dark:bg-teal-400/10 dark:text-teal-400 dark:ring-teal-400/20",
    },
  },
  defaultVariants: {
    color: "gray",
  },
})

type CategoryTagProps = VariantProps<typeof categoryTag> & {
  label: string
  className?: string
}

function CategoryTag({ label, color, className }: CategoryTagProps) {
  return (
    <span className={categoryTag({ color, class: className })}>
      {label}
    </span>
  )
}

export { CategoryTag, categoryTag }
export type { CategoryTagProps }
