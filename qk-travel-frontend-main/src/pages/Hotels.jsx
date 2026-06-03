import React, { useState } from "react";
import { Link } from "react-router-dom";
import { hotels, cities, categories, priceRanges } from "../data/hotels";

const Hotels = () => {
  const [selectedCity, setSelectedCity] = useState("Tất cả");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 9;

  // Filter hotels
  const filteredHotels = hotels.filter((hotel) => {
    const matchesCity =
      selectedCity === "Tất cả" || hotel.location.city === selectedCity;
    const matchesCategory =
      selectedCategory === "Tất cả" || hotel.category === selectedCategory;
    const matchesPrice =
      hotel.startingPrice >= selectedPriceRange.min &&
      hotel.startingPrice <= selectedPriceRange.max;
    const matchesSearch =
      searchTerm === "" ||
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCity && matchesCategory && matchesPrice && matchesSearch;
  });

  // Sort hotels
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.startingPrice - b.startingPrice;
      case "price-high":
        return b.startingPrice - a.startingPrice;
      case "rating":
        return b.rating - a.rating;
      case "popular":
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedHotels.length / hotelsPerPage);
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = sortedHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCity, selectedCategory, selectedPriceRange, searchTerm, sortBy]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Featured hotels for slider (top rated)
  const featuredHotels = [...hotels]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredHotels.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredHotels.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredHotels.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredHotels.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Hotels Slider */}
      <div className="relative h-[500px] overflow-hidden bg-gray-900">
        {/* Slides */}
        {featuredHotels.map((hotel, index) => (
          <div
            key={hotel.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${hotel.images[0]}')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl">
                {/* Badge */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-4 py-1.5 bg-primary-600 text-white text-sm font-semibold rounded-full">
                    Đề xuất
                  </span>
                  <span className="px-4 py-1.5 bg-yellow-500 text-white text-sm font-semibold rounded-full flex items-center">
                    <i className="fas fa-star mr-1"></i>
                    {hotel.rating} ({hotel.reviewCount} đánh giá)
                  </span>
                </div>

                {/* Hotel Name */}
                <h1 className="text-white text-4xl lg:text-6xl font-bold mb-4">
                  {hotel.name}
                </h1>

                {/* Location */}
                <div className="flex items-center text-white/90 text-lg mb-4">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>{hotel.location.city}</span>
                </div>

                {/* Description */}
                <p className="text-white/80 text-lg mb-6 line-clamp-2">
                  {hotel.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-white/90 text-sm bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg"
                    >
                      <i className={`fas ${amenity.icon} mr-2`}></i>
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div>
                  <Link
                    to={`/booking/hotels/${hotel.slug}`}
                    className="btn btn-primary text-lg px-8 py-3 inline-flex items-center"
                  >
                    Xem chi tiết & Đặt phòng
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {featuredHotels.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm khách sạn theo tên, địa điểm..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-map-marker-alt mr-2 text-primary-600"></i>
                Thành phố
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-hotel mr-2 text-primary-600"></i>
                Loại hình
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-dollar-sign mr-2 text-primary-600"></i>
                Giá phòng
              </label>
              <select
                value={priceRanges.indexOf(selectedPriceRange)}
                onChange={(e) =>
                  setSelectedPriceRange(priceRanges[e.target.value])
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {priceRanges.map((range, index) => (
                  <option key={index} value={index}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-sort mr-2 text-primary-600"></i>
                Sắp xếp
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="popular">Phổ biến nhất</option>
                <option value="rating">Đánh giá cao</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count & Pagination Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Tìm thấy{" "}
            <span className="font-semibold text-gray-900">
              {sortedHotels.length}
            </span>{" "}
            khách sạn
            {sortedHotels.length > hotelsPerPage && (
              <span className="text-gray-500 ml-2">
                (Trang {currentPage}/{totalPages})
              </span>
            )}
          </p>
        </div>

        {/* Hotels Grid */}
        {sortedHotels.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentHotels.map((hotel) => (
                <Link
                  key={hotel.id}
                  to={`/booking/hotels/${hotel.slug}`}
                  className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Hotel Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/800x600?text=Hotel+Image";
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
                      <span className="text-xs font-semibold text-gray-700">
                        {hotel.category}
                      </span>
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute bottom-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-lg shadow-lg flex items-center space-x-1">
                      <i className="fas fa-star text-yellow-300"></i>
                      <span className="font-semibold">{hotel.rating}</span>
                      <span className="text-xs">({hotel.reviewCount})</span>
                    </div>
                  </div>

                  {/* Hotel Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {hotel.name}
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <i className="fas fa-map-marker-alt mr-2 text-primary-600"></i>
                      <span>{hotel.location.city}</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {hotel.description}
                    </p>

                    {/* Amenities Preview */}
                    <div className="flex items-center space-x-3 mb-4 text-gray-500">
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <i
                          key={index}
                          className={`fas ${amenity.icon} text-sm`}
                          title={amenity.name}
                        ></i>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <span className="text-xs text-gray-400">
                          +{hotel.amenities.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Giá từ</p>
                        <p className="text-xl font-bold text-primary-600">
                          {formatPrice(hotel.startingPrice)}
                        </p>
                        <p className="text-xs text-gray-500">/đêm</p>
                      </div>
                      <button className="btn btn-primary btn-sm group-hover:bg-primary-700">
                        Xem chi tiết
                        <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm"
                  }`}
                >
                  <i className="fas fa-chevron-left mr-2"></i>
                  Trước
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all ${
                            currentPage === pageNumber
                              ? "bg-primary-600 text-white shadow-md"
                              : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <span
                          key={pageNumber}
                          className="px-2 py-2 text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm"
                  }`}
                >
                  Sau
                  <i className="fas fa-chevron-right ml-2"></i>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Không tìm thấy khách sạn phù hợp
            </h3>
            <p className="text-gray-500">
              Vui lòng thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
