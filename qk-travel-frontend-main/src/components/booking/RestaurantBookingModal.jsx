import React, { useState } from "react";
import useDialog from "../../hooks/useDialog";
import AlertDialog from "../common/AlertDialog";

const RestaurantBookingModal = ({ isOpen, onClose, restaurant }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 2,
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const { alertDialog, showAlert, hideDialog } = useDialog();

  if (!isOpen || !restaurant) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const timeSlots = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Restaurant Booking Data:", {
      restaurant: restaurant.name,
      ...formData,
    });
    showAlert({
      title: "Đặt bàn thành công!",
      message: `Nhà hàng: ${restaurant.name}\nNgày: ${formData.date}\nGiờ: ${formData.time}\nSố khách: ${formData.guests} người`,
      type: "success",
    });
    setTimeout(() => {
      hideDialog();
      onClose();
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const estimatedTotal = restaurant.averagePrice * formData.guests;

  // Get today's date for min date validation
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Đặt bàn nhà hàng</h2>
              <p className="text-primary-100">{restaurant.name}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date and Time */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-calendar-alt mr-2 text-primary-600"></i>
                  Chọn ngày và giờ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={today}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giờ <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Chọn giờ</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-users mr-2 text-primary-600"></i>
                  Số lượng khách
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số người <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    max="50"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Đối với nhóm trên 10 người, vui lòng liên hệ trực tiếp
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-user mr-2 text-primary-600"></i>
                  Thông tin liên hệ
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="0901234567"
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-comment-alt mr-2 text-primary-600"></i>
                  Yêu cầu đặc biệt
                </h3>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Ví dụ: Bàn gần cửa sổ, dị ứng thực phẩm, sinh nhật..."
                ></textarea>
              </div>
            </div>

            {/* Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Chi tiết đặt bàn
                </h3>

                {/* Restaurant Image */}
                <div className="mb-4">
                  <img
                    src={restaurant.images[0]}
                    alt={restaurant.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>

                {/* Restaurant Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <i className="fas fa-utensils text-primary-600 mr-3 mt-1"></i>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {restaurant.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {restaurant.cuisine}
                      </p>
                    </div>
                  </div>

                  {formData.date && (
                    <div className="flex items-center">
                      <i className="fas fa-calendar text-primary-600 mr-3"></i>
                      <span className="text-sm text-gray-700">
                        {new Date(formData.date).toLocaleDateString("vi-VN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}

                  {formData.time && (
                    <div className="flex items-center">
                      <i className="fas fa-clock text-primary-600 mr-3"></i>
                      <span className="text-sm text-gray-700">
                        {formData.time}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center">
                    <i className="fas fa-users text-primary-600 mr-3"></i>
                    <span className="text-sm text-gray-700">
                      {formData.guests} người
                    </span>
                  </div>
                </div>

                {/* Price Estimate */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Giá trung bình/người:</span>
                    <span className="font-medium">
                      {formatPrice(restaurant.averagePrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Số khách:</span>
                    <span className="font-medium">{formData.guests} người</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-primary-600 pt-2 border-t">
                    <span>Dự kiến:</span>
                    <span>{formatPrice(estimatedTotal)}</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    *Giá có thể thay đổi tùy món ăn
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formData.date || !formData.time}
                  className="w-full btn btn-primary mt-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-check-circle mr-2"></i>
                  Xác nhận đặt bàn
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Bằng việc đặt bàn, bạn đồng ý với các điều khoản và chính sách
                  của nhà hàng
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertDialog.show}
        onClose={hideDialog}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
        buttonText={alertDialog.buttonText}
      />
    </div>
  );
};

export default RestaurantBookingModal;
