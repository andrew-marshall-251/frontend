import { useEffect, useState } from "react";
import { PostForm } from "../../components/posts/PostForm";

const fallbackPost = {
  title: "How to Live like a Robot",
  thread: "general",
  body: "Robots code all day. And that's what I am doing, but I also go outside sometimes. Who knew fresh air could be useful?",
};

function normalizePost(payload) {
  const post = payload?.post || payload?.data || payload;

  if (!post || typeof post !== "object") {
    return fallbackPost;
  }

  return {
    title: post.title ?? post.name ?? fallbackPost.title,
    thread:
      String(
        post.threadId ??
          post.thread?.id ??
          post.thread ??
          post.categoryId ??
          fallbackPost.thread,
      ),
    body:
      post.body ??
      post.content ??
      post.description ??
      post.excerpt ??
      fallbackPost.body,
  };
}

export default function EditPost() {
  const [post, setPost] = useState(fallbackPost);

  useEffect(() => {
    let ignore = false;

    async function loadPost() {
      try {
        const response = await fetch("http://localhost:8080/api/posts/placeholder-post");

        if (!response.ok) {
          throw new Error("Post request failed");
        }

        const payload = await response.json();

        if (!ignore) {
          setPost(normalizePost(payload));
        }
      } catch {
        if (!ignore) {
          setPost(fallbackPost);
        }
      }
    }

    loadPost();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="create-post-page">
      <PostForm title="Edit Post" submitLabel="Save Changes" initialValues={post} />
    </section>
  );
}
