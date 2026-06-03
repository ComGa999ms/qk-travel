import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import profileService from "../services/profileService";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import useDialog from "../hooks/useDialog"; // Assuming you have this hook
import AlertDialog from "../components/common/AlertDialog";

const UserProfile = () => {
  const navigate = useNavigate();
  // Get user and updateUser from AuthContext directly
  const { user, updateUser } = useAuth();
  // const [user, setUser] = useState(null); // Remove local user state as we use context user
  const [loading, setLoading] = useState(false); // Change default loading to false since context handles initial load
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("info"); // info, bookings, settings

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    dob: "",
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Dialog State
  const { alertDialog, showAlert, hideDialog } = useDialog();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call API /api/Profile via profileService
      const response = await profileService.getProfile();

      if (response && response.success) {
        const userData = response.data;
        updateUser(userData); // Use updateUser instead of setUser

        // Initialize form data
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          phoneNumber: userData.phoneNumber || "",
          gender: userData.gender || "Other", // Default invalid/empty to 'Other' if needed, or leave empty
          dob: userData.dob ? userData.dob.split("T")[0] : "",
        });
        setAvatarPreview(userData.avatarUrl);

        // Update cache if needed (careful with structure diffs if other parts use authService structure)
        // sessionStorage.setItem("user", JSON.stringify(userData)); // updateUser handles storage now
      } else {
        throw new Error(response.message || "Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError(error.message || "Không thể tải thông tin người dùng");

      // Fallback to cache if request fails
      const cachedUser = sessionStorage.getItem("user");
      if (cachedUser) {
        try {
          const parsed = JSON.parse(cachedUser);
          updateUser(parsed); // Use updateUser
          setFormData({
            firstName: parsed.firstName || "",
            lastName: parsed.lastName || "",
            phoneNumber: parsed.phoneNumber || "",
            gender: parsed.gender || "",
            dob: parsed.dob ? parsed.dob.split("T")[0] : "",
          });
          setAvatarPreview(parsed.avatarUrl);
        } catch (e) {
          console.error("Cache parse error", e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [viewAvatar, setViewAvatar] = useState(false);

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    } else if (avatarPreview) {
      setViewAvatar(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        showAlert({
          title: "Lỗi",
          message: "Kích thước ảnh không được vượt quá 5MB",
          type: "error",
        });
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const submitData = new FormData();
      submitData.append("FirstName", formData.firstName);
      submitData.append("LastName", formData.lastName);
      submitData.append("PhoneNumber", formData.phoneNumber);
      if (formData.gender) submitData.append("Gender", formData.gender);
      if (formData.dob) {
        const isoDob = new Date(formData.dob).toISOString();
        submitData.append("Dob", isoDob);
      }
      if (avatarFile) {
        submitData.append("Avatar", avatarFile);
      }

      const response = await profileService.updateProfile(submitData);

      if (response && response.success) {
        showAlert({
          title: "Thành công",
          message: "Cập nhật thông tin thành công!",
          type: "success",
        });
        setIsEditing(false);
        const updatedUser = response.data;
        updateUser(updatedUser);
        setAvatarFile(null);
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      showAlert({
        title: "Lỗi",
        message: error.message || "Có lỗi xảy ra khi cập nhật",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    // Validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      showAlert({
        title: "Lỗi",
        message: "Vui lòng nhập đầy đủ thông tin",
        type: "error",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showAlert({
        title: "Lỗi",
        message: "Mật khẩu xác nhận không khớp",
        type: "error",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showAlert({
        title: "Lỗi",
        message: "Mật khẩu mới phải có ít nhất 6 ký tự",
        type: "error",
      });
      return;
    }

    try {
      setIsChangingPassword(true);
      const response = await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (response && response.success) {
        showAlert({
          title: "Thành công",
          message: "Đổi mật khẩu thành công!",
          type: "success",
        });
        // Reset form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        throw new Error(response.message || "Đổi mật khẩu thất bại");
      }
    } catch (error) {
      console.error("Change password error:", error);
      // Handle backend specific error messages if any
      const errorMsg =
        error.response?.data?.message || error.message || "Có lỗi xảy ra";
      showAlert({
        title: "Lỗi",
        message: errorMsg,
        type: "error",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-4xl text-primary-600"></i>
      </div>
    );
  }

  if (!user && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Không tìm thấy thông tin người dùng hoặc chưa đăng nhập.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div
                className={`w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-4xl flex-shrink-0 ${isEditing ? "cursor-pointer hover:opacity-90" : avatarPreview ? "cursor-pointer hover:opacity-90" : ""}`}
                onClick={handleAvatarClick}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {user.firstName?.[0] ||
                      user.email?.[0]?.toUpperCase() ||
                      "U"}
                  </span>
                )}
              </div>
              {isEditing && (
                <div
                  className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md cursor-pointer text-gray-600 hover:text-primary-600 transition-colors"
                  onClick={handleAvatarClick}
                >
                  <i className="fas fa-camera"></i>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user.lastName} {user.firstName}
              </h1>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {user.email}
                </span>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${user.subscriptionPlan === "Premium" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-800"}`}
                >
                  {user.subscriptionPlan === "Premium" && (
                    <i className="fas fa-crown mr-1"></i>
                  )}
                  {user.subscriptionPlan || "Basic"}
                </span>
              </div>
            </div>

            {/* Edit Actions */}
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setAvatarFile(null);
                      setAvatarPreview(user.avatarUrl); // Reset preview
                      setFormData({
                        // Reset form
                        firstName: user.firstName || "",
                        lastName: user.lastName || "",
                        phoneNumber: user.phoneNumber || "",
                        gender: user.gender || "",
                        dob: user.dob ? user.dob.split("T")[0] : "",
                      });
                    }}
                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="px-6 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <i className="fas fa-save"></i>
                    )}
                    Lưu
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-lg border border-primary-600 text-primary-600 font-medium hover:bg-primary-50 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-pen"></i> Chỉnh sửa
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("info")}
                className={`flex-1 min-w-[150px] px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "info"
                    ? "border-b-2 border-primary-600 text-primary-600 bg-primary-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <i className="fas fa-user mr-2"></i>
                Thông tin cá nhân
              </button>
              
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex-1 min-w-[150px] px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "settings"
                    ? "border-b-2 border-primary-600 text-primary-600 bg-primary-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <i className="fas fa-cog mr-2"></i>
                Cài đặt
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "info" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Thông tin cá nhân
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={
                        isEditing ? formData.lastName : user.lastName || ""
                      }
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg transition-colors ${isEditing ? "border-primary-300 bg-white focus:ring-2 focus:ring-primary-500" : "border-gray-200 bg-gray-50 text-gray-600"}`}
                      placeholder="Nhập họ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={
                        isEditing ? formData.firstName : user.firstName || ""
                      }
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg transition-colors ${isEditing ? "border-primary-300 bg-white focus:ring-2 focus:ring-primary-500" : "border-gray-200 bg-gray-50 text-gray-600"}`}
                      placeholder="Nhập tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email || ""}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                      title="Không thể thay đổi email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={
                        isEditing
                          ? formData.phoneNumber
                          : user.phoneNumber || ""
                      }
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg transition-colors ${isEditing ? "border-primary-300 bg-white focus:ring-2 focus:ring-primary-500" : "border-gray-200 bg-gray-50 text-gray-600"}`}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giới tính
                    </label>
                    <select
                      name="gender"
                      value={isEditing ? formData.gender : user.gender || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg transition-colors ${isEditing ? "border-primary-300 bg-white focus:ring-2 focus:ring-primary-500" : "border-gray-200 bg-gray-50 text-gray-600"}`}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày sinh
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        max={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border border-primary-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 transition-colors"
                      />
                    ) : (
                      <input
                        type="text"
                        value={
                          user.dob
                            ? new Date(user.dob).toLocaleDateString("en-GB")
                            : ""
                        }
                        disabled
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                      />
                    )}
                  </div>
                </div>

                {/* Info Note in Edit Mode */}
                {isEditing && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                    <i className="fas fa-info-circle text-blue-500 mt-1"></i>
                    <p className="text-sm text-blue-700">
                      Bạn đang ở chế độ chỉnh sửa. Hãy cập nhật thông tin chính
                      xác để chúng tôi có thể phục vụ bạn tốt hơn. Email không
                      thể thay đổi vì lý do bảo mật.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Cài đặt tài khoản
                </h2>

                {/* Change Password Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Đổi mật khẩu
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu hiện tại
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all pr-10"
                          placeholder="••••••••"
                        />
                        <button
                          onClick={() =>
                            setShowPasswords({
                              ...showPasswords,
                              current: !showPasswords.current,
                            })
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <i
                            className={`fas ${showPasswords.current ? "fa-eye-slash" : "fa-eye"}`}
                          ></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu mới
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all pr-10"
                          placeholder="••••••••"
                        />
                        <button
                          onClick={() =>
                            setShowPasswords({
                              ...showPasswords,
                              new: !showPasswords.new,
                            })
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <i
                            className={`fas ${showPasswords.new ? "fa-eye-slash" : "fa-eye"}`}
                          ></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Xác nhận mật khẩu mới
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all pr-10"
                          placeholder="••••••••"
                        />
                        <button
                          onClick={() =>
                            setShowPasswords({
                              ...showPasswords,
                              confirm: !showPasswords.confirm,
                            })
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <i
                            className={`fas ${showPasswords.confirm ? "fa-eye-slash" : "fa-eye"}`}
                          ></i>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleChangePassword}
                      disabled={isChangingPassword}
                      className="btn btn-primary w-full sm:w-auto"
                    >
                      {isChangingPassword ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Đang xử lý...
                        </>
                      ) : (
                        "Cập nhật mật khẩu"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <AlertDialog
        isOpen={alertDialog.show}
        onClose={hideDialog}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
        buttonText={alertDialog.buttonText}
      />

      {/* Image Viewer Modal */}
      {viewAvatar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setViewAvatar(false)}
        >
          <div className="relative w-auto max-w-[95vw] max-h-full">
            <button
              onClick={() => setViewAvatar(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
            <img
              src={avatarPreview}
              alt="Avatar Full View"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
