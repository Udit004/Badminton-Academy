import { useState} from 'react';
import { useAuth } from '../context/authContext';
import DashboardLayout from '../components/DashboardLayout';

const Profile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState({
        name: '',
        phone: '',
        address: '',
        age: '',
        experience: 'Beginner'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement profile update logic
        console.log('Profile updated:', profileData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-amber-500 mb-6">Profile Settings</h2>
                    
                    {/* Profile Avatar Section */}
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <span className="text-3xl text-amber-500">
                                {user?.email?.[0]?.toUpperCase() || '?'}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-amber-500 font-medium">{user?.email}</h3>
                            <p className="text-gray-400 text-sm">Member since {new Date().getFullYear()}</p>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-purple-500/20 rounded-lg px-4 py-2.5 text-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors duration-300"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-purple-500/20 rounded-lg px-4 py-2.5 text-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors duration-300"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full bg-black/20 border border-purple-500/20 rounded-lg px-4 py-2.5 text-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors duration-300"
                                    placeholder="Enter your address"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={profileData.age}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-purple-500/20 rounded-lg px-4 py-2.5 text-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors duration-300"
                                    placeholder="Enter your age"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Experience Level
                                </label>
                                <select
                                    name="experience"
                                    value={profileData.experience}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-purple-500/20 rounded-lg px-4 py-2.5 text-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors duration-300"
                                >
                                    <option value="Beginner" className='text-gray-900'>Beginner</option>
                                    <option value="Intermediate" className='text-gray-900'>Intermediate</option>
                                    <option value="Advanced" className='text-gray-900'>Advanced</option>
                                    <option value="Professional" className='text-gray-900'>Professional</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors duration-300"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default Profile;