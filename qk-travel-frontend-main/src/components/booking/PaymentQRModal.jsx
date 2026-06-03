import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import paymentService from "../../services/paymentService";
import { motion, AnimatePresence } from "framer-motion";
import useDialog from "../../hooks/useDialog";
import AlertDialog from "../common/AlertDialog";

const PaymentQRModal = ({
  isOpen,
  onClose,
  paymentData,
  onPaymentSuccess,
  onPaymentFailure,
  showAlert,
}) => {
  React.useEffect(() => {
    let intervalId;

    const orderCode = paymentData?.orderCode;

    if (isOpen && orderCode) {
      intervalId = setInterval(async () => {
        try {
          const response = await paymentService.checkStatus(orderCode);
          console.log("Polling raw response:", response);

          if (response?.success && response?.data?.isPaid === true) {
            console.log("Payment completed!");
            clearInterval(intervalId);
            onPaymentSuccess && onPaymentSuccess();
          }
        } catch (error) {
          console.error("Polling error", error);
        }
      }, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOpen, paymentData, onPaymentSuccess, onPaymentFailure]);

  if (!isOpen || !paymentData) return null;

  const {
    amount,
    accountNumber,
    accountName,
    bankCode,
    description,
    qrCodeUrl,
  } = paymentData;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast here
    showAlert({
      title: "Đã sao chép",
      message: `Đã sao chép: ${text}`,
      type: "success",
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row my-auto max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button (Global) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-gray-800 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Left Side: Information */}
          <div className="w-full md:w-1/2 p-4 sm:p-8 bg-gray-50/50 flex flex-col justify-center order-2 md:order-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
              Thông tin chuyển khoản
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
              Vui lòng chuyển khoản chính xác số tiền và nội dung bên dưới.
            </p>

            <div className="space-y-3 sm:space-y-4 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-100">
                <span className="text-gray-500 text-xs sm:text-sm">
                  Ngân hàng
                </span>
                <span className="font-bold text-gray-900 text-sm sm:text-base">
                  {bankCode}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-100 group">
                <span className="text-gray-500 text-xs sm:text-sm">
                  Số tài khoản
                </span>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="font-bold text-gray-900 text-sm sm:text-lg">
                    {accountNumber}
                  </span>
                  <button
                    onClick={() => handleCopy(accountNumber)}
                    className="text-gray-400 hover:text-primary-600 transition-colors p-1"
                    title="Sao chép"
                  >
                    <i className="fas fa-copy text-xs sm:text-sm"></i>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-100">
                <span className="text-gray-500 text-xs sm:text-sm">
                  Chủ tài khoản
                </span>
                <span className="font-bold text-gray-900 uppercase text-xs sm:text-base text-right max-w-[60%]">
                  {accountName}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-100">
                <span className="text-gray-500 text-xs sm:text-sm">
                  Số tiền
                </span>
                <span className="font-bold text-lg sm:text-xl text-primary-600">
                  {formatCurrency(amount)}
                </span>
              </div>

              <div className="flex flex-col gap-1 py-1.5 sm:py-2">
                <span className="text-gray-500 text-xs sm:text-sm">
                  Nội dung chuyển khoản
                </span>
                <div className="flex items-center gap-1 sm:gap-2 bg-yellow-50 border border-yellow-200 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                  <span className="font-mono font-bold text-yellow-800 text-sm sm:text-lg break-all">
                    {description}
                  </span>
                  <button
                    onClick={() => handleCopy(description)}
                    className="ml-auto text-yellow-600 hover:text-yellow-800 transition-colors p-1.5 sm:p-2 hover:bg-yellow-100 rounded-lg flex-shrink-0"
                    title="Sao chép"
                  >
                    <i className="fas fa-copy text-xs sm:text-sm"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-col gap-2 sm:gap-3">
              <div className="flex gap-2 sm:gap-3 items-start p-2 sm:p-3 bg-blue-50 text-blue-700 rounded-lg sm:rounded-xl text-xs sm:text-sm border border-blue-100">
                <i className="fas fa-bolt mt-0.5 sm:mt-1 text-xs sm:text-sm"></i>
                <p>
                  Tài khoản sẽ được kích hoạt tự động ngay sau khi hệ thống nhận
                  được thanh toán.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: QR Code */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-4 sm:p-8 flex flex-col items-center justify-center text-white relative order-1 md:order-2">
            <h3 className="text-base sm:text-xl font-bold mb-3 sm:mb-6 text-white">
              Quét mã QR để thanh toán
            </h3>

            <div className="bg-white p-2 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl relative">
              <img
                src={qrCodeUrl}
                alt="QR Code Payment"
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain rounded-lg"
              />
            </div>

            <div className="mt-8 flex items-center gap-4 opacity-80">
              <img
                src="https://img.vietqr.io/image/MB-0373517718-compact2.png"
                className="h-8 hidden"
                alt=""
              />{" "}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentQRModal;
