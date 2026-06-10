import { useState } from "react";
import { Star } from "lucide-react";

export function StarToggleButton({
  count,
  className = "",
  label = "item",
  defaultStarred = true,
  size = 16,
}) {
  const [isStarred, setIsStarred] = useState(defaultStarred);

  return (
    <button
      type="button"
      className={["star-toggle", className].filter(Boolean).join(" ")}
      aria-pressed={isStarred}
      aria-label={`${isStarred ? "Unstar" : "Star"} ${label}`}
      title={`${isStarred ? "Unstar" : "Star"} ${label}`}
      onClick={() => setIsStarred((current) => !current)}
    >
      <span className="star-toggle-icon" aria-hidden="true">
        <Star size={size} fill={isStarred ? "currentColor" : "none"} />
      </span>
      <span className="star-toggle-count">{count}</span>
    </button>
  );
}
