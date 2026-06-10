import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { PostList } from "../../components/posts/PostList";
import { fallbackPosts, normalizePosts } from "../../lib/posts";

const fallbackThread = {
  id: "robots",
  name: "Robots",
  stars: 6,
  posts: fallbackPosts,
};

function normalizeThread(payload) {
  const thread = payload?.thread || payload?.data || payload;

  if (!thread || typeof thread !== "object") {
    return fallbackThread;
  }

  return {
    id: String(thread.id ?? thread.threadId ?? fallbackThread.id),
    name:
      thread.name ??
      thread.label ??
      thread.title ??
      thread.threadName ??
      fallbackThread.name,
    stars: Number(thread.stars ?? thread.starCount ?? thread.totalStars ?? 0),
    posts: normalizePosts(thread.posts ?? thread.items ?? thread.postList ?? []),
  };
}

export default function ViewThread() {
  const [thread, setThread] = useState(fallbackThread);

  useEffect(() => {
    let ignore = false;

    async function loadThread() {
      try {
        const response = await fetch("http://localhost:8080/api/threads/placeholder-thread");

        if (!response.ok) {
          throw new Error("Thread request failed");
        }

        const payload = await response.json();

        if (!ignore) {
          setThread(normalizeThread(payload));
        }
      } catch {
        if (!ignore) {
          setThread(fallbackThread);
        }
      }
    }

    loadThread();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="feed-page">
      <div className="feed-panel">
        <div className="thread-detail-header">
          <h1>{thread.name}</h1>
          <span className="thread-detail-stars" aria-label={`${thread.stars} stars`}>
            <Star size={18} fill="currentColor" aria-hidden="true" />
            {thread.stars}
          </span>
        </div>
        <PostList posts={thread.posts} />
      </div>
    </section>
  );
}
