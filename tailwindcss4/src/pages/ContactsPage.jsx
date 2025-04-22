import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const ContactsPage = () => {
  const { authUser, onlineUsers } = useAuthStore();
  const { users, getUsers, setSelectedUser } = useChatStore(); // using ONLY already existing methods

  useEffect(() => {
    getUsers(); // fetch from /messages/users
  }, [getUsers]);

  const handleOpenChat = (user) => {
    setSelectedUser(user);
    // Navigation handled via existing HomePage
  };

  const filteredUsers = users.filter(user => user._id !== authUser._id);

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">All Contacts</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-50"
              onClick={() => handleOpenChat(user)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{user.fullName}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs mt-1">
                    {onlineUsers.includes(user._id) ? (
                      <span className="text-green-500">Online</span>
                    ) : (
                      <span className="text-gray-400">Offline</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
