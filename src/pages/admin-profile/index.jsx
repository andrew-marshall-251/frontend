import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Save } from "lucide-react";
import { PostList } from "../../components/posts/PostList";
import { ProfileCard } from "../../components/profile/ProfileCard";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { usePosts } from "../../hooks/usePosts";

const profile = {
  username: "AndMarsh",
  bloggerSince: "3/26",
  bio: "I like capybaras and also I like music. I like rock especially Audioslave.",
};

const fallbackMascots = [
  { id: "owl", name: "Owl" },
  { id: "hen", name: "Hen" },
  { id: "hare", name: "Hare" },
  { id: "capybara", name: "Capybara" },
];

const fallbackThreads = [
  { id: "gaming", name: "Gaming" },
  { id: "swimming", name: "Swimming" },
  { id: "gardening", name: "Gardening" },
  { id: "coding", name: "Coding" },
];

function normalizeEditableItems(payload, fallbackItems) {
  const source = Array.isArray(payload)
    ? payload
    : payload?.data || payload?.items || payload?.mascots || payload?.threads || [];

  if (!Array.isArray(source)) {
    return fallbackItems;
  }

  const normalized = source
    .map((item, index) => {
      if (typeof item === "string") {
        return { id: item, name: item };
      }

      const id = item?.id ?? item?.mascotId ?? item?.threadId ?? item?.value ?? index;
      const name =
        item?.name ??
        item?.label ??
        item?.title ??
        item?.mascotName ??
        item?.threadName;

      return name ? { id: String(id), name } : null;
    })
    .filter(Boolean);

  return normalized.length > 0 ? normalized : fallbackItems;
}

function AdminEditableList({ title, endpoint, fallbackItems, newItemLabel }) {
  const [items, setItems] = useState(fallbackItems);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadItems() {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`${title} request failed`);
        }

        const payload = await response.json();

        if (!ignore) {
          setItems(normalizeEditableItems(payload, fallbackItems));
        }
      } catch {
        if (!ignore) {
          setItems(fallbackItems);
        }
      }
    }

    loadItems();

    return () => {
      ignore = true;
    };
  }, [endpoint, fallbackItems, title]);

  function startEditing(item) {
    setEditingId(item.id);
    setEditingName(item.name);
  }

  async function saveItem(itemId) {
    const nextName = editingName.trim();

    if (!nextName) {
      return;
    }

    try {
      await fetch(`${endpoint}/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nextName }),
      });
    } finally {
      setItems((current) =>
        current.map((item) =>
          item.id === itemId ? { ...item, name: nextName } : item,
        ),
      );
      setEditingId(null);
      setEditingName("");
    }
  }

  async function addItem() {
    const nextName = newName.trim();

    if (!nextName) {
      return;
    }

    let nextItem = { id: `placeholder-${Date.now()}`, name: nextName };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nextName }),
      });

      if (response.ok) {
        const payload = await response.json().catch(() => null);
        nextItem = normalizeEditableItems([payload], [nextItem])[0];
      }
    } finally {
      setItems((current) => [...current, nextItem]);
      setNewName("");
    }
  }

  return (
    <section className="admin-list-section" aria-label={title}>
      <h3>{title}</h3>
      <ol className="admin-editable-list">
        {items.map((item, index) => (
          <li key={item.id}>
            <span className="admin-list-number">{index + 1}.</span>
            {editingId === item.id ? (
              <>
                <Input
                  className="admin-list-input"
                  value={editingName}
                  onChange={(event) => setEditingName(event.target.value)}
                  aria-label={`Edit ${item.name}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="admin-icon-button"
                  aria-label={`Save ${item.name}`}
                  onClick={() => saveItem(item.id)}
                >
                  <Save size={16} />
                </Button>
              </>
            ) : (
              <>
                <span className="admin-list-name">{item.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  className="admin-icon-button"
                  aria-label={`Edit ${item.name}`}
                  onClick={() => startEditing(item)}
                >
                  <Pencil size={16} />
                </Button>
              </>
            )}
          </li>
        ))}
      </ol>

      <div className="admin-new-item">
        <label htmlFor={`${title}-new`}>{newItemLabel}</label>
        <div className="admin-new-item-row">
          <Input
            id={`${title}-new`}
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            className="admin-icon-button"
            aria-label={`Add ${newItemLabel}`}
            onClick={addItem}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function AdminProfile() {
  const { posts } = usePosts("http://localhost:8080/api/posts/me");

  return (
    <section className="profile-page">
      <div className="profile-layout">
        <ProfileCard profile={profile} showEditAction />

        <section className="admin-panel" aria-label="Admin controls">
          <AdminEditableList
            title="Mascots"
            endpoint="http://localhost:8080/api/mascots"
            fallbackItems={fallbackMascots}
            newItemLabel="New Mascot"
          />
          <AdminEditableList
            title="Threads"
            endpoint="http://localhost:8080/api/threads"
            fallbackItems={fallbackThreads}
            newItemLabel="New Thread"
          />
        </section>

        <section className="profile-posts-panel" aria-label="My posts">
          <div className="profile-posts-header">
            <h2>My Posts</h2>
            <Link className="new-post-link" to="/create-post">
              <Pencil size={16} aria-hidden="true" />
              Write a new post
            </Link>
          </div>
          <PostList posts={posts} />
        </section>
      </div>
    </section>
  );
}
