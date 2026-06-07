import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { tv } from "tailwind-variants"

const avatar = tv({
  slots: {
    root:     "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
    image:    "aspect-square h-full w-full",
    fallback: "flex h-full w-full items-center justify-center rounded-full bg-muted",
  },
})

const { root, image, fallback } = avatar()

function Avatar({ className, ref, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root ref={ref} className={root({ class: className })} {...props} />
  )
}
Avatar.displayName = AvatarPrimitive.Root.displayName

function AvatarImage({ className, ref, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image ref={ref} className={image({ class: className })} {...props} />
  )
}
AvatarImage.displayName = AvatarPrimitive.Image.displayName

function AvatarFallback({ className, ref, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback ref={ref} className={fallback({ class: className })} {...props} />
  )
}
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
