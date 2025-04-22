import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useEventModalStore } from "../store/useEventModalStore";
import { Users, Bell, Search, X, Plus } from "lucide-react";
import AddEventModal from "./AddEventModal";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { users, getUsers, setSelectedUser } = useChatStore();
  const { isOpen: isEventModalOpen, openModal: openEventModal, closeModal: closeEventModal } = useEventModalStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

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
    navigate("/home");
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="MUVerse Logo"
              className="w-8 h-8 object-contain rounded-full"
            />
            <h1 className="text-lg font-bold text-red-600">MUVerse</h1>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/contacts" className="p-1.5 hover:bg-gray-100 rounded-full">
              <Users className="w-4 h-4 text-gray-600" />
            </Link>
            <Link to="/notifications" className="p-1.5 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={openEventModal}
              className="p-1.5 hover:bg-gray-100 rounded-full"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-red-500 text-sm"
            >
              Logout
            </button>
            <Link to="/profile">
              <div className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                {authUser?.fullName?.charAt(0) || "U"}
              </div>
            </Link>
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 flex items-start justify-center px-4 pt-20 pb-16">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-semibold">Search Recent Chats</h2>
              <button onClick={() => setIsSearchOpen(false)}>
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <input
              type="text"
              className="input input-bordered w-full text-sm"
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
                    className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-2 rounded"
                  >
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.fullName}
                      className="w-7 h-7 rounded-full object-cover"
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