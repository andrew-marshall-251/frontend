import { cn } from "../../lib/utils";

export function Separator({ className, orientation = "horizontal", ...props }) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn("ui-separator", orientation === "vertical" && "ui-separator-vertical", className)}
      {...props}
    />
  );
}
