import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminAuth from '../pages/admin/pages/AdminAuth';
import AdminDashboard from '../pages/admin/pages/Dashboard';
import AdminCoaches from '../pages/admin/pages/Coaches';
import AdminPrograms from '../pages/admin/pages/Programs';

const AdminProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminAuth />} />
      <Route element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="coaches" element={<AdminCoaches />} />
        <Route path="programs" element={<AdminPrograms />} />
      </Route>
    </Routes>
  );
};

export default AdminProtectedRoutes;