import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import useDialog from "../hooks/useDialog";
import AlertDialog from "../components/common/AlertDialog";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { alertDialog, showAlert, hideDialog } = useDialog();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Vui lòng nhập email");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authService.forgotPassword(email);
      console.log("Forgot Password response:", response);

      if (response && response.success) {
        setIsSuccess(true);
      } else {
        throw new Error(response.message || "Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      const msg =
        err.response?.data?.message || err.message || "Gửi yêu cầu thất bại";
      showAlert({
        title: "Lỗi",
        message: msg,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <img
              src="/logo_name.png"
              alt="QkTravel Logo"
              className="h-12 mx-auto"
            />
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Quên mật khẩu?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {!isSuccess
              ? "Nhập email của bạn để nhận liên kết đặt lại mật khẩu"
              : "Vui lòng kiểm tra email của bạn"}
          </p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email đăng ký
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                    error ? "border-red-300" : "border-gray-300"
                  } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                  placeholder="nhap@email.cua.ban"
                />
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {error}
                </p>
              )}
            </div>

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
                "Gửi liên kết xác thực"
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-paper-plane text-2xl text-green-600"></i>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến{" "}
                <strong>{email}</strong>.
                <br />
                Vui lòng kiểm tra hộp thư đến (và cả mục Spam).
              </p>
            </div>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Thử lại với email khác
            </button>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Quay lại đăng nhập
          </Link>
        </div>

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

export default ForgotPassword;
