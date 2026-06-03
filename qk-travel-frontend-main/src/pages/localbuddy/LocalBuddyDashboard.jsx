import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const LocalBuddyDashboard = () => {
  const [buddyInfo, setBuddyInfo] = useState({
    name: "Lê Văn Quý",
    avatar:
      "https://th.bing.com/th/id/R.07560b75dd1c25eb9fb17861e56c2cd6?rik=V3gZq4RsH1yPEA&pid=ImgRaw&r=0",
    rating: 4.9,
    reviews: 127,
    tours: 234,
    languages: ["Tiếng Việt", "Japanese", "English"],
    specialties: ["Văn hóa", "Ẩm thực", "Free Fire"],
    verified: true,
    joinDate: "2020-03-15",
  });

  const [stats, setStats] = useState({
    totalEarnings: 145600000,
    monthEarnings: 12300000,
    pendingBookings: 5,
    upcomingTours: 8,
    completedTours: 234,
    avgRating: 4.9,
  });

  const [upcomingTours, setUpcomingTours] = useState([
    {
      id: "T001",
      customer: {
        name: "DucCorp",
        avatar: "https://www.eric.edu.vn/upload/2025/09/anh-avatar-zalo7.webp",
        country: "Indonesia",
      },
      date: "2025-11-10",
      time: "09:00",
      duration: "4 giờ",
      location: "Hà Nội - Phố Cổ",
      guests: 2,
      amount: 1600000,
      status: "confirmed",
      notes: "Quan tâm đến văn hóa và lịch sử",
    },
    {
      id: "T002",
      customer: {
        name: "김민수",
        avatar:
          "https://yt3.googleusercontent.com/ScIqQujEg_iQTfEUYbLYSnuONPBFsEmRlr8j3XE_V1LthfRBoMPGhsQCZ2tWFI4HttDHio4kcqM=s900-c-k-c0x00ffffff-no-rj",
        country: "Korea",
      },
      date: "2025-11-12",
      time: "14:00",
      duration: "3 giờ",
      location: "Hà Nội - Ẩm thực đường phố",
      guests: 3,
      amount: 2400000,
      status: "pending",
      notes: "Muốn thử các món ăn đặc sản",
    },
  ]);

  const [recentReviews, setRecentReviews] = useState([
    {
      id: 1,
      customer: {
        name: "Alan Pici",
        avatar:
          "https://static.vecteezy.com/system/resources/previews/045/755/987/original/child-with-a-smile-cute-boy-face-design-free-vector.jpg",
        country: "UK",
      },
      rating: 5,
      comment:
        "Tuấn là một hướng dẫn viên tuyệt vời! Rất am hiểu về lịch sử và văn hóa Việt Nam.",
      tourDate: "2025-11-01",
      createdAt: "2025-11-02",
    },
    {
      id: 2,
      customer: {
        name: "张伟",
        avatar:
          "https://static.vecteezy.com/system/resources/previews/021/770/055/non_2x/avatar-of-a-north-korean-school-character-free-vector.jpg",
        country: "China",
      },
      rating: 5,
      comment: "非常好的体验！推荐给所有来越南的朋友。",
      tourDate: "2025-10-28",
      createdAt: "2025-10-29",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 sm:py-4">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-user-friends mr-2 text-primary-600 text-base sm:text-lg"></i>
                Local Buddy Dashboard
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    alert(
                      "Tính năng Quản lý Lịch trình đang được phát triển. Vui lòng quay lại sau!"
                    )
                  }
                  className="px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-xs sm:text-sm font-medium"
                >
                  <i className="fas fa-calendar-alt mr-1 sm:mr-2"></i>
                  <span className="hidden sm:inline">Lịch trình</span>
                  <span className="sm:hidden">Lịch</span>
                </button>
                <button
                  onClick={() =>
                    alert(
                      "Tính năng Chỉnh sửa Hồ sơ đang được phát triển. Vui lòng quay lại sau!"
                    )
                  }
                  className="px-3 sm:px-4 py-2 bg-white text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-all text-xs sm:text-sm font-medium"
                >
                  <i className="fas fa-user-edit mr-1 sm:mr-2"></i>
                  <span className="hidden sm:inline">Hồ sơ</span>
                  <span className="sm:hidden">Sửa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 sm:mb-8">
          <div className="relative h-24 sm:h-32 bg-gradient-to-r from-primary-600 to-blue-600">
            <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6">
              <div className="relative">
                <img
                  src={buddyInfo.avatar}
                  alt={buddyInfo.name}
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover ring-4 sm:ring-8 ring-white"
                />
                {buddyInfo.verified && (
                  <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center ring-2 sm:ring-4 ring-white">
                    <i className="fas fa-check text-white text-xs sm:text-sm"></i>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="pt-14 sm:pt-20 pb-4 sm:pb-6 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {buddyInfo.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-star text-yellow-400"></i>
                    <span className="font-bold text-gray-900">
                      {buddyInfo.rating}
                    </span>
                    <span>({buddyInfo.reviews} đánh giá)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-map-marked-alt text-primary-600"></i>
                    <span>{buddyInfo.tours} tours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-calendar text-gray-400"></i>
                    <span>
                      Tham gia{" "}
                      {new Date(buddyInfo.joinDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {buddyInfo.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium"
                    >
                      <i className="fas fa-language mr-1"></i>
                      {lang}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {buddyInfo.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Earnings */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg">
                <i className="fas fa-dollar-sign text-base sm:text-lg"></i>
              </div>
              <span className="text-xs sm:text-sm text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-full font-medium">
                +15.2%
              </span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
              Tổng thu nhập
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {formatCurrency(stats.totalEarnings)}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Tháng này: {formatCurrency(stats.monthEarnings)}
            </p>
          </div>

          {/* Bookings */}
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
              Tour sắp tới
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {stats.upcomingTours}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Hoàn thành: {stats.completedTours} tours
            </p>
          </div>

          {/* Rating */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg">
                <i className="fas fa-star text-base sm:text-lg"></i>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star text-sm sm:text-base ${i < Math.floor(stats.avgRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                      }`}
                  ></i>
                ))}
              </div>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
              Đánh giá trung bình
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {stats.avgRating}/5.0
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Từ {buddyInfo.reviews} đánh giá
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Upcoming Tours */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                    <i className="fas fa-calendar-alt mr-2 text-primary-600"></i>
                    Tours sắp tới
                  </h3>
                  <button
                    onClick={() =>
                      alert(
                        "Tính năng Xem tất cả lịch trình đang được phát triển. Vui lòng quay lại sau!"
                      )
                    }
                    className="text-sm sm:text-base text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Xem tất cả
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {upcomingTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <img
                        src={tour.customer.avatar}
                        alt={tour.customer.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-base sm:text-lg font-bold text-gray-900">
                              {tour.customer.name}
                            </h4>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                              {tour.customer.country}
                            </span>
                          </div>
                          <span
                            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full border ${getStatusColor(
                              tour.status
                            )}`}
                          >
                            {getStatusText(tour.status)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-2">
                            <i className="fas fa-map-marker-alt text-primary-600 w-4"></i>
                            <span className="truncate">{tour.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <i className="fas fa-calendar text-primary-600 w-4"></i>
                            <span>
                              {new Date(tour.date).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <i className="fas fa-clock text-primary-600 w-4"></i>
                            <span>
                              {tour.time} ({tour.duration})
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <i className="fas fa-users text-primary-600 w-4"></i>
                            <span>{tour.guests} khách</span>
                          </div>
                        </div>
                        {tour.notes && (
                          <div className="bg-blue-50 rounded-lg p-2 sm:p-3 mb-3">
                            <p className="text-xs sm:text-sm text-gray-700">
                              <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                              {tour.notes}
                            </p>
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                          <div className="text-base sm:text-lg font-bold text-primary-600">
                            {formatCurrency(tour.amount)}
                          </div>
                          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            {tour.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    alert(
                                      "Tính năng Xác nhận booking đang được phát triển. Vui lòng quay lại sau!"
                                    )
                                  }
                                  className="flex-1 sm:flex-none px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-xs sm:text-sm font-medium"
                                >
                                  <i className="fas fa-check mr-1"></i>
                                  Xác nhận
                                </button>
                                <button
                                  onClick={() =>
                                    alert(
                                      "Tính năng Từ chối booking đang được phát triển. Vui lòng quay lại sau!"
                                    )
                                  }
                                  className="flex-1 sm:flex-none px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-xs sm:text-sm font-medium"
                                >
                                  <i className="fas fa-times mr-1"></i>
                                  Từ chối
                                </button>
                              </>
                            )}
                            <button
                              onClick={() =>
                                alert(
                                  "Tính năng Nhắn tin với khách hàng đang được phát triển. Vui lòng quay lại sau!"
                                )
                              }
                              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-xs sm:text-sm font-medium"
                            >
                              <i className="fas fa-comment mr-1"></i>
                              Nhắn tin
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  <i className="fas fa-star mr-2 text-yellow-400"></i>
                  Đánh giá gần đây
                </h3>
              </div>

              <div className="divide-y divide-gray-100">
                {recentReviews.map((review) => (
                  <div key={review.id} className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 mb-3">
                      <img
                        src={review.customer.avatar}
                        alt={review.customer.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                            {review.customer.name}
                          </h5>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star text-xs ${i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                                }`}
                            ></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-2 line-clamp-3">
                      {review.comment}
                    </p>
                    <p className="text-xs text-gray-500">
                      Tour:{" "}
                      {new Date(review.tourDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 sm:p-6 border-t border-gray-100">
                <button
                  onClick={() =>
                    alert(
                      "Tính năng Xem tất cả đánh giá đang được phát triển. Vui lòng quay lại sau!"
                    )
                  }
                  className="block w-full py-2 text-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Xem tất cả đánh giá
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalBuddyDashboard;
