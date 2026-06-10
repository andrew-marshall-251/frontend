import { useMemo, useState } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "../../components/ui/popover";

export default function NewPassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);

  const passwordRequirements = useMemo(
    () => [
      {
        label: "At least 8 characters",
        met: form.newPassword.length >= 8,
      },
      {
        label: "One uppercase letter",
        met: /[A-Z]/.test(form.newPassword),
      },
      {
        label: "One lowercase letter",
        met: /[a-z]/.test(form.newPassword),
      },
      {
        label: "At least one number",
        met: /\d/.test(form.newPassword),
      },
    ],
    [form.newPassword],
  );

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="auth-page">
      <Card as="form" className="auth-form" onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>New Password</CardTitle>
        </CardHeader>

        <CardContent className="form-card-content">
        <div className="form-field">
          <Label htmlFor="oldPassword">Old Password</Label>
          <div className="password-input">
            <Input
              id="oldPassword"
              name="oldPassword"
              type={showOldPassword ? "text" : "password"}
              value={form.oldPassword}
              onChange={(event) => updateField("oldPassword", event.target.value)}
              autoComplete="current-password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              className="password-toggle"
              aria-label={showOldPassword ? "Hide old password" : "Show old password"}
              onClick={() => setShowOldPassword((current) => !current)}
              onMouseDown={(event) => event.preventDefault()}
            >
              {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
        </div>

        <div className="form-field">
          <Label htmlFor="newPassword">New Password</Label>
          <Popover open={newPasswordFocused}>
            <PopoverAnchor asChild>
              <div className="password-input">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(event) => updateField("newPassword", event.target.value)}
                  onFocus={() => setNewPasswordFocused(true)}
                  onBlur={(event) => {
                    if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
                      setNewPasswordFocused(false);
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
                  aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                  onClick={() => setShowNewPassword((current) => !current)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              onMouseDown={(event) => event.preventDefault()}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
        </div>

        <Button type="submit" className="auth-submit">
          Change Password
        </Button>
        </CardContent>
      </Card>
    </section>
  );
}
