import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

export function Button({
  asChild = false,
  className,
  variant = "default",
  type = "button",
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type={asChild ? undefined : type}
      className={cn("ui-button", variant === "ghost" && "ui-button-ghost", className)}
      {...props}
    />
  );
}
