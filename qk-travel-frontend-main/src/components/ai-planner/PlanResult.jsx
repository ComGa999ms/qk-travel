import React from "react";

const PlanResult = ({ generatedPlan, userMode, setUserMode, onViewDetail }) => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      {generatedPlan.premiumPlans.slice(0, 1).map((plan, index) => {
        const isLocked = false;
        const travelBackgrounds = [
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
          "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        ];

        return (
          <div
            key={plan.id}
            className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl ring-2 ring-primary-500 transition-all min-h-[580px] flex flex-col"
          >
            {/* Header with Travel Background */}
            <div className="relative px-6 py-8 text-center overflow-hidden group">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${travelBackgrounds[0]})`,
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 transition-opacity duration-500 group-hover:opacity-75"></div>

              {/* Animated Color Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-3 drop-shadow-lg">{plan.badge}</div>
                <h3 className="text-xl font-bold mb-2 text-white drop-shadow-md">
                  {plan.name}
                </h3>
                <div className="text-sm sm:text-base font-semibold leading-tight text-white drop-shadow-md">
                  {plan.budget}
                </div>
              </div>
            </div>

            {/* Body - Clean & Simple */}
            <div className="p-6 flex-1 flex flex-col relative">
              {/* Animated background gradient */}
              <div className="absolute inset-0 opacity-0 hover:opacity-5 transition-opacity duration-500 rounded-lg bg-gradient-to-br from-primary-100 to-blue-100"></div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div className="text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-primary-50 to-blue-50 hover:from-primary-100 hover:to-blue-100">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {plan.itinerary.length}
                  </div>
                  <div className="text-xs text-gray-600">Ngày</div>
                </div>
                <div className="text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-primary-50 to-blue-50 hover:from-primary-100 hover:to-blue-100">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {plan.itinerary.reduce(
                      (sum, day) => sum + day.activities.length,
                      0,
                    )}
                  </div>
                  <div className="text-xs text-gray-600">Điểm đến</div>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3 mb-6 flex-1 relative z-10">
                <div className="flex items-center gap-3 text-sm text-gray-700 group/feature hover:translate-x-1 transition-transform duration-200">
                  <i
                    className={`fas fa-check-circle transition-colors duration-200 ${
                      !isLocked
                        ? index === 0
                          ? "text-green-500 group-hover/feature:text-green-600"
                          : index === 1
                            ? "text-orange-500 group-hover/feature:text-orange-600"
                            : "text-purple-500 group-hover/feature:text-purple-600"
                        : "text-gray-400"
                    }`}
                  ></i>
                  <span>
                    {index === 0
                      ? "Lịch trình cơ bản, phù hợp du lịch tiết kiệm"
                      : index === 1
                        ? "Cân bằng chi phí và trải nghiệm tốt"
                        : "Dịch vụ cao cấp, trải nghiệm sang trọng"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 group/feature hover:translate-x-1 transition-transform duration-200">
                  <i
                    className={`fas fa-check-circle transition-colors duration-200 ${
                      !isLocked
                        ? index === 0
                          ? "text-green-500 group-hover/feature:text-green-600"
                          : index === 1
                            ? "text-orange-500 group-hover/feature:text-orange-600"
                            : "text-purple-500 group-hover/feature:text-purple-600"
                        : "text-gray-400"
                    }`}
                  ></i>
                  <span>
                    {index === 0
                      ? "Gợi ý địa điểm và nhà hàng bình dân"
                      : index === 1
                        ? "Hướng dẫn chi tiết, địa điểm nổi tiếng"
                        : "Tư vấn riêng, địa điểm độc quyền"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 group/feature hover:translate-x-1 transition-transform duration-200">
                  <i
                    className={`fas fa-check-circle transition-colors duration-200 ${
                      !isLocked
                        ? index === 0
                          ? "text-green-500 group-hover/feature:text-green-600"
                          : index === 1
                            ? "text-orange-500 group-hover/feature:text-orange-600"
                            : "text-purple-500 group-hover/feature:text-purple-600"
                        : "text-gray-400"
                    }`}
                  ></i>
                  <span>
                    {index === 0
                      ? "Lưu kế hoạch, chia sẻ với bạn bè"
                      : index === 1
                        ? "Tải PDF, hỗ trợ offline, maps"
                        : "Hỗ trợ 24/7, concierge service"}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onViewDetail(plan)}
                className={`relative overflow-hidden w-full py-3 rounded-lg font-semibold transition-all duration-300 group/btn ${
                  isLocked
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : index === 0
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-xl hover:scale-105"
                      : index === 1
                        ? "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-md hover:shadow-xl hover:scale-105"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-xl hover:scale-105"
                }`}
              >
                {!isLocked && (
                  <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                )}
                <span className="relative flex items-center justify-center gap-2">
                  Xem chi tiết
                  {!isLocked && (
                    <i className="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform duration-200"></i>
                  )}
                </span>
              </button>
            </div>

            {/* Lock Overlay - Full Card Coverage */}
            {isLocked && (
              <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center z-30 rounded-xl">
                <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-xs border-2 border-purple-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <i className="fas fa-lock text-3xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Kế hoạch bị khóa
                  </h3>
                  <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                    {userMode === "free"
                      ? "Chuyển sang Premium Mode để xem tất cả các kế hoạch"
                      : "Nâng cấp để mở khóa và xem chi tiết kế hoạch này"}
                  </p>
                  <button
                    onClick={() =>
                      userMode === "free" ? setUserMode("premium") : null
                    }
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <i className="fas fa-crown mr-2"></i>
                    {userMode === "free"
                      ? "Chuyển Premium Mode"
                      : "Nâng cấp ngay"}
                  </button>
                  {userMode === "premium" && (
                    <p className="text-xs text-gray-500 mt-4">
                      Chỉ từ{" "}
                      <span className="font-bold text-purple-600">99.000đ</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlanResult;
