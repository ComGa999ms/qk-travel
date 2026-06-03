import api from "./api";

/**
 * Service quản lý các API liên quan đến Contact
 */
const contactService = {
  /**
   * Lấy danh sách các chủ đề liên hệ
   * @returns {Promise<Array>} Danh sách topics
   */
  getTopics: async () => {
    try {
      const response = await api.get("/api/Contact/topics");

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Không thể lấy danh sách chủ đề",
        );
      }
    } catch (error) {
      console.error("Error fetching contact topics:", error);
      throw error;
    }
  },

  /**
   * Gửi email liên hệ
   * @param {Object} data - Dữ liệu form liên hệ
   * @param {string} data.fullName - Họ tên
   * @param {string} data.email - Email
   * @param {string} data.phoneNumber - Số điện thoại
   * @param {string} data.message - Nội dung tin nhắn
   * @param {number} data.contactTopicId - ID chủ đề
   * @returns {Promise<Object>} Response từ server
   */
  sendEmail: async (data) => {
    try {
      const response = await api.post("/api/Contact/send-email", data);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Gửi liên hệ thất bại");
      }
    } catch (error) {
      console.error("Error sending contact email:", error);
      throw error;
    }
  },
};

export default contactService;
