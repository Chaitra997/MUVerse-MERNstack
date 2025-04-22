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
    <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-screen">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Sidebar on left */}
            <Sidebar />

            {/* Recent Chats Section */}
            <div className="w-64 border-r overflow-y-auto bg-white hidden sm:block">
              <div className="p-3 font-medium border-b">Recent Chats</div>
              {isUsersLoading ? (
                <p className="p-4 text-sm text-gray-500">Loading...</p>
              ) : users.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">No recent chats</p>
              ) : (
                users.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                      selectedUser?._id === user._id ? "bg-gray-200" : ""
                    }`}
                  >
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-sm">{user.fullName}</h4>
                      <p className="text-xs text-gray-500">
                        {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat Section */}
            <div className="flex-1 h-full">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
