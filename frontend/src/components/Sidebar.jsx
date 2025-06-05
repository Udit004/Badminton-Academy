import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useState, useEffect } from 'react';

export const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true);
                setIsMobile(false);
            } else {
                setIsOpen(false);
                setIsMobile(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile && isOpen && !event.target.closest('.sidebar-container')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, isOpen]);

    const sidebarLinks = [
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: '📊'
        },
        {
            title: 'My Bookings',
            path: '/BookingPage',
            icon: '📅'
        },
        {
            title: 'Membership',
            path: '/dashboard/membership',
            icon: '🎫'
        },
        {
            title: 'Schedule',
            path: '/dashboard/schedule',
            icon: '⏰'
        },
        {
            title: 'Tournaments',
            path: '/dashboard/tournaments',
            icon: '🏆'
        },
        {
            title: 'Payment History',
            path: '/dashboard/payments',
            icon: '💳'
        },
        {
            title: 'Profile Settings',
            path: '/dashboard/settings',
            icon: '⚙️'
        }
    ];
    return (
        <>
            {/* Hamburger Button - Only for mobile */}
            {isMobile && (
                <button
                    onClick={() => {
                        setIsOpen(prev => !prev); // Use function form of setState
                        console.log('Toggling sidebar:', !isOpen); // Debug log
                    }}
                    className="md:hidden fixed top-14 left-4 z-50 p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-purple-500/20 hover:bg-purple-500/20 transition-colors duration-300"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                >
                    <svg
                        className="w-6 h-6 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            )}

            {/* Overlay - Only for mobile */}
            {isOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <div 
                className={`sidebar-container h-screen z-40 transition-all duration-300 ease-in-out
                    ${isMobile ? 'fixed top-20 left-0' : 'sticky top-0 left-0 h-[calc(100vh-4rem)]'}
                    ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}
            >
                <div className="relative w-64 h-full bg-black/40 backdrop-blur-sm border-r border-purple-500/20 p-4 overflow-y-auto">
                    {/* Header Section */}
                    <div className="mb-8 sticky top-0 bg-black/40 backdrop-blur-sm pt-4 pb-2 border-b border-purple-500/20">
                        <h2 className="text-amber-500 text-xl font-bold">My Dashboard</h2>
                        <p className="text-amber-400 text-sm truncate">{user?.email}</p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-1">
                        {sidebarLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => isMobile && setIsOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                                    ${location.pathname === link.path
                                        ? 'bg-amber-500/20 text-amber-500 shadow-lg'
                                        : 'text-gray-300 hover:bg-purple-500/10 hover:text-amber-500 hover:translate-x-1'
                                    }`}
                            >
                                <span className="text-xl flex-shrink-0">{link.icon}</span>
                                <span className="font-medium">{link.title}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
