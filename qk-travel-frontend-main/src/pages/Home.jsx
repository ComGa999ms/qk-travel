import React from "react";
import { Link } from "react-router-dom";
import NewsletterModal from "../components/common/NewsletterModal";
import PricingButton from "../components/common/PricingButton";
import FeedbackTab from "../components/feedback/FeedbackTab";
import homeHeroBg from "../assets/images/home-hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: "fas fa-robot",
      title: "AI Trip Planner",
      description: "Tạo kế hoạch du lịch cá nhân hóa với trí tuệ nhân tạo",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: "fas fa-shield-alt",
      title: "An toàn tuyệt đối",
      description:
        "Đảm bảo an toàn cho khách hàng với các biện pháp bảo vệ chuyên nghiệp",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: "fas fa-star",
      title: "Chất lượng cao",
      description:
        "Kế hoạch được thiết kế kỹ lưỡng với các hoạt động thú vị và địa điểm đẹp nhất",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: "fas fa-headset",
      title: "Hỗ trợ 24/7",
      description:
        "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ mọi lúc, mọi nơi",
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - bg-fixed chỉ áp dụng trên desktop vì iOS không hỗ trợ */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
          style={{
            backgroundImage: `url(${homeHeroBg})`,
            minHeight: "100%",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />

        {/* Hero Pattern */}
        <div className="absolute inset-0 hero-pattern opacity-20" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Discover Vietnam <br />
              Smarter with QkTravel
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed mx-auto">
              Nền tảng du lịch thông minh tích hợp AI cá nhân hóa lộ trình du
              lịch Việt Nam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="btn btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600 group"
                onClick={() => {
                  document.getElementById("ai-showcase")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Tìm hiểu ngay
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      {/* AI Planner Showcase Section */}
      <section
        className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
        id="ai-showcase"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold mb-6">
                <i className="fas fa-robot mr-2"></i>
                AI-Powered Planning
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Lên kế hoạch du lịch thông minh với{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Trip Planner
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Trí tuệ nhân tạo tiên tiến giúp bạn tạo ra lộ trình du lịch cá
                nhân hóa hoàn hảo. Chỉ cần nhập sở thích, ngân sách và thời gian
                - AI sẽ làm phần còn lại!
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span className="text-gray-700">
                    Phân tích sở thích cá nhân và đề xuất địa điểm phù hợp
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span className="text-gray-700">
                    Tối ưu hóa lộ trình và ngân sách một cách thông minh
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span className="text-gray-700">
                    Cập nhật thời tiết và thông tin thời gian thực
                  </span>
                </div>
              </div>

              <Link
                to="/ai-planner"
                className="btn btn-primary text-lg px-8 py-4 group inline-flex items-center"
              >
                <i className="fas fa-magic mr-3 group-hover:animate-bounce"></i>
                Thử AI Planner miễn phí
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-robot text-2xl mr-3"></i>
                    <span className="font-bold text-lg">
                      AI Travel Assistant
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm">
                        📍 Tôi muốn du lịch 3 ngày ở Hà Nội với ngân sách 5
                        triệu
                      </p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm">
                        🤖 Tuyệt vời! Tôi đã tạo lộ trình hoàn hảo cho bạn:
                      </p>
                      <ul className="text-xs mt-2 space-y-1">
                        <li>• Ngày 1: Phố cổ Hà Nội, Hồ Hoàn Kiếm</li>
                        <li>• Ngày 2: Văn Miếu, Chùa Một Cột</li>
                        <li>• Ngày 3: Bảo tàng Dân tộc học</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    <i className="fas fa-sparkles mr-2"></i>
                    Kế hoạch được tạo trong 30 giây!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
              Tại sao chọn QkTravel?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nền tảng du lịch thông minh hàng đầu Việt Nam với những tính năng
              vượt trội
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="card card-hover p-8 text-center h-full">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <i className={`${feature.icon} text-white text-3xl`}></i>
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingButton />
      <FeedbackTab />
    </div>
  );
};

export default Home;
