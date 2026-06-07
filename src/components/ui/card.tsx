import * as React from "react"
import { tv } from "tailwind-variants"

const card = tv({
  slots: {
    root:        "rounded-lg border bg-card text-card-foreground shadow-sm",
    header:      "flex flex-col space-y-1.5 p-6",
    title:       "text-2xl font-semibold leading-none tracking-tight",
    description: "text-sm text-muted-foreground",
    content:     "p-6 pt-0",
    footer:      "flex items-center p-6 pt-0",
  },
})

const { root, header, title, description, content, footer } = card()

function Card({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={root({ class: className })} {...props} />
}
Card.displayName = "Card"

function CardHeader({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={header({ class: className })} {...props} />
}
CardHeader.displayName = "CardHeader"

function CardTitle({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={title({ class: className })} {...props} />
}
CardTitle.displayName = "CardTitle"

function CardDescription({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={description({ class: className })} {...props} />
}
CardDescription.displayName = "CardDescription"

function CardContent({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={content({ class: className })} {...props} />
}
CardContent.displayName = "CardContent"

function CardFooter({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={footer({ class: className })} {...props} />
}
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
