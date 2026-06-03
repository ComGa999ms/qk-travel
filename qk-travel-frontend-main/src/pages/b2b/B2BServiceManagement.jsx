import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const B2BServiceManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Tour Hạ Long 3N2Đ",
      type: "tour",
      price: 12500000,
      status: "active",
      bookings: 245,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400",
    },
    {
      id: 2,
      name: "Khách sạn Đà Nẵng Premium",
      type: "hotel",
      price: 2500000,
      status: "active",
      bookings: 432,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    },
    {
      id: 3,
      name: "Nhà hàng Hải Sản Đặc sản",
      type: "restaurant",
      price: 500000,
      status: "active",
      bookings: 856,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    },
    {
      id: 4,
      name: "Local Buddy Hà Nội",
      type: "buddy",
      price: 800000,
      status: "active",
      bookings: 123,
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    },
    {
      id: 5,
      name: "Tour Phú Quốc 4N3Đ",
      type: "tour",
      price: 15000000,
      status: "inactive",
      bookings: 87,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=400",
    },
  ]);

  const getTypeColor = (type) => {
    switch (type) {
      case "tour":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "hotel":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "restaurant":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "buddy":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case "tour":
        return "Tour";
      case "hotel":
        return "Khách sạn";
      case "restaurant":
        return "Nhà hàng";
      case "buddy":
        return "Local Buddy";
      default:
        return type;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "tour":
        return "fa-map-marked-alt";
      case "hotel":
        return "fa-hotel";
      case "restaurant":
        return "fa-utensils";
      case "buddy":
        return "fa-user-friends";
      default:
        return "fa-concierge-bell";
    }
  };

  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter((s) => s.type === activeTab);

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
                  <i className="fas fa-concierge-bell mr-2 text-primary-600 text-base sm:text-lg"></i>
                  Quản lý Dịch vụ
                </h1>
              </div>
              <button
                onClick={() =>
                  alert(
                    "Tính năng Thêm dịch vụ mới đang được phát triển. Vui lòng quay lại sau!"
                  )
                }
                className="px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-xs sm:text-sm font-medium"
              >
                <i className="fas fa-plus mr-1 sm:mr-2"></i>
                <span className="hidden sm:inline">Thêm dịch vụ</span>
                <span className="sm:hidden">Thêm</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                <i className="fas fa-map-marked-alt text-sm sm:text-base"></i>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Tours
              </span>
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {services.filter((s) => s.type === "tour").length}
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                <i className="fas fa-hotel text-sm sm:text-base"></i>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Hotels
              </span>
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {services.filter((s) => s.type === "hotel").length}
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                <i className="fas fa-utensils text-sm sm:text-base"></i>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Nhà hàng
              </span>
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {services.filter((s) => s.type === "restaurant").length}
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                <i className="fas fa-user-friends text-sm sm:text-base"></i>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Buddies
              </span>
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {services.filter((s) => s.type === "buddy").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "all"
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="fas fa-th mr-2"></i>
                Tất cả ({services.length})
              </button>
              <button
                onClick={() => setActiveTab("tour")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "tour"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="fas fa-map-marked-alt mr-2"></i>
                <span className="hidden sm:inline">Tours</span>
                <span className="sm:hidden">Tour</span>
              </button>
              <button
                onClick={() => setActiveTab("hotel")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "hotel"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="fas fa-hotel mr-2"></i>
                <span className="hidden sm:inline">Hotels</span>
                <span className="sm:hidden">Hotel</span>
              </button>
              <button
                onClick={() => setActiveTab("restaurant")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "restaurant"
                    ? "bg-orange-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="fas fa-utensils mr-2"></i>
                <span className="hidden sm:inline">Nhà hàng</span>
                <span className="sm:hidden">NHà</span>
              </button>
              <button
                onClick={() => setActiveTab("buddy")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "buddy"
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="fas fa-user-friends mr-2"></i>
                <span className="hidden sm:inline">Buddies</span>
                <span className="sm:hidden">Buddy</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-auto sm:min-w-[250px]">
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span
                    className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm bg-white/90 ${getTypeColor(
                      service.type
                    )}`}
                  >
                    <i className={`fas ${getTypeIcon(service.type)} mr-1`}></i>
                    {getTypeText(service.type)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${
                      service.status === "active"
                        ? "bg-green-100/90 text-green-700 border-green-200"
                        : "bg-gray-100/90 text-gray-700 border-gray-200"
                    }`}
                  >
                    {service.status === "active" ? "Hoạt động" : "Tạm dừng"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                  {service.name}
                </h3>

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-primary-600">
                      {formatCurrency(service.price)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {service.type === "restaurant" ? "/người" : "/tour"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <i className="fas fa-star text-yellow-400 text-sm"></i>
                      <span className="text-sm font-bold text-gray-900">
                        {service.rating}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {service.bookings} bookings
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      alert(
                        "Tính năng Chỉnh sửa dịch vụ đang được phát triển. Vui lòng quay lại sau!"
                      )
                    }
                    className="flex-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-sm font-medium"
                  >
                    <i className="fas fa-edit mr-1 sm:mr-2"></i>
                    <span className="hidden sm:inline">Chỉnh sửa</span>
                    <span className="sm:hidden">Sửa</span>
                  </button>
                  <button
                    onClick={() =>
                      alert(
                        "Tính năng Xem thống kê dịch vụ đang được phát triển. Vui lòng quay lại sau!"
                      )
                    }
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    <i className="fas fa-chart-line"></i>
                  </button>
                  <button
                    onClick={() =>
                      alert(
                        "Tính năng Tùy chọn khác đang được phát triển. Vui lòng quay lại sau!"
                      )
                    }
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default B2BServiceManagement;
