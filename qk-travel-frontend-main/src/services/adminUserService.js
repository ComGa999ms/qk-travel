import api from "./api";

const adminUserService = {
  // GET /api/Users - Get list of users with pagination, search, and filter
  getAllUsers: async (page = 1, pageSize = 10, searchTerm = "", role = "") => {
    const params = {
      page,
      pageSize,
    };

    if (searchTerm) {
      params.searchTerm = searchTerm;
    }

    if (role && role !== "All") {
      params.role = role;
    }

    const response = await api.get("/api/Users", { params });
    if (response.data.success) {
      return response.data.data;
    }
    return response.data;
  },

  // GET /api/Users/{id} - Get user details by ID
  getUserById: async (id) => {
    const response = await api.get(`/api/Users/${id}`);
    if (response.data.success) {
      return response.data.data;
    }
    return response.data;
  },

  // GET /api/Users/roles - Get all available roles
  getUserRoles: async () => {
    const response = await api.get("/api/Users/roles");
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  },

  // POST /api/Users/{id}/lock - Lock a user
  lockUser: async (id) => {
    const response = await api.post(`/api/Users/${id}/lock`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to lock user");
  },

  // POST /api/Users/{id}/unlock - Unlock a user
  unlockUser: async (id) => {
    const response = await api.post(`/api/Users/${id}/unlock`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to unlock user");
  },

  // PUT /api/Users/{id}/role - Change user role
  changeUserRole: async (id, role) => {
    const response = await api.put(
      `/api/Users/${id}/role`,
      { role },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to change role");
  },

  // Export helper - Get all current users with role User
  getAllUsersForExport: async () => {
    const exportPageSize = 100;
    const firstPage = await adminUserService.getAllUsers(
      1,
      exportPageSize,
      "",
      "User",
    );

    const totalUsers = firstPage?.totalCount || 0;
    if (totalUsers === 0) {
      return [];
    }

    const totalPages =
      firstPage?.totalPages || Math.ceil(totalUsers / exportPageSize);
    const allUsers = [...(firstPage?.items || [])];

    for (let page = 2; page <= totalPages; page += 1) {
      const pageData = await adminUserService.getAllUsers(
        page,
        exportPageSize,
        "",
        "User",
      );
      allUsers.push(...(pageData?.items || []));
    }

    return allUsers.slice(0, totalUsers);
  },
};

export default adminUserService;
