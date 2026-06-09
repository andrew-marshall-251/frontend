import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Star } from "lucide-react";

const fallbackPosts = [
  {
    id: "placeholder-1",
    title: "How to Live like a Robot",
    authorUsername: "robotfan42",
    stars: 18,
    comments: 6,
    excerpt:
      "Robots code all day. And that's what I am doing, but I also go outside sometimes. Who knew fresh air could be useful?",
    publishedAt: "4/31/26 3:23 PM",
  },
  {
    id: "placeholder-2",
    title: "How to Float in a Pool",
    authorUsername: "poolnoodle",
    stars: 9,
    comments: 3,
    excerpt:
      "Robots code all day. And that's what I am doing, but I also go outside sometimes. Floating is mostly trust and timing.",
    publishedAt: "4/31/26 3:23 PM",
  },
  {
    id: "placeholder-3",
    title: "Introspection for Adults with Autism",
    authorUsername: "thoughtful_dev",
    stars: 27,
    comments: 11,
    excerpt:
      "Robots code all day. And that's what I am doing, but I also go outside sometimes. This is a short note on noticing patterns.",
    publishedAt: "4/31/26 3:23 PM",
  },
];

function normalizePosts(payload) {
  const source = Array.isArray(payload)
    ? payload
    : payload?.posts || payload?.data || payload?.items || [];

  if (!Array.isArray(source)) {
    return fallbackPosts;
  }

  const normalized = source
    .map((post, index) => {
      const title = post?.title ?? post?.name;
      const authorUsername =
        post?.authorUsername ??
        post?.username ??
        post?.author?.username ??
        post?.author?.name;
      const excerpt =
        post?.excerpt ??
        post?.summary ??
        post?.body ??
        post?.content ??
        post?.description;
      const publishedAt =
        post?.publishedAt ?? post?.createdAt ?? post?.timestamp ?? post?.date;

      if (!title) {
        return null;
      }

      return {
        id: String(post?.id ?? post?.postId ?? index),
        title,
        authorUsername: authorUsername || "unknown",
        stars: Number(post?.stars ?? post?.starCount ?? post?.likes ?? 0),
        comments: Number(
          post?.comments ?? post?.commentCount ?? post?.replies ?? post?.replyCount ?? 0,
        ),
        excerpt: excerpt || "",
        publishedAt: publishedAt || "",
      };
    })
    .filter(Boolean);

  return normalized.length > 0 ? normalized : fallbackPosts;
}

function formatPublishedAt(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function Feed() {
  const [posts, setPosts] = useState(fallbackPosts);

  useEffect(() => {
    let ignore = false;

    async function loadPosts() {
      try {
        const response = await fetch("http://localhost:8080/api/posts");

        if (!response.ok) {
          throw new Error("Posts request failed");
        }

        const payload = await response.json();

        if (!ignore) {
          setPosts(normalizePosts(payload));
        }
      } catch {
        if (!ignore) {
          setPosts(fallbackPosts);
        }
      }
    }

    loadPosts();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="feed-page">
      <div className="feed-panel">
        <h1>Feed</h1>
        <div className="post-list">
          {posts.map((post) => (
            <Link className="post-preview-link" to="/post-details" key={post.id}>
              <article className="post-preview">
                <div className="post-preview-header">
                  <h2>{post.title}</h2>
                  <div className="post-metrics">
                    <span className="post-metric" aria-label={`${post.stars} stars`}>
                      <Star size={16} fill="currentColor" aria-hidden="true" />
                      {post.stars}
                    </span>
                    <span
                      className="post-metric"
                      aria-label={`${post.comments} comments`}
                    >
                      <MessageCircle size={16} aria-hidden="true" />
                      {post.comments}
                    </span>
                  </div>
                </div>
                <p className="post-author">@{post.authorUsername}</p>
                <p className="post-excerpt">{post.excerpt}</p>
                <time className="post-timestamp">
                  {formatPublishedAt(post.publishedAt)}
                </time>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
