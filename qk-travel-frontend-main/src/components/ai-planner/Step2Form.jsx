import React from "react";
import {
  getHobbyIcon,
  getPriceSettingStyle,
} from "../../utils/aiPlannerHelpers";

const Step2Form = ({
  formData,
  handleInputChange,
  handleInterestToggle,
  hobbiesData = [],
  priceSettingsData = [],
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
          Bạn thích gì?
        </h2>
        <p className="text-gray-600">
          Hãy chia sẻ sở thích để chúng tôi tạo kế hoạch phù hợp nhất
        </p>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-6">
          Sở thích của bạn{" "}
          <span className="text-sm text-gray-500">(chọn nhiều)</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {hobbiesData.map((hobby) => {
            const iconClass = getHobbyIcon(hobby.id);
            const isSelected = formData.interests.includes(hobby.id);

            return (
              <button
                key={hobby.id}
                type="button"
                onClick={() => handleInterestToggle(hobby.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 text-center flex flex-col items-center justify-center h-full ${
                  isSelected
                    ? "border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50 text-primary-700 shadow-lg"
                    : "border-gray-200 hover:border-primary-300 hover:bg-gray-50 hover:shadow-md"
                }`}
                title={hobby.description}
              >
                <i
                  className={`${iconClass} text-3xl mb-3 block ${
                    isSelected ? "text-primary-600" : "text-gray-500"
                  }`}
                ></i>
                <span className="text-sm font-semibold">{hobby.name}</span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {hobbiesData.length === 0 && (
          <div className="text-center text-gray-400 py-4">
            Đang tải danh sách sở thích...
          </div>
        )}
      </div>

      {/* Travel Style */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-6">
          Ngân sách & Phong cách
        </label>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {priceSettingsData.map((style) => {
            const styleConfig = getPriceSettingStyle(style.id);
            const isSelected = formData.travelStyle === style.id;

            return (
              <button
                key={style.id}
                type="button"
                onClick={() => handleInputChange("travelStyle", style.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 flex flex-col items-center justify-center h-full text-center ${
                  isSelected
                    ? "border-primary-500 bg-primary-50 shadow-lg"
                    : "border-gray-200 hover:border-primary-300 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-r ${styleConfig.color} flex items-center justify-center text-white text-xl shadow-sm`}
                >
                  {styleConfig.icon}
                </div>
                <div className="font-semibold text-gray-900 mb-2">
                  {style.name}
                </div>
                <div className="text-sm text-gray-500">
                  {style.description || styleConfig.desc}
                </div>
              </button>
            );
          })}
        </div>
        {priceSettingsData.length === 0 && (
          <div className="text-center text-gray-400 py-4">
            Đang tải danh sách phong cách...
          </div>
        )}
      </div>

      {/* Special Requirements */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-4">
          Yêu cầu đặc biệt
          <span className="text-sm text-gray-500 ml-2">(tùy chọn)</span>
        </label>
        <div className="bg-gray-50 rounded-2xl p-6">
          <textarea
            value={formData.specialRequirements}
            onChange={(e) =>
              handleInputChange("specialRequirements", e.target.value)
            }
            placeholder="Ví dụ: Ăn chay, khuyết tật, dị ứng thức ăn, cần phòng không hút thuốc, muốn có hướng dẫn viên nói tiếng Anh..."
            className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 focus:border-primary-500 focus:outline-none transition-colors duration-200 resize-none"
            rows={4}
          />
          <div className="flex items-center mt-4 text-sm text-gray-500">
            <i className="fas fa-info-circle mr-2"></i>
            Những thông tin này giúp chúng tôi tạo kế hoạch phù hợp nhất với bạn
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step2Form;
