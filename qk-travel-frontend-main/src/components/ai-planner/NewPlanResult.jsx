import React, { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import planService from "../../services/planService";
import useDialog from "../../hooks/useDialog";
import AlertDialog from "../common/AlertDialog";
import { useAuth } from "../../context/AuthContext";
import PricingModal from "../booking/PricingModal";
import { hasPremiumAccess } from "../../utils/subscriptionUtils";

// Build the ordered list of place queries for a day, e.g. ["Cầu Rồng, Đà Nẵng", ...].
const buildDayPoints = (activities, cityName) =>
  (activities || [])
    .map((a) => a?.name?.trim())
    .filter(Boolean)
    .map((name) => (cityName ? `${name}, ${cityName}` : name));

// Embeddable Google Maps URL (no API key needed). With 2+ points it draws the
// A -> B -> C route in order; with 1 point it just pins that place.
const buildDayRouteMap = (activities, cityName) => {
  const points = buildDayPoints(activities, cityName);
  if (points.length === 0) return null;

  if (points.length === 1)
    return `https://www.google.com/maps?q=${encodeURIComponent(points[0])}&output=embed`;

  const saddr = encodeURIComponent(points[0]);
  const daddr = points.slice(1).map(encodeURIComponent).join("+to:");
  return `https://www.google.com/maps?saddr=${saddr}&daddr=${daddr}&output=embed`;
};

// Full-screen directions link (opens Google Maps in a new tab) for the same route.
const buildDayRouteLink = (activities, cityName) => {
  const points = buildDayPoints(activities, cityName);
  if (points.length === 0) return null;

  const origin = encodeURIComponent(points[0]);
  const destination = encodeURIComponent(points[points.length - 1]);
  const waypoints = points.slice(1, -1).map(encodeURIComponent).join("|");

  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
  if (waypoints) url += `&waypoints=${waypoints}`;
  return url;
};

const NewPlanResult = ({ planData, onClose }) => {
  const [isSaved, setIsSaved] = useState(planData?.isSaved || false);
  const [isSaving, setIsSaving] = useState(false);
  const { alertDialog, showAlert, hideDialog } = useDialog();
  const { user } = useAuth();
  const [showPricing, setShowPricing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Add this line
  const isPremium = hasPremiumAccess(user);

  if (!planData) return null;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await planService.savePlan(planData.id);
      setIsSaved(true);
      showAlert({
        title: "Thành công",
        message: "Đã lưu kế hoạch thành công!",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to save plan:", error);
      showAlert({
        title: "Lỗi",
        message: "Lỗi khi lưu kế hoạch. Vui lòng thử lại.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Floating Card */}
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slideUp">
        {/* Header Section */}
        <div className="relative p-8 text-white shrink-0 overflow-hidden min-h-[200px] flex flex-col justify-center">
          {/* Background Image - Placeholder */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105"
              style={{
                backgroundImage:
                  "url('https://www.ytravelblog.com/wp-content/uploads/2018/11/planning-a-trip-tips-and-challenges-2.jpg')",
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2 text-white drop-shadow-md">
                Kế hoạch du lịch {planData.location?.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                  {planData.duration} ngày
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                  {planData.numberOfPeople} người
                </span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="bg-gray-50 border-b border-gray-100 px-8 py-4 flex gap-4 shrink-0 justify-between items-center">
          <div className="flex gap-4">
            {isPremium ? (
              <>
                {!isSaved && (
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
                  >
                    {isSaving ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Đang lưu...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save"></i> Lưu kế hoạch
                      </>
                    )}
                  </button>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg text-sm border border-amber-100">
                <i className="fas fa-lock"></i>
                <span className="font-medium">
                  Nâng cấp Premium để Lưu & Tải PDF
                </span>
              </div>
            )}
          </div>

          {!isPremium && (
            <button
              onClick={() => setShowPricing(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all"
            >
              <i className="fas fa-crown mr-2"></i>
              Nâng cấp ngay
            </button>
          )}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          {/* Transportation Section */}
          {planData.transportations && planData.transportations.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-plane-departure text-blue-600 mr-2 bg-blue-50 p-2 rounded-lg"></i>
                Phương tiện di chuyển
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {planData.transportations.map((trans) => (
                  <div
                    key={trans.id}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <i
                            className={`fas ${trans.transportationType === "Plane" ? "fa-plane" : trans.transportationType === "Bus" ? "fa-bus" : "fa-car"}`}
                          ></i>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">
                            {trans.provider}
                          </div>
                          <div className="text-sm text-gray-500">
                            Thời lượng: {trans.duration}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">
                          {formatCurrency(trans.priceFrom)}
                        </div>
                        <div className="text-xs text-gray-400">/khách</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium mb-1">
                        <i className="fas fa-route text-gray-400"></i>
                        {trans.route}
                      </div>
                      <p className="text-xs text-gray-500 pl-6 leading-relaxed">
                        {trans.bookingInfo}
                      </p>
                    </div>

                    {trans.tips && (
                      <div className="text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg border border-orange-100 flex gap-2">
                        <i className="fas fa-lightbulb mt-0.5"></i>
                        <span>{trans.tips}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accommodation Section */}
          {planData.accommodations && planData.accommodations.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-hotel text-purple-600 mr-2 bg-purple-50 p-2 rounded-lg"></i>
                Đề xuất nơi lưu trú
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x">
                {planData.accommodations.map((acc) => (
                  <div
                    key={acc.id}
                    className="min-w-[300px] md:min-w-[350px] bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all snap-center flex flex-col"
                  >
                    {/* Accommodation Image */}
                    <div
                      className="h-48 w-full mb-4 rounded-xl overflow-hidden relative group cursor-pointer"
                      onClick={() => setSelectedImage(acc.imageUrl)}
                    >
                      {acc.imageUrl ? (
                        <img
                          src={acc.imageUrl}
                          alt={acc.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <i className="fas fa-hotel text-4xl"></i>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                        {acc.accommodationType}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1 text-sm font-bold text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
                        <i className="fas fa-star text-xs"></i>
                        {acc.rating}
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                      {acc.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                      <i className="fas fa-map-marker-alt text-gray-300"></i>
                      <span className="line-clamp-1">{acc.address}</span>
                    </p>

                    <div className="mb-4">
                      {acc.pricePerNight > 0 ? (
                        <>
                          <div className="text-lg font-bold text-purple-600">
                            {formatCurrency(acc.pricePerNight)}
                          </div>
                          <div className="text-xs text-gray-400">/đêm</div>
                        </>
                      ) : (
                        <div className="text-sm font-semibold text-gray-400">
                          Giá tham khảo
                        </div>
                      )}
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4 flex-1">
                      {acc.amenities &&
                        acc.amenities.map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100"
                          >
                            {amenity}
                          </span>
                        ))}
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex gap-2">
                      <a
                        href={acc.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        <i className="fas fa-map-marked-alt"></i>
                        Vị trí Google Map
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Daily Itineraries Section */}
          {planData.dailyItineraries &&
            planData.dailyItineraries.length > 0 && (
              <div className="space-y-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-calendar-alt text-green-600 mr-2 bg-green-50 p-2 rounded-lg"></i>
                  Lịch trình chi tiết
                </h3>

                {planData.dailyItineraries.map((day, index) => {
                  const isLocked = !isPremium && index > 0;

                  return (
                    <div
                      key={day.id}
                      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative ${isLocked ? "select-none" : ""}`}
                    >
                      {/* Locked Overlay */}
                      {isLocked && (
                        <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
                            <i className="fas fa-lock text-white text-2xl"></i>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Nội dung bị khóa
                          </h3>
                          <p className="text-gray-600 mb-6 max-w-md">
                            Nâng cấp lên gói Premium để xem lịch trình chi tiết
                            cho tất cả các ngày và mở khóa nhiều tính năng hấp
                            dẫn khác.
                          </p>
                          <button
                            onClick={() => setShowPricing(true)}
                            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-amber-500/30 hover:scale-105 transition-transform"
                          >
                            <i className="fas fa-crown mr-2"></i>
                            Nâng cấp Premium
                          </button>
                        </div>
                      )}

                      {/* Day Header */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-green-100 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-green-600 shadow-sm shrink-0">
                            {day.dayNumber}
                          </div>
                          <div className="font-medium text-green-900">
                            Ngày {day.dayNumber}:{" "}
                            {isLocked ? "**********" : day.summary}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-5 space-y-8 ${isLocked ? "blur-sm opacity-50" : ""}`}
                      >
                        {/* Day Route Map */}
                        {(() => {
                          const cityName = planData.location?.name;
                          const mapSrc = buildDayRouteMap(
                            day.activities,
                            cityName,
                          );
                          const routeLink = buildDayRouteLink(
                            day.activities,
                            cityName,
                          );
                          if (!mapSrc) return null;

                          return (
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-gray-800 flex items-center gap-2 text-sm uppercase tracking-wider">
                                  <i className="fas fa-route text-blue-500"></i>{" "}
                                  Lộ trình ngày {day.dayNumber}
                                </h4>
                                {routeLink && (
                                  <a
                                    href={routeLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                                  >
                                    <i className="fas fa-external-link-alt"></i>
                                    Mở Google Maps
                                  </a>
                                )}
                              </div>
                              <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                <iframe
                                  title={`Lộ trình ngày ${day.dayNumber}`}
                                  src={mapSrc}
                                  className="w-full h-full"
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Activities */}
                        <div>
                          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <i className="fas fa-running text-orange-500"></i>{" "}
                            Hoạt động
                          </h4>
                          <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pl-8 py-2">
                            {day.activities.map((act) => (
                              <div key={act.id} className="relative group">
                                <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-white border-4 border-orange-400 group-hover:scale-125 transition-transform"></span>

                                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 sm:items-baseline mb-3">
                                  <div className="text-sm font-bold text-blue-600 min-w-[100px] shrink-0">
                                    {act.startTime.substring(0, 5)} -{" "}
                                    {act.endTime.substring(0, 5)}
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-bold text-gray-900 text-lg mb-2">
                                      {act.name}
                                    </h5>

                                    {act.imageUrl && (
                                      <div
                                        className="mb-3 w-full h-48 sm:h-64 rounded-xl overflow-hidden shadow-sm cursor-pointer"
                                        onClick={() =>
                                          setSelectedImage(act.imageUrl)
                                        }
                                      >
                                        <img
                                          src={act.imageUrl}
                                          alt={act.name}
                                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                              "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80";
                                          }}
                                        />
                                      </div>
                                    )}

                                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                                      {act.description}
                                    </p>

                                    <div className="flex flex-wrap gap-3 text-xs items-center">
                                      {act.priceTo > 0 ? (
                                        <span className="bg-gray-100 px-2.5 py-1 rounded-md text-gray-600 font-medium">
                                          {formatCurrency(act.priceFrom)} -{" "}
                                          {formatCurrency(act.priceTo)}
                                        </span>
                                      ) : (
                                        <span className="bg-green-100 px-2.5 py-1 rounded-md text-green-700 font-medium">
                                          Miễn phí
                                        </span>
                                      )}

                                      <a
                                        href={act.mapUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 transition-colors"
                                      >
                                        <i className="fas fa-map-marker-alt"></i>{" "}
                                        Xem bản đồ
                                      </a>
                                    </div>

                                    {act.tips && (
                                      <div className="mt-3 text-sm bg-yellow-50 text-yellow-800 px-4 py-2.5 rounded-lg border border-yellow-100 flex gap-2 items-start">
                                        <i className="fas fa-info-circle mt-0.5 shrink-0"></i>
                                        <span>{act.tips}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Food */}
                        {day.foodRecommendations &&
                          day.foodRecommendations.length > 0 && (
                            <div>
                              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                <i className="fas fa-utensils text-red-500"></i>{" "}
                                Ẩm thực đề xuất
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {day.foodRecommendations.map((food) => (
                                  <div
                                    key={food.id}
                                    className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex gap-4 hover:bg-white hover:shadow-md transition-all group"
                                  >
                                    <div
                                      className="w-24 h-24 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden relative shadow-sm cursor-pointer"
                                      onClick={() =>
                                        setSelectedImage(food.imageUrl)
                                      }
                                    >
                                      {food.imageUrl ? (
                                        <img
                                          src={food.imageUrl}
                                          alt={food.dishName}
                                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";
                                          }}
                                        />
                                      ) : (
                                        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-400">
                                          <i className="fas fa-image text-2xl"></i>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                      <div className="flex justify-between items-start mb-1">
                                        <h5
                                          className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors"
                                          title={food.dishName}
                                        >
                                          {food.dishName}
                                        </h5>
                                        <span
                                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide
                                                    ${
                                                      food.mealType ===
                                                      "Breakfast"
                                                        ? "bg-orange-100 text-orange-600"
                                                        : food.mealType ===
                                                            "Lunch"
                                                          ? "bg-blue-100 text-blue-600"
                                                          : "bg-indigo-100 text-indigo-600"
                                                    }`}
                                        >
                                          {food.mealType}
                                        </span>
                                      </div>
                                      <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                        <i className="fas fa-store opacity-70"></i>
                                        {food.restaurantName}
                                      </div>
                                      <div className="text-xs font-bold text-gray-700 flex justify-between items-end mt-auto">
                                        <span>
                                          {food.priceFrom > 0 || food.priceTo > 0
                                            ? `${formatCurrency(food.priceFrom)} - ${formatCurrency(food.priceTo)}`
                                            : "Giá tham khảo"}
                                        </span>
                                        <a
                                          href={food.mapUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-blue-500 hover:text-blue-700"
                                        >
                                          <i className="fas fa-location-arrow"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertDialog.show}
        onClose={hideDialog}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
        buttonText={alertDialog.buttonText}
      />
      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
      />
    </div>
  );
};

export default NewPlanResult;
