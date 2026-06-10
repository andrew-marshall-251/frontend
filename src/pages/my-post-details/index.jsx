import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CornerUpLeft, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

export const post = {
  title: "How to Live like a Robot",
  authorUsername: "AndMarsh",
  stars: 18,
  body: "Robots code all day. And that's what I am doing, but I also go outside sometimes. Who knows I read articles on Medium about API design and I do my classes.",
  publishedAt: "4/13/26 3:23 PM",
};

export const comments = [
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
      id: "comment-2",
      username: "beep_beep",
      body: "BEEP BEEP... BOOP BOOP...",
      color: "pink",
    },
  },
  {
    id: "comment-3",
    username: "poolnoodle",
    body: "I actually liked the part about going outside. That is probably the most human sentence in the whole post.",
    publishedAt: "4/13/26 3:44 PM",
    color: "blue",
  },
  {
    id: "comment-4",
    username: "syntax_error",
    body: "Medium articles about API design are a dangerous gateway. First you read one, then suddenly you have opinions about pagination.",
    publishedAt: "4/13/26 3:51 PM",
    color: "orange",
  },
  {
    id: "reply-2",
    username: "AndMarsh",
    body: "Pagination opinions are part of growing up. Offset pagination made me who I am today.",
    publishedAt: "4/13/26 3:56 PM",
    color: "red",
    replyingTo: {
      id: "comment-4",
      username: "syntax_error",
      body: "Medium articles about API design are a dangerous gateway...",
      color: "orange",
    },
  },
  {
    id: "comment-5",
    username: "garden_gnome",
    body: "Do robots need sunlight or do you just stand outside buffering for a while?",
    publishedAt: "4/13/26 4:02 PM",
    color: "pink",
  },
  {
    id: "reply-3",
    username: "robotfan42",
    body: "They need firmware updates and a small iced coffee.",
    publishedAt: "4/13/26 4:08 PM",
    color: "orange",
    replyingTo: {
      id: "comment-5",
      username: "garden_gnome",
      body: "Do robots need sunlight or do you just stand outside...",
      color: "pink",
    },
  },
  {
    id: "comment-6",
    username: "byte_sized",
    body: "The tone here is funny. It reads like someone trying to convince themselves that touching grass can be integrated into a sprint plan.",
    publishedAt: "4/13/26 4:15 PM",
    color: "blue",
  },
  {
    id: "comment-7",
    username: "capybara_dev",
    body: "I support all robot outdoor activity as long as it is done respectfully and with proper hydration.",
    publishedAt: "4/13/26 4:23 PM",
    color: "orange",
  },
  {
    id: "reply-4",
    username: "AndMarsh",
    body: "Hydration was observed. Respect was attempted.",
    publishedAt: "4/13/26 4:29 PM",
    color: "red",
    replyingTo: {
      id: "comment-7",
      username: "capybara_dev",
      body: "I support all robot outdoor activity as long as...",
      color: "orange",
    },
  },
  {
    id: "comment-8",
    username: "beep_beep",
    body: "BEEP STATUS REPORT: OUTSIDE HAS TOO MANY TEXTURES. RETURNING TO KEYBOARD.",
    publishedAt: "4/13/26 4:37 PM",
    color: "pink",
  },
  {
    id: "comment-9",
    username: "learner_404",
    body: "The line about classes is relatable. Sometimes the homework is more confusing than the API docs.",
    publishedAt: "4/13/26 4:45 PM",
    color: "blue",
  },
  {
    id: "reply-5",
    username: "syntax_error",
    body: "At least API docs usually admit when something is deprecated.",
    publishedAt: "4/13/26 4:50 PM",
    color: "orange",
    replyingTo: {
      id: "comment-9",
      username: "learner_404",
      body: "Sometimes the homework is more confusing than the API docs.",
      color: "blue",
    },
  },
  {
    id: "comment-10",
    username: "quiet_thread",
    body: "This post has a good rhythm. Short, slightly strange, and specific enough to feel real.",
    publishedAt: "4/13/26 5:01 PM",
    color: "pink",
  },
  {
    id: "comment-11",
    username: "poolnoodle",
    body: "I want a follow-up called How to Float like a Robot. I assume the answer is very carefully.",
    publishedAt: "4/13/26 5:14 PM",
    color: "blue",
  },
  {
    id: "reply-6",
    username: "AndMarsh",
    body: "Floating is just async behavior for humans.",
    publishedAt: "4/13/26 5:19 PM",
    color: "red",
    replyingTo: {
      id: "comment-11",
      username: "poolnoodle",
      body: "I want a follow-up called How to Float like a Robot.",
      color: "blue",
    },
  },
  {
    id: "comment-12",
    username: "runtime_randy",
    body: "I came here for robot tips and left with a reminder to go outside. Not sure whether to thank you or file a bug.",
    publishedAt: "4/13/26 5:27 PM",
    color: "orange",
  },
  {
    id: "comment-13",
    username: "garden_gnome",
    body: "Filing a bug against fresh air has historically been difficult.",
    publishedAt: "4/13/26 5:35 PM",
    color: "pink",
  },
  {
    id: "reply-7",
    username: "robotfan42",
    body: "Steps to reproduce: open door, become uncomfortable.",
    publishedAt: "4/13/26 5:41 PM",
    color: "orange",
    replyingTo: {
      id: "comment-13",
      username: "garden_gnome",
      body: "Filing a bug against fresh air has historically been difficult.",
      color: "pink",
    },
  },
  {
    id: "comment-14",
    username: "capybara_dev",
    body: "The API design mention got me. Every hobby eventually becomes an excuse to think about naming things.",
    publishedAt: "4/13/26 5:52 PM",
    color: "orange",
  },
  {
    id: "comment-15",
    username: "beep_beep",
    body: "FINAL BEEP: POST ACCEPTED. OUTSIDE STILL SUSPICIOUS.",
    publishedAt: "4/13/26 6:03 PM",
    color: "pink",
  },
];

export function formatTimestamp(value) {
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
  const [highlightedCommentId, setHighlightedCommentId] = useState(null);
  const composerRef = useRef(null);

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
              <article
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
                    <CommentMenu comment={comment} />
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
              </article>
            ))}
          </div>
        </section>
      </article>
    </section>
  );
}
