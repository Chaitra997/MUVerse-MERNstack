import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center p-6 sm:p-12 bg-gray-50">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-md">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-red-700">MUVerse</h1>
          <p className="text-gray-500 mt-1">Join the Mahindra University community</p>
        </div>

        {/* Logo Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2">
            <img
              src="/logo.png"
              alt="MUVerse Logo"
              className="w-16 h-16 rounded-full object-contain"
            />
            {/* <h2 className="text-2xl font-bold text-red-600">MUVerse</h2> */}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-2"><b>Create Account</b></h3>
          <p className="text-gray-500 mt-1">Sign up with your university credentials</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Full Name</span>
            </label>
            <div className="relative">
              <User className="absolute inset-y-0 left-3 size-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                className="input input-bordered w-full pl-10 bg-gray-100 border-gray-300 text-gray-800 rounded-md"
                placeholder="Vijay Avinash"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">University Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute inset-y-0 left-3 size-5 text-gray-400" />
              <input
                type="email"
                name="email"
                className="input input-bordered w-full pl-10 bg-gray-100 border-gray-300 text-gray-800 rounded-md"
                placeholder="your_ID@mahindrauniversity.edu.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute inset-y-0 left-3 size-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input input-bordered w-full pl-10 bg-gray-100 border-gray-300 text-gray-800 rounded-md"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-gray-400" />
                ) : (
                  <Eye className="size-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-red-600 hover:bg-red-700 text-white rounded-md py-2"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin inline-block mr-2" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
