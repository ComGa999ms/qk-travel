import api from "./api";

/**
 * Service để quản lý các API liên quan đến Regions (Vùng miền)
 */
const regionService = {
  /**
   * Lấy danh sách tất cả các vùng miền
   * @returns {Promise<Array>} Danh sách regions
   */
  getAllRegions: async () => {
    try {
      const response = await api.get("/api/Regions");

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Không thể lấy danh sách vùng miền",
        );
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
      throw error;
    }
  },
};

export default regionService;
