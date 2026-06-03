import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import blogService from "../services/blogService";
import { motion } from "framer-motion";
import heroImage from "../assets/images/hero-section-image-blog.avif";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination & Filter
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");

  const handleSearch = () => {
    setCurrentSearch(searchTerm);
    setPage(1);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const data = await blogService.getAllBlogs(
          page,
          pageSize,
          currentSearch,
        );
        setBlogs(data.items || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Không thể tải danh sách bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, pageSize, currentSearch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section - Static */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <img
          src={heroImage}
          alt="QkTravel Blog"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-semibold uppercase tracking-wider mb-4">
              Inspire Your Trip
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight shadow-sm">
              Khám phá & Trải nghiệm
            </h1>
            <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto">
              Tổng hợp những kinh nghiệm, bí kíp và câu chuyện du lịch hấp dẫn
              nhất từ cộng đồng QkTravel.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header & Search Bar */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Blog</h2>
              <p className="text-gray-500">
                Chia sẻ kinh nghiệm, hướng dẫn và câu chuyện du lịch.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-auto flex gap-2">
              <div className="relative flex-1 md:w-80">
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <i className="fas fa-search text-4xl mb-4 text-gray-300"></i>
            <p>Không tìm thấy bài viết nào.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                variants={itemVariants}
                className="group flex flex-col h-full bg-transparent"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden rounded-2xl mb-4">
                  <img
                    src={
                      blog.thumbnailUrl ||
                      "https://via.placeholder.com/600x400?text=Blog+Image"
                    }
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="absolute inset-0"
                  ></Link>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-gray-500 mb-3 gap-2">
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("vi-VN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                    {blog.content.replace(/<[^>]+>/g, "").substring(0, 120)}...
                  </p>

                  <div className="flex items-center gap-3 mt-auto pt-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={`https://ui-avatars.com/api/?name=${blog.authorName || "User"}&background=random`}
                        alt="Author"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {blog.authorName || "QkTravel Author"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination (Simple) */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16">
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-all ${
                    page === p
                      ? "bg-primary-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
