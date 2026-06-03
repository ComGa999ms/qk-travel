import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Menu items cho sidebar
  const menuItems = [
    {
      id: "dashboard",
      label: "Tổng quan",
      icon: "fa-chart-line",
      path: "/admin",
      roles: ["Admin"],
    },
    {
      id: "users",
      label: "Người dùng",
      icon: "fa-users",
      path: "/admin/users",
      roles: ["Admin"], // Only Admin can see this
    },
    {
      id: "blogs",
      label: "Quản lý Blog",
      icon: "fa-blog",
      path: "/admin/blogs",
    },
    {
      id: "destinations",
      label: "Quản lý điểm đến",
      icon: "fa-map-marked-alt",
      path: "/admin/destinations",
      roles: ["Admin"],
    },
    {
      id: "giftcodes",
      label: "Quản lý Giftcode",
      icon: "fa-ticket-alt",
      path: "/admin/giftcodes",
      roles: ["Admin"],
    },
    {
      id: "feedback",
      label: "Phản hồi",
      icon: "fa-comments",
      path: "/admin/feedback",
      roles: ["Admin"],
    },
    {
      id: "spin-wheel",
      label: "Vòng quay may mắn",
      icon: "fa-dharmachakra",
      path: "/admin/spin-wheel",
      roles: ["Admin"],
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter((item) => {
    if (item.roles) {
      return item.roles.some((role) => user.roles.includes(role));
    }
    return true; // No roles defined means accessible to all (Admin & Moderator)
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-20" : "w-64"
        } bg-gradient-to-b from-primary-800 to-primary-900 text-white transition-all duration-300 flex flex-col shadow-xl`}
      >
        {/* Logo & Brand */}
        <div className="p-4 border-b border-primary-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <i className="fas fa-user-shield text-primary-600 text-xl"></i>
                </div>
                <div>
                  <h1 className="font-bold text-lg text-white">
                    {user.roles && user.roles.includes("Admin")
                      ? "Admin Panel"
                      : "Moderator Panel"}
                  </h1>
                  <p className="text-xs text-white opacity-80">QkTravel</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-primary-700 rounded-lg transition-colors"
            >
              <i
                className={`fas fa-${sidebarCollapsed ? "angle-right" : "angle-left"}`}
              ></i>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? "bg-white text-primary-600 shadow-lg"
                  : "hover:bg-primary-700 text-white"
              }`}
              title={sidebarCollapsed ? item.label : ""}
            >
              <i className={`fas ${item.icon} text-lg w-5`}></i>
              {!sidebarCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-primary-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors text-left"
            title={sidebarCollapsed ? "Đăng xuất" : ""}
          >
            <i className="fas fa-sign-out-alt text-lg w-5"></i>
            {!sidebarCollapsed && (
              <span className="font-medium">Đăng xuất</span>
            )}
          </button>

          {/* Back to Home */}
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors text-left mt-2"
            title={sidebarCollapsed ? "Về trang chủ" : ""}
          >
            <i className="fas fa-home text-lg w-5"></i>
            {!sidebarCollapsed && (
              <span className="font-medium">Về trang chủ</span>
            )}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Admin Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/logo_name.png" alt="QkTravel Logo" className="h-8" />
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-md">
                <span className="font-bold text-white">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
