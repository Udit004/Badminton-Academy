import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Programs from "./pages/programs";
import Schedule from "./pages/schedule";
import Coaches from "./pages/coaches";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminProtectedRoutes from "./components/AdminProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import TermsAndConditions from "./pages/TermsAndConditions";
import CancellationAndRefund from "./pages/CancellationAndRefund";
import ShippingAndDelivery from "./pages/ShippingAndDelivery";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import BookingPage from "./pages/BookingPage.jsx";
import ConditionalNavbar from "./components/ConditionalNavbar.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Helmet>
        <meta
          name="google-site-verification"
          content="SGSmDTkUcfGUOsfWJWVBksxsbCZptyQ15tqK1e-SF3M"
        />
      </Helmet>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
          <ConditionalNavbar />
          <main className="flex-grow container mx-auto px-4 py-8 text-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/coaches"
                element={
                  <ProtectedRoute>
                    <Coaches />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route
                path="/cancellation-and-refund"
                element={<CancellationAndRefund />}
              />
              <Route
                path="/shipping-and-delivery"
                element={<ShippingAndDelivery />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/programs"
                element={
                  <ProtectedRoute>
                    <Programs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/schedule"
                element={
                  <ProtectedRoute>
                    <Schedule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/BookingPage"
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin/*" element={<AdminProtectedRoutes />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
