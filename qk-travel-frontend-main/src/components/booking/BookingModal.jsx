import React, { useState } from "react";
import useDialog from "../../hooks/useDialog";
import AlertDialog from "../common/AlertDialog";

const BookingModal = ({ isOpen, onClose, hotel, selectedRoom }) => {
  const [formData, setFormData] = useState({
    roomType: selectedRoom?.id || "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { alertDialog, showAlert, hideDialog } = useDialog();

  React.useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);

      const room = hotel.roomTypes.find((r) => r.id === formData.roomType);
      if (room) {
        setTotalPrice(room.price * diffDays);
      }
    }
  }, [formData.checkIn, formData.checkOut, formData.roomType, hotel.roomTypes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log("Booking data:", formData);
    showAlert({
      title: "Đặt phòng thành công!",
      message: "Chúng tôi sẽ liên hệ với bạn sớm.",
      type: "success",
    });
    setTimeout(() => {
      hideDialog();
      onClose();
    }, 1500);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (!isOpen) return null;

  const selectedRoomData = hotel.roomTypes.find(
    (r) => r.id === formData.roomType,
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <i className="fas fa-times text-gray-600"></i>
          </button>

          {/* Modal Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Đặt phòng</h2>
            <p className="text-white/90">{hotel.name}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Booking Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Room Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Chọn loại phòng *
                  </label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">-- Chọn loại phòng --</option>
                    {hotel.roomTypes.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} - {formatPrice(room.price)}/đêm (Tối đa{" "}
                        {room.maxGuests} khách)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Check-in & Check-out */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-calendar-check mr-2 text-primary-600"></i>
                      Ngày nhận phòng *
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-calendar-times mr-2 text-primary-600"></i>
                      Ngày trả phòng *
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={
                        formData.checkIn ||
                        new Date().toISOString().split("T")[0]
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-user mr-2 text-primary-600"></i>
                      Số người lớn *
                    </label>
                    <input
                      type="number"
                      name="adults"
                      value={formData.adults}
                      onChange={handleChange}
                      min="1"
                      max={selectedRoomData?.maxGuests || 10}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-child mr-2 text-primary-600"></i>
                      Số trẻ em
                    </label>
                    <input
                      type="number"
                      name="children"
                      value={formData.children}
                      onChange={handleChange}
                      min="0"
                      max="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Thông tin liên hệ
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="example@email.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="0901234567"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yêu cầu đặc biệt
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Giường phụ, tầng cao, không hút thuốc..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Booking Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Chi tiết đặt phòng
                  </h3>

                  {selectedRoomData && (
                    <div className="mb-4">
                      <img
                        src={selectedRoomData.images[0]}
                        alt={selectedRoomData.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-gray-900">
                        {selectedRoomData.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedRoomData.size} • Tối đa{" "}
                        {selectedRoomData.maxGuests} khách
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    {formData.checkIn && formData.checkOut && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Nhận phòng:</span>
                          <span className="font-medium text-gray-900">
                            {new Date(formData.checkIn).toLocaleDateString(
                              "vi-VN",
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Trả phòng:</span>
                          <span className="font-medium text-gray-900">
                            {new Date(formData.checkOut).toLocaleDateString(
                              "vi-VN",
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Số đêm:</span>
                          <span className="font-medium text-gray-900">
                            {nights} đêm
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Số khách:</span>
                      <span className="font-medium text-gray-900">
                        {formData.adults + formData.children} người
                      </span>
                    </div>
                  </div>

                  {selectedRoomData && nights > 0 && (
                    <>
                      <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {formatPrice(selectedRoomData.price)} x {nights} đêm
                          </span>
                          <span className="font-medium text-gray-900">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Thuế & phí</span>
                          <span className="font-medium text-gray-900">
                            {formatPrice(totalPrice * 0.1)}
                          </span>
                        </div>
                      </div>

                      <div className="border-t-2 border-gray-300 pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">
                            Tổng cộng
                          </span>
                          <span className="text-2xl font-bold text-primary-600">
                            {formatPrice(totalPrice * 1.1)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-6 btn btn-primary py-3 text-base"
                    disabled={
                      !formData.roomType ||
                      !formData.checkIn ||
                      !formData.checkOut
                    }
                  >
                    <i className="fas fa-check-circle mr-2"></i>
                    Xác nhận đặt phòng
                  </button>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Bạn sẽ không bị tính phí cho đến khi xác nhận đặt phòng
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
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

export default BookingModal;
