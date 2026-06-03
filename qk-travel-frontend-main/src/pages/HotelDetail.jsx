import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getHotelBySlug, getHotelById } from "../data/hotels";
import BookingModal from "../components/booking/BookingModal";
import ChatBox from "../components/support/ChatBox";

const HotelDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  let hotel = getHotelBySlug(slug);
  if (!hotel) {
    hotel = getHotelById(slug);
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentRoomPage, setCurrentRoomPage] = useState(1);
  const [showChatDevModal, setShowChatDevModal] = useState(false);
  const roomsPerPage = 5;

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-hotel text-6xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Không tìm thấy khách sạn
          </h2>
          <button
            onClick={() => navigate("/booking/hotels")}
            className="btn btn-primary mt-4"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: "fa-info-circle" },
    { id: "rooms", label: "Loại phòng", icon: "fa-bed" },
    { id: "amenities", label: "Tiện nghi", icon: "fa-concierge-bell" },
    { id: "location", label: "Vị trí", icon: "fa-map-marker-alt" },
    { id: "reviews", label: "Đánh giá", icon: "fa-star" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-primary-600">
              Trang chủ
            </Link>
            <i className="fas fa-chevron-right text-xs"></i>
            <Link to="/booking/hotels" className="hover:text-primary-600">
              Khách sạn
            </Link>
            <i className="fas fa-chevron-right text-xs"></i>
            <span className="text-gray-900 font-medium">{hotel.name}</span>
          </nav>

          {/* Main Image and Thumbnails */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-3">
              <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden group">
                <img
                  src={hotel.images[selectedImage]}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Navigation Arrows */}
                {hotel.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage(
                          selectedImage === 0
                            ? hotel.images.length - 1
                            : selectedImage - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                    >
                      <i className="fas fa-chevron-left text-gray-700"></i>
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage(
                          selectedImage === hotel.images.length - 1
                            ? 0
                            : selectedImage + 1,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                    >
                      <i className="fas fa-chevron-right text-gray-700"></i>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="lg:col-span-1">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 h-full">
                {hotel.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-28 lg:h-[116px] rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImage === index
                        ? "ring-4 ring-primary-500"
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${hotel.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-primary-600/20"></div>
                    )}
                  </div>
                ))}
                {hotel.images.length > 4 && (
                  <div className="relative h-28 lg:h-[116px] rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                    <span className="text-white text-lg font-semibold">
                      +{hotel.images.length - 4} ảnh
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hotel Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                      {hotel.category}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star text-sm ${
                            i < Math.floor(hotel.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {hotel.name}
                  </h1>
                  <div className="flex items-center text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt mr-2 text-primary-600"></i>
                      <span>{hotel.location.address}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-2 mb-2">
                    <div className="bg-primary-600 text-white px-3 py-1 rounded-lg font-bold text-lg">
                      {hotel.rating}
                    </div>
                    <div className="text-sm text-gray-600">
                      ({hotel.reviewCount} đánh giá)
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Tuyệt vời</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "border-primary-600 text-primary-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <i className={`fas ${tab.icon} mr-2`}></i>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Giới thiệu
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {hotel.description}
                      </p>
                    </div>

                    {/* Policies */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Chính sách khách sạn
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-clock text-primary-600 mt-1"></i>
                          <div>
                            <p className="font-medium text-gray-900">
                              Giờ nhận phòng
                            </p>
                            <p className="text-sm text-gray-600">
                              Từ {hotel.policies.checkIn}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-clock text-primary-600 mt-1"></i>
                          <div>
                            <p className="font-medium text-gray-900">
                              Giờ trả phòng
                            </p>
                            <p className="text-sm text-gray-600">
                              Trước {hotel.policies.checkOut}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-undo text-primary-600 mt-1"></i>
                          <div>
                            <p className="font-medium text-gray-900">
                              Hủy phòng
                            </p>
                            <p className="text-sm text-gray-600">
                              {hotel.policies.cancellation}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-baby text-primary-600 mt-1"></i>
                          <div>
                            <p className="font-medium text-gray-900">Trẻ em</p>
                            <p className="text-sm text-gray-600">
                              {hotel.policies.children}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rooms Tab */}
                {activeTab === "rooms" && (
                  <div className="space-y-6">
                    {hotel.roomTypes
                      .slice(
                        (currentRoomPage - 1) * roomsPerPage,
                        currentRoomPage * roomsPerPage,
                      )
                      .map((room) => (
                        <div
                          key={room.id}
                          className="border border-gray-200 rounded-xl p-6 hover:border-primary-300 transition-colors"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                              <img
                                src={room.images[0]}
                                alt={room.name}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {room.name}
                              </h3>
                              <p className="text-gray-600 mb-4">
                                {room.description}
                              </p>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                  <i className="fas fa-expand mr-2 text-primary-600"></i>
                                  {room.size}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <i className="fas fa-users mr-2 text-primary-600"></i>
                                  Tối đa {room.maxGuests} khách
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <i className="fas fa-bed mr-2 text-primary-600"></i>
                                  {room.bedType}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {room.amenities.map((amenity, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center justify-between pt-4 border-t">
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Giá từ
                                  </p>
                                  <p className="text-2xl font-bold text-primary-600">
                                    {formatPrice(room.price)}
                                  </p>
                                  <p className="text-sm text-gray-500">/đêm</p>
                                </div>
                                <button
                                  onClick={() => handleBookRoom(room)}
                                  className="btn btn-primary"
                                >
                                  <i className="fas fa-calendar-check mr-2"></i>
                                  Đặt phòng
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {/* Pagination */}
                    {hotel.roomTypes.length > roomsPerPage && (
                      <div className="flex justify-center items-center space-x-2 mt-8">
                        <button
                          onClick={() =>
                            setCurrentRoomPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentRoomPage === 1}
                          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>

                        {[
                          ...Array(
                            Math.ceil(hotel.roomTypes.length / roomsPerPage),
                          ),
                        ].map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentRoomPage(index + 1)}
                            className={`px-4 py-2 rounded-lg border ${
                              currentRoomPage === index + 1
                                ? "bg-primary-600 text-white border-primary-600"
                                : "border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}

                        <button
                          onClick={() =>
                            setCurrentRoomPage((prev) =>
                              Math.min(
                                prev + 1,
                                Math.ceil(
                                  hotel.roomTypes.length / roomsPerPage,
                                ),
                              ),
                            )
                          }
                          disabled={
                            currentRoomPage ===
                            Math.ceil(hotel.roomTypes.length / roomsPerPage)
                          }
                          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Amenities Tab */}
                {activeTab === "amenities" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Tiện nghi khách sạn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {hotel.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-4 rounded-lg ${
                            amenity.available
                              ? "bg-green-50"
                              : "bg-gray-50 opacity-50"
                          }`}
                        >
                          <i
                            className={`fas ${amenity.icon} text-xl ${
                              amenity.available
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          ></i>
                          <span
                            className={`font-medium ${
                              amenity.available
                                ? "text-gray-900"
                                : "text-gray-500"
                            }`}
                          >
                            {amenity.name}
                          </span>
                          {amenity.available && (
                            <i className="fas fa-check text-green-600 ml-auto"></i>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === "location" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Địa chỉ khách sạn
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-map-marker-alt text-primary-600 text-xl mt-1"></i>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">
                              {hotel.name}
                            </p>
                            <p className="text-gray-600">
                              {hotel.location.address}
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                              {hotel.location.city}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Map */}
                      <div className="rounded-xl overflow-hidden shadow-md">
                        <iframe
                          src={`https://www.google.com/maps?q=${hotel.location.coordinates.lat},${hotel.location.coordinates.lng}&hl=vi&z=16&output=embed`}
                          width="100%"
                          height="450"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Hotel Location"
                        ></iframe>
                      </div>

                      {/* Directions */}
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.location.coordinates.lat},${hotel.location.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          <i className="fas fa-directions"></i>
                          <span>Chỉ đường</span>
                        </a>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            hotel.name + " " + hotel.location.address,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 bg-white text-gray-700 border-2 border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <i className="fas fa-map"></i>
                          <span>Xem trên Google Maps</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Đánh giá từ khách hàng
                      </h2>
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                          {hotel.rating}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Tuyệt vời
                          </p>
                          <p className="text-xs text-gray-500">
                            {hotel.reviewCount} đánh giá
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {hotel.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-200 pb-6 last:border-0"
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.userAvatar}
                              alt={review.userName}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {review.userName}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {new Date(review.date).toLocaleDateString(
                                      "vi-VN",
                                    )}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <i
                                      key={i}
                                      className={`fas fa-star text-sm ${
                                        i < review.rating
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    ></i>
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-3">
                                {review.comment}
                              </p>
                              <button className="text-sm text-gray-500 hover:text-primary-600">
                                <i className="far fa-thumbs-up mr-1"></i>
                                Hữu ích ({review.helpful})
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Giá từ</p>
                <p className="text-3xl font-bold text-primary-600">
                  {formatPrice(hotel.startingPrice)}
                </p>
                <p className="text-sm text-gray-500">/đêm</p>
              </div>

              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full btn btn-primary py-3 text-lg mb-4"
              >
                <i className="fas fa-calendar-check mr-2"></i>
                Đặt phòng ngay
              </button>

              {/* Host Info */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Thông tin chủ khách sạn
                </h3>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                    <img
                      src={hotel.hostInfo.avatar}
                      alt={hotel.hostInfo.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {hotel.hostInfo.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {hotel.hostInfo.name}
                    </p>
                    <p className="text-xs text-gray-500">Chủ khách sạn</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tỷ lệ phản hồi:</span>
                    <span className="font-semibold text-gray-900">
                      {hotel.hostInfo.responseRate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Thời gian phản hồi:</span>
                    <span className="font-semibold text-gray-900">
                      {hotel.hostInfo.responseTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Button */}
              <div className="border-t mt-6 pt-6">
                <button
                  onClick={() => setShowChatDevModal(true)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
                >
                  <i className="fas fa-comments"></i>
                  <span>Chat với chủ khách sạn</span>
                </button>
              </div>

              {/* Chat Development Modal */}
              {showChatDevModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                  onClick={() => setShowChatDevModal(false)}
                >
                  <div
                    className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 transform transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-center">
                      <div className="mb-4">
                        <i className="fas fa-tools text-5xl text-primary-500"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Chức năng đang phát triển
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Tính năng chat với chủ khách sạn đang được phát triển và
                        sẽ sớm ra mắt.
                      </p>
                      <button
                        onClick={() => setShowChatDevModal(false)}
                        className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        hotel={hotel}
        selectedRoom={selectedRoom}
      />

      {/* Chat Box */}
      <ChatBox hostInfo={hotel.hostInfo} hotelName={hotel.name} />
    </div>
  );
};

export default HotelDetail;
