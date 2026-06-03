import React from "react";

const AlertDialog = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText = "Đóng",
  type = "info",
}) => {
  if (!isOpen) return null;

  const getIconAndColor = () => {
    switch (type) {
      case "error":
        return {
          icon: "fa-times-circle",
          bgColor: "bg-red-100",
          iconColor: "text-red-600",
          btnColor: "bg-red-600 hover:bg-red-700",
        };
      case "success":
        return {
          icon: "fa-check-circle",
          bgColor: "bg-green-100",
          iconColor: "text-green-600",
          btnColor: "bg-green-600 hover:bg-green-700",
        };
      case "warning":
        return {
          icon: "fa-exclamation-triangle",
          bgColor: "bg-yellow-100",
          iconColor: "text-yellow-600",
          btnColor: "bg-yellow-600 hover:bg-yellow-700",
        };
      case "info":
      default:
        return {
          icon: "fa-info-circle",
          bgColor: "bg-blue-100",
          iconColor: "text-blue-600",
          btnColor: "bg-blue-600 hover:bg-blue-700",
        };
    }
  };

  const { icon, bgColor, iconColor, btnColor } = getIconAndColor();

  return (
    <div
      className="fixed inset-0 z-[100000] bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div className="fixed inset-0 flex items-center justify-center p-4 min-h-screen pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-slideUp pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className="p-6">
            <div
              className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <i className={`fas ${icon} text-3xl ${iconColor}`}></i>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {title}
            </h3>

            {/* Message */}
            <p className="text-gray-600 text-center whitespace-pre-line">
              {message}
            </p>
          </div>

          {/* Action */}
          <div className="p-6 pt-0">
            <button
              onClick={onClose}
              className={`w-full px-4 py-3 ${btnColor} text-white rounded-lg font-semibold transition-all shadow-lg`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
