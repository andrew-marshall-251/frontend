import { PostPreview } from "./PostPreview";

export function PostList({ posts, getPostHref = () => "/post-details" }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} to={getPostHref(post)} />
      ))}
    </div>
  );
}
