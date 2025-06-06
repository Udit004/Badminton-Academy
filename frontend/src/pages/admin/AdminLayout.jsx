import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log('AdminLayout - Component rendering');

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-violet-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-72 sm:w-80 lg:w-72 xl:w-80
      `}>
        <div className="h-full bg-slate-800/40 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl shadow-black/20">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 relative z-10">
        {/* Header */}
        <div className="bg-slate-800/30 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-black/10">
          <Header onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* Main content */}
        <main className="flex-1 relative overflow-hidden">
          <div className="h-full overflow-auto">
            <div className="p-4 sm:p-6 lg:p-8 min-h-full">
              {/* Content container with better spacing and visibility */}
              <div className="max-w-full">
                <Outlet />
                {console.log('AdminLayout - Outlet rendered')}
              </div>
            </div>
          </div>
          
          {/* Scroll indicator for better UX */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300" 
               id="scroll-indicator" />
        </main>
      </div>



      <style>{`
        /* Custom scrollbar styling */
        .overflow-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-auto::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 4px;
        }
        .overflow-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgb(147, 51, 234) 0%, rgb(139, 92, 246) 100%);
          border-radius: 4px;
        }
        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgb(139, 92, 246) 0%, rgb(124, 58, 237) 100%);
        }

        /* Firefox scrollbar */
        .overflow-auto {
          scrollbar-width: thin;
          scrollbar-color: rgb(147, 51, 234) rgba(51, 65, 85, 0.3);
        }

        /* Smooth scrolling */
        .overflow-auto {
          scroll-behavior: smooth;
        }

        /* Text selection styling */
        ::selection {
          background-color: rgba(147, 51, 234, 0.3);
          color: white;
        }

        /* Focus visible improvements */
        *:focus-visible {
          outline: 2px solid rgb(147, 51, 234);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;