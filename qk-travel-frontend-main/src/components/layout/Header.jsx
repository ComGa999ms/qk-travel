import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ConfirmDialog from "../common/ConfirmDialog";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest(".user-menu")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    setShowLogoutConfirm(false);
    navigate("/");
  };

  const navItems = [
    { name: "Trang chủ", path: "/", icon: "fas fa-home" },
    { name: "AI Trip Planner", path: "/ai-planner", icon: "fas fa-robot" },
    { name: "Điểm đến", path: "/destinations", icon: "fas fa-map-marker-alt" },
    {
      name: "Dịch vụ",
      icon: "fas fa-concierge-bell",
      isDropdown: true,
      children: [
        { name: "Lưu trú", path: "/booking/hotels", icon: "fas fa-hotel" },
        { name: "Nhà hàng", path: "/booking/restaurants", icon: "fas fa-utensils" },
        { name: "Local Buddy", path: "/local-buddy", icon: "fas fa-user-friends" },
      ]
    },
    {
      name: "Quản lý",
      icon: "fas fa-briefcase",
      isDropdown: true,
      children: [
        { name: "B2B Dashboard", path: "/b2b", icon: "fas fa-chart-line" },
        { name: "Local Buddy", path: "/buddy/dashboard", icon: "fas fa-id-badge" },
      ]
    },
    { name: "Blog", path: "/blogs", icon: "fas fa-newspaper" },
    { name: "Liên hệ", path: "/contact", icon: "fas fa-envelope" },
    { name: "Giới thiệu", path: "/about", icon: "fas fa-info-circle" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"`}
    >
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/">
            <img
              src="/logo_name.png"
              alt="QkTravel Logo"
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              item.isDropdown ? (
                <div key={item.name} className="relative group">
                  <button
                    className={`flex items-center whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-500 hover:text-primary-600 hover:bg-primary-50`}
                  >
                    <i className={`${item.icon} text-sm w-4 flex-shrink-0 mr-2`}></i>
                    <span>{item.name}</span>
                    <i className="fas fa-chevron-down ml-1 text-xs"></i>
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`flex items-center px-4 py-2 text-sm transition-colors ${isActive(child.path) ? "text-primary-600 bg-primary-50 font-medium" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}
                      >
                        <i className={`${child.icon} w-5 mr-2 ${isActive(child.path) ? "text-primary-600" : "text-gray-400"}`}></i>
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)
                      ? "bg-primary-100 text-primary-700 shadow-sm"
                      : "text-gray-500 hover:text-primary-600 hover:bg-primary-50"
                    }`}
                >
                  <i
                    className={`${item.icon} text-sm w-4 flex-shrink-0 mr-2`}
                  ></i>
                  <span>{item.name}</span>
                </Link>
              )
            ))}
          </nav>

          {/* User Menu or CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              // User is logged in - show user menu
              <div className="relative user-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-primary-300"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.lastName?.[0] ||
                      user.email?.[0]?.toUpperCase() ||
                      "U"
                    )}
                  </div>
                  {/* User name */}
                  <span className="text-sm font-medium text-gray-700">
                    {user.lastName && user.firstName
                      ? `${user.lastName} ${user.firstName}`
                      : user.email?.split("@")[0]}
                  </span>
                  <i
                    className={`fas fa-chevron-down text-xs transition-transform ${isUserMenuOpen ? "rotate-180" : ""
                      }`}
                  ></i>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.lastName && user.firstName
                          ? `${user.lastName} ${user.firstName}`
                          : user.email}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    {user.roles &&
                      (user.roles.includes("Admin") ||
                        user.roles.includes("Moderator")) ? (
                      // Admin Menu
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <i className="fas fa-tachometer-alt w-5 mr-3 text-gray-400"></i>
                        Trang Quản lý
                      </Link>
                    ) : (
                      // User Menu
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <i className="fas fa-user w-5 mr-3 text-gray-400"></i>
                          Thông tin cá nhân
                        </Link>
                        <Link
                          to="/my-plans"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <i className="fas fa-map-marked-alt w-5 mr-3 text-gray-400"></i>
                          Kế hoạch của tôi
                        </Link>
                      </>
                    )}

                    {/* Logout */}
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <i className="fas fa-sign-out-alt w-5 mr-3"></i>
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn btn-primary group">
                  <i className="fas fa-user-plus mr-2 group-hover:scale-110 transition-transform"></i>
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            <i
              className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
            ></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-gray-200">
              {navItems.map((item) => (
                item.isDropdown ? (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center whitespace-nowrap px-4 py-3 rounded-lg text-base font-medium text-gray-800 bg-gray-50">
                      <i className={`${item.icon} text-lg w-6 flex-shrink-0 mr-3`}></i>
                      <span>{item.name}</span>
                    </div>
                    <div className="pl-8 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(child.path)
                              ? "bg-primary-100 text-primary-700"
                              : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                            }`}
                        >
                          <i className={`${child.icon} text-base w-5 flex-shrink-0 mr-3`}></i>
                          <span>{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center whitespace-nowrap px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActive(item.path)
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                      }`}
                  >
                    <i
                      className={`${item.icon} text-lg w-6 flex-shrink-0 mr-3`}
                    ></i>
                    <span>{item.name}</span>
                  </Link>
                )
              ))}

              <div className="pt-3 border-t border-gray-200">
                {user ? (
                  <div className="space-y-1">
                    {/* User Info */}
                    <div className="flex items-center px-4 py-3 mb-2 bg-gray-50 rounded-lg mx-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-base mr-3 shadow-md overflow-hidden">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          user.lastName?.[0] ||
                          user.email?.[0]?.toUpperCase() ||
                          "U"
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {user.lastName && user.firstName
                            ? `${user.lastName} ${user.firstName}`
                            : user.email}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* User Links */}
                    {user.roles &&
                      (user.roles.includes("Admin") ||
                        user.roles.includes("Moderator")) ? (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                      >
                        <i className="fas fa-tachometer-alt text-lg w-6 flex-shrink-0 mr-3"></i>
                        <span>Trang Quản lý</span>
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                        >
                          <i className="fas fa-user text-lg w-6 flex-shrink-0 mr-3"></i>
                          <span>Thông tin cá nhân</span>
                        </Link>
                        <Link
                          to="/my-plans"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                        >
                          <i className="fas fa-map-marked-alt text-lg w-6 flex-shrink-0 mr-3"></i>
                          <span>Kế hoạch của tôi</span>
                        </Link>
                      </>
                    )}

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        setShowLogoutConfirm(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                      <i className="fas fa-sign-out-alt text-lg w-6 flex-shrink-0 mr-3"></i>
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn btn-outline w-full justify-center text-sm"
                    >
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn btn-primary w-full justify-center text-sm"
                    >
                      <i className="fas fa-user-plus mr-2"></i>
                      Đăng ký
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirm Dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Xác nhận đăng xuất"
        message="Bạn có chắc muốn đăng xuất? Bạn sẽ cần đăng nhập lại để sử dụng các tính năng."
        confirmText="Đăng xuất"
        cancelText="Hủy"
        type="warning"
      />
    </header>
  );
};

export default Header;
