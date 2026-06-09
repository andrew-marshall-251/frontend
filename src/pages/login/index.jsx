import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function Login() {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="auth-page">
      <form className="auth-form login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="form-field">
          <Label htmlFor="usernameOrEmail">Username or Email</Label>
          <Input
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={form.usernameOrEmail}
            onChange={(event) =>
              updateField("usernameOrEmail", event.target.value)
            }
            autoComplete="username"
            required
          />
        </div>

        <div className="form-field">
          <Label htmlFor="loginPassword">Password</Label>
          <div className="password-input">
            <Input
              id="loginPassword"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              autoComplete="current-password"
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
        </div>

        <Link className="forgot-password-link" to="/new-password">
          Forgot password?
        </Link>

        <Button type="submit" className="auth-submit">
          Login
        </Button>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Register Here</Link>
        </p>
      </form>
    </section>
  );
}
