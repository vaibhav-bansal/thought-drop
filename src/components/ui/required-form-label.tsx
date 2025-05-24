import * as React from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface RequiredFormLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
  /**
   * Whether the field is required. Defaults to true
   */
  required?: boolean
  /**
   * Optional className for the required asterisk
   */
  requiredClassName?: string
}

const RequiredFormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  RequiredFormLabelProps
>(({ 
  children, 
  required = true, 
  requiredClassName = "text-destructive",
  className,
  ...props 
}, ref) => {
  return (
    <Label
      ref={ref}
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {children}
      {required && (
        <span 
          className={cn("text-sm", requiredClassName)}
          aria-hidden="true"
        >
          *
        </span>
      )}
    </Label>
  )
})

RequiredFormLabel.displayName = "RequiredFormLabel"

export { RequiredFormLabel } 