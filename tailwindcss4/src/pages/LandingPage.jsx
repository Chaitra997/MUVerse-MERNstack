import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center relative">
      {/* Logo & Title */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img
            src="/logo.png"
            alt="MUVerse Logo"
            className="w-10 h-10 rounded-full object-contain"
          />
          <h1 className="text-xl font-bold text-red-600">MUVerse</h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to MUVerse</h2>
        <p className="text-gray-600 max-w-md">
          The exclusive social platform for Mahindra University students. Connect,
          collaborate, and stay updated with your university community.
        </p>
      </div>

      {/* Login/Register Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          to="/login"
          className="w-full bg-red-600 hover:bg-red-700 !text-black font-medium py-2 rounded-md transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="w-full bg-white border border-gray-300 hover:bg-gray-100 !text-black font-medium py-2 rounded-md transition"
        >
          Register
        </Link>
      </div>

      {/* Footer Text */}
      <p className="text-sm mt-8 text-black">
        from <span className="font-extrabold text-black tracking-wide">SPACS</span>
      </p>
    </div>
  );
};

export default LandingPage;
