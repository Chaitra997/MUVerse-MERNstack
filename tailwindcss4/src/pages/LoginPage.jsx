import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
              <h1 className="text-2xl font-bold text-red-600 mt-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-red-600">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-3 size-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full pl-10 bg-white border-gray-300 text-gray-800"
                  placeholder="you@example.com"
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
                <span className="label-text font-medium text-red-600">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-3 size-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pl-10 bg-white border-gray-300 text-gray-800"
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
                  {showPassword ? <EyeOff className="size-5 text-gray-400" /> : <Eye className="size-5 text-gray-400" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit" 
              className="btn btn-primary w-full bg-red-500 hover:bg-red-600 text-white" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don&apos;t have an account? <Link to="/signup" className="text-red-500 hover:underline">Create account</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image Pattern */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export default LoginPage;