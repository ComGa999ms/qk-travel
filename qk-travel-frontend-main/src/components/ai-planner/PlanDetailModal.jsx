import React, { useRef, useEffect } from "react";
import { formatCurrencyRange } from "../../utils/aiPlannerHelpers";

const PlanDetailModal = ({
  modalPlan,
  generatedPlan,
  userMode,
  setUserMode,
  onClose,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!modalPlan) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp"
      >
        {/* Modal Header with Travel Background */}
        <div className="relative p-6 text-white overflow-hidden">
          {/* Background Image - same as card */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                modalPlan.id === "budget"
                  ? "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80')"
                  : modalPlan.id === "balanced"
                    ? "url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80')"
                    : "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80')",
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>

          <div className="relative flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-5xl drop-shadow-lg">
                  {modalPlan.badge}
                </span>
                <div>
                  <h2 className="text-3xl font-display font-bold text-white drop-shadow-md">
                    {modalPlan.name}
                  </h2>
                  {modalPlan.recommended && (
                    <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                      ⭐ Gói đề xuất
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold drop-shadow-md">
                  {modalPlan.budget}
                </span>
                <span className="text-white/90">/người</span>
              </div>
              <p className="text-white/90 drop-shadow">
                Cho chuyến đi {generatedPlan.duration} ngày tại{" "}
                {generatedPlan.destination}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] scrollbar-thin scrollbar-webkit scrollbar-thumb-purple-400 scrollbar-track-gray-100">
          {/* Action Buttons - Only for Premium Mode */}
          {userMode === "premium" ? (
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                <i className="fas fa-save"></i>
                <span>Lưu kế hoạch</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                <i className="fas fa-file-pdf"></i>
                <span>Tải PDF</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                <i className="fas fa-share-alt"></i>
                <span>Chia sẻ</span>
              </button>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-crown text-white"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">
                    Nâng cấp để sử dụng đầy đủ tính năng
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Lưu kế hoạch, tải PDF và chia sẻ chỉ dành cho Premium Mode
                  </p>
                  <button
                    onClick={() => setUserMode("premium")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg text-sm"
                  >
                    <i className="fas fa-arrow-right"></i>
                    Chuyển sang Premium Mode
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Itinerary Timeline */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-route text-purple-600"></i>
              Lịch trình chi tiết
            </h3>
            <div className="space-y-4">
              {modalPlan.itinerary.map((day, index) => (
                <div
                  key={index}
                  className="relative border-l-4 border-blue-500 rounded-r-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Mini travel background for each day */}
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="h-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          index % 3 === 0
                            ? "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80')"
                            : index % 3 === 1
                              ? "url('https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80')"
                              : "url('https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=400&q=80')",
                      }}
                    />
                  </div>

                  <div className="relative bg-white/80 backdrop-blur-sm p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl text-lg font-bold shadow-md">
                          {day.day}
                        </span>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            {day.title}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Budget Breakdown */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 mb-4">
                      <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <i className="fas fa-wallet text-blue-600"></i>
                        <span className="leading-tight">
                          Chi phí dự kiến: {day.budget}
                        </span>
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                          <i className="fas fa-utensils text-orange-500 text-lg mb-1"></i>
                          <div className="text-xs text-gray-600 mb-1">
                            Ăn uống
                          </div>
                          <div className="font-semibold text-gray-900 text-xs leading-tight break-words">
                            {modalPlan.id === "budget"
                              ? formatCurrencyRange(150000, 250000)
                              : modalPlan.id === "balanced"
                                ? formatCurrencyRange(300000, 500000)
                                : formatCurrencyRange(500000, 800000)}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                          <i className="fas fa-map-marked-alt text-purple-500 text-lg mb-1"></i>
                          <div className="text-xs text-gray-600 mb-1">
                            Tham quan
                          </div>
                          <div className="font-semibold text-gray-900 text-xs leading-tight break-words">
                            {modalPlan.id === "budget"
                              ? formatCurrencyRange(100000, 200000)
                              : modalPlan.id === "balanced"
                                ? formatCurrencyRange(200000, 400000)
                                : formatCurrencyRange(400000, 700000)}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                          <i className="fas fa-car text-green-500 text-lg mb-1"></i>
                          <div className="text-xs text-gray-600 mb-1">
                            Di chuyển
                          </div>
                          <div className="font-semibold text-gray-900 text-xs leading-tight break-words">
                            {modalPlan.id === "budget"
                              ? formatCurrencyRange(50000, 100000)
                              : modalPlan.id === "balanced"
                                ? formatCurrencyRange(100000, 200000)
                                : formatCurrencyRange(200000, 400000)}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                          <i className="fas fa-bed text-pink-500 text-lg mb-1"></i>
                          <div className="text-xs text-gray-600 mb-1">
                            Lưu trú
                          </div>
                          <div className="font-semibold text-gray-900 text-xs leading-tight break-words">
                            {modalPlan.id === "budget"
                              ? formatCurrencyRange(200000, 350000)
                              : modalPlan.id === "balanced"
                                ? formatCurrencyRange(400000, 700000)
                                : formatCurrencyRange(800000, 1500000)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <i className="fas fa-map-marked-alt text-purple-600"></i>
                          Hoạt động trong ngày
                        </p>
                        <ul className="space-y-2">
                          {day.activities.map((activity, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <i className="fas fa-utensils text-orange-600"></i>
                          Ẩm thực địa phương
                        </p>
                        <ul className="space-y-2">
                          {day.meals.map((meal, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <i className="fas fa-check-circle text-orange-500 mt-0.5"></i>
                              <span>{meal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailModal;
