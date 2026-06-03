import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TourCard from "../components/cards/TourCard";
import { tours, tourCategories } from "../data/tours";
import { formatCurrency } from "../utils/formatCurrency";

const Tours = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTours = tours
    .filter((tour) => {
      const matchesCategory =
        selectedCategory === "all" || tour.category === selectedCategory;
      const matchesSearch =
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesPrice = true;
      if (priceRange !== "all") {
        switch (priceRange) {
          case "under-1m":
            matchesPrice = tour.price < 1000000;
            break;
          case "1m-3m":
            matchesPrice = tour.price >= 1000000 && tour.price < 3000000;
            break;
          case "3m-5m":
            matchesPrice = tour.price >= 3000000 && tour.price < 5000000;
            break;
          case "over-5m":
            matchesPrice = tour.price >= 5000000;
            break;
        }
      }

      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "featured":
        default:
          return b.featured - a.featured;
      }
    });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Featured tours for slider
  const featuredTours = tours.filter((tour) => tour.featured).slice(0, 5);

  // Auto-slide functionality with infinite loop
  useEffect(() => {
    if (featuredTours.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;
        return nextSlide;
      });
    }, 2500); // 2.5 giây mỗi slide

    return () => clearInterval(interval);
  }, [featuredTours.length, isHovered]);

  // Handle infinite loop transition
  useEffect(() => {
    if (currentSlide === featuredTours.length) {
      // Khi đến slide duplicate cuối cùng
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Tắt transition để reset không bị giật
        setCurrentSlide(0); // Reset về slide đầu tiên
      }, 1000); // = thời gian transition

      return () => clearTimeout(timeout);
    } else {
      setIsTransitioning(true); // Bật lại transition bình thường
    }
  }, [currentSlide, featuredTours.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(featuredTours.length - 1);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner with Slider */}
      <div
        className="relative h-[600px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Slider */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`flex h-full ${
              isTransitioning
                ? "transition-transform duration-1000 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${
                currentSlide * (100 / (featuredTours.length + 1))
              }%)`,
              width: `${(featuredTours.length + 1) * 100}%`,
            }}
          >
            {featuredTours.map((tour, index) => (
              <div
                key={`${tour.id}-${index}`}
                className="flex-shrink-0 w-full h-full"
                style={{ width: `${100 / (featuredTours.length + 1)}%` }}
              >
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${tour.image}')`,
                  }}
                />
              </div>
            ))}
            {/* Duplicate first slide for infinite effect */}
            {featuredTours.length > 0 && (
              <div
                key={`${featuredTours[0].id}-duplicate`}
                className="flex-shrink-0 w-full h-full"
                style={{ width: `${100 / (featuredTours.length + 1)}%` }}
              >
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${featuredTours[0].image}')`,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Simple Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Banner Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full">
            {/* Featured Tour Content */}
            {featuredTours.map((tour, index) => {
              const displayIndex =
                currentSlide >= featuredTours.length ? 0 : currentSlide;
              return (
                <div
                  key={`content-${tour.id}`}
                  className={`transition-all duration-1000 ${
                    index === displayIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 absolute inset-0"
                  }`}
                >
                  {index === displayIndex && (
                    <div className="text-center text-white max-w-4xl mx-auto">
                      {/* Tour Info */}
                      <div>
                        <div className="inline-flex items-center px-3 py-1.5 bg-blue-500/60 backdrop-blur-sm rounded-full mb-4">
                          <i className="fas fa-star text-yellow-400 mr-2 text-sm"></i>
                          <span className="text-sm font-medium">
                            Tour nổi bật
                          </span>
                        </div>

                        <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight text-white">
                          {tour.title}
                        </h1>

                        <p className="text-lg text-blue-100 mb-6 line-clamp-3">
                          {tour.description}
                        </p>

                        <div className="flex items-center justify-center space-x-8 mb-8">
                          <div className="flex items-center">
                            <i className="fas fa-clock mr-2 text-blue-300"></i>
                            <span>{tour.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <i className="fas fa-star mr-2 text-yellow-400"></i>
                            <span>{tour.rating}/5</span>
                          </div>
                          <div className="flex items-center">
                            <i className="fas fa-users mr-2 text-green-300"></i>
                            <span>Max {tour.maxPeople} người</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-col gap-4 items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                          <div className="text-4xl lg:text-5xl font-bold">
                            {formatCurrency(tour.price)}
                          </div>

                          <Link
                            to={`/tours/${tour.id}`}
                            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
                          >
                            Xem chi tiết
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Slider Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-20"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-20"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Dots Indicator */}

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {featuredTours.map((_, index) => {
            const displayIndex =
              currentSlide >= featuredTours.length ? 0 : currentSlide;

            return (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === displayIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
            Tất cả Tours du lịch
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Khám phá thêm nhiều tour du lịch chất lượng cao với giá cả hợp lý
          </p>
        </div> */}

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Tìm kiếm & Lọc tours
            </h3>
            <div className="text-sm text-gray-600">
              Hiển thị {filteredTours.length} tour
            </div>
          </div>

          {/* Search and Main Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="lg:col-span-1">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm tour..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="all">Tất cả danh mục</option>
                {tourCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="all">Tất cả mức giá</option>
                <option value="under-1m">Dưới 1 triệu</option>
                <option value="1m-3m">1-3 triệu</option>
                <option value="3m-5m">3-5 triệu</option>
                <option value="over-5m">Trên 5 triệu</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="featured">Nổi bật</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao</option>
              </select>
            </div>
          </div>

          {/* Quick Category Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              Lọc nhanh:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary-100 text-primary-800"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
            {tourCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary-100 text-primary-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setPriceRange("all");
                setSortBy("featured");
              }}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors ml-auto"
            >
              <i className="fas fa-refresh mr-1"></i>
              Xóa bộ lọc
            </button>
          </div>
        </div>

        {/* Tours Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="fas fa-search text-gray-400 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Không tìm thấy tour nào
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để tìm tour phù hợp
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setPriceRange("all");
                setSortBy("featured");
              }}
              className="btn btn-primary"
            >
              <i className="fas fa-refresh mr-2"></i>
              Xem tất cả tours
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2835&q=80')`,
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-indigo-900/75 to-purple-900/80"></div>

          {/* Floating Elements */}
          <div className="absolute top-8 left-8 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-12 right-12 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-pink-500/15 rounded-full blur-lg"></div>

          {/* Content */}
          <div className="relative z-10 text-white p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-8 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center ring-4 ring-white/20">
              <i className="fas fa-robot text-white text-3xl"></i>
            </div>

            <h3 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Chưa tìm thấy tour phù hợp?
            </h3>

            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Để AI giúp bạn tạo kế hoạch du lịch cá nhân hóa dựa trên sở thích,
              ngân sách và thời gian của bạn
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/ai-planner"
                className="group relative bg-white text-primary-600 hover:bg-blue-50 font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 min-w-[200px]"
              >
                <div className="flex items-center justify-center">
                  <i className="fas fa-magic mr-3 text-xl group-hover:animate-bounce"></i>
                  <span>Tạo kế hoạch AI</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/contact"
                className="group relative border-3 border-white/80 text-white hover:bg-white hover:text-primary-600 font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:scale-105 min-w-[200px]"
              >
                <div className="flex items-center justify-center">
                  <i className="fas fa-headset mr-3 text-xl group-hover:scale-110 transition-transform"></i>
                  <span>Tư vấn trực tiếp</span>
                </div>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-green-400"></i>
                <span className="text-sm">Miễn phí tư vấn</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-clock text-blue-400"></i>
                <span className="text-sm">24/7 hỗ trợ</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-shield-alt text-purple-400"></i>
                <span className="text-sm">Đảm bảo chất lượng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tours;
