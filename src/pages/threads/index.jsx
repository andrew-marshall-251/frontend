import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { StarToggleButton } from "../../components/ui/star-toggle";

const fallbackThreads = [
  { id: "robots", name: "ROBOTS", posts: 3, stars: 6 },
  { id: "learning", name: "LEARNING", posts: 3, stars: 6 },
  { id: "coding", name: "CODING", posts: 3, stars: 6 },
  { id: "swimming", name: "SWIMMING", posts: 3, stars: 6 },
];

function normalizeThreads(payload) {
  const source = Array.isArray(payload)
    ? payload
    : payload?.threads || payload?.data || payload?.items || [];

  if (!Array.isArray(source)) {
    return fallbackThreads;
  }

  const normalized = source
    .map((thread, index) => {
      if (typeof thread === "string") {
        return { id: thread, name: thread, posts: 0, stars: 0 };
      }

      const id = thread?.id ?? thread?.threadId ?? thread?.value ?? index;
      const name = thread?.name ?? thread?.label ?? thread?.title ?? thread?.threadName;

      if (!name) {
        return null;
      }

      return {
        id: String(id),
        name,
        posts: Number(thread?.posts ?? thread?.postCount ?? thread?.totalPosts ?? 0),
        stars: Number(thread?.stars ?? thread?.starCount ?? thread?.totalStars ?? 0),
      };
    })
    .filter(Boolean);

  return normalized.length > 0 ? normalized : fallbackThreads;
}

export default function Threads() {
  const [threads, setThreads] = useState(fallbackThreads);

  useEffect(() => {
    let ignore = false;

    async function loadThreads() {
      try {
        const response = await fetch("http://localhost:8080/api/threads");

        if (!response.ok) {
          throw new Error("Threads request failed");
        }

        const payload = await response.json();

        if (!ignore) {
          setThreads(normalizeThreads(payload));
        }
      } catch {
        if (!ignore) {
          setThreads(fallbackThreads);
        }
      }
    }

    loadThreads();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="view-threads-page">
      <div className="thread-list-panel">
        {threads.map((thread) => (
          <article className="thread-list-item" key={thread.id}>
            <Link className="thread-list-link" to="/view-thread">
              <h1>{thread.name}</h1>
            </Link>
            <div className="thread-list-metrics">
              <span aria-label={`${thread.posts} posts`}>
                <FileText size={16} aria-hidden="true" />
                {thread.posts}
              </span>
              <StarToggleButton
                className="thread-list-star"
                count={thread.stars}
                label={`thread ${thread.name}`}
                size={16}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
