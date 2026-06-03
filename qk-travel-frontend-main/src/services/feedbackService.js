import api from "./api";

const feedbackService = {
  // Gửi feedback mới
  create: async (data) => {
    // data format:
    // {
    //   "rating": 1-5,
    //   "aiTripPlannerUsefulness": "NotUseful" | "SlightlyUseful" | "Useful" | "VeryUseful",
    //   "content": "string",
    //   "wouldRecommend": true/false
    // }
    const response = await api.post("/api/WebsiteFeedback", data);
    return response.data;
  },

  // Lấy danh sách feedback (Admin)
  getAll: async () => {
    const response = await api.get("/api/WebsiteFeedback/admin");
    return response.data;
  },
};

export default feedbackService;
