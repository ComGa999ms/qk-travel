import api from "./api";

const authService = {
  // Đăng ký tài khoản mới
  register: async (userData) => {
    const response = await api.post("/api/Auth/register", {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
    });
    // Unwrap nested data: response.data.data
    return response.data.data;
  },

  // Đăng nhập
  login: async (credentials) => {
    const response = await api.post("/api/Auth/login", {
      email: credentials.email,
      password: credentials.password,
    });
    // Unwrap nested data: response.data.data
    return response.data.data;
  },

  // Làm mới token (Proactive Refresh)
  refreshToken: async (accessToken, refreshToken) => {
    const response = await api.post("/api/Auth/refresh-token", {
      accessToken,
      refreshToken,
    });
    // Unwrap nested data: response.data.data (giống các hàm login, register)
    return response.data.data;
  },

  // Đăng nhập với Google
  loginWithGoogle: async (token) => {
    const response = await api.post("/api/Auth/google", {
      idToken: token,
    });
    // Unwrap nested data: response.data.data
    return response.data.data;
  },

  // Đăng xuất (revoke token)
  logout: async () => {
    try {
      await api.post("/api/Auth/revoke-token");
    } catch (error) {
      console.error("Revoke token error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  // Xác thực email
  confirmEmail: async (userId, token) => {
    const response = await api.post("/api/Auth/confirm-email", {
      userId,
      token,
    });
    // Unwrap nested data: response.data.data
    return response.data.data;
  },

  // Gửi lại email xác thực
  resendConfirmation: async (email) => {
    const response = await api.post("/api/Auth/resend-confirmation", {
      email,
    });
    // Unwrap nested data: response.data.data
    return response.data.data;
  },

  // Lấy thông tin user hiện tại
  getMe: async () => {
    const response = await api.get("/api/Profile");
    const data = response.data.data;

    return {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      roles: data.roles,
      subscriptionPlan: data.subscriptionPlan,
      avatarUrl: data.avatarUrl,
      gender: data.gender,
      dob: data.dob,
    };
  },

  // Đổi mật khẩu
  changePassword: async (passwordData) => {
    const response = await api.post("/api/Auth/change-password", {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
    return response.data;
  },

  // Quên mật khẩu
  forgotPassword: async (email) => {
    const response = await api.post("/api/Auth/forgot-password", { email });
    return response.data;
  },

  // Đặt lại mật khẩu
  resetPassword: async ({ email, token, newPassword }) => {
    const payload = {
      token,
      newPassword,
    };
    if (email) payload.email = email;

    const response = await api.post("/api/Auth/reset-password", payload);
    return response.data;
  },
};

export default authService;
