import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import planService from "../services/planService";
import useDialog from "../hooks/useDialog";
import AlertDialog from "../components/common/AlertDialog";
import { useAuth } from "../context/AuthContext";
import PricingModal from "../components/booking/PricingModal";
import bgHeroPlanResult from "../assets/images/hero-ai-planner-result-page.jpg";
import { hasPremiumAccess } from "../utils/subscriptionUtils";


const AIPlannerResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { alertDialog, showAlert, hideDialog } = useDialog();

  const [planData, setPlanData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const isPremium = hasPremiumAccess(user);

  useEffect(() => {
    if (location.state && location.state.planData) {
      setPlanData(location.state.planData);
      setIsSaved(location.state.planData.isSaved || false);
    } else {
      // Redirect back if no data (optional, but good practice)
      navigate("/ai-planner");
    }
  }, [location.state, navigate]);

  const handleSave = async () => {
    if (!planData) return;
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

  if (!planData)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Banner */}
      <div className="relative h-[30vh] w-full overflow-hidden mb-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgHeroPlanResult})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 drop-shadow-lg text-white">
            Kế hoạch du lịch {planData.location?.name}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Action Toolbar */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8 flex flex-wrap justify-between items-center gap-4 border border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2 font-medium"
            >
              <i className="fas fa-arrow-left"></i> Quay lại
            </button>
          </div>

          <div className="flex gap-3">
            {isPremium ? (
              <>
                {!isSaved ? (
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-all shadow-sm"
                  >
                    {isSaving ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <i className="fas fa-save"></i>
                    )}
                    {isSaving ? "Đang lưu..." : "Lưu kế hoạch"}
                  </button>
                ) : (
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-green-100 text-green-700 rounded-xl font-medium cursor-default">
                    <i className="fas fa-check"></i> Đã lưu
                  </button>
                )}
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-amber-600 bg-amber-50 px-4 py-2 rounded-lg text-sm border border-amber-100 font-medium">
                  <i className="fas fa-lock mr-2"></i>
                  Nâng cấp Premium để Lưu Kế hoạch
                </div>
                <button
                  onClick={() => setShowPricing(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all"
                >
                  <i className="fas fa-crown mr-2"></i> Nâng cấp ngay
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Itinerary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Itineraries */}
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <i className="fas fa-calendar-alt text-green-600 mr-2"></i>
                  Lịch trình chi tiết
                </h3>
                <div className="flex gap-3">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 flex items-center gap-2">
                    <i className="fas fa-clock text-blue-500"></i>
                    {planData.duration} ngày
                  </span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100 flex items-center gap-2">
                    <i className="fas fa-user-friends text-purple-500"></i>
                    {planData.numberOfPeople} người
                  </span>
                </div>
              </div>
              {planData.dailyItineraries?.map((day, index) => {
                const isLocked = !isPremium && index > 0;
                return (
                  <div
                    key={day.id}
                    className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative ${
                      isLocked ? "select-none h-96" : ""
                    }`}
                  >
                    {isLocked && (
                      <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center">
                        <i className="fas fa-lock text-4xl text-amber-500 mb-4"></i>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          Mở khóa toàn bộ lịch trình
                        </h4>
                        <p className="text-gray-600 mb-6 max-w-sm">
                          Nâng cấp Premium để xem chi tiết lịch trình các ngày
                          tiếp theo cùng gợi ý ăn uống, di chuyển chi tiết.
                        </p>
                        <button
                          onClick={() => setShowPricing(true)}
                          className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                        >
                          <i className="fas fa-crown"></i>
                          Mở khóa ngay
                        </button>
                      </div>
                    )}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-green-100">
                      <h4 className="font-bold text-green-900 text-lg">
                        Ngày {day.dayNumber}:{" "}
                        {isLocked ? "**********" : day.summary}
                      </h4>
                    </div>

                    {!isLocked && (
                      <div className="p-6 space-y-8">
                        {/* Activities */}
                        <div>
                          <h5 className="font-bold text-gray-700 mb-4 flex items-center gap-2 text-sm uppercase">
                            <i className="fas fa-running text-orange-500"></i>{" "}
                            Hoạt động
                          </h5>
                          <div className="space-y-6 border-l-2 border-gray-100 ml-2 pl-6 relative">
                            {day.activities.map((act) => (
                              <div key={act.id} className="relative group">
                                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-orange-400 group-hover:scale-125 transition-transform"></span>
                                <div className="flex flex-col sm:flex-row gap-4 mb-2">
                                  <div className="text-sm font-bold text-blue-600 w-24 shrink-0 pt-0.5">
                                    {act.startTime.substring(0, 5)} -{" "}
                                    {act.endTime.substring(0, 5)}
                                  </div>
                                  <div className="flex-1">
                                    <h6 className="font-bold text-gray-900 text-lg mb-2">
                                      {act.name}
                                    </h6>
                                    {act.imageUrl && (
                                      <img
                                        src={act.imageUrl}
                                        alt={act.name}
                                        className="w-full h-48 object-cover rounded-xl mb-3 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                                        onClick={() =>
                                          setSelectedImage(act.imageUrl)
                                        }
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src =
                                            "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80";
                                        }}
                                      />
                                    )}
                                    <p className="text-gray-600 text-sm mb-2">
                                      {act.description}
                                    </p>
                                    {act.tips && (
                                      <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-100 flex gap-2">
                                        <i className="fas fa-lightbulb mt-0.5"></i>
                                        {act.tips}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Food */}
                        {day.foodRecommendations?.length > 0 && (
                          <div>
                            <h5 className="font-bold text-gray-700 mb-4 flex items-center gap-2 text-sm uppercase">
                              <i className="fas fa-utensils text-red-500"></i>{" "}
                              Ẩm thực
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {day.foodRecommendations.map((food) => (
                                <div
                                  key={food.id}
                                  className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all"
                                >
                                  <img
                                    src={
                                      food.imageUrl ||
                                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
                                    }
                                    className="w-20 h-20 rounded-lg object-cover bg-gray-200 cursor-pointer"
                                    alt={food.dishName}
                                    onClick={() =>
                                      setSelectedImage(food.imageUrl)
                                    }
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                      <h6
                                        className="font-bold text-gray-900 truncate"
                                        title={food.dishName}
                                      >
                                        {food.dishName}
                                      </h6>
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-600 uppercase">
                                        {food.mealType}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate mb-1">
                                      {food.restaurantName}
                                    </p>
                                    <p className="text-xs font-bold text-gray-700">
                                      {formatCurrency(food.priceFrom)} -{" "}
                                      {formatCurrency(food.priceTo)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Transport & Accommodation */}
          <div className="space-y-8">
            {/* Transport */}
            {planData.transportations?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-plane-departure text-blue-600 mr-2"></i>{" "}
                  Di chuyển
                </h3>
                <div className="space-y-4">
                  {planData.transportations.map((trans) => (
                    <div
                      key={trans.id}
                      className="bg-blue-50/50 rounded-xl p-4 border border-blue-100"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-gray-900">
                          {trans.provider}
                        </div>
                        <div className="text-blue-600 font-bold">
                          {formatCurrency(trans.priceFrom)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                        <i className="fas fa-route text-gray-400"></i>{" "}
                        {trans.route}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {trans.bookingInfo}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accommodations */}
            {planData.accommodations?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-hotel text-purple-600 mr-2"></i> Lưu trú
                </h3>
                <div className="space-y-6">
                  {planData.accommodations.map((acc) => (
                    <div
                      key={acc.id}
                      className="group cursor-pointer"
                      onClick={() => setSelectedImage(acc.imageUrl)}
                    >
                      <div className="h-40 rounded-xl overflow-hidden mb-3 relative">
                        <img
                          src={
                            acc.imageUrl ||
                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                          }
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt={acc.name}
                        />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-xs font-bold shadow-sm">
                          {acc.accommodationType}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {acc.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                        <i className="fas fa-map-marker-alt text-gray-400"></i>{" "}
                        {acc.address}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                          <i className="fas fa-star"></i> {acc.rating}
                        </div>
                        <div className="text-purple-600 font-bold">
                          {formatCurrency(acc.pricePerNight)}
                          <span className="text-gray-400 text-xs font-normal">
                            /đêm
                          </span>
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

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-2"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white hover:text-gray-300 p-2">
            <i className="fas fa-times text-2xl"></i>
          </button>
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}

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

export default AIPlannerResultPage;
