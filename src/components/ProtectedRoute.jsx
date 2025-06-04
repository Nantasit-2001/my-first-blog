import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/Authcontext';
import { Outlet } from 'react-router-dom';


export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export const ProtectedRouteAdmin = () => {
  const { loggedIn, user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }
  if (!loggedIn || !user || user?.data?.role !== "admin") {
    return <Navigate to="/AdminLoginPage" replace />;
  }

  return <Outlet />;
};