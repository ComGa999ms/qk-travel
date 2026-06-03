import { useState, useEffect } from "react";

const DemoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const bannerClosed = localStorage.getItem("demoBannerClosed");
    if (!bannerClosed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("demoBannerClosed", "true");
  };

  if (!isVisible) return null;

  const message =
    "👋 Xin chào! Đây chỉ là website demo trình bày giao diện và tính năng. Các chức năng hiện tại chỉ mang tính minh họa và chưa được phát triển hoàn chỉnh. Mọi thông tin và hình ảnh đều là dữ liệu mẫu. Thân mến!";

  return (
    <div className="fixed top-16 lg:top-20 left-0 right-0 z-50 animate-slide-down">
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-pink-800 text-white shadow-lg overflow-hidden">
        <div className="flex items-center py-3 sm:py-3.5">
          <div className="flex-shrink-0 px-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <i className="fas fa-info-circle text-base sm:text-lg"></i>
            </div>
          </div>

          <div className="flex-1 marquee-container">
            <div className="flex animate-marquee">
              <p className="text-base sm:text-lg text-yellow-300 font-medium whitespace-nowrap px-4">
                {message}
              </p>
              <p className="text-base sm:text-lg text-yellow-300 font-medium whitespace-nowrap px-4">
                {message}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-white/20 rounded-lg transition-all group mx-4"
            aria-label="Đóng thông báo"
          >
            <i className="fas fa-times text-base sm:text-lg group-hover:scale-110 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoBanner;
