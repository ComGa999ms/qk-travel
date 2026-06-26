import api from "./api";

/**
 * Service để quản lý các API liên quan đến Plans (AI Planner)
 */
const planService = {
  /**
   * Tạo kế hoạch du lịch bằng AI
   * @param {Object} planData - Dữ liệu để tạo kế hoạch
   * @param {number} planData.locationId - ID điểm đến
   * @param {number} planData.currentLocationId - ID vị trí hiện tại
   * @param {number} planData.numberOfPeople - Số lượng người
   * @param {number} planData.duration - Số ngày
   * @param {number} planData.priceSettingId - ID phong cách du lịch
   * @param {Array<number>} planData.hobbyIds - Mảng ID sở thích
   * @param {string} planData.notes - Yêu cầu đặc biệt
   * @returns {Promise<Object>} Kế hoạch được tạo
   */
  generatePlan: async (planData) => {
    try {
      const response = await api.post("/api/Plans/generate", planData);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Không thể tạo kế hoạch du lịch",
        );
      }
    } catch (error) {
      console.error("Error generating plan:", error);
      throw error;
    }
  },

  /**
   * Lấy danh sách kế hoạch đã lưu của người dùng
   * @param {number} page - Trang hiện tại
   * @param {number} pageSize - Số lượng item trên một trang
   * @returns {Promise<Object>} Danh sách kế hoạch
   */
  getMyPlans: async (page = 1, pageSize = 10) => {
    try {
      const response = await api.get("/api/Plans", {
        params: { page, pageSize },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Không thể lấy danh sách kế hoạch",
        );
      }
    } catch (error) {
      console.error("Error fetching my plans:", error);
      throw error;
    }
  },

  /**
   * Lấy chi tiết kế hoạch du lịch
   * @param {number} id - ID của kế hoạch
   * @returns {Promise<Object>} Chi tiết kế hoạch
   */
  getPlanDetail: async (id) => {
    try {
      const response = await api.get(`/api/Plans/${id}`);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Không thể lấy chi tiết kế hoạch",
        );
      }
    } catch (error) {
      console.error("Error fetching plan detail:", error);
      throw error;
    }
  },

  /**
   * Xóa kế hoạch du lịch
   * @param {number} id - ID của kế hoạch
   * @returns {Promise<boolean>} True nếu xóa thành công
   */
  deletePlan: async (id) => {
    try {
      const response = await api.delete(`/api/Plans/${id}`);

      if (response.data.success) {
        return true;
      } else {
        throw new Error(response.data.message || "Không thể xóa kế hoạch");
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      throw error;
    }
  },

  /**
   * Lưu kế hoạch du lịch
   * @param {number} id - ID của kế hoạch
   * @returns {Promise<boolean>} True nếu lưu thành công
   */
  savePlan: async (id) => {
    try {
      const response = await api.post(`/api/Plans/${id}/save`);

      if (response.data.success) {
        return true;
      } else {
        throw new Error(response.data.message || "Không thể lưu kế hoạch");
      }
    } catch (error) {
      console.error("Error saving plan:", error);
      throw error;
    }
  },

  /**
   * Hỏi AI về một kế hoạch đã tạo (chỉ Premium)
   * @param {number} id - ID kế hoạch
   * @param {string} question - Câu hỏi của người dùng
   * @param {Array<{role: string, content: string}>} history - Lịch sử hội thoại (cũ -> mới)
   * @returns {Promise<string>} Câu trả lời của AI
   */
  chatAboutPlan: async (id, question, history = []) => {
    const response = await api.post(`/api/Plans/${id}/chat`, {
      question,
      history,
    });

    if (response.data.success) {
      return response.data.data.answer;
    }
    throw new Error(response.data.message || "Không thể gửi câu hỏi");
  },

  /**
   * Kiểm tra giới hạn lượt sử dụng AI Planner
   * @returns {Promise<Object>} Thông tin quota { limit, currentUsage, hasRemainingQuota }
   */
  getQuota: async () => {
    try {
      const response = await api.get("/api/Quota");
      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching quota:", error);
      throw error;
    }
  },

  /**
   * Lấy danh sách sở thích du lịch
   * @returns {Promise<Array>} Danh sách sở thích
   */
  getTravelHobbies: async () => {
    try {
      const response = await api.get("/api/TravelHobbies");
      if (response.data.success) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching travel hobbies:", error);
      return [];
    }
  },

  /**
   * Lấy danh sách cài đặt giá (phong cách du lịch)
   * @returns {Promise<Array>} Danh sách price settings
   */
  getPriceSettings: async () => {
    try {
      const response = await api.get("/api/PriceSettings");
      if (response.data.success) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching price settings:", error);
      return [];
    }
  },
};

export default planService;
