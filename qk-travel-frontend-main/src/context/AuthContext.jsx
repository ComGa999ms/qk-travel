import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import authService from "../services/authService";
import { tokenUtils } from "../utils/tokenUtils";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const tokenTimerRef = useRef(null);

  const clearTokenTimer = () => {
    if (tokenTimerRef.current) {
      clearTimeout(tokenTimerRef.current);
      tokenTimerRef.current = null;
    }
  };

  const scheduleTokenRefresh = useCallback(async (accessToken) => {
    clearTokenTimer();

    const timeLeft = tokenUtils.getTimeUntilExpiration(accessToken);
    // Refresh 1 minute before expiration
    const refreshTime = timeLeft - 60000;

    if (refreshTime > 0) {
      tokenTimerRef.current = setTimeout(async () => {
        try {
          const currentAccess =
            localStorage.getItem("accessToken") ||
            sessionStorage.getItem("accessToken");
          const currentRefresh =
            localStorage.getItem("refreshToken") ||
            sessionStorage.getItem("refreshToken");
          const storage = localStorage.getItem("accessToken")
            ? localStorage
            : sessionStorage;

          if (currentAccess && currentRefresh) {
            const data = await authService.refreshToken(
              currentAccess,
              currentRefresh,
            );
            const { accessToken: newAccess, refreshToken: newRefresh } = data;

            storage.setItem("accessToken", newAccess);
            storage.setItem("refreshToken", newRefresh);
            api.defaults.headers.common["Authorization"] =
              `Bearer ${newAccess}`;

            // Schedule next refresh
            scheduleTokenRefresh(newAccess);
          }
        } catch (error) {
          console.error("Proactive refresh failed:", error);
        }
      }, refreshTime);
    } else {
      console.warn("Token expired or about to expire. Skipping proactive.");
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      let storedUser = localStorage.getItem("user");
      let storage = localStorage;
      let accessToken = localStorage.getItem("accessToken");

      if (!storedUser) {
        storedUser = sessionStorage.getItem("user");
        accessToken = sessionStorage.getItem("accessToken");
        storage = sessionStorage;
      }

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);

          // eslint-disable-next-line no-unused-vars
          const { subscriptionPlan, ...safeUser } = parsedUser;

          setUser(safeUser);

          // Schedule Refresh if token exists
          if (accessToken) {
            scheduleTokenRefresh(accessToken);
          }

          try {
            const fullUserData = await authService.getMe();

            const mergedUser = { ...parsedUser, ...fullUserData };
            setUser(mergedUser);

            const minifiedUser = {
              id: mergedUser.id,
              firstName: mergedUser.firstName,
              lastName: mergedUser.lastName,
              roles: mergedUser.roles,
              avatarUrl: mergedUser.avatarUrl,
            };
            storage.setItem("user", JSON.stringify(minifiedUser));
          } catch (apiError) {
            console.error("Failed to refresh user profile:", apiError);
          }
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem("user");
          sessionStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    initializeAuth();

    return () => clearTokenTimer();
  }, [scheduleTokenRefresh]);

  const login = async (credentials, rememberMe = false) => {
    const data = await authService.login(credentials);

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem("accessToken", data.accessToken);
    storage.setItem("refreshToken", data.refreshToken);

    const fullUserInfo = {
      id: data.user.id,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      phoneNumber: data.user.phoneNumber,
      roles: data.user.roles,
      subscriptionPlan: data.user.subscriptionPlan,
      avatarUrl: data.user.avatarUrl,
      isFirstLogin: data.isFirstLogin,
    };
    setUser(fullUserInfo);

    const minifiedUser = {
      id: data.user.id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      roles: data.user.roles,
      avatarUrl: data.user.avatarUrl,
    };
    storage.setItem("user", JSON.stringify(minifiedUser));

    // Schedule Refresh
    scheduleTokenRefresh(data.accessToken);

    return data;
  };

  const updateUser = (userData) => {
    const storage = localStorage.getItem("user")
      ? localStorage
      : sessionStorage;

    const updatedFullUser = { ...user, ...userData };
    setUser(updatedFullUser);

    const minifiedUser = {
      id: updatedFullUser.id,
      firstName: updatedFullUser.firstName,
      lastName: updatedFullUser.lastName,
      roles: updatedFullUser.roles,
      avatarUrl: updatedFullUser.avatarUrl,
    };
    storage.setItem("user", JSON.stringify(minifiedUser));
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    return data;
  };

  const logout = async () => {
    clearTokenTimer();
    await authService.logout();
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };

  const loginWithGoogle = async (idToken) => {
    const data = await authService.loginWithGoogle(idToken);

    const storage = localStorage;

    storage.setItem("accessToken", data.accessToken);
    storage.setItem("refreshToken", data.refreshToken);

    const fullUserInfo = {
      id: data.user.id,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      phoneNumber: data.user.phoneNumber,
      roles: data.user.roles,
      subscriptionPlan: data.user.subscriptionPlan,
      avatarUrl: data.user.avatarUrl,
      isFirstLogin: data.isFirstLogin,
    };
    setUser(fullUserInfo);

    const minifiedUser = {
      id: data.user.id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      roles: data.user.roles,
      avatarUrl: data.user.avatarUrl,
    };
    storage.setItem("user", JSON.stringify(minifiedUser));

    // Schedule Refresh
    scheduleTokenRefresh(data.accessToken);

    return data;
  };

  const refreshProfile = async () => {
    try {
      const fullUserData = await authService.getMe();
      const updatedUser = { ...user, ...fullUserData };
      setUser(updatedUser);

      const storage = localStorage.getItem("user")
        ? localStorage
        : sessionStorage;
      if (storage.getItem("user")) {
        const minifiedUser = {
          id: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          roles: updatedUser.roles,
          avatarUrl: updatedUser.avatarUrl,
        };
        storage.setItem("user", JSON.stringify(minifiedUser));
      }

      return updatedUser;
    } catch (error) {
      console.error("Failed to refresh profile:", error);
    }
  };

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    register,
    logout,
    updateUser,
    refreshProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
