import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function NavLinks({ items, onNavigate, className = "" }) {
  return (
    <div className={className}>
      {items.map((item) => (
        <Link key={item.to} to={item.to} onClick={onNavigate}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function SiteNav({ isLoggedIn, user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerReady, setDrawerReady] = useState(false);
  const location = useLocation();

  const baseItems = [
    { label: "Feed", to: "/feed" },
    { label: "Threads", to: "/threads" },
  ];
  const desktopItems = isLoggedIn
    ? [...baseItems, { label: "Write", to: "/create-post" }]
    : [...baseItems, { label: "Login", to: "/login" }];
  const drawerItems = isLoggedIn
    ? [
        { label: "Feed", to: "/feed" },
        { label: "Threads", to: "/threads" },
        { label: "Write", to: "/create-post" },
      ]
    : [
        { label: "Feed", to: "/feed" },
        { label: "Threads", to: "/threads" },
        { label: "Login", to: "/login" },
      ];

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      setDrawerMounted(true);
      setDrawerReady(false);

      const timeoutId = window.setTimeout(() => {
        setDrawerReady(true);
      }, 20);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    setDrawerReady(false);

    const timeoutId = window.setTimeout(() => {
      setDrawerMounted(false);
    }, 240);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-nav">
      <Link className="site-nav-brand" to="/home">
        Idle Moments
      </Link>

      <nav className="site-nav-desktop" aria-label="Primary">
        <NavLinks items={desktopItems} className="site-nav-links" />
        {isLoggedIn ? (
          <Link
            className="site-nav-avatar-link"
            to="/my-profile"
            aria-label={`Open ${user.username} profile`}
          >
            <span
              className={`site-nav-avatar site-nav-avatar-${user.avatarVariant}`}
              aria-hidden="true"
            />
          </Link>
        ) : null}
      </nav>

      <button
        type="button"
        className="site-nav-menu-button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="site-nav-drawer"
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      {drawerMounted ? (
        <div
          className={`site-nav-drawer-shell ${menuOpen ? "site-nav-drawer-shell-open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <div className="site-nav-drawer-backdrop" onClick={closeMenu} aria-hidden="true" />
          <nav
            className={`site-nav-drawer ${
              drawerReady ? "site-nav-drawer-open" : "site-nav-drawer-closing"
            }`}
            id="site-nav-drawer"
            aria-label="Mobile primary"
          >
            <div className="site-nav-drawer-top">
              {isLoggedIn ? (
                <Link
                  className="site-nav-drawer-avatar"
                  to="/my-profile"
                  onClick={closeMenu}
                  aria-label={`Open ${user.username} profile`}
                >
                  <span
                    className={`site-nav-avatar site-nav-avatar-${user.avatarVariant}`}
                    aria-hidden="true"
                  />
                </Link>
              ) : (
                <span />
              )}
              <button
                type="button"
                className="site-nav-drawer-close-button"
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <NavLinks items={drawerItems} onNavigate={closeMenu} className="site-nav-drawer-links" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
