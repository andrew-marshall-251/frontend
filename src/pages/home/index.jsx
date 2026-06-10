import { Link } from "react-router-dom";

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
        <Link className="ui-button home-hero-button" to="/register">
          Create Account
        </Link>
      </div>
    </section>
  );
}
