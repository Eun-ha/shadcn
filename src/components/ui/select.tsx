import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { tv, type VariantProps } from "tailwind-variants"

const selectTriggerVariants = tv({
  base: "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
})

const selectScrollButtonVariants = tv({
  base: "flex cursor-default items-center justify-center py-1",
})

const selectContentVariants = tv({
  base: "relative z-50 max-h-[--radix-select-content-available-height] min-w-32 overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
  variants: {
    position: {
      popper: "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      "item-aligned": "",
    },
  },
  defaultVariants: {
    position: "popper",
  },
})

const selectViewportVariants = tv({
  base: "p-1",
  variants: {
    position: {
      popper: "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)",
      "item-aligned": "",
    },
  },
  defaultVariants: {
    position: "popper",
  },
})

const selectLabelVariants = tv({
  base: "py-1.5 pl-8 pr-2 text-sm font-semibold",
})

const selectItemVariants = tv({
  base: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
})

const selectSeparatorVariants = tv({
  base: "-mx-1 my-1 h-px bg-muted",
})

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

function SelectTrigger({ className, children, ref, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={selectTriggerVariants({ class: className })}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

function SelectScrollUpButton({ className, ref, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={selectScrollButtonVariants({ class: className })}
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

function SelectScrollDownButton({ className, ref, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={selectScrollButtonVariants({ class: className })}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

function SelectContent({
  className,
  children,
  position = "popper",
  ref,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> &
  VariantProps<typeof selectContentVariants>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={selectContentVariants({ position, class: className })}
        position={position ?? "popper"}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className={selectViewportVariants({ position })}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}
SelectContent.displayName = SelectPrimitive.Content.displayName

function SelectLabel({ className, ref, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={selectLabelVariants({ class: className })}
      {...props}
    />
  )
}
SelectLabel.displayName = SelectPrimitive.Label.displayName

function SelectItem({ className, children, ref, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={selectItemVariants({ class: className })}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}
SelectItem.displayName = SelectPrimitive.Item.displayName

function SelectSeparator({ className, ref, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={selectSeparatorVariants({ class: className })}
      {...props}
    />
  )
}
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
