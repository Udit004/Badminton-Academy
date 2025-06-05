import { createContext, useContext, useEffect,useState } from "react";
import {getAuth,GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,onAuthStateChanged } from 'firebase/auth';
import {app} from '../config/firebase'


const AuthContext = createContext();
const auth = getAuth(app);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const signInWithEmail = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const signUpWithEmail = async (email,password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth,email,password);
            return result.user;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        }catch(error){
            setError(error.message);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                try {
                    const token = await user.getIdToken();
                    localStorage.setItem('token', token);
                } catch (error) {
                    console.error('Error getting ID token:', error);
                }
            } else {
                localStorage.removeItem('token');
            }
            setLoading(false);
        });
        return unsubscribe;
    },[]);

    const value = {
        user,loading,error,signInWithGoogle,signInWithEmail,signUpWithEmail,logout
    };


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );


};
