import { cn } from "../../lib/utils";

export function Button({ className, variant = "default", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={cn("ui-button", variant === "ghost" && "ui-button-ghost", className)}
      {...props}
    />
  );
}
