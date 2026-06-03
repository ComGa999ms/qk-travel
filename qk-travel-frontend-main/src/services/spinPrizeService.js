import api from "./api";

const spinPrizeService = {
  // Get active prizes (for users/spin wheel display)
  getAllPrizes: async () => {
    const response = await api.get("/api/SpinPrizes");
    return response.data;
  },

  // Get all prizes for admin management
  getAdminPrizes: async () => {
    const response = await api.get("/api/SpinPrizes/admin");
    return response.data;
  },

  // Create a new prize
  createPrize: async (data) => {
    const response = await api.post("/api/SpinPrizes", data);
    return response.data;
  },

  // Update an existing prize
  updatePrize: async (id, data) => {
    const response = await api.put(`/api/SpinPrizes/${id}`, data);
    return response.data;
  },

  // Delete a prize
  deletePrize: async (id) => {
    const response = await api.delete(`/api/SpinPrizes/${id}`);
    return response.data;
  },

  // Get spin wheel config (isEnabled, isShuffled, etc.)
  getConfig: async () => {
    const response = await api.get("/api/SpinPrizes/config");
    return response.data;
  },

  // Save spin wheel config
  saveConfig: async (data) => {
    const response = await api.post("/api/SpinPrizes/config", data);
    return response.data;
  },
};

export default spinPrizeService;
