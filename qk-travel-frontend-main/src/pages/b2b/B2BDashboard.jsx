import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const B2BDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 1250000000,
    monthlyRevenue: 320000000,
    totalBookings: 1543,
    pendingBookings: 28,
    activeServices: 156,
    totalCustomers: 4231,
    avgRating: 4.8,
    reviewCount: 2341,
  });

  const [recentBookings, setRecentBookings] = useState([
    {
      id: "BK001",
      customer: "Nguyễn Văn A",
      service: "Tour Hạ Long 3N2Đ",
      type: "tour",
      date: "2025-11-10",
      amount: 12500000,
      status: "pending",
    },
    {
      id: "BK002",
      customer: "Trần Thị B",
      service: "Khách sạn Đà Nẵng",
      type: "hotel",
      date: "2025-11-08",
      amount: 5400000,
      status: "confirmed",
    },
    {
      id: "BK003",
      customer: "Lê Minh C",
      service: "Nhà hàng Hải Sản",
      type: "restaurant",
      date: "2025-11-07",
      amount: 2300000,
      status: "completed",
    },
    {
      id: "BK004",
      customer: "Phạm Thu D",
      service: "Local Buddy Hà Nội",
      type: "buddy",
      date: "2025-11-12",
      amount: 800000,
      status: "pending",
    },
  ]);

  const [revenueChart, setRevenueChart] = useState([
    { month: "T6", value: 280 },
    { month: "T7", value: 320 },
    { month: "T8", value: 380 },
    { month: "T9", value: 340 },
    { month: "T10", value: 420 },
    { month: "T11", value: 320 },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 sm:py-4">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-chart-line mr-2 text-primary-600 text-base sm:text-lg"></i>
                B2B Dashboard
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    alert(
                      "Tính năng Thêm dịch vụ đang được phát triển. Vui lòng quay lại sau!"
                    )
                  }
                  className="px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-xs sm:text-sm font-medium"
                >
                  <i className="fas fa-plus mr-1 sm:mr-2"></i>
                  <span className="hidden sm:inline">Thêm dịch vụ</span>
                  <span className="sm:hidden">Dịch vụ</span>
                </button>
                <button
                  onClick={() =>
                    alert(
                      "Tính năng Đăng tin tức đang được phát triển. Vui lòng quay lại sau!"
                    )
                  }
                  className="px-3 sm:px-4 py-2 bg-white text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-all text-xs sm:text-sm font-medium"
                >
                  <i className="fas fa-newspaper mr-1 sm:mr-2"></i>
                  <span className="hidden sm:inline">Đăng tin</span>
                  <span className="sm:hidden">Tin</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg">
                <i className="fas fa-dollar-sign text-base sm:text-lg"></i>
              </div>
              <span className="text-xs sm:text-sm text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-full font-medium">
                +12.5%
              </span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
              Tổng doanh thu
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {formatCurrency(stats.totalRevenue)}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Tháng này: {formatCurrency(stats.monthlyRevenue)}
            </p>
          </div>

          {/* Total Bookings */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg">
                <i className="fas fa-calendar-check text-base sm:text-lg"></i>
              </div>
              <span className="text-xs sm:text-sm text-yellow-600 bg-yellow-50 px-2 sm:px-3 py-1 rounded-full font-medium">
                {stats.pendingBookings} chờ
              </span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
              Tổng booking
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {stats.totalBookings.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Cần xác nhận: {stats.pendingBookings}
            </p>
          </div>

          {/* Active Services */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg">
                <i className="fas fa-concierge-bell text-base sm:text-lg"></i>
              </div>
              <span className="text-xs sm:text-sm text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full font-medium">
                Hoạt động
              </span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
              Dịch vụ
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {stats.activeServices}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Đang hoạt động
            </p>
          </div>

          {/* Customers & Rating */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg">
                <i className="fas fa-users text-base sm:text-lg"></i>
              </div>
              <div className="flex items-center space-x-1">
                <i className="fas fa-star text-yellow-400 text-sm sm:text-base"></i>
                <span className="text-xs sm:text-sm font-bold text-gray-900">
                  {stats.avgRating}
                </span>
              </div>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
              Khách hàng
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {stats.totalCustomers.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              {stats.reviewCount} đánh giá
            </p>
          </div>
        </div>

        {/* Revenue Chart & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                <i className="fas fa-chart-bar mr-2 text-primary-600"></i>
                Doanh thu 6 tháng
              </h3>
              <select className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>2025</option>
                <option>2024</option>
              </select>
            </div>
            <div className="relative h-48 sm:h-56 lg:h-64 flex items-end justify-between pt-8 sm:pt-10">
              {revenueChart.map((item, index) => {
                // Tính toán chiều cao tương đối (max value = 420)
                const maxValue = 420;
                const heightPercent = (item.value / maxValue) * 100;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1 h-full"
                  >
                    <div className="relative w-full px-1 sm:px-2 h-full flex flex-col justify-end">
                      {/* Label trên cột */}
                      <div className="text-center mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm font-bold text-gray-700">
                          {item.value}M
                        </span>
                      </div>
                      {/* Cột biểu đồ */}
                      <div
                        className="bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg sm:rounded-t-xl hover:from-primary-700 hover:to-primary-500 transition-all cursor-pointer shadow-lg w-full"
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                    </div>
                    {/* Label tháng */}
                    <span className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 font-medium">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
              <i className="fas fa-bolt mr-2 text-yellow-500"></i>
              Thao tác nhanh
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <Link
                to="/b2b/bookings"
                className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                    <i className="fas fa-calendar-alt text-sm sm:text-base"></i>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    Quản lý Booking
                  </span>
                </div>
                <i className="fas fa-arrow-right text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
              </Link>

              <Link
                to="/b2b/services"
                className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                    <i className="fas fa-concierge-bell text-sm sm:text-base"></i>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    Quản lý Dịch vụ
                  </span>
                </div>
                <i className="fas fa-arrow-right text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all"></i>
              </Link>

              <Link
                to="/b2b/news"
                className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                    <i className="fas fa-newspaper text-sm sm:text-base"></i>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    Quản lý Tin tức
                  </span>
                </div>
                <i className="fas fa-arrow-right text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all"></i>
              </Link>

              <button
                onClick={() =>
                  alert(
                    "Tính năng Báo cáo & Phân tích đang được phát triển. Vui lòng quay lại sau!"
                  )
                }
                className="w-full flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl hover:shadow-md transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                    <i className="fas fa-chart-pie text-sm sm:text-base"></i>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    Báo cáo & Phân tích
                  </span>
                </div>
                <i className="fas fa-arrow-right text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                <i className="fas fa-clock mr-2 text-primary-600"></i>
                Booking gần đây
              </h3>
              <Link
                to="/b2b/bookings"
                className="text-sm sm:text-base text-primary-600 hover:text-primary-700 font-medium"
              >
                Xem tất cả
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mã booking
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Dịch vụ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {booking.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {booking.customer}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <i
                          className={`fas ${getServiceIcon(
                            booking.type
                          )} text-primary-600`}
                        ></i>
                        <span className="text-sm text-gray-900">
                          {booking.service}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {new Date(booking.date).toLocaleDateString("vi-VN")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(booking.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() =>
                          alert(
                            "Tính năng Chi tiết booking đang được phát triển. Vui lòng quay lại sau!"
                          )
                        }
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        Chi tiết
                        <i className="fas fa-chevron-right ml-2"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-sm font-bold text-gray-900">
                      {booking.id}
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      <i
                        className={`fas ${getServiceIcon(
                          booking.type
                        )} text-primary-600 text-sm`}
                      ></i>
                      <span className="text-sm text-gray-900">
                        {booking.service}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {getStatusText(booking.status)}
                  </span>
                </div>
                <div className="space-y-1 text-sm mb-3">
                  <div className="text-gray-600">{booking.customer}</div>
                  <div className="text-gray-500">
                    {new Date(booking.date).toLocaleDateString("vi-VN")}
                  </div>
                  <div className="font-bold text-gray-900">
                    {formatCurrency(booking.amount)}
                  </div>
                </div>
                <button
                  onClick={() =>
                    alert(
                      "Tính năng Chi tiết booking đang được phát triển. Vui lòng quay lại sau!"
                    )
                  }
                  className="w-full py-2 text-primary-600 hover:text-primary-700 font-medium text-sm border border-primary-200 rounded-lg hover:bg-primary-50 transition-all"
                >
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default B2BDashboard;
