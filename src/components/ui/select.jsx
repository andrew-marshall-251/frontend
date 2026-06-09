import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({ className, children, ...props }) {
  return (
    <SelectPrimitive.Trigger className={cn("ui-select-trigger", className)} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown aria-hidden="true" size={16} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({ className, children, ...props }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className={cn("ui-select-content", className)} {...props}>
        <SelectPrimitive.ScrollUpButton className="ui-select-scroll-button">
          <ChevronUp aria-hidden="true" size={16} />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="ui-select-viewport">
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="ui-select-scroll-button">
          <ChevronDown aria-hidden="true" size={16} />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item className={cn("ui-select-item", className)} {...props}>
      <SelectPrimitive.ItemIndicator className="ui-select-item-indicator">
        <Check aria-hidden="true" size={16} />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
