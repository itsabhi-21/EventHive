import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0F0F0F]/90 backdrop-blur-md border-b border-[#2A2A2A]">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl">🔥</span>
        <span className="text-white font-bold text-xl">
          Event<span className="text-amber-400">Hive</span>
        </span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Explore</Link>
        <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Categories</Link>
        <Link to="/create-event" className="text-gray-400 hover:text-white text-sm transition-colors">Create Event</Link>
        <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">About</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
          Login
        </Link>
        <Link
          to="/register"
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm px-5 py-2 rounded-full transition-all duration-200"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;