import React from "react";
import { Link } from "react-router-dom";
import aboutBg from "../assets/images/about-bg.avif";

const About = () => {
  const values = [
    {
      icon: "fas fa-heart",
      title: "Tận tâm",
      description:
        "Chúng tôi luôn đặt khách hàng làm trung tâm và cố gắng hết sức để mang đến trải nghiệm tốt nhất.",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: "fas fa-star",
      title: "Chất lượng",
      description:
        "Cam kết mang đến dịch vụ chất lượng cao với các tour được thiết kế kỹ lưỡng và chuyên nghiệp.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: "fas fa-handshake",
      title: "Tin cậy",
      description:
        "Xây dựng mối quan hệ lâu dài dựa trên sự tin tưởng và minh bạch trong mọi hoạt động.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: "fas fa-lightbulb",
      title: "Sáng tạo",
      description:
        "Luôn tìm kiếm những cách thức mới để cải thiện dịch vụ và mang đến trải nghiệm độc đáo.",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Mission & Vision */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${aboutBg})`,
          }}
        />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-20 h-20 bg-green-400/15 rounded-full blur-lg animate-bounce"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Sứ Mệnh & Tầm Nhìn
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Những giá trị cốt lõi định hướng mọi hoạt động và quyết định của
              QkTravel
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="group relative">
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 h-full border border-white/30 hover:border-yellow-400/50 shadow-2xl hover:shadow-yellow-400/25 transition-all duration-500 transform hover:-translate-y-2 hover:bg-white/20">
                {/* Decorative Elements */}

                <div className="relative z-10 h-full">
                  <div className="flex flex-col h-full">
                    <p className="text-lg text-white/95 leading-relaxed drop-shadow-sm">
                      Ứng dụng{" "}
                      <strong className="text-yellow-400">
                        công nghệ AI & dữ liệu số
                      </strong>{" "}
                      để cá nhân hóa hành trình, quảng bá văn hóa - du lịch Việt
                      Nam, mang lại trải nghiệm thuận tiện, chi phí hợp lý cho
                      mọi người.
                    </p>

                    <div className="grid grid-cols-1 gap-4 mt-auto">
                      <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:bg-white/15 transition-colors">
                        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                          <i className="fas fa-robot text-white"></i>
                        </div>
                        <span className="text-white/90 font-medium drop-shadow-sm">
                          Cá nhân hóa hành trình với AI
                        </span>
                      </div>

                      <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:bg-white/15 transition-colors">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                          <i className="fas fa-globe-asia text-white"></i>
                        </div>
                        <span className="text-white/90 font-medium drop-shadow-sm">
                          Quảng bá văn hóa du lịch Việt
                        </span>
                      </div>

                      <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:bg-white/15 transition-colors">
                        <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                          <i className="fas fa-hand-holding-dollar text-white"></i>
                        </div>
                        <span className="text-white/90 font-medium drop-shadow-sm">
                          Chi phí hợp lý cho mọi người
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative">
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 h-full border border-white/30 hover:border-emerald-400/50 shadow-2xl hover:shadow-emerald-400/25 transition-all duration-500 transform hover:-translate-y-2 hover:bg-white/20">
                {/* Decorative Elements */}

                <div className="relative z-10 h-full">
                  <div className="flex flex-col h-full">
                    <p className="text-lg text-white/95 leading-relaxed drop-shadow-sm">
                      Trở thành{" "}
                      <strong className="text-emerald-400">
                        nền tảng du lịch thông minh hàng đầu Việt Nam
                      </strong>
                      , đưa danh lam thắng cảnh Việt Nam đến gần hơn với thế
                      giới.
                    </p>

                    <div className="grid grid-cols-1 gap-4 mt-auto">
                      <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:bg-white/15 transition-colors">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                          <i className="fas fa-star text-white"></i>
                        </div>
                        <span className="text-white/90 font-medium drop-shadow-sm">
                          Nền tảng du lịch hàng đầu
                        </span>
                      </div>

                      <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:bg-white/15 transition-colors">
                        <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                          <i className="fas fa-plane-departure text-white"></i>
                        </div>
                        <span className="text-white/90 font-medium drop-shadow-sm">
                          Quảng bá du lịch Việt Nam
                        </span>
                      </div>

                      <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:bg-white/15 transition-colors">
                        <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                          <i className="fas fa-globe text-white"></i>
                        </div>
                        <span className="text-white/90 font-medium drop-shadow-sm">
                          Vươn tầm thế giới
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
              Giá trị cốt lõi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những giá trị định hướng hoạt động và phát triển của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <i className={`${value.icon} text-white text-3xl`}></i>
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
