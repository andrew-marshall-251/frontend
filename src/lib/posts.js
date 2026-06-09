export const fallbackPosts = [
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

export function normalizePosts(payload) {
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

export function formatPublishedAt(value) {
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
