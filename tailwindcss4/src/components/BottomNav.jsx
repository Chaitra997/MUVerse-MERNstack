// components/BottomNav.jsx
import { NavLink, useLocation } from "react-router-dom";
import { MessageSquare, Users, Bell, Calendar, FileText, Settings } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t shadow-sm sm:hidden">
      <div className="flex justify-around py-2">
        <NavLink to="/home" className={`flex flex-col items-center text-sm ${currentPath === "/home" ? "text-red-500" : "text-gray-600"}`}>
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span>Messages</span>
        </NavLink>
        <NavLink to="/contacts" className={`flex flex-col items-center text-sm ${currentPath === "/contacts" ? "text-red-500" : "text-gray-600"}`}>
          <Users className="w-5 h-5 mb-0.5" />
          <span>Contacts</span>
        </NavLink>
        <NavLink to="/notifications" className={`flex flex-col items-center text-sm ${currentPath === "/notifications" ? "text-red-500" : "text-gray-600"}`}>
          <Bell className="w-5 h-5 mb-0.5" />
          <span>Alerts</span>
        </NavLink>
        <NavLink to="/events" className={`flex flex-col items-center text-sm ${currentPath === "/events" ? "text-red-500" : "text-gray-600"}`}>
          <Calendar className="w-5 h-5 mb-0.5" />
          <span>Events</span>
        </NavLink>
        <NavLink to="/resources" className={`flex flex-col items-center text-sm ${currentPath === "/resources" ? "text-red-500" : "text-gray-600"}`}>
          <FileText className="w-5 h-5 mb-0.5" />
          <span>Resources</span>
        </NavLink>
        <NavLink to="/settings" className={`flex flex-col items-center text-sm ${currentPath === "/settings" ? "text-red-500" : "text-gray-600"}`}>
          <Settings className="w-5 h-5 mb-0.5" />
          <span>Settings</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
