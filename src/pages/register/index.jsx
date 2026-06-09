import { useEffect, useMemo, useState } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "../../components/ui/popover";
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

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    mascot: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });
  const [mascots, setMascots] = useState(fallbackMascots);
  const [mascotsLoading, setMascotsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

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

  const passwordRequirements = useMemo(
    () => [
      {
        label: "At least 8 characters",
        met: form.password.length >= 8,
      },
      {
        label: "One uppercase letter",
        met: /[A-Z]/.test(form.password),
      },
      {
        label: "One lowercase letter",
        met: /[a-z]/.test(form.password),
      },
      {
        label: "At least one number",
        met: /\d/.test(form.password),
      },
    ],
    [form.password],
  );

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>

        <div className="form-field">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={form.username}
            onChange={(event) => updateField("username", event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="form-field">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="form-field">
          <Label htmlFor="mascot">Mascot</Label>
          <Select
            value={form.mascot}
            onValueChange={(value) => updateField("mascot", value)}
          >
            <SelectTrigger id="mascot" aria-label="Select a mascot">
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
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={(event) => updateField("bio", event.target.value)}
            maxLength={300}
            rows={4}
          />
          <span className="field-count">{form.bio.length}/300</span>
        </div>

        <div className="form-field">
          <Label htmlFor="password">Password</Label>
          <Popover open={passwordFocused}>
            <PopoverAnchor asChild>
              <div className="password-input">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={(event) => {
                    if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
                      setPasswordFocused(false);
                    }
                  }}
                  autoComplete="new-password"
                  minLength={8}
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
                  title="Password must be at least 8 characters and include uppercase, lowercase, and a number."
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </PopoverAnchor>
            <PopoverContent
              className="password-popover"
              align="start"
              onOpenAutoFocus={(event) => event.preventDefault()}
              onCloseAutoFocus={(event) => event.preventDefault()}
            >
              <p className="password-popover-title">Password requirements</p>
              <ul>
                {passwordRequirements.map((requirement) => (
                  <li
                    key={requirement.label}
                    className={requirement.met ? "requirement-met" : "requirement-missing"}
                  >
                    {requirement.met ? <Check size={16} /> : <X size={16} />}
                    <span>{requirement.label}</span>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>

        <div className="form-field">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="password-input">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(event) =>
                updateField("confirmPassword", event.target.value)
              }
              autoComplete="new-password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              className="password-toggle"
              aria-label={
                showConfirmPassword ? "Hide confirm password" : "Show confirm password"
              }
              onClick={() => setShowConfirmPassword((current) => !current)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
        </div>

        <Button type="submit" className="register-submit">
          Register
        </Button>
      </form>
    </section>
  );
}
