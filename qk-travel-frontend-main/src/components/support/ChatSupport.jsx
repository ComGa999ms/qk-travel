import React, { useState } from "react";

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <i className="fas fa-headset text-primary-600 text-lg"></i>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">
                  QkTravel Support
                </h3>
                <p className="text-primary-100 text-xs flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Trực tuyến
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {/* Welcome Message */}
            <div className="mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-robot text-primary-600 text-sm"></i>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <p className="text-gray-800 text-sm">
                      Xin chào! 👋 Chúng tôi có thể giúp gì cho bạn?
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-2">Vừa xong</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 mb-4">
              <p className="text-xs text-gray-600 font-semibold ml-2 mb-2">
                Câu hỏi thường gặp:
              </p>
              <button className="w-full text-left px-4 py-2.5 bg-white hover:bg-primary-50 rounded-lg text-sm text-gray-700 hover:text-primary-700 transition-colors border border-gray-200 hover:border-primary-300">
                📍 Tư vấn lịch trình du lịch
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white hover:bg-primary-50 rounded-lg text-sm text-gray-700 hover:text-primary-700 transition-colors border border-gray-200 hover:border-primary-300">
                💰 Báo giá tour du lịch
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white hover:bg-primary-50 rounded-lg text-sm text-gray-700 hover:text-primary-700 transition-colors border border-gray-200 hover:border-primary-300">
                🎫 Hỗ trợ đặt tour
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white hover:bg-primary-50 rounded-lg text-sm text-gray-700 hover:text-primary-700 transition-colors border border-gray-200 hover:border-primary-300">
                📞 Liên hệ tư vấn viên
              </button>
            </div>
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="w-10 h-10 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </form>
            <p className="text-xs text-gray-500 text-center mt-2">
              Thời gian phản hồi: ~ 2 phút
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 group"
        title="Chat với chúng tôi"
      >
        {isOpen ? (
          <i className="fas fa-times text-xl"></i>
        ) : (
          <>
            <i className="fas fa-comments text-xl group-hover:scale-110 transition-transform"></i>
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
              1
            </span>
          </>
        )}
      </button>

      {/* Floating Message Tooltip */}
      {!isOpen && isTooltipVisible && (
        <div className="fixed bottom-20 right-6 bg-white px-4 py-2 rounded-lg shadow-lg z-40 animate-bounce-slow mb-2 opacity-90">
          <button
            onClick={() => setIsTooltipVisible(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors"
            title="Đóng"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
          <p className="text-sm text-gray-700 whitespace-nowrap">
            💬 Cần hỗ trợ? Chat với chúng tôi!
          </p>
          <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
        </div>
      )}
    </>
  );
};

export default ChatSupport;
