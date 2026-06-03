import api from "./api";

/**
 * Service để quản lý các API liên quan đến Destinations (Điểm đến)
 */
const destinationService = {
  /**
   * Lấy danh sách các điểm đến với filter
   * @param {Object} params - Các tham số filter
   * @param {number} params.regionId - ID của vùng miền (optional)
   * @param {number} params.locationId - ID của tỉnh/thành phố (optional)
   * @param {string} params.keyword - Từ khóa tìm kiếm (optional)
   * @param {number} params.page - Số trang hiện tại (mặc định: 1)
   * @param {number} params.pageSize - Số items trên mỗi trang (mặc định: 9)
   * @returns {Promise<Object>} Dữ liệu destinations với pagination info
   */
  getDestinations: async (params = {}) => {
    try {
      // Build query params - chỉ thêm params có giá trị
      const queryParams = new URLSearchParams();

      if (params.regionId) {
        queryParams.append("regionId", params.regionId);
      }

      if (params.locationId) {
        queryParams.append("locationId", params.locationId);
      }

      if (params.keyword && params.keyword.trim()) {
        queryParams.append("keyword", params.keyword.trim());
      }

      // Pagination params - luôn gửi
      queryParams.append("page", params.page || 1);
      queryParams.append("pageSize", params.pageSize || 9);

      const response = await api.get(
        `/api/Destinations?${queryParams.toString()}`,
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Không thể lấy danh sách điểm đến",
        );
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      throw error;
    }
  },

  /**
   * Lấy danh sách destinations cho Admin (bao gồm cả hidden, xóa logic khác user)
   * @param {Object} params
   */
  getDestinationsAdmin: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.keyword && params.keyword.trim()) {
        queryParams.append("keyword", params.keyword.trim());
      }
      queryParams.append("page", params.page || 1);
      queryParams.append("pageSize", params.pageSize || 10);

      const response = await api.get(
        `/api/Destinations/admin?${queryParams.toString()}`,
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Không thể tải danh sách (Admin)",
        );
      }
    } catch (error) {
      console.error("Error fetching admin destinations:", error);
      throw error;
    }
  },

  /**
   * Lấy thông tin chi tiết của một điểm đến theo ID
   * @param {number|string} id - ID của destination
   * @returns {Promise<Object>} Thông tin destination
   */
  getDestinationById: async (id) => {
    try {
      const response = await api.get(`/api/Destinations/${id}`);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Không thể lấy thông tin điểm đến",
        );
      }
    } catch (error) {
      console.error(`Error fetching destination with id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Lấy thông tin chi tiết của một điểm đến theo ID (Admin - đầy đủ info)
   * @param {number|string} id - ID của destination
   * @returns {Promise<Object>} Thông tin destination
   */
  getDestinationByIdAdmin: async (id) => {
    try {
      const response = await api.get(`/api/Destinations/admin/${id}`);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Không thể lấy thông tin điểm đến (Admin)",
        );
      }
    } catch (error) {
      console.error(`Error fetching admin destination with id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Lấy danh sách các chia sẻ (sharings) về một điểm đến
   * @param {number|string} id - ID của destination
   * @returns {Promise<Array>} Danh sách sharings
   */
  getDestinationSharings: async (id) => {
    try {
      const response = await api.get(`/api/Destinations/${id}/sharings`);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message ||
            "Không thể lấy danh sách chia sẻ về điểm đến",
        );
      }
    } catch (error) {
      console.error(`Error fetching sharings for destination ${id}:`, error);
      throw error;
    }
  },

  /**
   * Tạo chia sẻ mới cho một điểm đến
   * @param {number|string} destinationId - ID của destination
   * @param {string} comment - Nội dung bình luận
   * @param {File[]} images - Mảng các file ảnh (optional)
   * @returns {Promise<Object>} Response từ server
   */
  createDestinationSharing: async (destinationId, comment, images = []) => {
    try {
      // Tạo FormData để upload multipart/form-data
      const formData = new FormData();
      formData.append("Comment", comment);

      // Append từng ảnh vào FormData
      images.forEach((image) => {
        formData.append("Images", image);
      });

      const response = await api.post(
        `/api/Destinations/${destinationId}/sharings`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Không thể tạo chia sẻ");
      }
    } catch (error) {
      console.error(
        `Error creating sharing for destination ${destinationId}:`,
        error,
      );
      throw error;
    }
  },

  /**
   * Tạo destination mới (Admin only)
   * @param {Object} destinationData - Dữ liệu destination
   * @returns {Promise<Object>} Response từ server
   */
  createDestination: async (destinationData) => {
    try {
      const formData = new FormData();

      // Basic fields
      formData.append("Name", destinationData.name);
      formData.append("Title", destinationData.title);
      formData.append("Description", destinationData.description);
      formData.append("History", destinationData.history || "");

      // Location
      formData.append("Lat", destinationData.lat);
      formData.append("Lon", destinationData.lon);
      formData.append("LocationId", destinationData.locationId);

      // Media
      formData.append("VideoUrl", destinationData.videoUrl || "");
      const isVisibleValue = String(destinationData.isVisible === true);
      formData.append("IsVisible", isVisibleValue);
      formData.append("isVisible", isVisibleValue);

      // Images (multiple files)
      if (destinationData.images && destinationData.images.length > 0) {
        destinationData.images.forEach((image) => {
          formData.append("Images", image);
        });
      }

      // Tags (array of strings)
      if (destinationData.tags && destinationData.tags.length > 0) {
        destinationData.tags.forEach((tag) => {
          formData.append("Tags", tag);
        });
      }

      // FAQs (array of objects)
      if (destinationData.faqs && destinationData.faqs.length > 0) {
        destinationData.faqs.forEach((faq, index) => {
          formData.append(`FAQs[${index}].Question`, faq.question);
          formData.append(`FAQs[${index}].Answer`, faq.answer);
        });
      }

      const response = await api.post("/api/Destinations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Không thể tạo điểm đến");
      }
    } catch (error) {
      console.error("Error creating destination:", error);
      throw error;
    }
  },
  /**
   * Cập nhật destination (Admin only)
   * @param {number|string} id - ID của destination
   * @param {Object} data - Dữ liệu cập nhật (JSON)
   * @returns {Promise<Object>} Response từ server
   */
  updateDestination: async (id, destinationData) => {
    try {
      const formData = new FormData();

      // Basic fields
      formData.append("Name", destinationData.name);
      formData.append("Title", destinationData.title);
      formData.append("Description", destinationData.description);
      formData.append("History", destinationData.history || "");

      // Location
      formData.append("Lat", destinationData.lat);
      formData.append("Lon", destinationData.lon);
      formData.append("LocationId", destinationData.locationId);

      // Media
      formData.append("VideoUrl", destinationData.videoUrl || "");
      const isVisibleValue = String(destinationData.isVisible === true);
      formData.append("IsVisible", isVisibleValue);
      formData.append("isVisible", isVisibleValue);

      // Tags
      if (destinationData.tags && destinationData.tags.length > 0) {
        destinationData.tags.forEach((tag) => {
          formData.append("Tags", tag);
        });
      }

      // Existing Images (URLs) - Only for Update
      if (destinationData.imageUrls && destinationData.imageUrls.length > 0) {
        destinationData.imageUrls.forEach((url) => {
          formData.append("ExistingImageUrls", url);
        });
      }

      // New Images (Files)
      if (destinationData.images && destinationData.images.length > 0) {
        destinationData.images.forEach((image) => {
          formData.append("Images", image);
        });
      }

      // FAQs
      if (destinationData.faqs && destinationData.faqs.length > 0) {
        destinationData.faqs.forEach((faq, index) => {
          formData.append(`FAQs[${index}].Question`, faq.question);
          formData.append(`FAQs[${index}].Answer`, faq.answer);
        });
      }

      const response = await api.put(`/api/Destinations/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Không thể cập nhật điểm đến");
      }
    } catch (error) {
      console.error(`Error updating destination ${id}:`, error);
      throw error;
    }
  },

  /**
   * Xóa destination (Admin only)
   * @param {number|string} id - ID của destination
   * @returns {Promise<null>} Response data từ server
   */
  deleteDestination: async (id) => {
    try {
      const response = await api.delete(`/api/Destinations/${id}`);

      if (response.data.success) {
        return response.data.data;
      }

      throw new Error(response.data.message || "Không thể xóa điểm đến");
    } catch (error) {
      console.error(`Error deleting destination ${id}:`, error);
      throw error;
    }
  },
};

export default destinationService;
