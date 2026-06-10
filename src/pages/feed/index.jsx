import { PostList } from "../../components/posts/PostList";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { usePosts } from "../../hooks/usePosts";

export default function Feed() {
  const { posts } = usePosts("http://localhost:8080/api/posts");

  return (
    <section className="feed-page">
      <Card className="feed-panel">
        <CardHeader>
          <CardTitle>Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <PostList posts={posts} />
        </CardContent>
      </Card>
    </section>
  );
}
