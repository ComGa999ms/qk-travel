import React, { useState, useEffect } from "react";
import adminUserService from "../../services/adminUserService";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import UserDetailModal from "../../components/admin/UserDetailModal";
import AlertDialog from "../../components/common/AlertDialog";
import { exportUsersToExcel } from "../../utils/exportUsersExcel";

const getSubscriptionPlanLabel = (user) => {
  if (user?.subscriptionPlanId === 3) return "Premium (Annual)";

  const rawPlan = (user?.subscriptionPlan || "Basic").trim();
  const normalizedPlan = rawPlan.toLowerCase();

  if (normalizedPlan.includes("premium") && normalizedPlan.includes("annual")) {
    return "Premium (Annual)";
  }

  if (normalizedPlan === "premium") return "Premium";
  if (normalizedPlan === "basic") return "Basic";

  return rawPlan;
};

const matchesSubscriptionFilter = (user, filterValue) => {
  if (filterValue === "All") return true;
  return getSubscriptionPlanLabel(user) === filterValue;
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [subscriptionPlanFilter, setSubscriptionPlanFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, subscriptionPlanFilter]);

  // Actions State
  const [processingId, setProcessingId] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [confirmLock, setConfirmLock] = useState({
    show: false,
    userId: null,
    isLocked: false,
  });
  const [changeRole, setChangeRole] = useState({
    show: false,
    userId: null,
    currentRole: "",
  });
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Alert State
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info", // info, success, warning, error
  });

  // Available Roles
  const [availableRoles, setAvailableRoles] = useState([]);

  // Fetch Users
  const fetchUsers = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const roleParam = roleFilter === "All" ? "" : roleFilter;

      if (subscriptionPlanFilter === "All") {
        const data = await adminUserService.getAllUsers(
          currentPage,
          pageSize,
          searchTerm,
          roleParam,
        );

        setUsers(data.items || []);
        setTotalPages(data.totalPages || 0);
        setTotalCount(data.totalCount || 0);
      } else {
        const fetchPageSize = 100;
        const firstPage = await adminUserService.getAllUsers(
          1,
          fetchPageSize,
          searchTerm,
          roleParam,
        );

        const totalPagesFromApi = firstPage?.totalPages || 0;
        const allUsers = [...(firstPage?.items || [])];

        if (totalPagesFromApi > 1) {
          const pageRequests = [];
          for (let page = 2; page <= totalPagesFromApi; page += 1) {
            pageRequests.push(
              adminUserService.getAllUsers(
                page,
                fetchPageSize,
                searchTerm,
                roleParam,
              ),
            );
          }

          const remainingPages = await Promise.all(pageRequests);
          remainingPages.forEach((pageData) => {
            allUsers.push(...(pageData?.items || []));
          });
        }

        const usersByPlan = allUsers.filter((user) =>
          matchesSubscriptionFilter(user, subscriptionPlanFilter),
        );

        const filteredTotalCount = usersByPlan.length;
        const filteredTotalPages = Math.ceil(filteredTotalCount / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const pagedUsers = usersByPlan.slice(startIndex, startIndex + pageSize);

        setUsers(pagedUsers);
        setTotalCount(filteredTotalCount);
        setTotalPages(filteredTotalPages);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchTerm, roleFilter, subscriptionPlanFilter]);

  // Fetch Roles on Mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await adminUserService.getUserRoles();
        setAvailableRoles(roles || ["Admin", "User", "Moderator"]);
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  // Handle Lock/Unlock
  const handleLockUnlock = async () => {
    if (!confirmLock.userId) return;

    try {
      setProcessingId(confirmLock.userId);
      if (confirmLock.isLocked) {
        await adminUserService.unlockUser(confirmLock.userId);
      } else {
        await adminUserService.lockUser(confirmLock.userId);
      }

      // Refresh list
      fetchUsers();
      setConfirmLock({ show: false, userId: null, isLocked: false });
    } catch (err) {
      console.error("Error changing user status:", err);
      setAlertState({
        isOpen: true,
        title: "Lỗi",
        message:
          err.message || "Có lỗi xảy ra khi thay đổi trạng thái người dùng",
        type: "error",
      });
    } finally {
      setProcessingId(null);
    }
  };

  // Handle Role Change
  const handleRoleChange = async (newRole) => {
    if (!changeRole.userId || !newRole) return;

    try {
      setProcessingId(changeRole.userId);
      await adminUserService.changeUserRole(changeRole.userId, newRole);

      // Refresh list
      fetchUsers();
      setChangeRole({ show: false, userId: null, currentRole: "" });
    } catch (err) {
      console.error("Error changing role:", err);
      setAlertState({
        isOpen: true,
        title: "Lỗi",
        message: err.message || "Có lỗi xảy ra khi thay đổi quyền người dùng",
        type: "error",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleExportUsers = async () => {
    try {
      setIsExporting(true);

      const exportUsers = await adminUserService.getAllUsersForExport();

      if (!exportUsers.length) {
        setAlertState({
          isOpen: true,
          title: "Thông báo",
          message: "Không có dữ liệu người dùng để xuất",
          type: "warning",
        });
        return;
      }

      exportUsersToExcel(exportUsers);
      setAlertState({
        isOpen: true,
        title: "Thành công",
        message: `Đã xuất ${exportUsers.length} người dùng ra file Excel`,
        type: "success",
      });
    } catch (err) {
      console.error("Error exporting users:", err);
      setAlertState({
        isOpen: true,
        title: "Lỗi",
        message: err.message || "Có lỗi xảy ra khi xuất file Excel",
        type: "error",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-full p-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý người dùng
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Quản lý tài khoản, phân quyền và trạng thái người dùng
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <p className="text-sm text-gray-600">
            Tổng số người dùng:{" "}
            <span className="font-bold text-gray-900">{totalCount}</span>
          </p>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 font-medium">
              Vai trò:
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">Tất cả</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <label className="text-sm text-gray-700 font-medium ml-2">
              Gói dịch vụ:
            </label>
            <select
              value={subscriptionPlanFilter}
              onChange={(e) => setSubscriptionPlanFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">Tất cả</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Premium (Annual)">Premium (Annual)</option>
            </select>

            <button
              onClick={handleExportUsers}
              disabled={isExporting}
              className="ml-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isExporting ? "Đang xuất..." : "Xuất Excel"}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <i className="fas fa-spinner fa-spin text-4xl text-primary-600 mb-3"></i>
              <p className="text-gray-600">Đang tải...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-3"></i>
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchUsers}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Thử lại
              </button>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-users-slash text-4xl text-gray-300 mb-3"></i>
              <p className="text-gray-600">Không tìm thấy người dùng nào</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Người dùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vai trò
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gói dịch vụ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => {
                    const subscriptionPlanLabel =
                      getSubscriptionPlanLabel(user);
                    const isPremiumPlan =
                      subscriptionPlanLabel === "Premium" ||
                      subscriptionPlanLabel === "Premium (Annual)";

                    return (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {user.avatarUrl ? (
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={user.avatarUrl}
                                  alt=""
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                  {user.lastName?.[0] ||
                                    user.firstName?.[0] ||
                                    "U"}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.lastName} {user.firstName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.roles.includes("Admin")
                                ? "bg-purple-100 text-purple-800"
                                : user.roles.includes("Moderator")
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.roles.join(", ")}
                          </span>
                        </td>

                        {/* Gói dịch vụ - chỉ hiển thị cho role User */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.roles.includes("User") &&
                          !user.roles.includes("Admin") &&
                          !user.roles.includes("Moderator") ? (
                            <span
                              className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                                isPremiumPlan
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {isPremiumPlan && (
                                <i className="fas fa-crown mr-1 text-[10px]"></i>
                              )}
                              {subscriptionPlanLabel}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.isLocked ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Đã khóa
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Hoạt động
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            {/* View Detail Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUserId(user.id);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors"
                              title="Xem chi tiết"
                            >
                              <i className="fas fa-eye"></i>
                            </button>

                            {/* Change Role Button */}
                            <button
                              onClick={() =>
                                setChangeRole({
                                  show: true,
                                  userId: user.id,
                                  currentRole: user.roles[0],
                                })
                              }
                              disabled={processingId === user.id}
                              className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-full transition-colors"
                              title="Đổi vai trò"
                            >
                              <i className="fas fa-user-tag"></i>
                            </button>

                            {/* Lock/Unlock Button */}
                            <button
                              onClick={() =>
                                setConfirmLock({
                                  show: true,
                                  userId: user.id,
                                  isLocked: user.isLocked,
                                })
                              }
                              disabled={processingId === user.id}
                              className={`${
                                user.isLocked
                                  ? "text-green-600 hover:text-green-900 hover:bg-green-50"
                                  : "text-red-600 hover:text-red-900 hover:bg-red-50"
                              } p-2 rounded-full transition-colors`}
                              title={
                                user.isLocked ? "Mở khóa" : "Khóa tài khoản"
                              }
                            >
                              <i
                                className={`fas ${user.isLocked ? "fa-unlock" : "fa-lock"}`}
                              ></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Trang <span className="font-medium">{currentPage}</span> /{" "}
                  <span className="font-medium">{totalPages}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Lock/Unlock Dialog */}
      <ConfirmDialog
        isOpen={confirmLock.show}
        onClose={() =>
          setConfirmLock({ show: false, userId: null, isLocked: false })
        }
        onConfirm={handleLockUnlock}
        title={confirmLock.isLocked ? "Mở khóa tài khoản" : "Khóa tài khoản"}
        message={`Bạn có chắc chắn muốn ${confirmLock.isLocked ? "mở khóa" : "khóa"} tài khoản này không?`}
        confirmText={confirmLock.isLocked ? "Mở khóa" : "Khóa"}
        cancelText="Hủy"
        type={confirmLock.isLocked ? "success" : "danger"}
      />

      {/* Change Role Modal */}
      {changeRole.show && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-32">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fas fa-user-tag text-indigo-600"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Thay đổi vai trò
                    </h3>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chọn vai trò mới
                      </label>
                      <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={changeRole.newRole || changeRole.currentRole}
                        onChange={(e) =>
                          setChangeRole({
                            ...changeRole,
                            newRole: e.target.value,
                          })
                        }
                      >
                        {availableRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() =>
                    handleRoleChange(
                      changeRole.newRole || changeRole.currentRole,
                    )
                  }
                >
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() =>
                    setChangeRole({
                      show: false,
                      userId: null,
                      currentRole: "",
                    })
                  }
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUserId && (
        <UserDetailModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertState.isOpen}
        onClose={() => setAlertState({ ...alertState, isOpen: false })}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
      />
    </div>
  );
};

export default AdminUsers;
