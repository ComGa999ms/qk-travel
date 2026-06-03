import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const TeamSlider = ({ team }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://bcc.com.vn/uploads/consults/thumbnail/15861.jpg')`,
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-blue-900/85 to-purple-900/90"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-16 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-40 right-24 w-24 h-24 bg-purple-400/25 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-32 left-32 w-40 h-40 bg-pink-400/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-16 w-28 h-28 bg-indigo-400/20 rounded-full blur-lg animate-bounce"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Đội ngũ của chúng tôi
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Những con người tài năng và nhiệt huyết đằng sau QkTravel
          </p>
        </div>

        {/* Team Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".team-swiper-button-next",
              prevEl: ".team-swiper-button-prev",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="team-swiper"
          >
            {team.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-3xl p-8 text-center group border border-gray-200 hover:border-primary-300 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col mt-2">
                  {/* Avatar Section - Fixed Height */}
                  <div className="relative mb-8 flex-shrink-0">
                    <div className="relative w-36 h-36 mx-auto">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300 shadow-xl border-4 border-gray-100"
                      />
                      {/* Decorative Ring */}
                      <div className="absolute inset-0 rounded-full border-4 border-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute -bottom-3 right-20 w-12 h-12">
                      <i className="fas fa-check-circle text-blue-500 text-4xl"></i>
                    </div>
                  </div>

                  {/* Content Section - Flexible Height */}
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Name and Position - Fixed Height */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors min-h-[64px] flex items-center justify-center">
                        {member.name}
                      </h3>

                      <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full text-white font-semibold shadow-lg text-sm">
                        <i className="fas fa-briefcase mr-2"></i>
                        {member.position}
                      </div>
                    </div>

                    {/* Description - Flexible Height with Minimum */}
                    <div className="mb-8 flex-1 flex items-center">
                      <p className="text-gray-600 leading-relaxed text-sm min-h-[80px] flex items-center">
                        {member.description}
                      </p>
                    </div>

                    {/* Social Links - Fixed at Bottom */}
                    <div className="flex justify-center space-x-4">
                      <a
                        href={member.social.linkedin}
                        className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-110 shadow-lg"
                        title="LinkedIn"
                      >
                        <i className="fab fa-linkedin-in text-lg"></i>
                      </a>
                      <a
                        href={member.social.twitter}
                        className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full flex items-center justify-center text-white hover:from-sky-500 hover:to-sky-600 transition-all duration-300 hover:scale-110 shadow-lg"
                        title="Twitter"
                      >
                        <i className="fab fa-twitter text-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="team-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-primary-600 transition-all duration-300 cursor-pointer z-50 border border-white/50 shadow-xl hover:shadow-2xl hover:scale-110">
            <i className="fas fa-chevron-left text-xl"></i>
          </div>
          <div className="team-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-primary-600 transition-all duration-300 cursor-pointer z-50 border border-white/50 shadow-xl hover:shadow-2xl hover:scale-110">
            <i className="fas fa-chevron-right text-xl"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSlider;
