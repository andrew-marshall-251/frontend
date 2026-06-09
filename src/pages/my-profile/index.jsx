import { useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "../../components/ui/button";
import { PostList } from "../../components/posts/PostList";
import { usePosts } from "../../hooks/usePosts";

const profile = {
  username: "AndMarsh",
  bloggerSince: "3/26",
  bio: "I like capybaras and also I like music. I like rock especially Audioslave.",
};

export default function MyProfile() {
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const { posts } = usePosts("http://localhost:8080/api/posts/me");

  return (
    <section className="profile-page">
      <div className="profile-layout">
        <section className="profile-card" aria-label="My profile">
          <div className="profile-card-top">
            <div className="profile-avatar" aria-hidden="true" />
            <div className="profile-heading">
              <h1>{profile.username}</h1>
              <p>Blogger since {profile.bloggerSince}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="profile-more-button"
              aria-label="Profile options"
              onClick={() => setEditMenuOpen(true)}
            >
              <MoreHorizontal size={20} />
            </Button>
          </div>
          <p className="profile-bio">{profile.bio}</p>
        </section>

        <section className="profile-posts-panel" aria-label="My posts">
          <div className="profile-posts-header">
            <h2>My Posts</h2>
            <Link className="new-post-link" to="/create-post">
              <Pencil size={16} aria-hidden="true" />
              Write a new post
            </Link>
          </div>
          <PostList posts={posts} />
        </section>
      </div>

      {editMenuOpen ? (
        <div
          className="profile-modal-backdrop"
          role="presentation"
          onClick={() => setEditMenuOpen(false)}
        >
          <div
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Profile actions"
            onClick={(event) => event.stopPropagation()}
          >
            <Link className="profile-modal-action" to="/edit-profile">
              <Pencil size={18} aria-hidden="true" />
              Edit Profile
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}
