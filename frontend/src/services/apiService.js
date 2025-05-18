import { api } from './api'; // Import the configured Axios instance

const apiService = {
    // Get user profile
    // userId parameter is passed from Profile.jsx but not used in the URL as backend gets it from token
    getProfile: async () => { 
        try {
            const response = await api.get('/users/profile'); // Use the configured api instance
            return response.data;
        } catch (error) {
            // If error is 401, it likely means profile doesn't exist yet
            // We'll still throw the error but with context for the Profile component to handle
            if (error.response && error.response.status === 401) {
                error.response.data = { message: 'Profile not found. Please create your profile.' };
            }
            // Rethrow the error object itself if it has a response, or the message
            if (error.response) throw error; 
            throw new Error(error.message);
        }
    },

    // Save user profile (handles create or update via POST to UserController.createProfile)
    saveProfile: async (profileData) => {
        try {
            const response = await api.post('/users/profile', profileData); // Use the configured api instance
            return response.data;
        } catch (error) {
            if (error.response) throw error;
            throw new Error(error.message);
        }
    }
    // Note: The old updateProfile (PUT) and createProfile (POST to a different structure) are removed
    // in favor of a single saveProfile that maps to the backend's versatile createProfile controller.
};

export default apiService;