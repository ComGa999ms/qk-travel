import React, { useState, useEffect } from "react";
import adminUserService from "../../services/adminUserService";

const UserDetailModal = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await adminUserService.getUserById(userId);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user detail:", err);
        setError("Không thể tải thông tin chi tiết người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Chi tiết người dùng
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Content */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {loading ? (
              <div className="text-center py-8">
                <i className="fas fa-spinner fa-spin text-3xl text-primary-600 mb-3"></i>
                <p className="text-gray-600">Đang tải thông tin...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <i className="fas fa-exclamation-circle text-3xl text-red-500 mb-3"></i>
                <p className="text-red-600">{error}</p>
              </div>
            ) : user ? (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-20 w-20">
                    {user.avatarUrl ? (
                      <img
                        className="h-20 w-20 rounded-full object-cover border-2 border-primary-100"
                        src={user.avatarUrl}
                        alt=""
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold border-2 border-white shadow-sm">
                        {user.lastName?.[0] || user.firstName?.[0] || "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {user.lastName} {user.firstName}
                    </h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span
                        className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.roles && user.roles.includes("Admin")
                            ? "bg-purple-100 text-purple-800"
                            : user.roles && user.roles.includes("Moderator")
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.roles ? user.roles.join(", ") : "User"}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-xs text-gray-500">
                        Tham gia:{" "}
                        {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Thông tin cá nhân
                    </h4>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-600">
                          ID
                        </dt>
                        <dd className="text-sm text-gray-900 break-all font-mono text-xs">
                          {user.id}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">
                          Số điện thoại
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {user.phoneNumber || "Chưa cập nhật"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">
                          Giới tính
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {user.gender || "Chưa cập nhật"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">
                          Ngày sinh
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {user.dob
                            ? new Date(user.dob).toLocaleDateString("vi-VN")
                            : "Chưa cập nhật"}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Trạng thái & Gói
                    </h4>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-600">
                          Gói đăng ký
                        </dt>
                        <dd className="text-sm text-gray-900 font-semibold text-primary-700">
                          {user.subscriptionPlan || "Basic"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">
                          Xác thực Email
                        </dt>
                        <dd className="text-sm">
                          {user.emailConfirmed ? (
                            <span className="text-green-600 flex items-center">
                              <i className="fas fa-check-circle mr-1"></i> Đã
                              xác thực
                            </span>
                          ) : (
                            <span className="text-yellow-600 flex items-center">
                              <i className="fas fa-exclamation-circle mr-1"></i>{" "}
                              Chưa xác thực
                            </span>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">
                          Trạng thái tài khoản
                        </dt>
                        <dd className="text-sm">
                          {user.isLocked ? (
                            <div className="text-red-600">
                              <div className="flex items-center">
                                <i className="fas fa-lock mr-1"></i> Đang bị
                                khóa
                              </div>
                              {user.lockoutEnd && (
                                <span className="text-xs ml-5">
                                  Đến:{" "}
                                  {new Date(user.lockoutEnd).toLocaleString(
                                    "vi-VN",
                                  )}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-green-600 flex items-center">
                              <i className="fas fa-unlock mr-1"></i> Hoạt động
                              bình thường
                            </span>
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
