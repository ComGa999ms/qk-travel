import { jwtDecode } from "jwt-decode";

export const tokenUtils = {
  getExpirationDate: (token) => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp) {
        return decoded.exp * 1000; // Convert to ms
      }
      return null;
    } catch {
      return null;
    }
  },

  isTokenExpired: (token) => {
    const expirationDate = tokenUtils.getExpirationDate(token);
    if (!expirationDate) return true;
    return Date.now() > expirationDate;
  },

  getTimeUntilExpiration: (token) => {
    const expirationDate = tokenUtils.getExpirationDate(token);
    if (!expirationDate) return 0;
    return expirationDate - Date.now();
  },
};
