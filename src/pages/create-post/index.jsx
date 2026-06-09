import { PostForm } from "../../components/posts/PostForm";

export default function CreatePost() {
  return (
    <section className="create-post-page">
      <PostForm title="Create Post" submitLabel="Publish" />
    </section>
  );
}
