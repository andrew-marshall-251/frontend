import { useEffect, useRef, useState } from "react";
import { CornerUpLeft, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { StarToggleButton } from "../../components/ui/star-toggle";
import {
  comments as fallbackComments,
  formatTimestamp,
  post as fallbackPost,
} from "../my-post-details/index.jsx";

const currentUser = {
  username: "AndMarsh",
  color: "blue",
};

function normalizePost(payload) {
  const post = payload?.post || payload?.data || payload;

  if (!post || typeof post !== "object") {
    return fallbackPost;
  }

  return {
    title: post.title ?? fallbackPost.title,
    authorUsername:
      post.authorUsername ?? post.username ?? post.author?.username ?? fallbackPost.authorUsername,
    stars: Number(post.stars ?? post.starCount ?? fallbackPost.stars),
    body: post.body ?? post.content ?? post.description ?? fallbackPost.body,
    publishedAt: post.publishedAt ?? post.createdAt ?? fallbackPost.publishedAt,
  };
}

function normalizeComments(payload) {
  const source = Array.isArray(payload)
    ? payload
    : payload?.comments || payload?.data?.comments || payload?.data || [];

  if (!Array.isArray(source) || source.length === 0) {
    return fallbackComments;
  }

  const byId = new Map(source.map((comment) => [String(comment.id), comment]));

  return source.map((comment, index) => {
    const parentId =
      comment.parentComment === null || comment.parentComment === undefined
        ? null
        : String(comment.parentComment);
    const parent = parentId ? byId.get(parentId) : null;

    return {
      id: String(comment.id ?? index),
      username:
        comment.username ??
        comment.authorUsername ??
        comment.author?.username ??
        "unknown",
      body: comment.body ?? comment.content ?? "",
      publishedAt: comment.publishedAt ?? comment.createdAt ?? "",
      color: comment.color ?? "blue",
      replyingTo: parent
        ? {
            id: String(parent.id),
            username:
              parent.username ??
              parent.authorUsername ??
              parent.author?.username ??
              "unknown",
            body: parent.body ?? parent.content ?? "",
            color: parent.color ?? "blue",
          }
        : null,
    };
  });
}

function CommentMenu({ comment }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <span className="comment-actions" ref={menuRef}>
      <button
        type="button"
        className="comment-more-button"
        aria-label={`Actions for ${comment.username}'s comment`}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        ...
      </button>
      {open ? (
        <div className="comment-action-menu" role="menu">
          <button type="button" className="comment-action-menu-item" role="menuitem">
            <Trash2 size={16} aria-hidden="true" />
            Delete Comment
          </button>
        </div>
      ) : null}
    </span>
  );
}

export default function PostDetails() {
  const [post, setPost] = useState(fallbackPost);
  const [comments, setComments] = useState(fallbackComments);
  const [commentValue, setCommentValue] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const [highlightedCommentId, setHighlightedCommentId] = useState(null);
  const composerRef = useRef(null);

  useEffect(() => {
    let ignore = false;

    async function loadPost() {
      try {
        const response = await fetch("http://localhost:8080/api/posts/placeholder-post", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Post request failed");
        }

        const payload = await response.json();

        if (!ignore) {
          setPost(normalizePost(payload));
          setComments(normalizeComments(payload));
        }
      } catch {
        if (!ignore) {
          setPost(fallbackPost);
          setComments(fallbackComments);
        }
      }
    }

    loadPost();

    return () => {
      ignore = true;
    };
  }, []);

  function startReply(comment) {
    setReplyTarget(comment);
    composerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function scrollToComment(commentId) {
    document
      .getElementById(commentId)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      setHighlightedCommentId(commentId);
      window.setTimeout(() => setHighlightedCommentId(null), 1400);
    }, 200);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="post-detail-page">
      <Card as="article" className="post-detail-panel">
        <CardHeader className="post-detail-header">
          <h1>{post.title}</h1>
          <div className="post-detail-meta">
            <span>by {post.authorUsername}</span>
            <StarToggleButton
              className="post-detail-stars"
              count={post.stars}
              label={`post ${post.title}`}
              size={16}
            />
          </div>
        </CardHeader>

        <CardContent className="post-detail-content">
          <p className="post-detail-body">{post.body}</p>
          <time className="post-detail-timestamp">{formatTimestamp(post.publishedAt)}</time>
        </CardContent>

        <section className="comments-section" aria-label="Comments">
          <h2>Comments</h2>

          <form className="comment-composer" onSubmit={handleSubmit} ref={composerRef}>
            <span
              className={`comment-avatar comment-avatar-${currentUser.color}`}
              aria-hidden="true"
            />
            <div className="comment-composer-body">
              {replyTarget ? (
                <div className="reply-target">
                  <span
                    className={`comment-avatar comment-avatar-${replyTarget.color}`}
                    aria-hidden="true"
                  />
                  <div>
                    <p>Reply to @{replyTarget.username}</p>
                    <span>{replyTarget.body}</span>
                  </div>
                  <button type="button" onClick={() => setReplyTarget(null)}>
                    Clear
                  </button>
                </div>
              ) : null}
              <Textarea
                value={commentValue}
                onChange={(event) => setCommentValue(event.target.value)}
                placeholder={replyTarget ? "Write reply" : "Write comment"}
                rows={2}
              />
              <Button type="submit" className="comment-submit">
                {replyTarget ? "Reply" : "Comment"}
              </Button>
            </div>
          </form>

          <div className="comment-list">
            {comments.map((comment) => {
              const canManageComment = comment.username === currentUser.username;

              return (
                <Card
                  as="article"
                  className={`comment-item ${
                    highlightedCommentId === comment.id ? "comment-item-highlighted" : ""
                  }`}
                  id={comment.id}
                  key={comment.id}
                >
                  <span
                    className={`comment-avatar comment-avatar-${comment.color}`}
                    aria-hidden="true"
                  />
                  <div className="comment-content">
                    <div className="comment-header">
                      <span>@{comment.username}</span>
                      <time>{formatTimestamp(comment.publishedAt)}</time>
                      {canManageComment ? <CommentMenu comment={comment} /> : null}
                    </div>
                    {comment.replyingTo ? (
                      <button
                        type="button"
                        className="reply-context"
                        onClick={() => scrollToComment(comment.replyingTo.id)}
                      >
                        <span
                          className={`comment-avatar comment-avatar-${comment.replyingTo.color}`}
                          aria-hidden="true"
                        />
                        <div>
                          <p>@{comment.replyingTo.username}</p>
                          <span>{comment.replyingTo.body}</span>
                        </div>
                      </button>
                    ) : null}
                    <p>{comment.body}</p>
                    <button
                      type="button"
                      className="comment-reply-button"
                      onClick={() => startReply(comment)}
                    >
                      <CornerUpLeft size={15} aria-hidden="true" />
                      Reply
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </Card>
    </section>
  );
}
