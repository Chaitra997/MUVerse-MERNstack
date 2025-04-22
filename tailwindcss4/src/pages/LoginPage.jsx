import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, isLoggingIn } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) login(formData);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center p-6 sm:p-12 bg-gray-50">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-md">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">MUVerse</h1>
          <p className="text-gray-500 mt-1">
            Connect with the Mahindra University community
          </p>
        </div>

        {/* Logo Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2">
           <img
             src="/logo.png"
             alt="MUVerse Logo"
             className="w-10 h-10 rounded-full object-contain"
           />
           <h2 className="text-2xl font-bold text-red-600">MUVerse</h2>
         </div>
         <h3 className="text-xl font-semibold text-gray-800 mt-2">
           Welcome Back
         </h3>
         <p className="text-gray-500 mt-1">
           Login with your Mahindra University credentials
         </p>
       </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute inset-y-0 left-3 size-5 text-gray-400" />
              <input
                type="email"
                name="email"
                className="input input-bordered w-full pl-10 bg-gray-100 border-gray-300 text-gray-800 rounded-md"
                placeholder="your.name@mahindrauniversity.edu.in"
                value={formData.email}
                onChange={handleChange}
                required
                aria-label="Email address"
              />
            </div>
          </div>

          {/* Password Field */}
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
                onChange={handleChange}
                required
                aria-label="Password"
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
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-red-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="btn w-full bg-red-600 hover:bg-red-700 text-white rounded-md py-2"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin inline-block mr-2" />{" "}
                Loading...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;