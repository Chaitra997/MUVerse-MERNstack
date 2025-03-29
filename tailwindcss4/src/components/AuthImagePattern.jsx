const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center relative overflow-hidden bg-red-500 text-white">
        {/* Large Circle Pattern */}
        <div className="absolute inset-0 flex justify-center items-center">
          <svg className="absolute opacity-20 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
            <defs>
              <pattern id="largeCircles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="40" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#largeCircles)" />
          </svg>
        </div>
  
        {/* Content */}
        <div className="relative text-center max-w-md z-10">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-4 text-lg">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;
  