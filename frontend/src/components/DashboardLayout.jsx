import { Sidebar } from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-purple-900/50">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <main className="p-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-amber-500">
                                Welcome Back!
                            </h1>
                            <p className="text-gray-300 mt-2">
                                Manage your training and bookings
                            </p>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;