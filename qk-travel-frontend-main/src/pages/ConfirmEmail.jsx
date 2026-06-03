import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import authService from "../services/authService";
import AlertDialog from "../components/common/AlertDialog";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [promptEmail, setPromptEmail] = useState("");
  const [alertDialog, setAlertDialog] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    const confirmEmail = async () => {
      const userId = searchParams.get("userId");
      const token = searchParams.get("token");

      if (!userId || !token) {
        setStatus("error");
        setMessage("Link xác thực không hợp lệ hoặc đã hết hạn.");
        return;
      }

      try {
        await authService.confirmEmail(userId, token);
        setStatus("success");
        setMessage(
          "Xác thực email thành công! Bạn có thể đăng nhập ngay bây giờ.",
        );
      } catch (error) {
        console.error("Email confirmation error:", error);
        setStatus("error");
        const errorMsg =
          error.response?.data?.message ||
          "Xác thực thất bại. Link có thể đã hết hạn hoặc không hợp lệ.";
        setMessage(errorMsg);
      }
    };

    confirmEmail();
  }, [searchParams]);

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Handle resend confirmation
  const handleResendConfirmation = async () => {
    setShowEmailPrompt(true);
  };

  const submitResendEmail = async () => {
    if (!promptEmail.trim()) return;

    setShowEmailPrompt(false);
    setResending(true);
    try {
      await authService.resendConfirmation(promptEmail);
      setAlertDialog({
        show: true,
        type: "success",
        title: "Thành công",
        message:
          "Đã gửi lại email xác thực! Vui lòng kiểm tra hộp thư của bạn.",
      });
      setResendCooldown(60);
      setPromptEmail("");
    } catch (error) {
      console.error("Resend confirmation error:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Gửi lại email thất bại. Vui lòng thử lại sau.";
      setAlertDialog({
        show: true,
        type: "error",
        title: "Lỗi",
        message: errorMsg,
      });
      setPromptEmail("");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {status === "loading" && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <i className="fas fa-spinner fa-spin text-6xl text-primary-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Đang xác thực...
            </h2>
            <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <i className="fas fa-check text-4xl text-green-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Xác thực thành công! 🎉
            </h2>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Đăng nhập ngay
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-times text-4xl text-red-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Xác thực thất bại
            </h2>
            <p className="text-gray-600 mb-8">{message}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
              >
                Quay về đăng nhập
              </Link>
              <button
                onClick={handleResendConfirmation}
                disabled={resending || resendCooldown > 0}
                className={`inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all ${
                  resending || resendCooldown > 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {resending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Đang gửi...
                  </>
                ) : resendCooldown > 0 ? (
                  `Chờ ${resendCooldown}s`
                ) : (
                  <>
                    <i className="fas fa-envelope mr-2"></i>
                    Gửi lại email
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Email Prompt Dialog */}
      {showEmailPrompt && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Nhập email của bạn
            </h3>
            <p className="text-gray-600 mb-4">
              Vui lòng nhập địa chỉ email để nhận lại link xác thực:
            </p>
            <input
              type="email"
              value={promptEmail}
              onChange={(e) => setPromptEmail(e.target.value)}
              placeholder="Email của bạn"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === "Enter") submitResendEmail();
              }}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowEmailPrompt(false);
                  setPromptEmail("");
                }}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={submitResendEmail}
                disabled={!promptEmail.trim()}
                className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertDialog.show}
        onClose={() => setAlertDialog({ ...alertDialog, show: false })}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
      />
    </div>
  );
};

export default ConfirmEmail;
