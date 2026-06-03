import React, { useState, useEffect } from "react";

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const hasShownModal = sessionStorage.getItem("newsletterModalShown");
    const hasSubscribed = localStorage.getItem("newsletterSubscribed");

    if (!hasShownModal && !hasSubscribed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("newsletterModalShown", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Newsletter subscription:", email);
    localStorage.setItem("newsletterSubscribed", "true");

    setShowSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setIsOpen(false);
      setShowSuccess(false);
      setEmail("");
    }, 2000);
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleSkip}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp">
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all z-10"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Header with Icon */}
        <div className="bg-gradient-to-br from-primary-500 via-blue-600 to-indigo-600 text-white p-8 pb-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="fas fa-envelope-open-text text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2 text-white">
            Đăng ký nhận tin tức du lịch
          </h2>
          <p className="text-blue-100 text-center text-sm">
            Nhận thông tin về các tour mới, ưu đãi đặc biệt và mẹo du lịch hữu
            ích
          </p>
        </div>

        {/* Content */}
        <div className="p-8 pt-6">
          {showSuccess ? (
            // Success State
            <div className="text-center py-4 animate-fadeIn">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check-circle text-green-500 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Đăng ký thành công! 🎉
              </h3>
              <p className="text-gray-600">
                Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gửi những thông tin tuyệt
                vời nhất đến bạn!
              </p>
            </div>
          ) : (
            // Form State
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Bạn sẽ nhận được:
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center text-sm text-gray-700">
                    <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                    <span>Thông báo tour mới và ưu đãi đặc biệt</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                    <span>Mẹo du lịch và kinh nghiệm thực tế</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                    <span>Ưu tiên đặt chỗ cho các tour hot</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                >
                  Bỏ qua
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Đăng ký
                    </>
                  )}
                </button>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-gray-500 text-center pt-2">
                Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng
                ký bất kỳ lúc nào.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
