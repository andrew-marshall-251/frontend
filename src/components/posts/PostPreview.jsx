import { Link } from "react-router-dom";
import { MessageCircle, Star } from "lucide-react";
import { formatPublishedAt } from "../../lib/posts";

export function PostPreview({ post, to = "/post-details" }) {
  return (
    <Link className="post-preview-link" to={to}>
      <article className="post-preview">
        <div className="post-preview-header">
          <h2>{post.title}</h2>
          <div className="post-metrics">
            <span className="post-metric" aria-label={`${post.stars} stars`}>
              <Star size={16} fill="currentColor" aria-hidden="true" />
              {post.stars}
            </span>
            <span className="post-metric" aria-label={`${post.comments} comments`}>
              <MessageCircle size={16} aria-hidden="true" />
              {post.comments}
            </span>
          </div>
        </div>
        <p className="post-author">@{post.authorUsername}</p>
        <p className="post-excerpt">{post.excerpt}</p>
        <time className="post-timestamp">{formatPublishedAt(post.publishedAt)}</time>
      </article>
    </Link>
  );
}
