import api from "./api";

const profileService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get("/api/Profile");
    return response.data;
  },

  // Update user profile
  updateProfile: async (formData) => {
    const response = await api.post("/api/Profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default profileService;
