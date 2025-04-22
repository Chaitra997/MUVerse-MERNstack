import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "lucide-react";

const ChatList = () => {
  const { users, getUsers, setSelectedUser } = useChatStore();
  const { authUser } = useAuthStore();
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

  // Filter users to exclude the current user (adjust for chatted users if needed)
  const chattedUsers = users.filter((user) => user._id !== authUser._id);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate(`/messages/${user._id}`); // Navigate to individual chat page
  };

  return (
    <div className="pt-16 pb-14 bg-gray-100 min-h-screen px-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Chats</h2>
      {chattedUsers.length === 0 ? (
        <p className="text-sm text-gray-500">No chats yet.</p>
      ) : (
        <div className="space-y-2">
          {chattedUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user)}
              className="cursor-pointer flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{user.fullName}</p>
                <p className="text-xs text-gray-500 truncate">
                  {user.lastMessage || "No messages yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;