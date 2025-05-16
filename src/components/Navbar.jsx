import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/Dashboard' },
    { name: 'Programs', path: '/programs' },
    { name: 'Coaches', path: '/coaches' },
    { name: 'Schedule', path: '/schedule' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Replace the existing user auth buttons section with this new dropdown
  const renderAuthButtons = () => {
    if (user) {
      return (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 text-gray-300 hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          >
            <span>{user.email?.split('@')[0]}</span>
            <svg
              className={`h-5 w-5 transform transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-black/80 backdrop-blur-sm border border-purple-500/20 ring-1 ring-black ring-opacity-5">
              {/* <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-300 hover:text-amber-500 hover:bg-purple-500/10 transition-colors duration-300"
                onClick={() => setIsDropdownOpen(false)}
              >
                Dashboard
              </Link> */}
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-300 hover:text-amber-500 hover:bg-purple-500/10 transition-colors duration-300"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-sm text-gray-300 hover:text-amber-500 hover:bg-purple-500/10 transition-colors duration-300"
                onClick={() => setIsDropdownOpen(false)}
              >
                Contact
              </Link>
              <div className="border-t border-purple-500/20 my-1"></div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:text-red-400 hover:bg-purple-500/10 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="text-amber-500 hover:text-amber-400 border border-amber-500/50 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
        >
          Sign in
        </Link>
        <Link
          to="/signup"
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
        >
          Sign up
        </Link>
      </div>
    );
  };

  return (
    <nav className="bg-black/40 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/logo.jpg"
                alt="Badminton Academy"
                className="h-10 w-auto"
              />
              <span className="text-amber-500 font-bold text-xl hidden sm:block">
                Badminton Academy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            {renderAuthButtons()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-amber-500 p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/60 backdrop-blur-sm border-t border-purple-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-amber-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/dashboard"
                className="text-amber-500 hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
          {/* Mobile Auth Buttons */}
          <div className="px-2 pt-2 pb-3 border-t border-purple-500/20">
            {user ? (
              <div className="space-y-2">
                <span className="text-gray-300 block px-3 py-2">
                  Welcome, {user.email?.split('@')[0]}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left text-red-500 hover:text-red-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="text-amber-500 hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="text-amber-500 hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;