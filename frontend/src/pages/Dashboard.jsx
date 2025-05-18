import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import DashboardLayout from '../components/DashboardLayout.jsx';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-black/20 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-gray-400 text-sm">Next Session</h3>
            <p className="text-2xl text-amber-500 font-bold mt-1">Today, 6:00 PM</p>
          </div>
          <div className="bg-black/20 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-gray-400 text-sm">Membership Status</h3>
            <p className="text-2xl text-amber-500 font-bold mt-1">Active</p>
          </div>
          <div className="bg-black/20 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-gray-400 text-sm">Court Bookings</h3>
            <p className="text-2xl text-amber-500 font-bold mt-1">2 Upcoming</p>
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/dashboard/programs"
            className="group p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-amber-500 group-hover:text-amber-400">
              Training Programs
            </h2>
            <p className="mt-2 text-gray-300">
              View and enroll in our professional badminton training programs
            </p>
          </Link>

          <Link
            to="/dashboard/schedule"
            className="group p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-amber-500 group-hover:text-amber-400">
              My Schedule
            </h2>
            <p className="mt-2 text-gray-300">
              Check your training schedule and upcoming sessions
            </p>
          </Link>

          <Link
            to="/dashboard/bookings"
            className="group p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-amber-500 group-hover:text-amber-400">
              Book a Session
            </h2>
            <p className="mt-2 text-gray-300">
              Book private coaching sessions with our professional coaches
            </p>
          </Link>

          <Link
            to="/dashboard/progress"
            className="group p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-amber-500 group-hover:text-amber-400">
              Your Progress
            </h2>
            <p className="mt-2 text-gray-300">
              Track your training progress and achievements
            </p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
