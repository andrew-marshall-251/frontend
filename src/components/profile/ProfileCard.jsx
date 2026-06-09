import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";

export function ProfileCard({ profile, showEditAction = false }) {
  const [editMenuOpen, setEditMenuOpen] = useState(false);

  return (
    <section className="profile-card" aria-label={`${profile.username} profile`}>
      <div className="profile-card-top">
        <div className="profile-avatar" aria-hidden="true" />
        <div className="profile-heading">
          <h1>{profile.username}</h1>
          <div className="profile-meta">
            <span>Blogger since {profile.bloggerSince}</span>
            {showEditAction ? (
              <span className="profile-actions">
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
      </div>
      <p className="profile-bio">{profile.bio}</p>
    </section>
  );
}
