import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import authService from "../services/authService";
import useDialog from "../hooks/useDialog";
import AlertDialog from "../components/common/AlertDialog";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { alertDialog, showAlert, hideDialog } = useDialog();

  const token = searchParams.get("token");
  const urlEmail = searchParams.get("email");
  const userId = searchParams.get("userId");

  const [emailInput, setEmailInput] = useState(urlEmail || "");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (urlEmail) setEmailInput(urlEmail);
  }, [urlEmail]);

  useEffect(() => {
    if (!token) {
      showAlert({
        title: "Lỗi",
        message: "Link đặt lại mật khẩu không hợp lệ (thiếu token).",
        type: "error",
      });
    }
  }, [token]);

  const validate = () => {
    if (!emailInput) {
      setError("Vui lòng nhập email của bạn");
      return false;
    }
    if (!passwords.newPassword || passwords.newPassword.length < 8) {
      setError("Mật khẩu mới phải có ít nhất 8 ký tự");
      return false;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setError("");

    try {
      const rawToken = token;
      const fixedToken = rawToken.replace(/ /g, "+");

      const response = await authService.resetPassword({
        email: emailInput,
        userId,
        token: fixedToken,
        newPassword: passwords.newPassword,
      });

      if (response && response.success) {
        showAlert({
          title: "Thành công",
          message:
            "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay bây giờ.",
          type: "success",
        });
        setTimeout(() => {
          hideDialog();
          navigate("/login");
        }, 2000);
      } else {
        throw new Error(response.message || "Đặt lại mật khẩu thất bại");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      const msg = err.response?.data?.message || err.message || "Có lỗi xảy ra";
      showAlert({
        title: "Lỗi",
        message: msg,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <h2 className="text-xl font-bold text-red-600">
          Đường dẫn không hợp lệ
        </h2>
        <Link
          to="/forgot-password"
          className="text-primary-600 hover:underline"
        >
          Yêu cầu gửi lại link mới
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <img
              src="/logo_name.png"
              alt="QkTravel Logo"
              className="h-12 mx-auto"
            />
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Đặt lại mật khẩu
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {urlEmail
              ? `Nhập mật khẩu mới cho tài khoản ${urlEmail}`
              : "Vui lòng nhập email và mật khẩu mới"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!urlEmail && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setError("");
                }}
                className="w-full pl-4 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="name@example.com"
              />
            </div>
          )}
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={passwords.newPassword}
                onChange={(e) => {
                  setPasswords({ ...passwords, newPassword: e.target.value });
                  setError("");
                }}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    new: !showPasswords.new,
                  })
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <i
                  className={`fas ${showPasswords.new ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={passwords.confirmPassword}
                onChange={(e) => {
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  });
                  setError("");
                }}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    confirm: !showPasswords.confirm,
                  })
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <i
                  className={`fas ${showPasswords.confirm ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Đang xử lý...
              </>
            ) : (
              "Đổi mật khẩu"
            )}
          </button>
        </form>

        <AlertDialog
          isOpen={alertDialog.show}
          onClose={hideDialog}
          type={alertDialog.type}
          title={alertDialog.title}
          message={alertDialog.message}
          buttonText={alertDialog.buttonText}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
