import { cn } from "../../lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn("ui-badge", variant === "secondary" && "ui-badge-secondary", className)}
      {...props}
    />
  );
}
