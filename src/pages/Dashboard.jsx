import { useAuth } from '../context/authContext.jsx';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center pt-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-500">
            Welcome, {user?.email?.split('@')[0]}!
          </h1>
          <p className="mt-2 text-gray-300">
            Here's what you can do:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <Link
            to="/programs"
            className="p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-amber-500/50 transition-colors duration-300"
          >
            <h2 className="text-xl font-semibold text-amber-500">Training Programs</h2>
            <p className="mt-2 text-gray-300">
              View and enroll in our professional badminton training programs
            </p>
          </Link>

          <Link
            to="/schedule"
            className="p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-amber-500/50 transition-colors duration-300"
          >
            <h2 className="text-xl font-semibold text-amber-500">My Schedule</h2>
            <p className="mt-2 text-gray-300">
              Check your training schedule and upcoming sessions
            </p>
          </Link>
          
          <div className="p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20">
            <h2 className="text-xl font-semibold text-amber-500">Your Progress</h2>
            <p className="mt-2 text-gray-300">
              Track your training progress and achievements
            </p>
            <p className="mt-2 text-amber-500/50 italic">Coming soon</p>
          </div>

          <div className="p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20">
            <h2 className="text-xl font-semibold text-amber-500">Book a Session</h2>
            <p className="mt-2 text-gray-300">
              Book private coaching sessions with our professional coaches
            </p>
            <p className="mt-2 text-amber-500/50 italic">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
