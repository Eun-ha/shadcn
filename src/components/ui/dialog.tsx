import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { tv } from "tailwind-variants"

const dialog = tv({
  slots: {
    overlay:     "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
    content:     "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
    header:      "flex flex-col gap-2 text-center sm:text-left",
    footer:      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
    title:       "text-lg leading-none font-semibold",
    description: "text-sm text-muted-foreground",
  },
})

const { overlay, content, header, footer, title, description } = dialog()

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

function DialogOverlay({ className, ref, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay ref={ref} className={overlay({ class: className })} {...props} />
  )
}
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

function DialogContent({ className, children, ref, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content ref={ref} className={content({ class: className })} {...props}>
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <X />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}
DialogContent.displayName = DialogPrimitive.Content.displayName

function DialogHeader({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={header({ class: className })} {...props} />
}
DialogHeader.displayName = "DialogHeader"

function DialogFooter({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={footer({ class: className })} {...props} />
}
DialogFooter.displayName = "DialogFooter"

function DialogTitle({ className, ref, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title ref={ref} className={title({ class: className })} {...props} />
  )
}
DialogTitle.displayName = DialogPrimitive.Title.displayName

function DialogDescription({ className, ref, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description ref={ref} className={description({ class: className })} {...props} />
  )
}
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
