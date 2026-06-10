import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CornerUpLeft, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

const post = {
  title: "How to Live like a Robot",
  authorUsername: "AndMarsh",
  stars: 18,
  body: "Robots code all day. And that's what I am doing, but I also go outside sometimes. Who knows I read articles on Medium about API design and I do my classes.",
  publishedAt: "4/13/26 3:23 PM",
};

const comments = [
  {
    id: "comment-1",
    username: "robotfan42",
    body: "I think robots are stupid",
    publishedAt: "4/13/26 3:29 PM",
    color: "orange",
  },
  {
    id: "comment-2",
    username: "beep_beep",
    body: "BEEP BEEP... BOOP BOOP $$$HELLOSS$ $$ $ROBOT$$$",
    publishedAt: "4/13/26 3:34 PM",
    color: "pink",
  },
  {
    id: "reply-1",
    username: "AndMarsh",
    body: "I think you are stupid. Dumb comment by the way",
    publishedAt: "4/13/26 3:39 PM",
    color: "red",
    replyingTo: {
      username: "beep_beep",
      body: "BEEP BEEP... BOOP BOOP...",
      color: "pink",
    },
  },
];

function formatTimestamp(value) {
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

function PostOwnerMenu() {
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
    <span className="post-owner-actions" ref={menuRef}>
      <button
        type="button"
        className="post-detail-more-button"
        aria-label="Post actions"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        ...
      </button>
      {open ? (
        <div className="post-owner-action-menu" role="menu">
          <Link className="post-owner-action-menu-item" to="/edit-post" role="menuitem">
            <Pencil size={16} aria-hidden="true" />
            Edit Post
          </Link>
        </div>
      ) : null}
    </span>
  );
}

export default function MyPostDetails() {
  const [commentValue, setCommentValue] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const composerRef = useRef(null);

  function startReply(comment) {
    setReplyTarget(comment);
    composerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="post-detail-page">
      <article className="post-detail-panel">
        <header className="post-detail-header">
          <h1>{post.title}</h1>
          <div className="post-detail-meta">
            <span>by {post.authorUsername}</span>
            <span className="post-detail-stars" aria-label={`${post.stars} stars`}>
              <Star size={16} fill="currentColor" aria-hidden="true" />
              {post.stars}
            </span>
            <PostOwnerMenu />
          </div>
        </header>

        <p className="post-detail-body">{post.body}</p>
        <time className="post-detail-timestamp">{formatTimestamp(post.publishedAt)}</time>

        <section className="comments-section" aria-label="Comments">
          <h2>Comments</h2>

          <form className="comment-composer" onSubmit={handleSubmit} ref={composerRef}>
            <span className="comment-avatar comment-avatar-blue" aria-hidden="true" />
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
            {comments.map((comment) => (
              <article className="comment-item" key={comment.id}>
                <span
                  className={`comment-avatar comment-avatar-${comment.color}`}
                  aria-hidden="true"
                />
                <div className="comment-content">
                  {comment.replyingTo ? (
                    <div className="reply-context">
                      <span
                        className={`comment-avatar comment-avatar-${comment.replyingTo.color}`}
                        aria-hidden="true"
                      />
                      <div>
                        <p>@{comment.replyingTo.username}</p>
                        <span>{comment.replyingTo.body}</span>
                      </div>
                    </div>
                  ) : null}
                  <div className="comment-header">
                    <span>@{comment.username}</span>
                    <time>{formatTimestamp(comment.publishedAt)}</time>
                    <CommentMenu comment={comment} />
                  </div>
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
              </article>
            ))}
          </div>
        </section>
      </article>
    </section>
  );
}
