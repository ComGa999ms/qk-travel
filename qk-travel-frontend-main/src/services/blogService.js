import api from "./api";

const normalizeBlogPayload = (blogData = {}) => {
  const publishedValue =
    blogData.isPublished === true || blogData.IsPublished === true;

  return {
    ...blogData,
    isPublished: publishedValue,
    IsPublished: publishedValue,
  };
};

const blogService = {
  // Public APIs
  getAllBlogs: async (page = 1, pageSize = 10, searchTerm = "") => {
    const params = { page, pageSize };
    if (searchTerm) {
      params.searchTerm = searchTerm;
    }
    const response = await api.get("/api/Blogs", { params });
    return response.data.data;
  },

  getBlogById: async (id) => {
    const response = await api.get(`/api/Blogs/${id}`);
    return response.data.data;
  },

  // Admin APIs
  getAllBlogsAdmin: async (
    page = 1,
    pageSize = 10,
    searchTerm = "",
    isPublished = null,
  ) => {
    const params = { page, pageSize };
    if (searchTerm) params.searchTerm = searchTerm;
    if (isPublished !== null) params.isPublished = isPublished;

    const response = await api.get("/api/Blogs/admin", { params });
    return response.data.data;
  },

  getBlogByIdAdmin: async (id) => {
    const response = await api.get(`/api/Blogs/admin/${id}`);
    return response.data.data;
  },

  createBlog: async (blogData) => {
    const payload = normalizeBlogPayload(blogData);
    const response = await api.post("/api/Blogs", payload);
    return response.data;
  },

  updateBlog: async (id, blogData) => {
    const payload = normalizeBlogPayload(blogData);
    const response = await api.put(`/api/Blogs/${id}`, payload);
    return response.data;
  },

  deleteBlog: async (id) => {
    const response = await api.delete(`/api/Blogs/${id}`);
    return response.data;
  },

  // ============================================================
  // Comment APIs
  // ============================================================

  // Lấy danh sách bình luận của bài blog (có phân trang)
  getBlogComments: async (blogId, page = 1, pageSize = 10) => {
    const response = await api.get(`/api/Blogs/${blogId}/comments`, {
      params: { page, pageSize },
    });
    return response.data.data;
  },

  // Đăng bình luận mới (hoặc phản hồi nếu có parentCommentId)
  addBlogComment: async (blogId, content, parentCommentId = null) => {
    const response = await api.post(`/api/Blogs/${blogId}/comments`, {
      content,
      parentCommentId,
    });
    return response.data;
  },
};

export default blogService;
