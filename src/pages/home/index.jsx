import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function Home() {
  return (
    <section className="home-page">
      <div className="home-hero">
        <p className="home-eyebrow">Idle Moments</p>
        <h1>Hobbies, not work.</h1>
        <p className="home-subheadline">
          Welcome to Idle Moments, the simple, cozy, hobby only discussion forum. Share your
          hobbies, not your work.
        </p>
        <Button asChild className="home-hero-button">
          <Link to="/register">Create Account</Link>
        </Button>
      </div>
    </section>
  );
}
