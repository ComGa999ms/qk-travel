import api from "./api";

const giftcodeService = {
  // Lấy tất cả giftcode (có phân trang)
  getAll: async (page = 1, pageSize = 10) => {
    const response = await api.get("/api/Giftcodes", {
      params: { page, pageSize},
    });
    return response.data;
  },

  // Lấy chi tiết giftcode
  getById: async (id) => {
    const response = await api.get(`/api/Giftcodes/${id}`);
    return response.data;
  },

  // Tạo giftcode mới
  create: async (data) => {
    const response = await api.post("/api/Giftcodes", data);
    return response.data;
  },

  // Cập nhật giftcode
  update: async (id, data) => {
    const response = await api.put(`/api/Giftcodes/${id}`, data);
    return response.data;
  },

  // Xóa giftcode
  delete: async (id) => {
    const response = await api.delete(`/api/Giftcodes/${id}`);
    return response.data;
  },

  // Validate giftcode
  validate: async (code) => {
    const response = await api.get(`/api/Giftcodes/validate/${code}`);
    return response.data;
  },
};

export default giftcodeService;
