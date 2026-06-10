import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { PostList } from "../../components/posts/PostList";
import { ProfileCard } from "../../components/profile/ProfileCard";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
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

        <Card as="section" className="profile-posts-panel" aria-label="My posts">
          <CardHeader className="profile-posts-header">
            <h2>My Posts</h2>
            <Button asChild variant="ghost" className="new-post-link">
              <Link to="/create-post">
              <Pencil size={16} aria-hidden="true" />
              Write a new post
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <PostList posts={posts} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
