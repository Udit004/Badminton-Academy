import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import DashboardLayout from '../components/DashboardLayout';
import apiService from '../services/apiService';

const Profile = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [profileData, setProfileData] = useState({
        name: '',
        phone: '',
        address: '',
        age: '',
        experience: 'Beginner'
    });

    useEffect(() => {
        if (user?.uid) {
            fetchProfileData();
        }
    }, [user]);

    const fetchProfileData = async () => {
        try {
            setIsLoading(true);
            setError(''); // Clear previous errors
            const data = await apiService.getProfile(user.uid);
            setProfileData({
                name: data.name || '',
                phone: data.phone || '',
                address: data.address || '',
                age: data.age !== null && data.age !== undefined ? String(data.age) : '', // Ensure age is string for input
                experience: data.experience || 'Beginner',
            });
        } catch (err) {
            console.error('Error fetching profile:', err);
            // Handle both 404 (not found) and 401 (unauthorized) as cases where profile doesn't exist yet
            if (err.response && (err.response.status === 404 || err.response.status === 401)) {
                // If we have data in the response, use it, otherwise use default empty values
                const defaultData = err.response?.data || {};
                // Update form with any default values from the server
                setProfileData(prev => ({
                    ...prev,
                    name: defaultData.name || prev.name,
                    phone: defaultData.phone || prev.phone,
                    address: defaultData.address || prev.address,
                    age: defaultData.age !== null && defaultData.age !== undefined ? String(defaultData.age) : prev.age,
                    experience: defaultData.experience || prev.experience
                }));
                // Show a friendly message to create profile
                setError('Please complete your profile information to continue.');
            } else {
                setError('Failed to load profile data. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        const payload = {
            ...profileData,
            age: profileData.age === '' || profileData.age === null ? null : Number(profileData.age),
        };

        try {
            // Call saveProfile which handles both create and update
            const response = await apiService.saveProfile(payload);
            
            if (response && response.profile) {
                 setProfileData({ 
                    name: response.profile.name || '',
                    phone: response.profile.phone || '',
                    address: response.profile.address || '',
                    age: response.profile.age !== null && response.profile.age !== undefined ? String(response.profile.age) : '',
                    experience: response.profile.experience || 'Beginner',
                });
            }
            setError(response?.message || 'Profile saved successfully!');
        } catch (err) {
            console.error('Error saving profile:', err);
            if (err.response && err.response.data && err.response.data.message) {
                let errorMessage = err.response.data.message;
                if (err.response.data.errors) { 
                    const fieldErrors = Object.values(err.response.data.errors).map(e => e.message).join(', ');
                    errorMessage += `: ${fieldErrors}`;
                }
                setError(errorMessage);
            } else {
                setError('Failed to save profile. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
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
                    {error && (
                        <div className={`p-4 rounded-md mb-6 ${error.includes('success') ? 'bg-green-500/10 border border-green-500/20 text-green-500' : error.includes('Please complete your profile') ? 'bg-amber-500/10 border border-amber-500/20 text-amber-500' : 'bg-red-500/10 border border-red-500/20 text-red-500'}`}>
                            {error}
                        </div>
                    )}
                    
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
                                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center space-x-2"
                                disabled={isLoading}
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