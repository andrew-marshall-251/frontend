import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { formatPublishedAt } from "../../lib/posts";
import { StarToggleButton } from "../ui/star-toggle";

export function PostPreview({ post, to = "/post-details" }) {
  return (
    <article className="post-preview">
      <Link className="post-preview-link" to={to}>
        <div className="post-preview-header">
          <h2>{post.title}</h2>
        </div>
        <p className="post-author">@{post.authorUsername}</p>
        <p className="post-excerpt">{post.excerpt}</p>
        <time className="post-timestamp">{formatPublishedAt(post.publishedAt)}</time>
      </Link>
      <div className="post-metrics">
        <StarToggleButton
          className="post-metric"
          count={post.stars}
          label={`post ${post.title}`}
        />
        <span className="post-metric" aria-label={`${post.comments} comments`}>
          <MessageCircle size={16} aria-hidden="true" />
          {post.comments}
        </span>
      </div>
    </article>
  );
}
