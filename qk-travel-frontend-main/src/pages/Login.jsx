import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import useDialog from "../hooks/useDialog";
import AlertDialog from "../components/common/AlertDialog";
import SpinWheelModal from "../components/spin-wheel/SpinWheelModal";
import spinPrizeService from "../services/spinPrizeService";
import authBg from "../assets/images/auth-bg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [pendingNavigate, setPendingNavigate] = useState(null);
  const { alertDialog, hideDialog } = useDialog();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await login(
        {
          email: formData.email,
          password: formData.password,
        },
        formData.rememberMe,
      );

      const storage = formData.rememberMe ? localStorage : sessionStorage;
      const userDataStr = storage.getItem("user");

      let targetPath = "/";
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        if (
          userData.roles &&
          Array.isArray(userData.roles) &&
          (userData.roles.includes("Admin") ||
            userData.roles.includes("Moderator"))
        ) {
          targetPath = "/admin";
        }
      }

      // Show spin wheel for first-time login users (non-admin) if enabled
      if (data?.isFirstLogin && targetPath !== "/admin") {
        try {
          const configRaw = await spinPrizeService.getConfig();
          const configData = configRaw?.data || configRaw;
          if (configData?.isEnabled) {
            setPendingNavigate(targetPath);
            setShowSpinWheel(true);
          } else {
            navigate(targetPath);
          }
        } catch {
          navigate(targetPath);
        }
      } else {
        navigate(targetPath);
      }
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Đăng nhập thất bại. Vui lòng thử lại.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = "Email hoặc mật khẩu không đúng.";
      } else if (error.response?.status === 403) {
        errorMessage =
          "Tài khoản chưa được xác thực. Vui lòng kiểm tra email để kích hoạt tài khoản.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat fixed inset-0"
      style={{
        backgroundImage: `url(${authBg})`,
      }}
    >
      {/* Overlay to dim background for better contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Container - Glassmorphism */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/40">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-block transition-transform hover:scale-105"
            >
              <img
                src="/logo_name.png"
                alt="QkTravel Logo"
                className="h-14 mx-auto drop-shadow-sm"
              />
            </Link>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Chào mừng trở lại
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Khám phá vẻ đẹp Việt Nam cùng QkTravel
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2.5 bg-white/70 border ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-800 placeholder-gray-400`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-2.5 bg-white/70 border ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-800 placeholder-gray-400`}
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-600 cursor-pointer select-none"
                >
                  Ghi nhớ
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-50/80 border border-red-200 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-sm text-red-600 flex items-center">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Đang xử lý...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-transparent text-gray-500 font-medium bg-white/40 backdrop-blur-sm rounded">
                  Hoặc đăng nhập với
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  setIsLoading(true);
                  try {
                    const idToken = credentialResponse.credential;
                    const data = await loginWithGoogle(idToken);

                    if (data?.isFirstLogin) {
                      try {
                        const configRaw = await spinPrizeService.getConfig();
                        const configData = configRaw?.data || configRaw;
                        if (configData?.isEnabled) {
                          setPendingNavigate("/");
                          setShowSpinWheel(true);
                        } else {
                          navigate("/");
                        }
                      } catch {
                        navigate("/");
                      }
                    } else {
                      navigate("/");
                    }
                  } catch (error) {
                    console.error("Google login error:", error);
                    setErrors({ submit: "Đăng nhập Google thất bại" });
                  } finally {
                    setIsLoading(false);
                  }
                }}
                onError={() => {
                  console.error("Google Login Failed");
                  setErrors({ submit: "Không thể kết nối với Google" });
                }}
                useOneTap
                theme="filled_blue"
                shape="pill"
                width="300"
              />
            </div>
          </div>

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertDialog.show}
        onClose={hideDialog}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
        buttonText={alertDialog.buttonText}
      />

      {/* Spin Wheel Modal for first-time login */}
      <SpinWheelModal
        isOpen={showSpinWheel}
        onClose={() => {
          setShowSpinWheel(false);
          if (pendingNavigate) {
            navigate(pendingNavigate);
          }
        }}
      />
    </div>
  );
};

export default Login;
