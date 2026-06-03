import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useDialog from "../../hooks/useDialog";
import AlertDialog from "../common/AlertDialog";

const ReviewsList = ({ reviews = [], destinationId, onShareSuccess }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    text: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alertDialog, showAlert, hideDialog } = useDialog();

  const [reviewLightbox, setReviewLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 5) {
      showAlert({
        title: "Giới hạn ảnh",
        message: "Bạn chỉ có thể upload tối đa 5 ảnh.",
        type: "warning",
      });
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);
    setSelectedImages([...selectedImages, ...files]);
  };

  const removeImage = (index) => {
    const newPreviews = previewImages.filter((_, i) => i !== index);
    const newImages = selectedImages.filter((_, i) => i !== index);
    setPreviewImages(newPreviews);
    setSelectedImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newReview.text.trim().length < 10) {
      showAlert({
        title: "Lỗi",
        message: "Bình luận phải có ít nhất 10 ký tự.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const destinationService = (
        await import("../../services/destinationService")
      ).default;

      await destinationService.createDestinationSharing(
        destinationId,
        newReview.text.trim(),
        selectedImages,
      );

      showAlert({
        title: "Cảm ơn bạn!",
        message: "Chia sẻ của bạn đã được gửi thành công.",
        type: "success",
      });

      setShowForm(false);
      setNewReview({ text: "" });
      setSelectedImages([]);

      previewImages.forEach((url) => URL.revokeObjectURL(url));
      setPreviewImages([]);

      if (onShareSuccess) {
        onShareSuccess();
      }
    } catch (err) {
      console.error("Error creating sharing:", err);
      showAlert({
        title: "Lỗi",
        message: err.message || "Không thể chia sẻ. Vui lòng thử lại sau.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev < previewImages.length - 1 ? prev + 1 : prev,
    );
  };

  const openReviewLightbox = (images, index) => {
    setReviewLightbox({
      isOpen: true,
      images: images,
      currentIndex: index,
    });
  };

  const closeReviewLightbox = () => {
    setReviewLightbox({
      isOpen: false,
      images: [],
      currentIndex: 0,
    });
  };

  const nextReviewImage = () => {
    setReviewLightbox((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex < prev.images.length - 1
          ? prev.currentIndex + 1
          : prev.currentIndex,
    }));
  };

  const prevReviewImage = () => {
    setReviewLightbox((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : 0,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!reviewLightbox.isOpen) return;

      if (e.key === "Escape") {
        closeReviewLightbox();
      } else if (e.key === "ArrowLeft") {
        prevReviewImage();
      } else if (e.key === "ArrowRight") {
        nextReviewImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    reviewLightbox.isOpen,
    reviewLightbox.currentIndex,
    reviewLightbox.images.length,
  ]);

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleShareClick = () => {
    if (!user) {
      showAlert({
        title: "Yêu cầu đăng nhập",
        message: "Bạn cần đăng nhập để chia sẻ trải nghiệm của mình.",
        type: "warning",
      });
      setTimeout(() => {
        navigate("/login", { state: { from: window.location.pathname } });
      }, 1500);
      return;
    }
    setShowForm(!showForm);
  };

  return (
    <div className="space-y-6">
      {/* Add Review Button */}
      <div className="flex justify-end">
        <button
          onClick={handleShareClick}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2"
        >
          <i className={`fas fa-${showForm ? "times" : "plus"}`}></i>
          {showForm ? "Đóng" : "Chia sẻ của bạn"}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-6 shadow-lg border border-primary-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-pen-to-square text-primary-600 mr-2"></i>
            Chia sẻ trải nghiệm của bạn
          </h3>

          <div className="space-y-4">
            

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chia sẻ của bạn <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={newReview.text}
                onChange={(e) =>
                  setNewReview({ ...newReview, text: e.target.value })
                }
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                placeholder="Hãy chia sẻ trải nghiệm, cảm nhận của bạn về địa điểm này... (Tối thiểu 10 ký tự)"
              ></textarea>
              <div className="mt-1 text-sm text-gray-500">
                {newReview.text.length}/10 ký tự tối thiểu
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thêm hình ảnh (Tối đa 5 ảnh)
              </label>
              <div className="space-y-3">
                {/* Upload Button */}
                <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
                  <div className="text-center">
                    <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-600">
                      Click để chọn ảnh hoặc kéo thả vào đây
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG (Tối đa 5 ảnh)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {/* Image Previews */}
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {previewImages.map((preview, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openLightbox(index)}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {index + 1}/{previewImages.length}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || newReview.text.trim().length < 10}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Gửi chia sẻ
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setNewReview({ text: "" });
                  setSelectedImages([]);

                  previewImages.forEach((url) => URL.revokeObjectURL(url));
                  setPreviewImages([]);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {!reviews || reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <i className="fas fa-comments text-4xl text-gray-300 mb-3"></i>
          <p className="text-gray-600">Chưa có chia sẻ nào.</p>
          <p className="text-sm text-gray-500 mt-1">
            Hãy là người đầu tiên chia sẻ trải nghiệm của bạn!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-lg font-semibold text-white shadow-sm">
                  {r.author ? r.author.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-gray-900">
                      {r.author}
                    </div>
                    
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {r.text}
                  </p>

                  {/* Review Images */}
                  {r.images && r.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {r.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => openReviewLightbox(r.images, idx)}
                          className="block w-full h-36 overflow-hidden rounded-lg shadow-sm p-0 border-0 bg-transparent"
                          aria-label={`Mở ảnh ${idx + 1}`}
                        >
                          <img
                            src={img}
                            alt={`Review ${r.id} - ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox for new review images preview */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-[95vw] max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 bg-white rounded-full p-3 shadow-lg z-50 hover:bg-gray-100 transition-colors"
              aria-label="Đóng"
            >
              <i className="fas fa-times text-gray-700"></i>
            </button>

            <img
              src={previewImages[selectedImageIndex]}
              alt={`Preview ${selectedImageIndex + 1}`}
              className="block max-w-full max-h-[85vh] rounded-lg"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {selectedImageIndex + 1} / {previewImages.length}
            </div>

            {/* Navigation */}
            {previewImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={selectedImageIndex === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Trước"
                >
                  <i className="fas fa-chevron-left text-gray-700"></i>
                </button>
                <button
                  onClick={nextImage}
                  disabled={selectedImageIndex === previewImages.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Tiếp"
                >
                  <i className="fas fa-chevron-right text-gray-700"></i>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Lightbox for review images */}
      {reviewLightbox.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closeReviewLightbox}
        >
          <div
            className="relative max-w-[95vw] max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeReviewLightbox}
              className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg z-50 w-10 h-10"
              aria-label="Đóng"
            >
              <i className="fas fa-times"></i>
            </button>

            <img
              src={reviewLightbox.images[reviewLightbox.currentIndex]}
              alt={`large-${reviewLightbox.currentIndex}`}
              className="block max-w-full max-h-[80vh] rounded-md"
            />

            {/* Navigation */}
            {reviewLightbox.images.length > 1 && (
              <>
                <button
                  onClick={prevReviewImage}
                  disabled={reviewLightbox.currentIndex === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
                  aria-label="Trước"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  onClick={nextReviewImage}
                  disabled={
                    reviewLightbox.currentIndex ===
                    reviewLightbox.images.length - 1
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
                  aria-label="Tiếp"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </>
            )}
          </div>
        </div>
      )}

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

export default ReviewsList;
