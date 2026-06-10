import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { formatPublishedAt } from "../../lib/posts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { StarToggleButton } from "../ui/star-toggle";

export function PostPreview({ post, to = "/post-details" }) {
  return (
    <Card className="post-preview" as="article">
      <Link className="post-preview-link" to={to}>
        <CardHeader className="post-preview-header">
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="post-preview-content">
          <p className="post-author">@{post.authorUsername}</p>
          <p className="post-excerpt">{post.excerpt}</p>
          <time className="post-timestamp">{formatPublishedAt(post.publishedAt)}</time>
        </CardContent>
      </Link>
      <CardFooter className="post-metrics">
        <StarToggleButton
          className="post-metric"
          count={post.stars}
          label={`post ${post.title}`}
        />
        <span className="post-metric" aria-label={`${post.comments} comments`}>
          <MessageCircle size={16} aria-hidden="true" />
          {post.comments}
        </span>
      </CardFooter>
    </Card>
  );
}
