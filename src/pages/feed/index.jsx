import { PostList } from "../../components/posts/PostList";
import { usePosts } from "../../hooks/usePosts";

export default function Feed() {
  const { posts } = usePosts("http://localhost:8080/api/posts");

  return (
    <section className="feed-page">
      <div className="feed-panel">
        <h1>Feed</h1>
        <PostList posts={posts} />
      </div>
    </section>
  );
}
