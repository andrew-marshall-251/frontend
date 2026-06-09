import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { PostList } from "../../components/posts/PostList";
import { ProfileCard } from "../../components/profile/ProfileCard";
import { usePosts } from "../../hooks/usePosts";

const profile = {
  username: "AndMarsh",
  bloggerSince: "3/26",
  bio: "I like capybaras and also I like music. I like rock especially Audioslave.",
};

export default function MyProfile() {
  const { posts } = usePosts("http://localhost:8080/api/posts/me");

  return (
    <section className="profile-page">
      <div className="profile-layout">
        <ProfileCard profile={profile} showEditAction />

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
    </section>
  );
}
