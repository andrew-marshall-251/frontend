import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export function PopoverContent({ className, sideOffset = 8, ...props }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={sideOffset}
        className={cn("ui-popover-content", className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
