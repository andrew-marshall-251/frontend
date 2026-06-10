import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function ForgotPassword() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="auth-page">
      <Card as="form" className="auth-form login-form" onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>

        <CardContent className="form-card-content">
          <div className="form-field">
            <Label htmlFor="forgotUsernameOrEmail">Username or Email</Label>
            <Input
              id="forgotUsernameOrEmail"
              name="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(event) => setUsernameOrEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <Button type="submit" className="auth-submit">
            Recover Account
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
