import api from "./api";

const unwrap = (response) => response.data.data;

const crawlJobService = {
  createJob: async (payload) => {
    const response = await api.post("/api/CrawlJobs", payload);
    return unwrap(response);
  },

  getJobs: async (page = 1, pageSize = 10) => {
    const response = await api.get("/api/CrawlJobs", {
      params: { page, pageSize },
    });
    return unwrap(response);
  },

  getJob: async (id) => {
    const response = await api.get(`/api/CrawlJobs/${id}`);
    return unwrap(response);
  },

  getLogs: async (jobId) => {
    const response = await api.get(`/api/CrawlJobs/${jobId}/logs`);
    return unwrap(response);
  },

  getItems: async (params = {}) => {
    const response = await api.get("/api/CrawlJobs/items", { params });
    return unwrap(response);
  },

  updateApproval: async (id, isApproved) => {
    const response = await api.patch(`/api/CrawlJobs/items/${id}/approval`, {
      isApproved,
    });
    return unwrap(response);
  },

  deleteItem: async (id) => {
    const response = await api.delete(`/api/CrawlJobs/items/${id}`);
    return response.data;
  },
};

export default crawlJobService;
