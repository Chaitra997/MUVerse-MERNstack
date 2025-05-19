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
  };

  const filteredUsers = users.filter(user => user._id !== authUser._id);

  return (
    <div className="pt-14 h-screen w-screen overflow-hidden bg-white flex flex-col">
      <div className="px-6 pt-6">
        <h1 className="text-3xl font-bold">University Contacts</h1>
        <p className="text-gray-500">Connect with students and faculty members</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                className="w-12 h-12 rounded-full object-cover"
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
  );
};

export default ContactsPage;
