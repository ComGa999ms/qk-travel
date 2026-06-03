import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Protected route component cho admin pages
 * Chỉ cho phép user có role "Admin" truy cập
 */
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary-600 mb-4"></i>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const isAdmin =
    user.roles &&
    Array.isArray(user.roles) &&
    (user.roles.includes("Admin") || user.roles.includes("Moderator"));

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
          <p className="text-xl text-gray-600 mb-6">
            Bạn không có quyền truy cập trang này
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Về trang chủ
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
