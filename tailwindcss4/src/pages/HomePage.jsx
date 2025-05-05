import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const {
    selectedUser,
    users,
    getUsers,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers(); // fetch users you've chatted with
  }, [getUsers]);

  return (
    <div className="flex pt-14 h-screen w-screen overflow-hidden"> {/* Full width + height */}
      {/* Sidebar on left */}
      <Sidebar />

      {/* Recent Chats */}
      <div className="w-72 border-r overflow-hidden bg-white hidden sm:block"> {/* Increased width */}
        <div className="p-4 text-lg font-semibold border-b">Recent Chats</div>
        {isUsersLoading ? (
          <p className="p-4 text-sm text-gray-500">Loading...</p>
        ) : users.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No recent chats</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-100 ${
                selectedUser?._id === user._id ? "bg-gray-200" : ""
              }`}
            >
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-base">{user.fullName}</h4>
                <p className="text-sm text-gray-500">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Section */}
      <div className="flex-1 h-full bg-white">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};

export default HomePage;
