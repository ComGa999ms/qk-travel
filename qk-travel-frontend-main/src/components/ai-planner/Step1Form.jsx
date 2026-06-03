import React from "react";
import SearchableSelect from "../common/SearchableSelect";

const Step1Form = ({
  formData,
  handleInputChange,
  locationsData,
  isLoadingLocations,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bạn muốn đi đâu?
        </h2>
        <p className="text-gray-500 text-sm">
          Hãy cho chúng tôi biết về chuyến đi trong mơ của bạn
        </p>
      </div>

      <div className="space-y-6">
        {/* Destination Dropdown */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Điểm đến mong muốn
          </label>
          <SearchableSelect
            options={locationsData.sort((a, b) => a.name.localeCompare(b.name))}
            value={formData.destination}
            onChange={(value) => handleInputChange("destination", value)}
            placeholder={
              isLoadingLocations ? "Đang tải..." : "Chọn điểm đến..."
            }
            disabled={isLoadingLocations}
          />
        </div>

        {/* Current Location */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Bạn đang ở đâu?
          </label>
          <SearchableSelect
            options={locationsData.sort((a, b) => a.name.localeCompare(b.name))}
            value={formData.currentLocation}
            onChange={(value) => handleInputChange("currentLocation", value)}
            placeholder={
              isLoadingLocations ? "Đang tải..." : "Chọn tỉnh/thành phố..."
            }
            disabled={isLoadingLocations}
          />
        </div>

        {/* Duration Slider */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Thời gian du lịch
          </label>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Số ngày</span>
              <span className="text-xl font-bold text-blue-600">
                {formData.duration} ngày
              </span>
            </div>

            <div className="relative h-2 bg-gray-200 rounded-full mt-4 mb-2">
              <div
                className="absolute h-full bg-blue-600 rounded-full"
                style={{ width: `${((formData.duration - 1) / 6) * 100}%` }}
              ></div>
              {/* Visible Thumb */}
              <div
                className="absolute h-6 w-6 bg-white border-4 border-blue-600 rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 shadow-md pointer-events-none"
                style={{ left: `${((formData.duration - 1) / 6) * 100}%` }}
              ></div>
              <input
                type="range"
                min="1"
                max="7"
                value={formData.duration}
                onChange={(e) =>
                  handleInputChange("duration", parseInt(e.target.value))
                }
                className="absolute w-full h-full opacity-0 cursor-pointer top-0 left-0"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>1 ngày</span>
              <span>7 ngày</span>
            </div>
          </div>
        </div>

        {/* Group Size */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Số lượng người
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { value: 1, label: "1 người", icon: "👤" },
              { value: 2, label: "2 người", icon: "👫" },
              { value: 4, label: "3-4 người", icon: "👨‍👩‍👦" },
              { value: 8, label: "5-8 người", icon: "👨‍👩‍👧‍👦" },
              { value: 9, label: "Trên 9 người", icon: "👥" },
            ].map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() => handleInputChange("groupSize", size.value)}
                className={`flex flex-col items-center justify-center py-4 px-2 rounded-xl border transition-all duration-200 ${
                  formData.groupSize === size.value
                    ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-gray-50"
                }`}
              >
                <div className="text-2xl mb-2">{size.icon}</div>
                <div className="text-xs font-semibold">{size.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Form;
