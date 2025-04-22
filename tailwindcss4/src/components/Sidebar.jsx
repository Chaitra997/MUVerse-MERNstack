import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MessageSquare,
  Users,
  Bell,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const getActiveClass = (path) =>
    location.pathname === path ? "bg-red-500" : "hover:bg-gray-100";

  return (
    <aside className="h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Main Menu Section */}
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase">Main Menu</h3>
        <div className="mt-2 space-y-1">
          <Link
            to="/messages"
            className={`flex items-center gap-2 p-2 rounded-md ${getActiveClass("/messages")}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-black">Messages</span>
          </Link>

          <Link
            to="/contacts"
            className={`flex items-center gap-2 p-2 rounded-md ${getActiveClass("/contacts")}`}
          >
            <Users className="w-5 h-5" />
            <span className="text-black">Contacts</span>
          </Link>

          <Link
            to="/notifications"
            className={`flex items-center gap-2 p-2 rounded-md ${getActiveClass("/notifications")}`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-black">Notifications</span>
          </Link>
        </div>
      </div>

      {/* University Section */}
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase">University</h3>
        <div className="mt-2 space-y-1">
        <Link
         to="/events"
         className={`flex items-center gap-2 p-2 rounded-md ${getActiveClass("/events")}`}
         >
         <Calendar className="w-5 h-5" />
         <span className="text-black">Events</span>
       </Link>

          <Link
            to="/resources"
            className={`flex items-center gap-2 p-2 rounded-md ${getActiveClass("/resources")}`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-black">Resources</span>
          </Link>
        </div>
      </div>

      {/* Settings Section */}
      <div className="p-4 mt-auto">
        <h3 className="text-xs font-semibold text-gray-500 uppercase">Settings</h3>
        <div className="mt-2">
          <Link
            to="/settings"
            className={`flex items-center gap-2 p-2 rounded-md ${getActiveClass("/settings")}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-black">Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
