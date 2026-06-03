import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import regionService from "../services/regionService";
import locationService from "../services/locationService";
import destinationService from "../services/destinationService";
import destinationsHero from "../assets/images/destinations-hero.jpg";
import defaultDestination from "../assets/images/default-destination.jpg";

const Destinations = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [keyword, setKeyword] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const [cityInputValue, setCityInputValue] = useState("");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const [regionsData, setRegionsData] = useState([]);
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);

  const [locationsData, setLocationsData] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  const [destinationsData, setDestinationsData] = useState([]);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(true);
  const [destinationsError, setDestinationsError] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setIsLoadingRegions(true);
        const regions = await regionService.getAllRegions();
        setRegionsData(regions);
      } catch (error) {
        console.error("Lỗi khi tải danh sách vùng miền:", error);
      } finally {
        setIsLoadingRegions(false);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoadingLocations(true);
        const locations = await locationService.getAllLocations();
        setLocationsData(locations);
      } catch (error) {
        console.error("Lỗi khi tải danh sách tỉnh/thành phố:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    setFilteredLocations(locationsData);
  }, [locationsData]);
  const handleCityInputChange = (e) => {
    const value = e.target.value;
    setCityInputValue(value);
    setIsCityDropdownOpen(true);
    setHighlightedIndex(-1);

    if (value.trim() === "") {
      setFilteredLocations(locationsData);
      setSelectedCity("all");
    } else {
      const filtered = locationsData.filter((location) =>
        location.name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredLocations(filtered);
    }
  };

  const handleSelectCity = (cityName) => {
    setSelectedCity(cityName);
    setCityInputValue(cityName);
    setIsCityDropdownOpen(false);
    setHighlightedIndex(-1);
  };

  const handleCityInputKeyDown = (e) => {
    if (!isCityDropdownOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsCityDropdownOpen(true);
      }
      return;
    }

    const displayItems = [
      { id: "all", name: "Tất cả tỉnh/thành phố" },
      ...filteredLocations,
    ];

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < displayItems.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : displayItems.length - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < displayItems.length) {
        const selected = displayItems[highlightedIndex];
        if (selected.id === "all") {
          handleSelectCity("all");
          setCityInputValue("");
        } else {
          handleSelectCity(selected.name);
        }
      }
    } else if (e.key === "Escape") {
      setIsCityDropdownOpen(false);
    }
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoadingDestinations(true);
        setDestinationsError(null);

        const selectedRegionObj = regionsData.find(
          (r) => r.name === selectedRegion,
        );
        const regionId =
          selectedRegion !== "all" && selectedRegionObj
            ? selectedRegionObj.id
            : null;

        const selectedLocationObj = locationsData.find(
          (l) => l.name === selectedCity,
        );
        const locationId =
          selectedCity !== "all" && selectedLocationObj
            ? selectedLocationObj.id
            : null;

        const data = await destinationService.getDestinations({
          regionId,
          locationId,
          keyword: searchTerm || null,
          page: currentPage,
          pageSize,
        });

        setDestinationsData(data.items || []);
        setPaginationInfo({
          totalCount: data.totalCount || 0,
          totalPages: data.totalPages || 0,
          hasPreviousPage: data.hasPreviousPage || false,
          hasNextPage: data.hasNextPage || false,
        });
      } catch (error) {
        console.error("Lỗi khi tải danh sách điểm đến:", error);
        setDestinationsError(
          "Không thể tải danh sách điểm đến. Vui lòng thử lại sau.",
        );
        setDestinationsData([]);
      } finally {
        setIsLoadingDestinations(false);
      }
    };

    if (!isLoadingRegions && !isLoadingLocations) {
      fetchDestinations();
    }
  }, [
    selectedRegion,
    selectedCity,
    searchTerm,
    currentPage,
    pageSize,
    regionsData,
    locationsData,
    isLoadingRegions,
    isLoadingLocations,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRegion, selectedCity, searchTerm, pageSize]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${destinationsHero})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Khám Phá Việt Nam
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Từ núi rừng hùng vĩ đến bãi biển tuyệt đẹp, từ phố cổ lãng mạn đến
              thành phố hiện đại - Hãy để chúng tôi đưa bạn đi khắp mọi miền đất
              nước
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-full shadow-2xl p-2 flex items-center">
              <i className="fas fa-search text-gray-400 ml-6 mr-4"></i>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchTerm(keyword);
                  }
                }}
                placeholder="Tìm kiếm điểm đến mơ ước của bạn..."
                className="flex-1 outline-none text-gray-700 px-2 py-3"
              />
              <button
                onClick={() => setSearchTerm(keyword)}
                className="btn btn-primary px-8 py-3 rounded-full hover:bg-primary-700 transition-colors"
                title="Tìm kiếm"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {/* Region Filter */}
              <div className="relative">
                <i className="fas fa-map-marked-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                  disabled={isLoadingRegions}
                >
                  <option value="all">
                    {isLoadingRegions ? "Đang tải..." : "Tất cả vùng"}
                  </option>
                  {regionsData.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Filter - Autocomplete */}
              <div className="relative">
                <i className="fas fa-city absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"></i>
                <input
                  type="text"
                  value={cityInputValue}
                  onChange={handleCityInputChange}
                  onKeyDown={handleCityInputKeyDown}
                  onFocus={() => setIsCityDropdownOpen(true)}
                  onBlur={() => {
                    // Delay hide to allow click
                    setTimeout(() => setIsCityDropdownOpen(false), 200);
                  }}
                  placeholder="Tất cả tỉnh/thành phố"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                />
                {isCityDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div
                      className={`px-4 py-2 cursor-pointer text-gray-700 ${highlightedIndex === 0 ? "bg-gray-100" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        handleSelectCity("all");
                        setCityInputValue("");
                      }}
                      onMouseEnter={() => setHighlightedIndex(0)}
                    >
                      Tất cả tỉnh/thành phố
                    </div>
                    {filteredLocations.map((location, index) => (
                      <div
                        key={location.id}
                        className={`px-4 py-2 cursor-pointer text-gray-700 ${highlightedIndex === index + 1 ? "bg-gray-100" : "hover:bg-gray-50"}`}
                        onClick={() => handleSelectCity(location.name)}
                        onMouseEnter={() => setHighlightedIndex(index + 1)}
                      >
                        {location.name}
                      </div>
                    ))}
                    {filteredLocations.length === 0 && (
                      <div className="px-4 py-2 text-gray-500 text-sm">
                        Không tìm thấy kết quả
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* PageSize Filter */}
              <div className="relative">
                <i className="fas fa-list-ol absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={pageSize}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    // Giới hạn trong khoảng 1-100
                    if (value >= 1 && value <= 100) {
                      setPageSize(value);
                    }
                  }}
                  onBlur={(e) => {
                    // Khi mất focus, đảm bảo giá trị hợp lệ
                    const value = parseInt(e.target.value) || 9;
                    if (value < 1) setPageSize(1);
                    else if (value > 100) setPageSize(100);
                  }}
                  placeholder="Số items/trang"
                  className="w-full pl-12 pr-44 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 pointer-events-none whitespace-nowrap">
                  Điểm Đến/trang
                </span>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedRegion !== "all" ||
            selectedCity !== "all" ||
            selectedCategory !== "all" ||
            searchTerm) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600 font-medium">
                  Đang lọc:
                </span>
                {selectedRegion !== "all" && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center">
                    {selectedRegion}
                    <button
                      onClick={() => setSelectedRegion("all")}
                      className="ml-2 hover:text-blue-900"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                )}
                {selectedCity !== "all" && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center">
                    {selectedCity}
                    <button
                      onClick={() => {
                        setSelectedCity("all");
                        setCityInputValue("");
                      }}
                      className="ml-2 hover:text-indigo-900"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="ml-2 hover:text-green-900"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                )}
                {searchTerm && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center">
                    "{searchTerm}"
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setKeyword("");
                      }}
                      className="ml-2 hover:text-purple-900"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedRegion("all");
                    setSelectedCity("all");
                    setCityInputValue("");
                    setSelectedCategory("all");
                    setSearchTerm("");
                    setKeyword("");
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                  disabled={isLoadingDestinations}
                >
                  Xóa tất cả
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLoadingDestinations ? (
              "Đang tải..."
            ) : (
              <>
                {paginationInfo.totalCount} điểm đến
                {paginationInfo.totalPages > 1 && (
                  <span className="text-base font-normal text-gray-500 ml-2">
                    (Trang {currentPage}/{paginationInfo.totalPages})
                  </span>
                )}
              </>
            )}
          </h2>

          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`py-2 px-4 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-primary-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <i className="fas fa-th mr-2"></i>
              Lưới
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`py-2 px-4 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-primary-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <i className="fas fa-list mr-2"></i>
              Danh sách
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoadingDestinations && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <i className="fas fa-spinner fa-spin text-5xl text-primary-600 mb-4"></i>
              <p className="text-gray-600 text-lg">Đang tải điểm đến...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoadingDestinations && destinationsError && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
              <i className="fas fa-exclamation-triangle text-4xl text-red-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Có lỗi xảy ra
            </h3>
            <p className="text-gray-600 mb-6">{destinationsError}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Tải lại trang
            </button>
          </div>
        )}

        {/* Destinations Grid/List */}
        {!isLoadingDestinations &&
          !destinationsError &&
          viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinationsData.map((destination) => (
                <Link
                  key={destination.id}
                  to={`/destinations/${destination.id}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
                >
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={destination.thumbnailUrl || defaultDestination}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {destination.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed min-h-[4rem]">
                      {destination.title}
                    </p>
                    <div className="mb-4 min-h-[2.5rem]">
                      {destination.tags && destination.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {destination.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full line-clamp-1"
                            >
                              {tag}
                            </span>
                          ))}
                          {destination.tags.length > 2 && (
                            <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                              +{destination.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      {destination.locationName && (
                        <p className="text-sm text-gray-500 mt-1">
                          <i className="fas fa-map-marker-alt text-primary-500 mr-2"></i>
                          {destination.locationName}
                        </p>
                      )}
                      <span className="text-primary-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">
                        Khám phá
                        <i className="fas fa-arrow-right ml-2"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        {!isLoadingDestinations &&
          !destinationsError &&
          viewMode === "list" && (
            <div className="space-y-6">
              {destinationsData.map((destination) => (
                <Link
                  key={destination.id}
                  to={`/destinations/${destination.id}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row h-auto md:h-80"
                >
                  <div className="relative md:w-2/5 h-64 md:h-full overflow-hidden flex-shrink-0">
                    <img
                      src={destination.thumbnailUrl || defaultDestination}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                          {destination.name}
                        </h3>
                        {destination.locationName && (
                          <p className="text-sm text-gray-500 mt-1">
                            <i className="fas fa-map-marker-alt text-primary-500 mr-1"></i>
                            {destination.locationName}
                          </p>
                        )}
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {destination.title}
                      </p>
                      {destination.tags && destination.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {destination.tags.slice(0, 4).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {destination.tags.length > 4 && (
                            <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                              +{destination.tags.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                      <span className="text-primary-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">
                        Khám phá
                        <i className="fas fa-arrow-right ml-2"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        {/* Empty State */}
        {!isLoadingDestinations &&
          !destinationsError &&
          destinationsData.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <i className="fas fa-search text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Không tìm thấy điểm đến
              </h3>
              <p className="text-gray-600 mb-6">
                Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
              <button
                onClick={() => {
                  setSelectedRegion("all");
                  setSelectedCity("all");
                  setCityInputValue("");
                  setSelectedCategory("all");
                  setSearchTerm("");
                  setKeyword("");
                }}
                className="btn btn-primary"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}

        {/* Pagination */}
        {!isLoadingDestinations &&
          !destinationsError &&
          paginationInfo.totalPages > 1 &&
          destinationsData.length > 0 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-300"
                }`}
              >
                <i className="fas fa-chevron-left mr-2"></i>
                Trước
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {Array.from(
                  { length: paginationInfo.totalPages },
                  (_, i) => i + 1,
                ).map((page) => {
                  const showPage =
                    page === 1 ||
                    page === paginationInfo.totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);
                  const showEllipsisBefore =
                    page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter =
                    page === currentPage + 2 &&
                    currentPage < paginationInfo.totalPages - 2;

                  if (!showPage && !showEllipsisBefore && !showEllipsisAfter) {
                    return null;
                  }

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <span key={page} className="px-4 py-2 text-gray-400">
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? "bg-primary-600 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, paginationInfo.totalPages),
                  )
                }
                disabled={currentPage === paginationInfo.totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === paginationInfo.totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-300"
                }`}
              >
                Sau
                <i className="fas fa-chevron-right ml-2"></i>
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Destinations;
