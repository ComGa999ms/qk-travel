import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  restaurants,
  cities,
  cuisines,
  priceRanges,
} from "../data/restaurants";

const Restaurants = () => {
  const [selectedCity, setSelectedCity] = useState("Tất cả");
  const [selectedCuisine, setSelectedCuisine] = useState("Tất cả");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 9;

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Filter restaurants
  const filteredRestaurants = restaurants
    .filter((restaurant) => {
      const cityMatch =
        selectedCity === "Tất cả" || restaurant.location.city === selectedCity;
      const cuisineMatch =
        selectedCuisine === "Tất cả" || restaurant.cuisine === selectedCuisine;
      const priceMatch =
        restaurant.averagePrice >= selectedPriceRange.min &&
        restaurant.averagePrice <= selectedPriceRange.max;
      const searchMatch =
        searchTerm === "" ||
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.city
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
      return cityMatch && cuisineMatch && priceMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.reviewCount - a.reviewCount;
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.averagePrice - b.averagePrice;
        case "price-high":
          return b.averagePrice - a.averagePrice;
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCity, selectedCuisine, selectedPriceRange, searchTerm, sortBy]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const featuredRestaurants = [...restaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredRestaurants.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredRestaurants.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredRestaurants.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredRestaurants.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Restaurants Slider */}
      <div className="relative h-[500px] overflow-hidden bg-gray-900">
        {/* Slides */}
        {featuredRestaurants.map((restaurant, index) => (
          <div
            key={restaurant.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${restaurant.images[0]}')`,
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
                    Nhà hàng nổi bật
                  </span>
                  <span className="px-4 py-1.5 bg-yellow-500 text-white text-sm font-semibold rounded-full flex items-center">
                    <i className="fas fa-star mr-1"></i>
                    {restaurant.rating} ({restaurant.reviewCount} đánh giá)
                  </span>
                </div>

                {/* Restaurant Name */}
                <h1 className="text-white text-4xl lg:text-6xl font-bold mb-4">
                  {restaurant.name}
                </h1>

                {/* Cuisine & Location */}
                <div className="flex items-center space-x-4 text-white/90 text-lg mb-4">
                  <div className="flex items-center">
                    <i className="fas fa-utensils mr-2"></i>
                    <span>{restaurant.cuisine}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <span>{restaurant.location.city}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/80 text-lg mb-6 line-clamp-2">
                  {restaurant.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {restaurant.features.slice(0, 4).map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-white/90 text-sm bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg"
                    >
                      <i className={`fas ${feature.icon} mr-2`}></i>
                      <span>{feature.name}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/booking/restaurants/${restaurant.slug}`}
                    className="btn btn-primary text-lg px-8 py-3 inline-flex items-center"
                  >
                    Xem chi tiết & Đặt bàn
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                  <div className="text-white">
                    <p className="text-sm text-white/70">Giá trung bình</p>
                    <p className="text-2xl font-bold">
                      {formatPrice(restaurant.averagePrice)}/người
                    </p>
                  </div>
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
          {featuredRestaurants.map((_, index) => (
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
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center">
            <i className="fas fa-search text-gray-400 mr-3"></i>
            <input
              type="text"
              placeholder="Tìm kiếm nhà hàng, món ăn, địa điểm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thành phố
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Cuisine Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại hình ẩm thực
              </label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Khoảng giá
              </label>
              <select
                value={selectedPriceRange.label}
                onChange={(e) =>
                  setSelectedPriceRange(
                    priceRanges.find((range) => range.label === e.target.value)
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sắp xếp theo
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy{" "}
            <span className="font-semibold">{filteredRestaurants.length}</span>{" "}
            nhà hàng
            {filteredRestaurants.length > restaurantsPerPage && (
              <span className="text-gray-500 ml-2">
                (Trang {currentPage}/{totalPages})
              </span>
            )}
          </p>
        </div>

        {/* Restaurant Cards Grid */}
        {filteredRestaurants.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={restaurant.images[0]}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800";
                      }}
                    />
                    {/* Cuisine Badge */}
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
                      <span className="text-sm font-semibold text-gray-700">
                        {restaurant.cuisine}
                      </span>
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center">
                      <i className="fas fa-star text-yellow-400 text-sm mr-1"></i>
                      <span className="text-sm font-bold text-gray-900">
                        {restaurant.rating}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <i className="fas fa-map-marker-alt mr-2 text-primary-600"></i>
                      <span>{restaurant.location.city}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {restaurant.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.features.slice(0, 4).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-xs text-gray-600"
                        >
                          <i
                            className={`fas ${feature.icon} text-primary-600 mr-1`}
                          ></i>
                          <span>{feature.name}</span>
                        </div>
                      ))}
                      {restaurant.features.length > 4 && (
                        <span className="text-xs text-gray-500">
                          +{restaurant.features.length - 4} tiện nghi
                        </span>
                      )}
                    </div>

                    {/* Price and Reviews */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-xs text-gray-500">Giá trung bình</p>
                        <p className="text-lg font-bold text-primary-600">
                          {formatPrice(restaurant.averagePrice)}
                        </p>
                        <p className="text-xs text-gray-500">/người</p>
                      </div>
                      <Link
                        to={`/booking/restaurants/${restaurant.slug}`}
                        className="btn btn-primary"
                      >
                        Xem chi tiết
                      </Link>
                    </div>

                    {/* Review Count */}
                    <div className="mt-3 text-center">
                      <span className="text-xs text-gray-500">
                        {restaurant.reviewCount} đánh giá
                      </span>
                    </div>
                  </div>
                </div>
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
          <div className="text-center py-12">
            <i className="fas fa-utensils text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Không tìm thấy nhà hàng
            </h3>
            <p className="text-gray-500">
              Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
