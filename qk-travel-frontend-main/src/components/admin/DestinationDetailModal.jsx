import React, { useState, useEffect } from "react";
import destinationService from "../../services/destinationService";
import locationService from "../../services/locationService";
import FAQList from "../common/FAQList";
import MediaGallery from "../media/MediaGallery";
import useDialog from "../../hooks/useDialog";
import AlertDialog from "../../components/common/AlertDialog";

const DestinationDetailModal = ({
  destinationId,
  onClose,
  onEdit,
  onUpdate,
}) => {
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { alertDialog, showAlert, hideDialog } = useDialog();
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data =
          await destinationService.getDestinationByIdAdmin(destinationId);
        setDestination(data);
      } catch (err) {
        console.error("Error fetching destination details:", err);
        setError("Không thể tải thông tin chi tiết.");
      } finally {
        setLoading(false);
      }
    };

    if (destinationId) {
      fetchDetail();
    }
  }, [destinationId]);

  const handleToggleVisibility = async () => {
    if (!destination) return;

    try {
      setIsToggling(true);
      const newStatus = !destination.isVisible;

      // Get locationId from locationName
      let locationId = destination.locationId;
      if (!locationId && destination.locationName) {
        try {
          const locations = await locationService.getAllLocations();
          const location = locations.find(
            (l) => l.name === destination.locationName,
          );
          if (location) {
            locationId = location.id;
          }
        } catch (locError) {
          console.error("Error fetching locations for mapping:", locError);
        }
      }

      // Prepare data for update - needs to match what updateDestination expects
      const updateData = {
        ...destination,
        isVisible: newStatus,
        locationId: locationId,
      };

      await destinationService.updateDestination(destination.id, updateData);

      // Update local state
      setDestination((prev) => ({ ...prev, isVisible: newStatus }));

      showAlert({
        title: "Thành công",
        message: `Đã ${newStatus ? "hiển thị" : "ẩn"} điểm đến`,
        type: "success",
      });

      // Notify parent to refresh list
      if (onUpdate) {
        onUpdate({ ...destination, isVisible: newStatus });
      }
    } catch (error) {
      console.error("Error toggling visibility:", error);
      showAlert({
        title: "Lỗi",
        message: "Không thể thay đổi trạng thái",
        type: "error",
      });
    } finally {
      setIsToggling(false);
    }
  };

  if (!destinationId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">
            Chi tiết điểm đến
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <i className="fas fa-spinner fa-spin text-4xl text-primary-600"></i>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              <i className="fas fa-exclamation-triangle text-3xl mb-2"></i>
              <p>{error}</p>
            </div>
          ) : destination ? (
            <div className="space-y-8">
              {/* Media Section */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-images text-primary-600 mr-2"></i>
                  Hình ảnh & Video
                </h3>
                <MediaGallery
                  images={destination.images || destination.imageUrls || []}
                  videos={
                    destination.videos ||
                    (destination.videoUrl ? [destination.videoUrl] : [])
                  }
                />
              </section>

              {/* Basic Info */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="fas fa-info-circle text-primary-600 mr-2"></i>
                    Thông tin chung
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500 block">
                        Tên hiển thị
                      </span>
                      <span className="font-medium text-gray-900 text-lg">
                        {destination.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">
                        Tiêu đề
                      </span>
                      <span className="font-medium text-gray-900">
                        {destination.title}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">
                        Địa điểm
                      </span>
                      <span className="font-medium text-gray-900 flex items-center">
                        <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                        {destination.locationName}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">
                        Tọa độ
                      </span>
                      <span className="font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded inline-block text-sm">
                        {destination.lat}, {destination.lon}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="fas fa-align-left text-primary-600 mr-2"></i>
                    Mô tả & Lịch sử
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">
                        Mô tả
                      </span>
                      <p className="text-gray-700 text-sm leading-relaxed max-h-40 overflow-y-auto pr-2">
                        {destination.description}
                      </p>
                    </div>
                    {destination.history && (
                      <div>
                        <span className="text-sm text-gray-500 block mb-1">
                          Lịch sử
                        </span>
                        <p className="text-gray-700 text-sm leading-relaxed max-h-40 overflow-y-auto pr-2">
                          {destination.history}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Tags */}
              {destination.tags && destination.tags.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="fas fa-tags text-primary-600 mr-2"></i>
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs */}
              {(destination.faqs || destination.faQs) &&
                (destination.faqs?.length > 0 ||
                  destination.faQs?.length > 0) && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="fas fa-question-circle text-primary-600 mr-2"></i>
                      Câu hỏi thường gặp
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <FAQList
                        faqs={destination.faqs || destination.faQs || []}
                      />
                    </div>
                  </section>
                )}
            </div>
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 flex-shrink-0 rounded-b-xl">
          {destination && (
            <button
              onClick={handleToggleVisibility}
              disabled={isToggling}
              className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center border ${
                destination.isVisible
                  ? "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              }`}
            >
              <i
                className={`fas ${destination.isVisible ? "fa-eye-slash" : "fa-eye"} mr-2`}
              ></i>
              {destination.isVisible ? "Ẩn điểm đến" : "Hiển thị"}
            </button>
          )}

          <button
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center"
            onClick={() => onEdit && onEdit(destination)}
          >
            <i className="fas fa-edit mr-2"></i>
            Chỉnh sửa
          </button>
        </div>
      </div>

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

export default DestinationDetailModal;
