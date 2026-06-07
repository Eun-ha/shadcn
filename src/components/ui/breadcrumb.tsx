import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { tv } from "tailwind-variants"

const breadcrumb = tv({
  slots: {
    list:      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
    item:      "inline-flex items-center gap-1.5",
    link:      "transition-colors hover:text-foreground",
    page:      "font-normal text-foreground",
    separator: "[&>svg]:w-3.5 [&>svg]:h-3.5",
    ellipsis:  "flex h-9 w-9 items-center justify-center",
  },
})

const { list, item, link, page, separator, ellipsis } = breadcrumb()

function Breadcrumb({ ref, ...props }: React.ComponentProps<"nav"> & { separator?: React.ReactNode }) {
  return <nav ref={ref} aria-label="breadcrumb" {...props} />
}
Breadcrumb.displayName = "Breadcrumb"

function BreadcrumbList({ className, ref, ...props }: React.ComponentProps<"ol">) {
  return <ol ref={ref} className={list({ class: className })} {...props} />
}
BreadcrumbList.displayName = "BreadcrumbList"

function BreadcrumbItem({ className, ref, ...props }: React.ComponentProps<"li">) {
  return <li ref={ref} className={item({ class: className })} {...props} />
}
BreadcrumbItem.displayName = "BreadcrumbItem"

function BreadcrumbLink({ asChild, className, ref, ...props }: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return <Comp ref={ref} className={link({ class: className })} {...props} />
}
BreadcrumbLink.displayName = "BreadcrumbLink"

function BreadcrumbPage({ className, ref, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={page({ class: className })}
      {...props}
    />
  )
}
BreadcrumbPage.displayName = "BreadcrumbPage"

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li role="presentation" aria-hidden="true" className={separator({ class: className })} {...props}>
      {children ?? <ChevronRight />}
    </li>
  )
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span role="presentation" aria-hidden="true" className={ellipsis({ class: className })} {...props}>
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  )
}
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
