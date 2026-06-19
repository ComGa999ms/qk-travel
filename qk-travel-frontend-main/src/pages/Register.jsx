import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import authBg from "../assets/images/auth-bg.jpg";

const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[^a-zA-Z0-9]+/)) strength++;

    if (strength <= 2)
      return { strength: 33, text: "Yếu", color: "bg-red-500" };
    if (strength === 3)
      return { strength: 66, text: "Trung bình", color: "bg-yellow-500" };
    return { strength: 100, text: "Mạnh", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Vui lòng nhập tên";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Min 2 ký tự";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Vui lòng nhập họ";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Min 2 ký tự";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Vui lòng nhập SĐT";
    } else if (
      !/^[0-9]{10,11}$/.test(formData.phoneNumber.replace(/[\s-]/g, ""))
    ) {
      newErrors.phoneNumber = "SĐT không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else {
      // Kiểm tra từng tiêu chí và thu thập các lỗi cụ thể
      const passwordErrors = [];
      if (formData.password.length < 8) {
        passwordErrors.push("ít nhất 8 ký tự");
      }
      if (!formData.password.match(/[a-z]+/)) {
        passwordErrors.push("1 chữ thường");
      }
      if (!formData.password.match(/[A-Z]+/)) {
        passwordErrors.push("1 chữ hoa");
      }
      if (!formData.password.match(/[0-9]+/)) {
        passwordErrors.push("1 chữ số");
      }
      if (!formData.password.match(/[^a-zA-Z0-9]+/)) {
        passwordErrors.push("1 ký tự đặc biệt");
      }
      if (passwordErrors.length > 0) {
        newErrors.password = `Mật khẩu cần có: ${passwordErrors.join(", ")}`;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận Mật Khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors({});
    setSuccessMessage("");
    setIsLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
      });

      setSuccessMessage("Đăng ký thành công");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Register error:", error);

      let errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";

      if (error.response?.status === 400) {
        errorMessage = "Email đã tồn tại hoặc dữ liệu không hợp lệ.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Container - Scrollable if needed on mobile, but centered */}
      <div className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/40 max-h-[90vh] flex flex-col">
        <div className="p-8 overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="text-center mb-6">
            <Link
              to="/"
              className="inline-block transition-transform hover:scale-105"
            >
              <img
                src="/logo_name.png"
                alt="QkTravel Logo"
                className="h-12 mx-auto drop-shadow-sm"
              />
            </Link>
            <h2 className="mt-3 text-2xl font-bold text-gray-800">
              Đăng ký tài khoản
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Tham gia cộng đồng QkTravel ngay hôm nay
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Tên
                </label>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 bg-white/70 border ${
                    errors.firstName ? "border-red-400" : "border-gray-200"
                  } rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder-gray-400`}
                  placeholder="Văn A"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Họ
                </label>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 bg-white/70 border ${
                    errors.lastName ? "border-red-400" : "border-gray-200"
                  } rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder-gray-400`}
                  placeholder="Nguyễn"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400 text-xs"></i>
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-9 pr-3 py-2 bg-white/70 border ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  } rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder-gray-400`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-phone text-gray-400 text-xs"></i>
                </div>
                <input
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`block w-full pl-9 pr-3 py-2 bg-white/70 border ${
                    errors.phoneNumber ? "border-red-400" : "border-gray-200"
                  } rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder-gray-400`}
                  placeholder="0912..."
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400 text-xs"></i>
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-9 pr-10 py-2 bg-white/70 border ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  } rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder-gray-400`}
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-xs`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">{errors.password}</p>
              )}
              {/* Strength Bar */}
              {formData.password && (
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex-grow bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-gray-500">
                    {passwordStrength.text}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Xác nhận Mật Khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400 text-xs"></i>
                </div>
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-9 pr-10 py-2 bg-white/70 border ${
                    errors.confirmPassword
                      ? "border-red-400"
                      : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
                        ? "border-green-400"
                        : "border-gray-200"
                  } rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder-gray-400`}
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <i
                    className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-xs`}
                  ></i>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {successMessage && (
              <div className="bg-green-50/80 border border-green-200 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-sm font-medium text-green-700 flex items-center">
                  <i className="fas fa-check-circle mr-2"></i>
                  {successMessage}
                </p>
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-50/80 border border-red-200 rounded-lg p-2 backdrop-blur-sm">
                <p className="text-xs text-red-600 flex items-center">
                  <i className="fas fa-exclamation-triangle mr-1"></i>
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || Boolean(successMessage)}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Đang xử lý...
                </>
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>

          {/* Social */}
          <div className="mt-5">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-transparent text-gray-500 font-medium bg-white/40 backdrop-blur-sm rounded">
                  Hoặc đăng ký với
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  setIsLoading(true);
                  try {
                    const idToken = credentialResponse.credential;
                    await loginWithGoogle(idToken);
                    navigate("/");
                  } catch (error) {
                    console.error("Google register error:", error);
                    setErrors({ submit: "Đăng ký với Google thất bại" });
                  } finally {
                    setIsLoading(false);
                  }
                }}
                onError={() => {
                  setErrors({ submit: "Không thể kết nối với Google" });
                }}
                useOneTap
                theme="filled_blue"
                shape="pill"
                width="300"
                text="signup_with"
              />
            </div>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
