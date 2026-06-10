import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const pages = [
  { label: "Home", to: "/home" },
  { label: "Feed", to: "/feed" },
  { label: "Threads", to: "/threads" },
  { label: "View Thread", to: "/view-thread" },
  { label: "Post Details", to: "/post-details" },
  { label: "My Post Details", to: "/my-post-details" },
  { label: "My Profile", to: "/my-profile" },
  { label: "User Profile", to: "/user-profile" },
  { label: "Admin Profile", to: "/admin-profile" },
  { label: "Create Post", to: "/create-post" },
  { label: "Edit Post", to: "/edit-post" },
  { label: "Edit Profile", to: "/edit-profile" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
  { label: "Forgot Password", to: "/forgot-password" },
  { label: "New Password", to: "/new-password" },
  { label: "Links", to: "/links" },
];

export default function Links() {
  return (
    <section className="links-page">
      <Card className="links-panel">
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="links-grid" aria-label="All pages">
            {pages.map((page) => (
              <Link className="links-grid-item" key={page.to} to={page.to}>
                {page.label}
                <span>{page.to}</span>
              </Link>
            ))}
          </nav>
        </CardContent>
      </Card>
    </section>
  );
}
