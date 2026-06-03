import api from "./api";

/**
 * Service để quản lý các API liên quan đến Locations (Tỉnh/Thành phố)
 */
const locationService = {
  /**
   * Lấy danh sách tất cả các tỉnh/thành phố
   * @returns {Promise<Array>} Danh sách locations
   */
  getAllLocations: async () => {
    try {
      const response = await api.get("/api/Locations");

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Không thể lấy danh sách tỉnh/thành phố",
        );
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      throw error;
    }
  },

  /**
   * Lấy thông tin chi tiết của một location theo ID
   * @param {number} id - ID của location
   * @returns {Promise<Object>} Thông tin location
   */
  getLocationById: async (id) => {
    try {
      const response = await api.get(`/api/Locations/${id}`);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Không thể lấy thông tin tỉnh/thành phố",
        );
      }
    } catch (error) {
      console.error(`Error fetching location with id ${id}:`, error);
      throw error;
    }
  },
};

export default locationService;
