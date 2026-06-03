import React, { useState } from "react";

const CreatePostModal = ({ isOpen, onClose, onSubmit, currentUser }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(5);
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() && destination.trim()) {
      onSubmit({
        content,
        images,
        rating,
        destination,
        user: currentUser,
        date: "Vừa xong",
        likes: 0,
        comments: 0,
      });
      // Reset form
      setContent("");
      setImages([]);
      setRating(5);
      setDestination("");
      onClose();
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imageUrls]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <i className="fas fa-pen-fancy mr-3 text-primary-600"></i>
            Chia sẻ trải nghiệm du lịch
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <i className="fas fa-times text-gray-500"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-gray-900">
                {currentUser.name}
              </div>
              <div className="text-sm text-gray-500">
                Đang chia sẻ công khai
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-map-marker-alt mr-2 text-red-500"></i>
              Địa điểm
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Bạn đã đi đâu?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-star mr-2 text-yellow-500"></i>
              Đánh giá
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none hover:scale-110 transition-transform"
                >
                  <i
                    className={`fas fa-star ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  ></i>
                </button>
              ))}
              <span className="text-sm text-gray-600 ml-2">
                ({rating}/5 sao)
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Chia sẻ trải nghiệm của bạn về chuyến đi này..."
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              required
            />
          </div>

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="mb-4 grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors cursor-pointer text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <i className="fas fa-images text-3xl text-gray-400 mb-2"></i>
              <div className="text-sm text-gray-600">
                Click để thêm ảnh (tối đa 4 ảnh)
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex items-center space-x-3">
            <button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Đăng bài
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
