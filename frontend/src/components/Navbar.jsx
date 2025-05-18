import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import apiService from '../services/apiService';
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiService.getProfile(user.uid);
        setName(response.data.name);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);


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
          >{!name?(<span>{user.email?.split('@')[0]}</span>
          ):(<span>{name}</span>
          )}
            
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
              <span className="bg-gradient-to-r from-amber-400 via-text-amber-500 to-amber-600 text-transparent bg-clip-text font-bold text-xl  hover:scale-105 transition-all duration-300 hidden sm:block ">
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
                className={`text-gray-300 hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300
    ${location.pathname === item.path ? 'text-amber-500' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Dashboard
              </Link>
            )}
            {renderAuthButtons()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-amber-500 p-2"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
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
        <div className="absolute top-20 left-4 right-4 md:hidden bg-black/80 backdrop-blur-sm border border-purple-500/20 rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-3">
            {/* Navigation Links */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-amber-500 bg-purple-500/10'
                      : 'text-gray-300 hover:text-amber-500 hover:bg-purple-500/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-amber-500 hover:text-amber-400 hover:bg-purple-500/10 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* Auth Section */}
            <div className="mt-4 pt-4 border-t border-purple-500/20">
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-sm text-gray-400">
                    Signed in as{' '}
                    {!name?(<span className="text-amber-500">
                      {user.email?.split('@')[0]}
                    </span>
                  ):(
                    <span className="text-amber-500">
                      {name}
                    </span>
                  )}
                    
                  </div>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-amber-500 hover:bg-purple-500/10 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:text-red-400 hover:bg-purple-500/10 transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 px-3">
                  <Link
                    to="/login"
                    className="text-center px-4 py-2 rounded-md text-sm font-medium text-amber-500 hover:text-amber-400 border border-amber-500/50 hover:bg-purple-500/10 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;