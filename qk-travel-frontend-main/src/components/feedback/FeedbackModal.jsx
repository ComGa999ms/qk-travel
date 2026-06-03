import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import feedbackService from "../../services/feedbackService";
import useDialog from "../../hooks/useDialog";
import AlertDialog from "../common/AlertDialog";
import { useNavigate } from "react-router-dom";

const FeedbackModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { alertDialog, showAlert, hideDialog } = useDialog();

  const [formData, setFormData] = useState({
    rating: 5,
    aiTripPlannerUsefulness: "Useful",
    content: "",
    wouldRecommend: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usefulnessOptions = [
    { value: "NotUseful", label: "Không hữu ích" },
    { value: "SlightlyUseful", label: "Hơi hữu ích" },
    { value: "Useful", label: "Hữu ích" },
    { value: "VeryUseful", label: "Rất hữu ích" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setRating = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showAlert({
        title: "Yêu cầu đăng nhập",
        message: "Bạn cần đăng nhập để gửi góp ý.",
        type: "info",
        onConfirm: () => {
          onClose();
          navigate("/login");
        },
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await feedbackService.create(formData);
      if (response && response.success) {
        showAlert({
          title: "Cảm ơn bạn!",
          message:
            "Góp ý của bạn đã được ghi nhận. Chúng tôi rất trân trọng ý kiến đóng góp của bạn.",
          type: "success",
          onConfirm: () => {
            onClose();
            // Reset form
            setFormData({
              rating: 5,
              aiTripPlannerUsefulness: "Useful",
              content: "",
              wouldRecommend: true,
            });
          },
        });
      } else {
        throw new Error(response?.message || "Gửi góp ý thất bại");
      }
    } catch (error) {
      console.error("Feedback error:", error);
      showAlert({
        title: "Lỗi",
        message: "Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại sau.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <AlertDialog
        isOpen={alertDialog.show}
        onClose={() => {
          hideDialog();
          if (alertDialog.onConfirm) {
            alertDialog.onConfirm();
          }
        }}
        {...alertDialog}
      />

      <div className="fixed inset-0 z-50 flex justify-end items-center pointer-events-none">
        <AnimatePresence>
          {isOpen && (
            <>
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/30 backdrop-blur-[1px] pointer-events-auto"
                onClick={onClose}
              ></Motion.div>

              <Motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative bg-white w-full max-w-md h-auto max-h-[85vh] shadow-2xl pointer-events-auto flex flex-col rounded-l-2xl"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <i className="fas fa-comment-dots"></i>
                    Gửi Góp Ý
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <i className="fas fa-times text-lg"></i>
                  </button>
                </div>

                {/* Body */}
                <div className="p-6">
                  {!user ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500 mb-4">
                        <i className="fas fa-lock text-4xl"></i>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Vui lòng đăng nhập để gửi góp ý cho chúng tôi.
                      </p>
                      <button
                        onClick={() => navigate("/login")}
                        className="btn btn-primary"
                      >
                        Đăng nhập ngay
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Rating */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Trải nghiệm của bạn với QkTravel
                        </label>
                        <div className="flex gap-2 justify-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className={`text-3xl transition-transform hover:scale-110 ${
                                formData.rating >= star
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              <i className="fas fa-star"></i>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* AI Planner Usefulness */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          AI Trip Planner có hữu ích với bạn không?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {usefulnessOptions.map((option) => (
                            <label
                              key={option.value}
                              className={`flex items-center justify-center px-3 py-2 border rounded-lg cursor-pointer transition-all ${
                                formData.aiTripPlannerUsefulness ===
                                option.value
                                  ? "bg-primary-50 border-primary-500 text-primary-700 font-medium shadow-sm"
                                  : "border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <input
                                type="radio"
                                name="aiTripPlannerUsefulness"
                                value={option.value}
                                checked={
                                  formData.aiTripPlannerUsefulness ===
                                  option.value
                                }
                                onChange={handleInputChange}
                                className="hidden"
                              />
                              <span className="text-sm">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Recommend */}
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">
                            Bạn có sẵn sàng giới thiệu QkTravel cho người khác
                            không?
                          </label>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  wouldRecommend: true,
                                }))
                              }
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                formData.wouldRecommend
                                  ? "bg-green-100 text-green-700"
                                  : "text-gray-500 hover:bg-gray-100"
                              }`}
                            >
                              <i className="fas fa-thumbs-up mr-1"></i> Có
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  wouldRecommend: false,
                                }))
                              }
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                !formData.wouldRecommend
                                  ? "bg-red-100 text-red-700"
                                  : "text-gray-500 hover:bg-gray-100"
                              }`}
                            >
                              <i className="fas fa-thumbs-down mr-1"></i> Không
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Góp ý / Đề xuất cải thiện (Tùy chọn)
                        </label>
                        <textarea
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm resize-none"
                          placeholder="Hãy cho chúng tôi biết suy nghĩ của bạn..."
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn btn-primary py-3 rounded-lg font-bold shadow-lg shadow-primary-500/30"
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Đang gửi...
                          </>
                        ) : (
                          "Gửi Góp Ý"
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </Motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};

export default FeedbackModal;
