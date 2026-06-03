import React, { useState, useEffect, useCallback } from "react";
import blogService from "../../services/blogService";
import BlogFormModal from "../../components/admin/BlogFormModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import AlertDialog from "../../components/common/AlertDialog";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // All, Published, Draft
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Fetch Blogs
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      let isPublished = null;
      if (statusFilter === "Published") isPublished = true;
      if (statusFilter === "Draft") isPublished = false;

      const data = await blogService.getAllBlogsAdmin(
        page,
        pageSize,
        searchTerm,
        isPublished,
      );

      setBlogs(data.items || []);
      setTotalPages(data.totalPages || 0);
      setTotalCount(data.totalCount || 0);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchTerm, statusFilter]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchBlogs]);

  // Handlers
  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedBlog(null);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!confirmDelete.id) return;
    try {
      await blogService.deleteBlog(confirmDelete.id);
      setAlert({
        show: true,
        message: "Xóa bài viết thành công",
        type: "success",
      });
      fetchBlogs();
    } catch {
      setAlert({ show: true, message: "Lỗi khi xóa bài viết", type: "error" });
    } finally {
      setConfirmDelete({ show: false, id: null });
    }
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    fetchBlogs();
    setAlert({
      show: true,
      message: selectedBlog ? "Cập nhật thành công" : "Tạo mới thành công",
      type: "success",
    });
  };

  return (
    <div className="p-6">
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Blog</h1>
            <p className="mt-2 text-sm text-gray-600">
              Tổng số bài viết: <span className="font-bold">{totalCount}</span>
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md"
          >
            <i className="fas fa-plus mr-2"></i>
            Viết bài mới
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Tìm kiếm tiêu đề..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Trạng thái:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">Tất cả</option>
              <option value="Published">Đã xuất bản</option>
              <option value="Draft">Bản nháp</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <i className="fas fa-spinner fa-spin text-3xl text-primary-600"></i>
            </div>
          ) : blogs.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Không tìm thấy bài viết nào
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bài viết
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tác giả
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={
                                blog.thumbnailUrl ||
                                "https://via.placeholder.com/150"
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div
                              className="text-sm font-medium text-gray-900 line-clamp-1 max-w-xs"
                              title={blog.title}
                            >
                              {blog.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {blog.tags?.join(", ")}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {blog.authorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            blog.isPublished
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {blog.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() =>
                            setConfirmDelete({ show: true, id: blog.id })
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Trang {page} / {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Trước
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isFormOpen && (
        <BlogFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          blog={selectedBlog}
          onSuccess={handleFormSubmit}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDelete.show}
        onClose={() => setConfirmDelete({ show: false, id: null })}
        onConfirm={handleDelete}
        title="Xóa bài viết"
        message="Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        type="danger"
      />

      <AlertDialog
        isOpen={alert.show}
        onClose={() => setAlert({ ...alert, show: false })}
        title={alert.type === "success" ? "Thành công" : "Lỗi"}
        message={alert.message}
        type={alert.type}
      />
    </div>
  );
};

export default AdminBlogs;
