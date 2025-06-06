// Sidebar Component
import { NavLink } from 'react-router-dom';

const Sidebar = ({ onClose }) => {
  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      )
    },
    {
      to: '/admin/coaches',
      label: 'Coaches',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      to: '/admin/programs',
      label: 'Programs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-800/40 backdrop-blur-xl border-r border-slate-700/50">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Academy Logo */}
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Badminton Academy
              </h2>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
            aria-label="Close navigation menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
          >
            {({ isActive }) => (
              <div className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out group overflow-hidden ${
                isActive
                  ? 'text-white transform scale-[1.02]'
                  : 'text-gray-300 hover:text-white hover:transform hover:scale-[1.01]'
              }`}>
                {/* Active background with smooth animation */}
                <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600/30 to-violet-600/30 border border-purple-500/40 shadow-lg shadow-purple-500/20 opacity-100' 
                    : 'bg-slate-700/0 hover:bg-slate-700/50 opacity-0 hover:opacity-100'
                } rounded-xl`}></div>
                
                {/* Active indicator bar */}
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-400 to-violet-500 rounded-r-full transition-all duration-300 ease-in-out ${
                  isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}></div>
                
                {/* Icon with smooth color transition */}
                <span className={`relative z-10 transition-all duration-300 ease-in-out ${
                  isActive 
                    ? 'text-purple-400 transform scale-110' 
                    : 'text-gray-400 group-hover:text-purple-400 group-hover:transform group-hover:scale-105'
                }`}>
                  {item.icon}
                </span>
                
                {/* Label with smooth transition */}
                <span className={`relative z-10 font-medium transition-all duration-300 ease-in-out ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'text-gray-300 group-hover:text-white group-hover:font-medium'
                }`}>
                  {item.label}
                </span>

                {/* Subtle glow effect for active item */}
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl blur-sm transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <p className="text-xs text-gray-400">System Status</p>
            <p className="text-sm font-medium text-white">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;