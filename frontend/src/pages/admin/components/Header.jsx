// Header Component
import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 lg:p-6 bg-slate-800/30 backdrop-blur-xl border-b border-slate-700/50">
      {/* Left section with mobile menu and title */}
      <div className="flex items-center space-x-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Open navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Page title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
      </div>

      {/* Right section with user info and logout */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* User info */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-medium text-gray-200">
            Welcome back
          </span>
          <span className="text-xs text-gray-400 truncate max-w-[200px]">
            {user?.email}
          </span>
        </div>

        {/* User avatar */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25">
          <span className="text-white font-semibold text-sm sm:text-base">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800 shadow-lg shadow-red-500/25"
        >
          <span className="hidden sm:inline">Logout</span>
          <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;