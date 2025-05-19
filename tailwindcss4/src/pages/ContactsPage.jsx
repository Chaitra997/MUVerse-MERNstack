import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const ContactsPage = () => {
  const { authUser, onlineUsers } = useAuthStore();
  const { users, getUsers, setSelectedUser } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleOpenChat = (user) => {
    setSelectedUser(user);
    // Chat opens in /home automatically
  };

  const filteredUsers = users.filter(user => user._id !== authUser._id);

  return (
    <div className="min-h-screen w-screen pt-20 px-4 bg-white">
      <div className="w-full max-w-screen-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">University Contacts</h1>
        <p className="text-gray-600 mb-6">Connect with students and faculty members</p>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white p-3 rounded-md shadow-sm border hover:shadow-md cursor-pointer transition"
              onClick={() => handleOpenChat(user)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="overflow-hidden">
                  <h3 className="text-sm font-semibold truncate">{user.fullName}</h3>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  <p className="text-xs mt-0.5">
                    {onlineUsers.includes(user._id) ? (
                      <span className="text-green-500 font-medium">Online</span>
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
