import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const ProfilePage = () => {
  const { authUser, setAuthUser } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const fileInputRef = useRef();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUpdatingProfile(true);
      const res = await axiosInstance.post("/users/upload-avatar", formData);
      const updatedUser = { ...authUser, profilePic: res.data.profilePic };
      setAuthUser(updatedUser);
      setSelectedImg(res.data.profilePic);
      toast.success("Profile photo updated");
    } catch (err) {
      console.error("Avatar upload error:", err);
      toast.error("Failed to upload profile photo");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return (
    <div className="min-h-screen w-full pt-20 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="w-full bg-base-300 rounded-xl p-6 sm:p-8 md:p-10 space-y-10 shadow-lg">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="mt-1 text-zinc-500 text-sm">Your profile information</p>
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content hover:scale-105
              p-2 rounded-full cursor-pointer transition-all duration-200
              ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </div>
            <p className="px-4 py-3 bg-base-200 rounded-lg border text-zinc-700">{authUser?.fullName}</p>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </div>
            <p className="px-4 py-3 bg-base-200 rounded-lg border text-zinc-700">{authUser?.email}</p>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-base-100 rounded-xl p-6 border border-zinc-200">
          <h2 className="text-lg font-semibold mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-300">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
