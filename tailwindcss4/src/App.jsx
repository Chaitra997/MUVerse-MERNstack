import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import ContactsPage from "./pages/ContactsPage";
import EventsPage from "./pages/EventsPage";
import BottomNav from "./components/BottomNav";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      {/* Show navbar only when logged in */}
      {authUser && <Navbar />}

      <div className="w-full max-w-5xl px-4 mx-auto pt-20 pb-24">
        <Routes>
          <Route path="/" element={authUser ? <Navigate to="/home" /> : <LandingPage />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/home" />} />
          <Route path="/home" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
          <Route path="/contacts" element={authUser ? <ContactsPage /> : <Navigate to="/login" />} />
          <Route path="/events" element={authUser ? <EventsPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Toaster />

      {/* Show bottom nav only when logged in */}
      {authUser && <BottomNav />}
    </div>
  );
};

export default App;
