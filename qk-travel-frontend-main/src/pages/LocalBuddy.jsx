import React, { useState } from "react";
import { Link } from "react-router-dom";
import { guides, locations, languages } from "../data/guides";

const LocalBuddy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      selectedLocation === "all" ||
      guide.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesLanguage =
      selectedLanguage === "all" ||
      guide.languages.some((lang) =>
        lang.toLowerCase().includes(selectedLanguage.toLowerCase()),
      );

    return matchesSearch && matchesLocation && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - With Background Image */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://www.guiadasemana.com.br/contentFiles/image/opt_w840h525/2019/05/FEA/48217_shutterstock-436628554-grupo-de-amigos.jpg"
            alt="Vietnam Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r bg-gray-800/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <i className="fas fa-user-friends text-4xl"></i>
              </div>
              <h1 className="text-5xl text-white md:text-6xl font-bold mb-4 tracking-tight">
                Local Buddy
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-3">
                Kết nối với hướng dẫn viên địa phương
              </p>
              <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                Khám phá Việt Nam cùng người bạn đồng hành nhiệt huyết
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-12 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">50+</div>
                  <div className="text-blue-200">Hướng dẫn viên</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">1000+</div>
                  <div className="text-blue-200">Chuyến đi</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">4.8⭐</div>
                  <div className="text-blue-200">Đánh giá trung bình</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <i className="fas fa-filter text-white"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Tìm kiếm hướng dẫn viên
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Bar - Enhanced */}
            <div className="md:col-span-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nhập tên hoặc mô tả..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-4 pl-12 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all text-gray-900 placeholder-gray-400"
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Location Filter - Enhanced */}
            <div>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-5 py-4 pl-12 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all appearance-none bg-white text-gray-900 font-medium cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
                <i className="fas fa-map-marker-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400"></i>
                <i className="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Language Filter - Enhanced */}
            <div>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-5 py-4 pl-12 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all appearance-none bg-white text-gray-900 font-medium cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <i className="fas fa-language absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400"></i>
                <i className="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Results Count - Enhanced */}
          <div className="mt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-list text-primary-600"></i>
              </div>
              <p className="text-gray-700">
                Tìm thấy{" "}
                <span className="font-bold text-2xl text-primary-600 mx-1">
                  {filteredGuides.length}
                </span>{" "}
                hướng dẫn viên
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Guides Grid - Simplified */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-primary-300"
            >
              {/* Guide Header */}
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={guide.avatar}
                      alt={guide.name}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    {guide.verified && (
                      <div className="absolute bottom-0 right-0 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 truncate group-hover:text-primary-600 transition-colors">
                      {guide.name}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <i className="fas fa-map-marker-alt text-red-500 mr-1"></i>
                      <span>{guide.location}</span>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                        <i className="fas fa-star text-yellow-400 text-sm mr-1"></i>
                        <span className="font-bold text-gray-900">
                          {guide.rating}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        ({guide.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {guide.languages.slice(0, 3).map((lang, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl mb-4">
                  <span className="text-sm font-medium text-gray-700">
                    Giá/giờ:
                  </span>
                  <span className="text-xl font-bold text-orange-600">
                    {guide.hourlyRate.toLocaleString()}đ
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to={`/local-buddy/${guide.id}`}
                    className="bg-white border-2 border-gray-300 hover:border-primary-500 text-gray-700 hover:text-primary-600 py-2.5 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-info-circle"></i>
                    <span>Chi tiết</span>
                  </Link>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                    <i className="fas fa-comment-dots"></i>
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results - Enhanced */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <i className="fas fa-search text-6xl text-gray-400"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Không tìm thấy hướng dẫn viên
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Rất tiếc, chúng tôi không tìm thấy hướng dẫn viên phù hợp với
                tiêu chí của bạn.
              </p>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                <p className="text-sm text-gray-700 mb-3 font-medium">
                  💡 Gợi ý cho bạn:
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-blue-500 mr-2 mt-1"></i>
                    <span>Thử tìm kiếm với từ khóa khác</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-blue-500 mr-2 mt-1"></i>
                    <span>Chọn "Tất cả địa điểm" hoặc "Tất cả ngôn ngữ"</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-blue-500 mr-2 mt-1"></i>
                    <span>Kiểm tra lại chính tả của bạn</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocation("all");
                  setSelectedLanguage("all");
                }}
                className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <i className="fas fa-redo mr-2"></i>
                Xóa bộ lọc
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalBuddy;
