import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-8 bg-[#0F0F0F]/90 backdrop-blur-md border-b border-[#2A2A2A]">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-white font-bold text-2xl">
          Event<span className="text-amber-400">Hive</span>
        </span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/explore" className="text-gray-400 hover:text-white text-sm transition-colors">Explore</Link>
        {isAuthenticated && (
          <Link to="/profile" className="text-gray-400 hover:text-white text-sm transition-colors">Profile</Link>
        )}
        {user && (
          <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</Link>
        )}
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors">
              Hi, {user?.name.split(' ')[0]}
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm px-5 py-2 rounded-full transition-all duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
