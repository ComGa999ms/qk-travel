import { useState } from "react";
import { Link } from "react-router-dom";

const B2BNewsManagement = () => {
  const [news, setNews] = useState([
    {
      id: 1,
      title: "Khám phá vẻ đẹp mùa thu Hà Giang 2025",
      excerpt:
        "Hà Giang mùa thu với những cánh đồng lúa chín vàng, hoa tam giác mạch đang nở rộ...",
      content: "",
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      category: "destination",
      author: "Admin",
      status: "published",
      views: 1250,
      likes: 89,
      createdAt: "2025-11-01",
      publishedAt: "2025-11-01",
    },
    {
      id: 2,
      title: "Top 10 món ăn đặc sản miền Bắc phải thử",
      excerpt:
        "Từ phở Hà Nội đến bún chả, khám phá những món ăn đặc sản không thể bỏ qua...",
      content: "",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      category: "food",
      author: "Admin",
      status: "published",
      views: 2340,
      likes: 156,
      createdAt: "2025-10-28",
      publishedAt: "2025-10-28",
    },
    {
      id: 3,
      title: "Cẩm nang du lịch Đà Nẵng tự túc",
      excerpt:
        "Hướng dẫn chi tiết về các địa điểm, ẩm thực và lịch trình du lịch Đà Nẵng...",
      content: "",
      image:
        "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
      category: "guide",
      author: "Admin",
      status: "draft",
      views: 0,
      likes: 0,
      createdAt: "2025-11-05",
      publishedAt: null,
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const getCategoryColor = (category) => {
    switch (category) {
      case "destination":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "food":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "guide":
        return "bg-green-100 text-green-700 border-green-200";
      case "tips":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryText = (category) => {
    switch (category) {
      case "destination":
        return "Điểm đến";
      case "food":
        return "Ẩm thực";
      case "guide":
        return "Hướng dẫn";
      case "tips":
        return "Mẹo vặt";
      default:
        return category;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "archived":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "published":
        return "Đã đăng";
      case "draft":
        return "Nháp";
      case "archived":
        return "Lưu trữ";
      default:
        return status;
    }
  };

  const filteredNews =
    activeTab === "all" ? news : news.filter((n) => n.status === activeTab);

  const stats = {
    all: news.length,
    published: news.filter((n) => n.status === "published").length,
    draft: news.filter((n) => n.status === "draft").length,
    totalViews: news.reduce((sum, n) => sum + n.views, 0),
    totalLikes: news.reduce((sum, n) => sum + n.likes, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 sm:py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/b2b"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="fas fa-arrow-left"></i>
                </Link>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                  <i className="fas fa-newspaper mr-2 text-primary-600 text-base sm:text-lg"></i>
                  Quản lý Tin tức
                </h1>
              </div>
              <button
                onClick={() =>
                  alert(
                    "Tính năng Tạo bài viết mới đang được phát triển. Vui lòng quay lại sau!"
                  )
                }
                className="px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-xs sm:text-sm font-medium"
              >
                <i className="fas fa-plus mr-1 sm:mr-2"></i>
                <span className="hidden sm:inline">Tạo bài viết</span>
                <span className="sm:hidden">Tạo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-newspaper text-primary-600 text-xl sm:text-2xl"></i>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {stats.all}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Tổng bài viết</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-check-circle text-green-500 text-xl sm:text-2xl"></i>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {stats.published}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Đã đăng</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-eye text-blue-500 text-xl sm:text-2xl"></i>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {stats.totalViews.toLocaleString()}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Lượt xem</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-heart text-red-500 text-xl sm:text-2xl"></i>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {stats.totalLikes.toLocaleString()}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Lượt thích</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "all"
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tất cả ({stats.all})
              </button>
              <button
                onClick={() => setActiveTab("published")}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "published"
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="fas fa-check mr-1 sm:mr-2"></i>
                Đã đăng ({stats.published})
              </button>
              <button
                onClick={() => setActiveTab("draft")}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "draft"
                    ? "bg-yellow-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="fas fa-file-alt mr-1 sm:mr-2"></i>
                Nháp ({stats.draft})
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-auto sm:min-w-[250px]">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* News List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:h-64">
                {/* Image */}
                <div className="md:w-72 lg:w-80 h-48 md:h-full flex-shrink-0 relative overflow-hidden bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span
                      className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm bg-white/90 ${getCategoryColor(
                        article.category
                      )}`}
                    >
                      {getCategoryText(article.category)}
                    </span>
                    <span
                      className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm bg-white/90 ${getStatusColor(
                        article.status
                      )}`}
                    >
                      {getStatusText(article.status)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col min-h-0">
                  <div className="flex-1 min-h-0">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-user"></i>
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-calendar"></i>
                        <span>
                          {new Date(article.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </div>
                      {article.status === "published" && (
                        <>
                          <div className="flex items-center space-x-1">
                            <i className="fas fa-eye"></i>
                            <span>
                              {article.views.toLocaleString()} lượt xem
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <i className="fas fa-heart"></i>
                            <span>{article.likes} lượt thích</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() =>
                        alert(
                          "Tính năng Chỉnh sửa bài viết đang được phát triển. Vui lòng quay lại sau!"
                        )
                      }
                      className="px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-sm font-medium"
                    >
                      <i className="fas fa-edit mr-1 sm:mr-2"></i>
                      <span className="hidden sm:inline">Chỉnh sửa</span>
                      <span className="sm:hidden">Sửa</span>
                    </button>
                    {article.status === "draft" && (
                      <button
                        onClick={() =>
                          alert(
                            "Tính năng Đăng bài viết đang được phát triển. Vui lòng quay lại sau!"
                          )
                        }
                        className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-medium"
                      >
                        <i className="fas fa-upload mr-1 sm:mr-2"></i>
                        <span className="hidden sm:inline">Đăng bài</span>
                        <span className="sm:hidden">Đăng</span>
                      </button>
                    )}
                    {article.status === "published" && (
                      <button
                        onClick={() =>
                          alert(
                            "Tính năng Gỡ bài viết đang được phát triển. Vui lòng quay lại sau!"
                          )
                        }
                        className="px-3 sm:px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all text-sm font-medium"
                      >
                        <i className="fas fa-eye-slash mr-1 sm:mr-2"></i>
                        <span className="hidden sm:inline">Gỡ bài</span>
                        <span className="sm:hidden">Gỡ</span>
                      </button>
                    )}
                    <button
                      onClick={() =>
                        alert(
                          "Tính năng Xem trước bài viết đang được phát triển. Vui lòng quay lại sau!"
                        )
                      }
                      className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium"
                    >
                      <i className="fas fa-eye mr-1 sm:mr-2"></i>
                      <span className="hidden sm:inline">Xem trước</span>
                      <span className="sm:hidden">Xem</span>
                    </button>
                    <button
                      onClick={() =>
                        alert(
                          "Tính năng Xóa bài viết đang được phát triển. Vui lòng quay lại sau!"
                        )
                      }
                      className="px-3 sm:px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all text-sm font-medium"
                    >
                      <i className="fas fa-trash mr-1 sm:mr-2"></i>
                      <span className="hidden sm:inline">Xóa</span>
                      <span className="sm:hidden">Xóa</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default B2BNewsManagement;
