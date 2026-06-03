import React, { useState, useEffect, useRef } from "react";
import destinationService from "../../services/destinationService";
import locationService from "../../services/locationService";
import useDialog from "../../hooks/useDialog";
import AlertDialog from "../common/AlertDialog";

const CreateDestinationModal = ({
  onClose,
  onSuccess,
  initialData = null,
  destinationId = null,
}) => {
  const isEdit = !!initialData || !!destinationId;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    history: "",
    lat: "",
    lon: "",
    locationId: "",
    videoUrl: "",
    tags: [],
    images: [], // File objects (Create)
    imageUrls: [], // String URLs (Edit)
    faqs: [],
    isVisible: false,
  });

  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [imagePreviews, setImagePreviews] = useState([]);
  const imagePreviewsRef = useRef([]);

  const [tagInput, setTagInput] = useState("");

  const [targetLocationName, setTargetLocationName] = useState(null);

  const { alertDialog, showAlert, hideDialog } = useDialog();
  useEffect(() => {
    const loadData = async () => {
      if (initialData) {
        setFormData({
          name: initialData.name || "",
          title: initialData.title || "",
          description: initialData.description || "",
          history: initialData.history || "",
          lat: initialData.lat || "",
          lon: initialData.lon || "",
          locationId: initialData.locationId || "",
          videoUrl: initialData.videoUrl || "",
          tags: initialData.tags || [],
          images: [],
          imageUrls: initialData.imageUrls || [],
          faqs: initialData.faQs || [],
          isVisible:
            initialData.isVisible !== undefined ? initialData.isVisible : true,
        });
        if (initialData.imageUrls && initialData.imageUrls.length > 0) {
          setImagePreviews(initialData.imageUrls);
        }
      } else if (destinationId) {
        try {
          const data =
            await destinationService.getDestinationByIdAdmin(destinationId);
          setFormData({
            name: data.name || "",
            title: data.title || "",
            description: data.description || "",
            history: data.history || "",
            lat: data.lat || "",
            lon: data.lon || "",
            locationId: data.locationId || "",
            videoUrl: data.videoUrl || "",
            tags: data.tags || [],
            images: [],
            imageUrls: data.imageUrls || [],
            faqs: data.faQs || [],
            isVisible: data.isVisible !== undefined ? data.isVisible : true,
          });

          if (!data.locationId && data.locationName) {
            setTargetLocationName(data.locationName);
          }

          if (data.imageUrls && data.imageUrls.length > 0) {
            setImagePreviews(data.imageUrls);
          }
        } catch (error) {
          console.error("Error fetching destination detail:", error);
          showAlert({
            title: "Lỗi",
            message: "Không thể tải thông tin điểm đến",
            type: "error",
          });
        }
      }
    };
    loadData();
  }, [initialData, destinationId, showAlert]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await locationService.getAllLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        showAlert({
          title: "Lỗi",
          message: "Không thể tải danh sách địa điểm",
          type: "error",
        });
      } finally {
        setLoadingLocations(false);
      }
    };
    fetchLocations();
  }, [showAlert]);

  useEffect(() => {
    imagePreviewsRef.current = imagePreviews;
  }, [imagePreviews]);

  useEffect(() => {
    if (targetLocationName && locations.length > 0 && !formData.locationId) {
      const match = locations.find(
        (loc) =>
          loc.name.toLowerCase().trim() ===
          targetLocationName.toLowerCase().trim(),
      );
      if (match) {
        setFormData((prev) => ({ ...prev, locationId: match.id }));
      }
    }
  }, [locations, targetLocationName, formData.locationId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = async (e) => {
    const currentTotal = formData.imageUrls.length + formData.images.length;
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    if (currentTotal + files.length > 10) {
      showAlert({
        title: "Giới hạn ảnh",
        message: "Bạn chỉ có thể upload tối đa 10 ảnh (bao gồm ảnh cũ và mới).",
        type: "warning",
      });
      return;
    }

    const validFiles = [];
    const newPreviews = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        showAlert({
          title: "File không hợp lệ",
          message: `${file.name} không phải là ảnh`,
          type: "error",
        });
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        showAlert({
          title: "File quá lớn",
          message: `${file.name} vượt quá 5MB`,
          type: "error",
        });
        continue;
      }

      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    const existingCount = formData.imageUrls.length;

    if (index < existingCount) {
      const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, imageUrls: newImageUrls }));
    } else {
      const newImageIndex = index - existingCount;
      const urlToRevoke = imagePreviews[index];
      URL.revokeObjectURL(urlToRevoke);

      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== newImageIndex),
      }));
    }

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = tagInput.trim();

    if (!tag) return;

    if (formData.tags.includes(tag)) {
      showAlert({
        title: "Tag trùng lặp",
        message: "Tag này đã tồn tại",
        type: "warning",
      });
      return;
    }

    if (formData.tags.length >= 10) {
      showAlert({
        title: "Giới hạn tags",
        message: "Bạn chỉ có thể thêm tối đa 10 tags",
        type: "warning",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
    setTagInput("");
  };

  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // Handle FAQ add
  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  // Handle FAQ change
  const handleFaqChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq,
      ),
    }));
  };

  // Remove FAQ
  const handleRemoveFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Tên là bắt buộc";
    if (!formData.title.trim()) newErrors.title = "Tiêu đề là bắt buộc";
    if (!formData.description.trim())
      newErrors.description = "Mô tả là bắt buộc";
    if (!formData.locationId) newErrors.locationId = "Địa điểm là bắt buộc";

    const lat = parseFloat(formData.lat);
    const lon = parseFloat(formData.lon);

    if (!formData.lat || isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.lat = "Latitude không hợp lệ (-90 đến 90)";
    }
    if (!formData.lon || isNaN(lon) || lon < -180 || lon > 180) {
      newErrors.lon = "Longitude không hợp lệ (-180 đến 180)";
    }

    // Validate History and Video URL
    if (!formData.history.trim()) {
      newErrors.history = "Lịch sử là bắt buộc";
    }
    if (!formData.videoUrl.trim()) {
      newErrors.videoUrl = "Video URL là bắt buộc";
    }

    // Validate FAQs
    formData.faqs.forEach((faq, index) => {
      if (!faq.question.trim() || !faq.answer.trim()) {
        newErrors[`faq${index}`] = "Câu hỏi và câu trả lời không được để trống";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      showAlert({
        title: "Lỗi",
        message: "Vui lòng kiểm tra lại thông tin",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEdit) {
        // Update Logic
        const idToUpdate = destinationId || initialData?.id;
        await destinationService.updateDestination(idToUpdate, formData);
        showAlert({
          title: "Thành công!",
          message: "Cập nhật điểm đến thành công",
          type: "success",
        });
      } else {
        // Create Logic
        const createdDestination =
          await destinationService.createDestination(formData);

        if (formData.isVisible === false && createdDestination?.id) {
          await destinationService.updateDestination(
            createdDestination.id,
            formData,
          );
        }
        showAlert({
          title: "Thành công!",
          message: "Điểm đến đã được tạo thành công",
          type: "success",
        });

        imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      }

      setTimeout(() => {
        hideDialog();
        onSuccess();
      }, 1500);
    } catch (error) {
      console.error("Error creating/updating destination:", error);
      showAlert({
        title: "Lỗi",
        message: error.message || "Không thể lưu điểm đến. Vui lòng thử lại.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      imagePreviewsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEdit ? "Cập nhật điểm đến" : "Tạo điểm đến mới"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>

          {/* Form - Scrollable Content */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 min-h-0"
          >
            {/* 2-Column Layout: Main Content + Sidebar */}
            <div className="flex flex-col lg:flex-row gap-6 overflow-hidden flex-1 p-6">
              {/* Main Column - 70% */}
              <div className="flex-1 lg:flex-[7] overflow-y-auto lg:pr-4">
                <div className="space-y-6">
                  {/* Basic Info Section */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="fas fa-info-circle text-primary-600 mr-2"></i>
                      Thông tin cơ bản
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tên điểm đến <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="VD: Hồ Hoàn Kiếm"
                          disabled={isSubmitting}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tiêu đề <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.title ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="VD: Trái tim của thủ đô Hà Nội"
                          disabled={isSubmitting}
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.title}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mô tả <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
                            errors.description
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Mô tả chi tiết về điểm đến..."
                          disabled={isSubmitting}
                        />
                        {errors.description && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.description}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lịch sử <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="history"
                          value={formData.history}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                          placeholder="Lịch sử hình thành và phát triển..."
                          disabled={isSubmitting}
                        />
                        {errors.history && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.history}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Location Section */}
                  <section className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="fas fa-map-marker-alt text-primary-600 mr-2"></i>
                      Vị trí
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tỉnh/Thành phố <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="locationId"
                          value={formData.locationId}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.locationId
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          disabled={loadingLocations || isSubmitting}
                        >
                          <option value="">Chọn địa điểm...</option>
                          {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                              {location.name}
                            </option>
                          ))}
                        </select>
                        {errors.locationId && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.locationId}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Latitude <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="lat"
                          value={formData.lat}
                          onChange={handleInputChange}
                          step="any"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.lat ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="21.0285"
                          disabled={isSubmitting}
                        />
                        {errors.lat && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.lat}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Longitude <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="lon"
                          value={formData.lon}
                          onChange={handleInputChange}
                          step="any"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.lon ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="105.8542"
                          disabled={isSubmitting}
                        />
                        {errors.lon && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.lon}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* FAQs Section */}
                  <section className="pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <i className="fas fa-question-circle text-primary-600 mr-2"></i>
                        Câu hỏi thường gặp
                      </h3>
                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm font-medium"
                        disabled={isSubmitting}
                      >
                        <i className="fas fa-plus mr-2"></i>
                        Thêm FAQ
                      </button>
                    </div>

                    {formData.faqs.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">
                        Chưa có câu hỏi nào. Click "Thêm FAQ" để thêm.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {formData.faqs.map((faq, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-medium text-gray-900">
                                FAQ #{index + 1}
                              </h4>
                              <button
                                type="button"
                                onClick={() => handleRemoveFaq(index)}
                                className="text-red-500 hover:text-red-700"
                                disabled={isSubmitting}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Câu hỏi
                                </label>
                                <input
                                  type="text"
                                  value={faq.question}
                                  onChange={(e) =>
                                    handleFaqChange(
                                      index,
                                      "question",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  placeholder="VD: Thời gian mở cửa?"
                                  disabled={isSubmitting}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Câu trả lời
                                </label>
                                <textarea
                                  value={faq.answer}
                                  onChange={(e) =>
                                    handleFaqChange(
                                      index,
                                      "answer",
                                      e.target.value,
                                    )
                                  }
                                  rows={2}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                  placeholder="Câu trả lời chi tiết..."
                                  disabled={isSubmitting}
                                />
                              </div>
                            </div>
                            {errors[`faq${index}`] && (
                              <p className="mt-2 text-sm text-red-600">
                                {errors[`faq${index}`]}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              </div>
              {/* End Main Column */}

              {/* Sidebar - 30% */}
              <div className="flex-1 lg:flex-[3] overflow-y-auto lg:border-l lg:border-gray-200 lg:pl-6 space-y-6">
                {/* Visibility Toggle */}
                <div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">
                        Hiển thị công khai
                      </p>
                      <p className="text-sm text-gray-600">
                        Điểm đến sẽ xuất hiện trên website
                      </p>
                    </div>
                    {/* Toggle Switch */}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          isVisible: !prev.isVisible,
                        }))
                      }
                      disabled={isSubmitting}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                        formData.isVisible ? "bg-primary-600" : "bg-gray-300"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isVisible ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Media Section */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="fas fa-image text-primary-600 mr-2"></i>
                    Media
                  </h3>
                  <div className="space-y-4">
                    {/* Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hình ảnh (Tối đa 10)
                      </label>
                      <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
                        <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                        <p className="text-xs text-gray-600 text-center">
                          Click hoặc kéo thả
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG (5MB)
                        </p>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          disabled={isSubmitting}
                        />
                      </label>

                      {/* Image Previews */}
                      {imagePreviews.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {imagePreviews.map((preview, index) => (
                            <div
                              key={index}
                              className="relative group h-28 rounded-lg overflow-hidden border border-gray-200"
                            >
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 text-xs"
                                disabled={isSubmitting}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Video URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="YouTube URL..."
                        disabled={isSubmitting}
                      />
                      {errors.videoUrl && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.videoUrl}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Tags Section */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="fas fa-tags text-primary-600 mr-2"></i>
                    Tags
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAddTag(e);
                          }
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Nhập tag..."
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                        disabled={isSubmitting}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>

                    {/* Tags Display */}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(index)}
                              className="text-primary-600 hover:text-primary-800"
                              disabled={isSubmitting}
                            >
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </div>
              {/* End Sidebar */}
            </div>
            {/* End 2-Column Layout */}

            {/* Footer - Fixed at bottom */}
            <div className="flex gap-3 p-6 border-t border-gray-200 flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check"></i>
                    {isEdit ? "Lưu thay đổi" : "Tạo điểm đến"}
                  </>
                )}
              </button>
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
      />
    </>
  );
};

export default CreateDestinationModal;
