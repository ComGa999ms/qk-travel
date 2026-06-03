import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const B2BBookingManagement = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [bookings, setBookings] = useState([
    {
      id: "BK001",
      customer: {
        name: "Nguyễn Văn A",
        email: "nguyenvana@email.com",
        phone: "0901234567",
        avatar: "https://i.pravatar.cc/150?img=33",
      },
      service: {
        name: "Tour Hạ Long 3N2Đ",
        type: "tour",
        image:
          "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400",
      },
      date: "2025-11-10",
      guests: 4,
      amount: 50000000,
      status: "pending",
      createdAt: "2025-11-06 10:30",
    },
    {
      id: "BK002",
      customer: {
        name: "Trần Thị B",
        email: "tranthib@email.com",
        phone: "0912345678",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      service: {
        name: "Khách sạn Đà Nẵng Premium",
        type: "hotel",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      },
      date: "2025-11-08",
      guests: 2,
      amount: 5400000,
      status: "confirmed",
      createdAt: "2025-11-05 14:20",
    },
    {
      id: "BK003",
      customer: {
        name: "Lê Minh C",
        email: "leminhc@email.com",
        phone: "0923456789",
        avatar: "https://i.pravatar.cc/150?img=51",
      },
      service: {
        name: "Nhà hàng Hải Sản Đặc sản",
        type: "restaurant",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      },
      date: "2025-11-07",
      guests: 6,
      amount: 3000000,
      status: "completed",
      createdAt: "2025-11-04 16:45",
      review: {
        rating: 5,
        comment: "Dịch vụ tuyệt vời!",
      },
    },
    {
      id: "BK004",
      customer: {
        name: "Phạm Thu D",
        email: "phamthud@email.com",
        phone: "0934567890",
        avatar: "https://i.pravatar.cc/150?img=10",
      },
      service: {
        name: "Local Buddy Hà Nội",
        type: "buddy",
        image: "https://i.pravatar.cc/150?img=33",
      },
      date: "2025-11-12",
      guests: 2,
      amount: 1600000,
      status: "pending",
      createdAt: "2025-11-06 09:15",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getServiceIcon = (type) => {
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

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "all") return true;
    return b.status === activeTab;
  });

  const stats = {
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/b2b"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="fas fa-arrow-left"></i>
              </Link>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-calendar-check mr-2 text-primary-600 text-base sm:text-lg"></i>
                Quản lý Booking
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-clock text-yellow-500 text-xl sm:text-2xl"></i>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {stats.pending}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Chờ xác nhận</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-check-circle text-blue-500 text-xl sm:text-2xl"></i>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {stats.confirmed}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Đã xác nhận</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-check-double text-green-500 text-xl sm:text-2xl"></i>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {stats.completed}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Hoàn thành</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-times-circle text-red-500 text-xl sm:text-2xl"></i>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {stats.cancelled}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Đã hủy</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "all"
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tất cả ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "pending"
                    ? "bg-yellow-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="fas fa-clock mr-1 sm:mr-2"></i>
                Chờ ({stats.pending})
              </button>
              <button
                onClick={() => setActiveTab("confirmed")}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "confirmed"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="fas fa-check mr-1 sm:mr-2"></i>
                <span className="hidden sm:inline">Đã xác nhận</span>
                <span className="sm:hidden">Xác nhận</span> ({stats.confirmed})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === "completed"
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className="fas fa-check-double mr-1 sm:mr-2"></i>
                <span className="hidden sm:inline">Hoàn thành</span>
                <span className="sm:hidden">Xong</span> ({stats.completed})
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-auto sm:min-w-[250px]">
              <input
                type="text"
                placeholder="Tìm mã booking..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <img
                      src={booking.customer.avatar}
                      alt={booking.customer.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                          {booking.customer.name}
                        </h4>
                        <span className="text-xs sm:text-sm font-semibold text-primary-600 whitespace-nowrap">
                          #{booking.id}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 space-y-0.5">
                        <div className="flex items-center space-x-1">
                          <i className="fas fa-envelope w-4"></i>
                          <span className="truncate">
                            {booking.customer.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <i className="fas fa-phone w-4"></i>
                          <span>{booking.customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full border whitespace-nowrap ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {getStatusText(booking.status)}
                  </span>
                </div>

                {/* Service Info */}
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-4 sm:mb-6">
                  <img
                    src={booking.service.image}
                    alt={booking.service.name}
                    className="w-full sm:w-24 sm:h-24 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <i
                        className={`fas ${getServiceIcon(
                          booking.service.type
                        )} text-primary-600`}
                      ></i>
                      <h5 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                        {booking.service.name}
                      </h5>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div>
                        <span className="text-gray-500">Ngày:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {new Date(booking.date).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Số khách:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {booking.guests} người
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Đặt lúc:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {booking.createdAt}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Tổng tiền:</span>
                        <span className="ml-2 font-bold text-primary-600">
                          {formatCurrency(booking.amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review (if completed) */}
                {booking.review && (
                  <div className="bg-green-50 rounded-lg p-3 sm:p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star text-sm ${
                              i < booking.review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          ></i>
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        Đánh giá từ khách hàng
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 italic">
                      "{booking.review.comment}"
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-4 border-t border-gray-100">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          alert(
                            "Tính năng Xác nhận booking đang được phát triển. Vui lòng quay lại sau!"
                          )
                        }
                        className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium text-sm"
                      >
                        <i className="fas fa-check mr-2"></i>
                        Xác nhận
                      </button>
                      <button
                        onClick={() =>
                          alert(
                            "Tính năng Từ chối booking đang được phát triển. Vui lòng quay lại sau!"
                          )
                        }
                        className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium text-sm"
                      >
                        <i className="fas fa-times mr-2"></i>
                        Từ chối
                      </button>
                    </>
                  )}
                  <button
                    onClick={() =>
                      alert(
                        "Tính năng Chi tiết booking đang được phát triển. Vui lòng quay lại sau!"
                      )
                    }
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium text-sm"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    Chi tiết
                  </button>
                  <button
                    onClick={() =>
                      alert(
                        "Tính năng Liên hệ khách hàng đang được phát triển. Vui lòng quay lại sau!"
                      )
                    }
                    className="px-4 py-2.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-all font-medium text-sm"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    <span className="hidden sm:inline">Liên hệ</span>
                    <span className="sm:hidden">Email</span>
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

export default B2BBookingManagement;
