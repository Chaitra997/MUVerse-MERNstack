import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useEventModalStore } from "../store/useEventModalStore";
import { MessageSquare, Users, Bell, Search, Plus } from "lucide-react";
import AddEventModal from "./AddEventModal";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const { users, getUsers, setSelectedUser } = useChatStore();
  const { isOpen: isEventModalOpen, openModal: openEventModal, closeModal: closeEventModal } = useEventModalStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    getUsers().catch((err) => {
      console.error("Error fetching users:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
    });
  }, [getUsers]);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user._id !== authUser._id &&
        (user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredUsers(results);
  }, [searchQuery, users, authUser._id]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t shadow-sm sm:hidden">
        <div className="flex justify-around py-2">
          <NavLink
            to="/home"
            className={`flex flex-col items-center text-sm ${
              currentPath === "/home" ? "text-red-500" : "text-gray-600"
            }`}
          >
            <MessageSquare className="w-5 h-5 mb-0.5" />
            <span>Messages</span>
          </NavLink>
          <NavLink
            to="/contacts"
            className={`flex flex-col items-center text-sm ${
              currentPath === "/contacts" ? "text-red-500" : "text-gray-600"
            }`}
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span>Contacts</span>
          </NavLink>
          <NavLink
            to="/notifications"
            className={`flex flex-col items-center text-sm ${
              currentPath === "/notifications" ? "text-red-500" : "text-gray-600"
            }`}
          >
            <Bell className="w-5 h-5 mb-0.5" />
            <span>Alerts</span>
          </NavLink>
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`flex flex-col items-center text-sm ${
              isSearchOpen ? "text-red-500" : "text-gray-600"
            }`}
          >
            <Search className="w-5 h-5 mb-0.5" />
            <span>Search</span>
          </button>
          <button
            onClick={openEventModal}
            className={`flex flex-col items-center text-sm ${
              isEventModalOpen ? "text-red-500" : "text-gray-600"
            }`}
          >
            <Plus className="w-5 h-5 mb-0.5" />
            <span>Event</span>
          </button>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/40 z-[10000] flex items-center justify-center px-4 pt-32 pb-20">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Search Recent Chats</h2>
              <button onClick={() => setIsSearchOpen(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredUsers.length > 0 ? (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => handleUserClick(user)}
                    className="cursor-pointer flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
                  >
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No results found.</p>
            )}
          </div>
        </div>
      )}

      {isEventModalOpen && (
        <AddEventModal onClose={closeEventModal} onEventCreated={() => {}} />
      )}
    </>
  );
};

export default Navbar;