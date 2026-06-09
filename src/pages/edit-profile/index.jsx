import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";

const fallbackMascots = [
  { id: "placeholder-1", name: "Mascot option 1" },
  { id: "placeholder-2", name: "Mascot option 2" },
  { id: "placeholder-3", name: "Mascot option 3" },
];

const fallbackProfile = {
  username: "AndMarsh",
  email: "andmarsh@example.com",
  mascot: "placeholder-1",
  bio: "I like capybaras and also I like music. I like rock especially Audioslave.",
};

function normalizeMascots(payload) {
  const source = Array.isArray(payload)
    ? payload
    : payload?.mascots || payload?.data || payload?.items || [];

  if (!Array.isArray(source)) {
    return fallbackMascots;
  }

  const normalized = source
    .map((item, index) => {
      if (typeof item === "string") {
        return { id: item, name: item };
      }

      const id = item?.id ?? item?.mascotId ?? item?.value ?? index;
      const name = item?.name ?? item?.label ?? item?.title ?? item?.mascotName;

      return name ? { id: String(id), name } : null;
    })
    .filter(Boolean);

  return normalized.length > 0 ? normalized : fallbackMascots;
}

function normalizeProfile(payload) {
  const user = payload?.user || payload?.profile || payload?.data || payload;

  if (!user || typeof user !== "object") {
    return fallbackProfile;
  }

  return {
    username: user.username ?? user.name ?? fallbackProfile.username,
    email: user.email ?? fallbackProfile.email,
    mascot: String(
      user.mascotId ?? user.mascot?.id ?? user.mascot ?? fallbackProfile.mascot,
    ),
    bio: user.bio ?? user.description ?? fallbackProfile.bio,
  };
}

export default function EditProfile() {
  const [form, setForm] = useState(fallbackProfile);
  const [mascots, setMascots] = useState(fallbackMascots);
  const [mascotsLoading, setMascotsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      try {
        const response = await fetch("http://localhost:8080/api/users/me");

        if (!response.ok) {
          throw new Error("Profile request failed");
        }

        const payload = await response.json();

        if (!ignore) {
          setForm(normalizeProfile(payload));
        }
      } catch {
        if (!ignore) {
          setForm(fallbackProfile);
        }
      }
    }

    loadProfile();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadMascots() {
      try {
        const response = await fetch("http://localhost:8080/api/mascots");

        if (!response.ok) {
          throw new Error("Mascot request failed");
        }

        const payload = await response.json();

        if (!ignore) {
          setMascots(normalizeMascots(payload));
        }
      } catch {
        if (!ignore) {
          setMascots(fallbackMascots);
        }
      } finally {
        if (!ignore) {
          setMascotsLoading(false);
        }
      }
    }

    loadMascots();

    return () => {
      ignore = true;
    };
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Edit Profile</h1>

        <div className="form-field">
          <Label htmlFor="editUsername">Username</Label>
          <Input
            id="editUsername"
            name="username"
            value={form.username}
            onChange={(event) => updateField("username", event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="form-field">
          <Label htmlFor="editEmail">Email</Label>
          <Input
            id="editEmail"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="form-field">
          <Label htmlFor="editMascot">Mascot</Label>
          <Select
            value={form.mascot}
            onValueChange={(value) => updateField("mascot", value)}
          >
            <SelectTrigger id="editMascot" aria-label="Select a mascot">
              <SelectValue
                placeholder={mascotsLoading ? "Loading mascots..." : "Select a mascot"}
              />
            </SelectTrigger>
            <SelectContent>
              {mascots.map((mascot) => (
                <SelectItem key={mascot.id} value={mascot.id}>
                  {mascot.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="form-field">
          <Label htmlFor="editBio">Bio</Label>
          <Textarea
            id="editBio"
            name="bio"
            value={form.bio}
            onChange={(event) => updateField("bio", event.target.value)}
            maxLength={300}
            rows={4}
          />
          <span className="field-count">{form.bio.length}/300</span>
        </div>

        <Button type="submit" className="register-submit">
          Save Changes
        </Button>

        <p className="auth-switch">
          Want to change your password? <Link to="/new-password">Change Password</Link>
        </p>
      </form>
    </section>
  );
}
