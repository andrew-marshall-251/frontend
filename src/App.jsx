import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminProfile from "./pages/admin-profile/index.jsx";
import Feed from "./pages/feed/index.jsx";
import PostDetails from "./pages/post-details/index.jsx";
import MyPostDetails from "./pages/my-post-details/index.jsx";
import MyProfile from "./pages/my-profile/index.jsx";
import EditPost from "./pages/edit-post/index.jsx";
import CreatePost from "./pages/create-post/index.jsx";
import UserProfile from "./pages/user-profile/index.jsx";
import ViewThread from "./pages/view-thread/index.jsx";
import Threads from "./pages/threads/index.jsx";
import EditProfile from "./pages/edit-profile/index.jsx";
import Register from "./pages/register/index.jsx";
import Login from "./pages/login/index.jsx";
import NewPassword from "./pages/new-password/index.jsx";
import ForgotPassword from "./pages/forgot-password/index.jsx";
import Home from "./pages/home/index.jsx";
import Links from "./pages/links/index.jsx";
import { SiteNav } from "./components/navigation/SiteNav.jsx";

export default function App() {
  const location = useLocation();
  const mockAuth = {
    isLoggedIn: true,
    user: {
      username: "AndMarsh",
      avatarVariant: "blue",
    },
  };
  const navState =
    location.pathname === "/feed"
      ? { isLoggedIn: false, user: null }
      : mockAuth;

  return (
    <main className="page-shell">
      <SiteNav isLoggedIn={navState.isLoggedIn} user={navState.user} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/post-details" element={<PostDetails />} />
        <Route path="/my-post-details" element={<MyPostDetails />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/edit-post" element={<EditPost />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/view-thread" element={<ViewThread />} />
        <Route path="/threads" element={<Threads />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </main>
  );
}
