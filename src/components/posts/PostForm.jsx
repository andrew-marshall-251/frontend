import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const fallbackThreads = [
  { id: "general", name: "General" },
  { id: "questions", name: "Questions" },
  { id: "show-and-tell", name: "Show and Tell" },
];

const emptyPostForm = { title: "", thread: "", body: "" };

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
        return { id: thread, name: thread };
      }

      const id = thread?.id ?? thread?.threadId ?? thread?.value ?? index;
      const name = thread?.name ?? thread?.label ?? thread?.title ?? thread?.threadName;

      return name ? { id: String(id), name } : null;
    })
    .filter(Boolean);

  return normalized.length > 0 ? normalized : fallbackThreads;
}

export function PostForm({
  title,
  submitLabel,
  initialValues = emptyPostForm,
  onSubmit,
}) {
  const [form, setForm] = useState(initialValues);
  const [threads, setThreads] = useState(fallbackThreads);
  const [threadsLoading, setThreadsLoading] = useState(true);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

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
      } finally {
        if (!ignore) {
          setThreadsLoading(false);
        }
      }
    }

    loadThreads();

    return () => {
      ignore = true;
    };
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.(form);
  }

  return (
    <form className="auth-form create-post-form" onSubmit={handleSubmit}>
      <h1>{title}</h1>

      <div className="form-field">
        <Label htmlFor="postTitle">Post Title</Label>
        <Input
          id="postTitle"
          name="title"
          value={form.title}
          onChange={(event) => updateField("title", event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <Label htmlFor="thread">Thread</Label>
        <Select
          value={form.thread}
          onValueChange={(value) => updateField("thread", value)}
        >
          <SelectTrigger id="thread" aria-label="Select a thread">
            <SelectValue
              placeholder={threadsLoading ? "Loading threads..." : "Select a thread"}
            />
          </SelectTrigger>
          <SelectContent>
            {threads.map((thread) => (
              <SelectItem key={thread.id} value={thread.id}>
                {thread.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="form-field">
        <Label htmlFor="postBody">Post Body</Label>
        <Textarea
          id="postBody"
          name="body"
          className="post-body-editor"
          value={form.body}
          onChange={(event) => updateField("body", event.target.value)}
          rows={8}
          required
        />
      </div>

      <Button type="submit" className="auth-submit">
        {submitLabel}
      </Button>
    </form>
  );
}
