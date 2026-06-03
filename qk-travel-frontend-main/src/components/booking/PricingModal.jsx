import React from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import paymentService from "../../services/paymentService";
import giftcodeService from "../../services/giftcodeService";
import PaymentQRModal from "./PaymentQRModal";
import useDialog from "../../hooks/useDialog";
import AlertDialog from "../common/AlertDialog";
import { useAuth } from "../../context/AuthContext";

const PricingModal = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = React.useState("monthly");
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(true);
  const [paymentModalOpen, setPaymentModalOpen] = React.useState(false);
  const [paymentData, setPaymentData] = React.useState(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Giftcode State
  const [giftCode, setGiftCode] = React.useState("");
  const [discountPercentage, setDiscountPercentage] = React.useState(0);
  const [maximumDiscountAmount, setMaximumDiscountAmount] = React.useState(0);
  const [appliedGiftCode, setAppliedGiftCode] = React.useState(null);
  const [isCheckingGiftcode, setIsCheckingGiftcode] = React.useState(false);

  // Dialog Hook
  const { alertDialog, showAlert, hideDialog } = useDialog();
  const { refreshProfile } = useAuth();

  // Reset internal state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setPaymentModalOpen(false);
      setPaymentData(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const features = [
    {
      name: "Thư viện điểm đến",
      icon: "fa-map-marked-alt",
      free: { status: "yes", details: [] },
      premium: { status: "yes", details: [] },
    },
    {
      name: "AI Trip Planner",
      icon: "fa-route",
      free: {
        status: "limited",
        details: ["3 lượt dùng/ngày"],
      },
      premium: {
        status: "yes",
        details: [
          "10 lượt dùng/ngày",
          "Xem toàn bộ nội dung kế hoạch",
          "Lưu kế hoạch",
        ],
      },
    },
    {
      name: "Tích hợp Google Maps",
      icon: "fa-map",
      free: { status: "yes", details: [] },
      premium: { status: "yes", details: [] },
    },
    {
      name: "Dự báo thời tiết tại điểm đến",
      icon: "fa-cloud-sun",
      free: { status: "no", details: [] },
      premium: {
        status: "yes",
        details: ["Cập nhật dự báo thời tiết liên tục"],
      },
    },

    {
      name: "AI Voice Assistant",
      icon: "fa-headphones",
      free: { status: "no", details: [] },
      premium: {
        status: "yes",
        details: [],
      },
    },
  ];

  const FeatureStatus = ({ status, details }) => {
    if (status === "yes") {
      return (
        <div className="flex justify-center">
          {details.length === 0 ? (
            <i className="fas fa-check-circle text-2xl text-green-500"></i>
          ) : (
            <div className="flex flex-col items-start">
              <i className="fas fa-check-circle text-2xl text-green-500 mb-2 self-center"></i>
              <ul className="text-xs text-gray-700 space-y-1 text-left">
                {details.map((detail, idx) => (
                  <li key={idx}>
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    } else if (status === "limited") {
      return (
        <div className="flex justify-center">
          <div className="flex flex-col items-start">
            <i className="fas fa-exclamation-circle text-2xl text-amber-500 mb-2 self-center"></i>
            <ul className="text-xs text-gray-600 space-y-1 text-left">
              {details.map((detail, idx) => (
                <li key={idx}>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <i className="fas fa-times-circle text-2xl text-gray-300"></i>
        </div>
      );
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop > 50) {
      setShowScrollIndicator(false);
    } else {
      setShowScrollIndicator(true);
    }
  };

  const handleUpgrade = async () => {
    try {
      setIsProcessing(true);
      const subscriptionPlanId = billingCycle === "yearly" ? 3 : 2;
      const response = await paymentService.createPaymentOrder(
        subscriptionPlanId,
        appliedGiftCode,
      );

      if (response && response.success) {
        const data = response.data;

        if (data.amount <= 0) {
          showAlert({
            title: "Xác nhận thanh toán",
            message:
              "Thanh toán thành công! Gói cước của bạn đã được nâng cấp.",
            type: "success",
          });
        } else {
          setPaymentData(data);
          setPaymentModalOpen(true);
        }
      }
    } catch (error) {
      console.error("Payment creation failed", error);
      showAlert({
        title: "Lỗi",
        message:
          error.response?.data?.message ||
          "Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.",
        type: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const originalPrice = billingCycle === "monthly" ? 49000 : 450000;
  const priceLabel = billingCycle === "monthly" ? "VNĐ/tháng" : "VNĐ/năm";
  const finalPrice = Math.max(
    0,
    originalPrice -
      (discountPercentage > 0
        ? Math.min(
            originalPrice * (discountPercentage / 100),
            maximumDiscountAmount,
          )
        : maximumDiscountAmount),
  );

  return (
    <AnimatePresence>
      <Motion.div
        key="pricing-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <Motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative"
          onClick={(e) => e.stopPropagation()}
          onScroll={handleScroll}
        >
          {/* Compact Header with Background Image */}
          <div className="sticky top-0 z-50 relative px-4 sm:px-6 py-4 sm:py-5 rounded-t-2xl bg-white shadow-md">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center rounded-t-2xl overflow-hidden -z-10"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070')",
              }}
            ></div>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 rounded-t-2xl -z-10"></div>

            {/* Close Button - Di chuyển ra ngoài content */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[60] w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 text-white transition-colors"
              aria-label="Đóng"
            >
              <i className="fas fa-times text-base sm:text-sm"></i>
            </button>

            {/* Content */}
            <div className="relative pr-10 sm:pr-0">
              <div className="max-w-2xl">
                <h2 className="text-white text-xl sm:text-2xl font-bold mb-1 drop-shadow-lg">
                  Chọn gói phù hợp
                </h2>
                <p className="text-white/90 text-xs sm:text-sm drop-shadow-md">
                  Trải nghiệm đầy đủ tính năng với Premium
                </p>
                <div className="mt-3 inline-flex items-center rounded-lg bg-white/20 p-1 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => setBillingCycle("monthly")}
                    className={`px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium transition-colors ${
                      billingCycle === "monthly"
                        ? "bg-white text-primary-700"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    Theo tháng
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle("yearly")}
                    className={`px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium transition-colors ${
                      billingCycle === "yearly"
                        ? "bg-white text-primary-700"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    Theo năm
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden px-4 py-4">
            <div className="space-y-4">
              {/* Premium Card - Đặt lên đầu trên mobile */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4 border-2 border-primary-300 shadow-lg"
              >
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    🔥 Phổ biến nhất
                  </span>
                </div>

                {/* Header */}
                <div className="text-center mt-2 mb-4">
                  <h3 className="text-xl font-bold text-primary-700">
                    Premium
                  </h3>
                  <div className="mt-1">
                    {appliedGiftCode ? (
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 line-through text-sm">
                          {new Intl.NumberFormat("vi-VN").format(originalPrice)}{" "}
                          {priceLabel}
                        </span>
                        <span className="text-primary-600 font-bold text-lg">
                          {new Intl.NumberFormat("vi-VN").format(finalPrice)}{" "}
                          {priceLabel}
                        </span>
                      </div>
                    ) : (
                      <span className="text-primary-600 font-semibold">
                        {new Intl.NumberFormat("vi-VN").format(originalPrice)}{" "}
                        {priceLabel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <i
                        className={`fas ${feature.premium.status === "yes" ? "fa-check-circle text-green-500" : feature.premium.status === "limited" ? "fa-exclamation-circle text-amber-500" : "fa-times-circle text-gray-300"} mt-0.5`}
                      ></i>
                      <div className="flex-1">
                        <span className="text-gray-800">{feature.name}</span>
                        {feature.premium.details.length > 0 && (
                          <ul className="text-xs text-gray-600 mt-0.5">
                            {feature.premium.details.map((detail, idx) => (
                              <li key={idx}>• {detail}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Giftcode + CTA */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Mã giảm giá..."
                      value={giftCode}
                      onChange={(e) =>
                        setGiftCode(e.target.value.toUpperCase())
                      }
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 shadow-sm bg-white"
                      disabled={!!appliedGiftCode}
                    />
                    <button
                      onClick={async () => {
                        if (!giftCode) return;
                        if (appliedGiftCode) {
                          setAppliedGiftCode(null);
                          setDiscountPercentage(0);
                          setMaximumDiscountAmount(0);
                          setGiftCode("");
                          return;
                        }
                        try {
                          setIsCheckingGiftcode(true);
                          const response =
                            await giftcodeService.validate(giftCode);
                          if (response?.success && response?.data) {
                            const {
                              discountPercentage,
                              maximumDiscountAmount,
                            } = response.data;
                            setDiscountPercentage(discountPercentage);
                            setMaximumDiscountAmount(maximumDiscountAmount);
                            setAppliedGiftCode(giftCode);
                            showAlert({
                              title: "Thành công",
                              message:
                                discountPercentage > 0
                                  ? `Giảm ${discountPercentage}% (Tối đa ${new Intl.NumberFormat("vi-VN").format(maximumDiscountAmount)} VNĐ)`
                                  : `Giảm ${new Intl.NumberFormat("vi-VN").format(maximumDiscountAmount)} VNĐ`,
                              type: "success",
                            });
                          } else {
                            showAlert({
                              title: "Lỗi",
                              message: "Mã giảm giá không hợp lệ",
                              type: "error",
                            });
                          }
                        } catch (error) {
                          showAlert({
                            title: "Lỗi",
                            message:
                              error.response?.data?.message ||
                              "Mã không hợp lệ",
                            type: "error",
                          });
                        } finally {
                          setIsCheckingGiftcode(false);
                        }
                      }}
                      className={`px-4 py-2 text-sm font-bold text-white rounded-lg shadow transition-all ${appliedGiftCode ? "bg-red-500" : "bg-gray-800"}`}
                      disabled={isCheckingGiftcode}
                    >
                      {isCheckingGiftcode ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : appliedGiftCode ? (
                        <i className="fas fa-times"></i>
                      ) : (
                        "Áp dụng"
                      )}
                    </button>
                  </div>
                  <button
                    onClick={handleUpgrade}
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>Đang xử
                        lý...
                      </>
                    ) : (
                      "Nâng cấp ngay"
                    )}
                  </button>
                </div>
              </Motion.div>

              {/* Basic Card */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm"
              >
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Basic</h3>
                  <span className="text-gray-500 text-sm">Miễn phí</span>
                </div>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <i
                        className={`fas ${feature.free.status === "yes" ? "fa-check-circle text-green-500" : feature.free.status === "limited" ? "fa-exclamation-circle text-amber-500" : "fa-times-circle text-gray-300"} mt-0.5`}
                      ></i>
                      <div className="flex-1">
                        <span className="text-gray-800">{feature.name}</span>
                        {feature.free.details.length > 0 && (
                          <ul className="text-xs text-gray-600 mt-0.5">
                            {feature.free.details.map((detail, idx) => (
                              <li key={idx}>• {detail}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Motion.div>
            </div>

            {/* Footer Info (Mobile) */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                <i className="fas fa-shield-alt text-primary-500 mr-1"></i>
                Thanh toán an toàn & bảo mật
              </p>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block px-6 py-6 pt-8">
            <div className="max-w-6xl mx-auto">
              <table className="w-full border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-800 text-base w-1/3">
                      Tính năng
                    </th>
                    <th className="text-center py-4 px-4 w-1/3">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-gray-800 mb-1">
                          Basic
                        </span>
                        <span className="text-sm text-gray-500">
                          {billingCycle === "monthly"
                            ? "0 VNĐ/tháng"
                            : "0 VNĐ/năm"}
                        </span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 w-1/3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-t-xl relative pt-10">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30">
                        <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg whitespace-nowrap">
                          🔥 Phổ biến nhất
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-primary-700 mb-1">
                          Premium
                        </span>
                        <div className="text-sm">
                          <div className="flex flex-col items-center">
                            {appliedGiftCode ? (
                              <>
                                <span className="text-gray-400 line-through text-xs">
                                  {new Intl.NumberFormat("vi-VN").format(
                                    originalPrice,
                                  )}{" "}
                                  {priceLabel}
                                </span>
                                <span className="text-primary-600 font-bold text-xl">
                                  {new Intl.NumberFormat("vi-VN").format(
                                    finalPrice,
                                  )}{" "}
                                  {priceLabel}
                                </span>
                              </>
                            ) : (
                              <span className="text-primary-600 font-semibold">
                                {new Intl.NumberFormat("vi-VN").format(
                                  originalPrice,
                                )}{" "}
                                {priceLabel}
                              </span>
                            )}
                            {billingCycle === "yearly" && (
                              <p className="text-xs text-green-600 mt-1">
                                {appliedGiftCode
                                  ? "Đã áp dụng mã giảm giá"
                                  : "Chỉ 37.500 VNĐ/tháng"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {features.map((feature, index) => (
                    <Motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-3">
                          <i
                            className={`fas ${feature.icon} text-primary-500 text-lg`}
                          ></i>
                          <span className="font-medium text-gray-800 text-sm">
                            {feature.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <FeatureStatus
                          status={feature.free.status}
                          details={feature.free.details}
                        />
                      </td>
                      <td className="py-4 px-4 bg-primary-50/30 align-top">
                        <FeatureStatus
                          status={feature.premium.status}
                          details={feature.premium.details}
                        />
                      </td>
                    </Motion.tr>
                  ))}
                </tbody>

                {/* Table Footer - CTA Buttons */}
                <tfoot>
                  <tr>
                    <td className="py-5 px-4"></td>
                    <td className="py-5 px-4"></td>
                    <td className="py-5 px-4 bg-primary-50/30">
                      <div className="flex flex-col gap-3">
                        {/* Giftcode Input Section */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Mã giảm giá..."
                            value={giftCode}
                            onChange={(e) =>
                              setGiftCode(e.target.value.toUpperCase())
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 shadow-sm"
                            disabled={!!appliedGiftCode}
                          />
                          <button
                            onClick={async () => {
                              if (!giftCode) return;
                              // Handle Remove
                              if (appliedGiftCode) {
                                setAppliedGiftCode(null);
                                setDiscountPercentage(0);
                                setMaximumDiscountAmount(0);
                                setGiftCode("");
                                return;
                              }

                              // Handle Add
                              try {
                                setIsCheckingGiftcode(true);
                                const response =
                                  await giftcodeService.validate(giftCode);
                                if (
                                  response &&
                                  response.success &&
                                  response.data
                                ) {
                                  const {
                                    discountPercentage,
                                    maximumDiscountAmount,
                                  } = response.data;
                                  setDiscountPercentage(discountPercentage);
                                  setMaximumDiscountAmount(
                                    maximumDiscountAmount,
                                  );

                                  // Calculate approximate discount for display in alert (based on monthly which is default)
                                  // Or just show generic message
                                  let message = "";
                                  if (discountPercentage > 0) {
                                    message = `Áp dụng mã ${giftCode} giảm ${discountPercentage}% (Tối đa ${new Intl.NumberFormat("vi-VN").format(maximumDiscountAmount)} VNĐ)`;
                                  } else {
                                    message = `Áp dụng mã ${giftCode} giảm ${new Intl.NumberFormat(
                                      "vi-VN",
                                    ).format(maximumDiscountAmount)} VNĐ`;
                                  }

                                  setAppliedGiftCode(giftCode);
                                  showAlert({
                                    title: "Thành công",
                                    message: message,
                                    type: "success",
                                  });
                                } else {
                                  showAlert({
                                    title: "Lỗi",
                                    message:
                                      "Mã giảm giá không hợp lệ hoặc đã hết hạn",
                                    type: "error",
                                  });
                                }
                              } catch (error) {
                                console.error(error);
                                showAlert({
                                  title: "Lỗi",
                                  message:
                                    error.response?.data?.message ||
                                    "Mã không hợp lệ",
                                  type: "error",
                                });
                              } finally {
                                setIsCheckingGiftcode(false);
                              }
                            }}
                            className={`px-3 py-2 text-sm font-bold text-white rounded-lg shadow transition-all ${appliedGiftCode ? "bg-red-500 hover:bg-red-600" : "bg-gray-800 hover:bg-gray-900"}`}
                            disabled={isCheckingGiftcode}
                          >
                            {isCheckingGiftcode ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : appliedGiftCode ? (
                              <i className="fas fa-times"></i>
                            ) : (
                              "Áp dụng"
                            )}
                          </button>
                        </div>

                        <button
                          onClick={handleUpgrade}
                          disabled={isProcessing}
                          className="w-full py-3 px-5 rounded-lg text-sm font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-wait"
                        >
                          {isProcessing ? (
                            <span>
                              <i className="fas fa-spinner fa-spin mr-2"></i>
                              Đang xử lý...
                            </span>
                          ) : (
                            "Nâng cấp ngay"
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                <i className="fas fa-shield-alt text-primary-500 mr-2"></i>
                Thanh toán an toàn & bảo mật
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          {showScrollIndicator && (
            <Motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none"
            ></Motion.div>
          )}
        </Motion.div>
      </Motion.div>

      {/* Payment QR Modal */}
      <PaymentQRModal
        key="payment-qr-modal"
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        paymentData={paymentData}
        showAlert={showAlert}
        onPaymentSuccess={async () => {
          showAlert({
            title: "Thành công",
            message:
              "Thanh toán thành công! Gói cước của bạn đã được nâng cấp.",
            type: "success",
          });
        }}
        onPaymentFailure={() => {
          showAlert({
            title: "Thất bại",
            message: "Thanh toán thất bại hoặc quá hạn. Vui lòng thử lại.",
            type: "error",
          });
          setPaymentModalOpen(false);
        }}
      />

      {/* Global Alerts */}
      <AlertDialog
        key="alert-dialog"
        isOpen={alertDialog.show}
        onClose={async () => {
          if (
            alertDialog.type === "success" &&
            alertDialog.message.includes("Thanh toán thành công")
          ) {
            setPaymentModalOpen(false);
            onClose();
            try {
              await refreshProfile();
            } catch (error) {
              console.error(
                "Auto-refresh profile failed after modal close:",
                error,
              );
            }
          }
          hideDialog();
        }}
        title={alertDialog.title}
        message={alertDialog.message}
        type={alertDialog.type}
        buttonText={alertDialog.buttonText}
      />
    </AnimatePresence>
  );
};

export default PricingModal;
