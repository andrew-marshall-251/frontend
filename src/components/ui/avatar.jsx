import { cn } from "../../lib/utils";

export function Avatar({ className, ...props }) {
  return <span className={cn("ui-avatar", className)} {...props} />;
}

export function AvatarFallback({ className, ...props }) {
  return <span className={cn("ui-avatar-fallback", className)} {...props} />;
}
