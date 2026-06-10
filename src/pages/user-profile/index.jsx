import { PostList } from "../../components/posts/PostList";
import { ProfileCard } from "../../components/profile/ProfileCard";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { usePosts } from "../../hooks/usePosts";

const profile = {
  id: "placeholder-user",
  username: "TrOllRxD",
  bloggerSince: "5/26",
  bio: "I like capybaras and also I like music. I like rock especially Audioslave.",
};

export default function UserProfile() {
  const { posts } = usePosts(`http://localhost:8080/api/posts/${profile.id}`);

  return (
    <section className="profile-page">
      <div className="profile-layout">
        <ProfileCard profile={profile} avatarVariant="red" />

        <Card
          as="section"
          className="profile-posts-panel"
          aria-label={`${profile.username}'s posts`}
        >
          <CardHeader className="profile-posts-header">
            <h2>{profile.username}&apos;s Posts</h2>
          </CardHeader>
          <CardContent>
            <PostList posts={posts} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
