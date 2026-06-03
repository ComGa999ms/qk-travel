import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { tours } from "../data/tours";
import { formatCurrency } from "../utils/formatCurrency";

const TourDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const tour = tours.find((t) => t.id === parseInt(id));

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <i className="fas fa-exclamation-triangle text-gray-400 text-3xl"></i>
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Tour không tồn tại
          </h1>
          <p className="text-gray-600 mb-8">
            Tour bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link to="/tours" className="btn btn-primary">
            <i className="fas fa-arrow-left mr-2"></i>
            Quay lại danh sách tours
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fas fa-star-half-alt text-yellow-400"></i>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="far fa-star text-gray-300"></i>
      );
    }

    return stars;
  };

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: "fas fa-info-circle" },
    { id: "itinerary", label: "Lịch trình", icon: "fas fa-route" },
    { id: "reviews", label: "Đánh giá", icon: "fas fa-star" },
  ];

  const reviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      rating: 5,
      date: "2 ngày trước",
      comment:
        "Tour rất tuyệt vời, hướng dẫn viên nhiệt tình và chuyên nghiệp. Cảnh quan đẹp, sẽ quay lại lần nữa!",
      verified: true,
    },
    {
      id: 2,
      user: "Trần Thị B",
      rating: 4,
      date: "1 tuần trước",
      comment:
        "Trải nghiệm tốt, giá cả hợp lý. Tuy nhiên thời gian hơi gấp, nên có thêm thời gian tham quan.",
      verified: false,
    },
    {
      id: 3,
      user: "Lê Văn C",
      rating: 5,
      date: "2 tuần trước",
      comment:
        "Tour chất lượng cao, đúng như mô tả. Hướng dẫn viên am hiểu và nhiệt tình. Rất recommend!",
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary-600 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <i className="fas fa-chevron-right text-xs"></i>
            </li>
            <li>
              <Link
                to="/tours"
                className="hover:text-primary-600 transition-colors"
              >
                Tours
              </Link>
            </li>
            <li>
              <i className="fas fa-chevron-right text-xs"></i>
            </li>
            <li className="text-gray-900 font-medium">{tour.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tour Images */}
            <div className="card p-0 mb-8 overflow-hidden">
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-primary">
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    {tour.location}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="badge badge-success">
                    <i className="fas fa-clock mr-1"></i>
                    {tour.duration}
                  </span>
                </div>
                {tour.featured && (
                  <div className="absolute bottom-4 left-4">
                    <span className="badge bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <i className="fas fa-star mr-1"></i>
                      Tour nổi bật
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Tour Info */}
            <div className="card p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                    {tour.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      {renderStars(tour.rating)}
                      <span className="ml-2 font-semibold">{tour.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{tour.reviews} đánh giá</span>
                    <span>•</span>
                    <span>{tour.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600">
                    {formatCurrency(tour.price)}
                  </div>
                  <div className="text-sm text-gray-500">/người</div>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {tour.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <i className="fas fa-clock text-blue-600 text-2xl mb-2"></i>
                  <div className="font-semibold text-gray-900">
                    {tour.duration}
                  </div>
                  <div className="text-sm text-gray-600">Thời gian</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <i className="fas fa-users text-green-600 text-2xl mb-2"></i>
                  <div className="font-semibold text-gray-900">
                    {tour.maxGroupSize}
                  </div>
                  <div className="text-sm text-gray-600">Người tối đa</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <i className="fas fa-map-marker-alt text-purple-600 text-2xl mb-2"></i>
                  <div className="font-semibold text-gray-900">
                    {tour.location}
                  </div>
                  <div className="text-sm text-gray-600">Điểm đến</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <i className="fas fa-star text-yellow-600 text-2xl mb-2"></i>
                  <div className="font-semibold text-gray-900">
                    {tour.rating}
                  </div>
                  <div className="text-sm text-gray-600">Đánh giá</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="card p-0 mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "border-b-2 border-primary-500 text-primary-600"
                          : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <i className={tab.icon}></i>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                        Mô tả chi tiết
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {tour.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                        Điểm nổi bật
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tour.highlights.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <i className="fas fa-check-circle text-green-500"></i>
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "itinerary" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                      Lịch trình chi tiết
                    </h3>
                    {tour.itinerary.map((day, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-6"
                      >
                        {/* {day.day} */}
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Ngày {day.day}: {day.title}
                        </h4>
                        <p className="text-gray-600 mb-4">{day.description}</p>
                        <div className="space-y-2">
                          {day.activities.map((activity, actIndex) => (
                            <div
                              key={actIndex}
                              className="flex items-start space-x-3"
                            >
                              <i className="fas fa-circle text-primary-500 text-xs mt-2"></i>
                              <span className="text-gray-700">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-display font-bold text-gray-900">
                        Đánh giá từ khách hàng
                      </h3>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">
                          {tour.rating}
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(tour.rating)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {tour.reviews} đánh giá
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border border-gray-200 rounded-xl p-6"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-primary-600 font-semibold">
                                  {review.user.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {review.user}
                                </div>
                                <div className="flex items-center space-x-1">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              {review.verified && (
                                <span className="badge badge-success">
                                  <i className="fas fa-check text-xs"></i>
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {review.date}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-8">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
                Đặt tour ngay
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn ngày
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Người lớn
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value))}
                      className="select"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trẻ em
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(parseInt(e.target.value))}
                      className="select"
                    >
                      {[0, 1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Người lớn x{adults}</span>
                  <span className="font-semibold">
                    {formatCurrency(tour.price * adults)}
                  </span>
                </div>
                {children > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Trẻ em x{children}</span>
                    <span className="font-semibold">
                      {formatCurrency(tour.price * children * 0.7)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Tổng cộng</span>
                  <span>
                    {(
                      tour.price * adults +
                      tour.price * children * 0.7
                    ).toLocaleString()}
                    ₫
                  </span>
                </div>
              </div>

              <button className="btn btn-primary w-full text-lg py-4 group mb-4">
                <i className="fas fa-calendar-check mr-3 group-hover:scale-110 transition-transform"></i>
                Đặt tour ngay
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  <i className="fas fa-shield-alt mr-1"></i>
                  Đảm bảo hoàn tiền 100%
                </p>
                <p className="text-sm text-gray-600">
                  <i className="fas fa-headset mr-1"></i>
                  Hỗ trợ 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
