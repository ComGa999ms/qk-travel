import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminHome = () => {
  const { user } = useAuth();

  // Quick actions
  const quickActions = [
    {
      id: "add-destination",
      label: "Thêm điểm đến",
      icon: "fa-plus-circle",
      color: "bg-primary-600 hover:bg-primary-700",
      link: "/admin/destinations",
      roles: ["Admin"],
    },
    {
      id: "add-giftcode",
      label: "Tạo Giftcode mới",
      icon: "fa-ticket-alt",
      color: "bg-green-600 hover:bg-green-700",
      link: "/admin/giftcodes",
      roles: ["Admin"],
    },
    {
      id: "create-blog",
      label: "Tạo Blog",
      icon: "fa-feather-alt",
      color: "bg-purple-600 hover:bg-purple-700",
      link: "/admin/blogs",
    },
  ];

  // Filter actions based on role
  const visibleActions = quickActions.filter((action) => {
    if (action.roles) {
      return action.roles.some(
        (role) => user.roles && user.roles.includes(role),
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Xin chào, {user?.firstName}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Chào mừng bạn đến với trang quản trị QkTravel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-bolt text-yellow-500"></i>
              Thao tác nhanh
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {visibleActions.map((action) => (
                <Link
                  key={action.id}
                  to={action.link}
                  className={`${action.color} text-white rounded-lg p-6 text-center transition-all shadow-md hover:shadow-lg flex flex-col items-center justify-center`}
                >
                  <i className={`fas ${action.icon} text-3xl mb-3`}></i>
                  <p className="font-semibold">{action.label}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* System Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-info-circle text-blue-500"></i>
              Thông tin hệ thống
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600 text-sm">Phiên bản</span>
                <span className="font-semibold text-gray-900">1.0.0</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600 text-sm">Vai trò</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                  Admin
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600 text-sm">Trạng thái</span>
                <span className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Hoạt động
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600 text-sm">Server</span>
                <span className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity (Placeholder) */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="fas fa-clock text-blue-500"></i>
            Hoạt động gần đây
          </h2>
          <div className="text-center py-12">
            <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">Chưa có hoạt động nào được ghi nhận</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
