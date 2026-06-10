import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

export function ProfileCard({
  profile,
  showEditAction = false,
  avatarVariant = "blue",
}) {
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const actionsRef = useRef(null);

  useEffect(() => {
    if (!editMenuOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!actionsRef.current?.contains(event.target)) {
        setEditMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setEditMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editMenuOpen]);

  return (
    <Card as="section" className="profile-card" aria-label={`${profile.username} profile`}>
      <CardHeader className="profile-card-top">
        <Avatar className={`profile-avatar profile-avatar-${avatarVariant}`} aria-hidden="true">
          <AvatarFallback>{profile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="profile-heading">
          <h1>{profile.username}</h1>
          <div className="profile-meta">
            <Badge variant="secondary">Blogger since {profile.bloggerSince}</Badge>
            {showEditAction ? (
              <span className="profile-actions" ref={actionsRef}>
                <button
                  type="button"
                  className="profile-more-button"
                  aria-label="Profile options"
                  aria-expanded={editMenuOpen}
                  onClick={() => setEditMenuOpen((current) => !current)}
                >
                  ...
                </button>
                {editMenuOpen ? (
                  <div className="profile-action-menu" role="menu">
                    <Link
                      className="profile-action-menu-item"
                      to="/edit-profile"
                      role="menuitem"
                    >
                      <Pencil size={16} aria-hidden="true" />
                      Edit Profile
                    </Link>
                  </div>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="profile-bio">{profile.bio}</p>
      </CardContent>
    </Card>
  );
}
