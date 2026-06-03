import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGuideById } from "../data/guides";
import { formatCurrency } from "../utils/formatCurrency";
import useDialog from "../hooks/useDialog";
import AlertDialog from "../components/common/AlertDialog";

const GuideDetail = () => {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const { alertDialog, showAlert, hideDialog } = useDialog();

  const guide = getGuideById(guideId) || {
    id: guideId,
    name: "Guide không tìm thấy",
    avatar: "https://i.pravatar.cc/150?img=33",
    coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    location: "Chưa xác định",
    languages: ["Tiếng Việt"],
    rating: 0,
    reviewCount: 0,
    hourlyRate: 0,
    specialties: [],
    bio: "Không tìm thấy thông tin hướng dẫn viên này.",
    verified: false,
    responseTime: "N/A",
    completedTours: 0,
    joinedDate: "N/A",
    skills: [],
    services: [],
    reviews: [],
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`fas fa-star ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      ></i>
    ));
  };

  const handleHire = () => {
    // TODO: Implement hire logic
    showAlert({
      title: "Sắp ra mắt",
      message: "Chức năng thuê HDV đang được phát triển.",
      type: "info",
    });
  };

  const handleChat = () => {
    showAlert({
      title: "Sắp ra mắt",
      message: "Chức năng chat với HDV đang được phát triển.",
      type: "info",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 lg:h-80 bg-gradient-to-br from-primary-600 to-blue-700">
        <img
          src={guide.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
        >
          <i className="fas fa-arrow-left text-gray-700"></i>
        </button>
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={guide.avatar}
                  alt={guide.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
                />
                {guide.verified && (
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
                    <i className="fas fa-check text-white"></i>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {guide.name}
                </h1>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 mb-3">
                  <i className="fas fa-map-marker-alt text-primary-500"></i>
                  <span>{guide.location}</span>
                  <span>•</span>
                  <span>Tham gia {guide.joinedDate}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <div className="flex items-center">
                    {renderStars(Math.floor(guide.rating))}
                    <span className="ml-2 font-bold text-gray-900">
                      {guide.rating}
                    </span>
                  </div>
                  <span className="text-gray-500 ml-2">
                    ({guide.reviewCount} đánh giá)
                  </span>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  {guide.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      <i className="fas fa-language mr-1"></i>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 w-full md:w-auto">
                <button
                  onClick={handleHire}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-handshake mr-2"></i>
                  Thuê HDV
                </button>
                <button
                  onClick={handleChat}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-comment-dots mr-2"></i>
                  Chat với HDV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <i className="fas fa-user-circle text-primary-600 mr-2"></i>
                Giới thiệu
              </h2>
              <p className="text-gray-600 leading-relaxed">{guide.bio}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <i className="fas fa-star text-primary-600 mr-2"></i>
                Kỹ năng & Chuyên môn
              </h2>
              <div className="flex flex-wrap gap-3">
                {guide.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-50 text-green-700 rounded-xl font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <i className="fas fa-briefcase text-primary-600 mr-2"></i>
                Dịch vụ
              </h2>
              <div className="space-y-4">
                {guide.services.map((service, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          <i className="fas fa-clock mr-1"></i>
                          {service.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          {formatCurrency(service.price)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <i className="fas fa-comments text-primary-600 mr-2"></i>
                Đánh giá từ khách du lịch ({guide.reviewCount})
              </h2>
              <div className="space-y-6">
                {guide.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {review.userName}
                            </h4>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-500 ml-2">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-3">
                          {review.comment}
                        </p>
                        <button className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                          <i className="fas fa-thumbs-up mr-1"></i>
                          Hữu ích ({review.helpful})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Thông tin nhanh</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    <i className="fas fa-clock text-primary-600 mr-2"></i>
                    Phản hồi
                  </span>
                  <span className="font-semibold text-gray-900">
                    {guide.responseTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    <i className="fas fa-check-circle text-primary-600 mr-2"></i>
                    Tours đã hoàn thành
                  </span>
                  <span className="font-semibold text-gray-900">
                    {guide.completedTours}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    <i className="fas fa-money-bill-wave text-primary-600 mr-2"></i>
                    Giá mỗi giờ
                  </span>
                  <span className="font-semibold text-primary-600">
                    {guide.hourlyRate.toLocaleString()}đ
                  </span>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Chuyên môn</h3>
              <div className="space-y-2">
                {guide.specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className="flex items-center text-gray-700 bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    {specialty}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl shadow-sm p-6 border border-primary-100">
              <h3 className="font-bold text-gray-900 mb-3 text-center">
                Sẵn sàng khám phá?
              </h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                Liên hệ ngay để lên kế hoạch chuyến đi của bạn!
              </p>
              <button
                onClick={handleHire}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                <i className="fas fa-handshake mr-2"></i>
                Thuê HDV ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertDialog.show}
        onClose={hideDialog}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
        buttonText={alertDialog.buttonText}
      />
    </div>
  );
};

export default GuideDetail;
