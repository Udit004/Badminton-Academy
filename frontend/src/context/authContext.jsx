// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";
import { app, firestore } from "../config/firebase"; // ✅ updated import

const AuthContext = createContext();
const auth = getAuth(app);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // ✅ NEW
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
      const userDoc = await getDoc(doc(firestore, "users", result.user.uid));
      if (userDoc.exists()) {
        setRole(userDoc.data().role || "user");
      }
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const signUpWithEmail = async (email, password, name, customRole = "user") => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", result.user.uid), {
        name: name || "No Name",
        email,
        role: customRole,
        createdAt: serverTimestamp(),
      });
      setRole(customRole); // ✅ set after creation
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setRole(null); // ✅ reset on logout
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('AuthContext - onAuthStateChanged: user changed to', user ? user.uid : 'null');
      setUser(user);
      if (user) {
        try {
          const token = await user.getIdToken();
          localStorage.setItem("token", token);

          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (userDoc.exists()) {
            const userRole = userDoc.data().role || "user";
            setRole(userRole);
            console.log('AuthContext - Role set to:', userRole);
          } else {
            setRole(null);
            console.log('AuthContext - User doc not found, role set to null');
          }

        } catch (error) {
          console.error("Error getting ID token or role:", error);
        } finally {
          setLoading(false);
          console.log('AuthContext - Loading set to false (after user/role check)');
        }
      } else {
        localStorage.removeItem("token");
        setRole(null);
        console.log('AuthContext - User logged out, role set to null');
        setLoading(false);
        console.log('AuthContext - Loading set to false (user logged out)');
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    user,
    role, // ✅ exposed role
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
