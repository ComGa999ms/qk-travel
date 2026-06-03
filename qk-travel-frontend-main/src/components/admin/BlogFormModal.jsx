import React, { useState, useEffect, useRef, useCallback } from "react";
import blogService from "../../services/blogService";
import uploadService from "../../services/uploadService";
import TiptapEditor from "../common/TiptapEditor";
import {
  FaUpload,
  FaSpinner,
  FaTimes,
  FaImage,
  FaCloudUploadAlt,
} from "react-icons/fa";

// ============================================================
// Toggle Switch Component — thay thế Checkbox
// ============================================================
const ToggleSwitch = ({ checked, onChange, label }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        checked ? "bg-primary-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);

// ============================================================
// Hằng số và Utility cho Auto-Save
// ============================================================
const DRAFT_KEY_PREFIX = "qktravel_blog_draft";
const AUTO_SAVE_DELAY = 1500; // 1.5 giây debounce

// Tạo key riêng cho từng bài viết (tạo mới vs chỉnh sửa)
const getDraftKey = (blogId) =>
  blogId ? `${DRAFT_KEY_PREFIX}_${blogId}` : `${DRAFT_KEY_PREFIX}_new`;

// ============================================================
// Component chính
// ============================================================
const BlogFormModal = ({ isOpen, onClose, blog, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnailUrl: "",
    tags: "",
    isPublished: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");

  // State cho Auto-Save
  const [lastSaved, setLastSaved] = useState(null);
  const [draftRestored, setDraftRestored] = useState(false);
  const autoSaveTimerRef = useRef(null);
  // Cờ đánh dấu đã khởi tạo xong form (tránh auto-save ngay lần đầu)
  const isInitializedRef = useRef(false);

  // State cho upload thumbnail
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [thumbnailError, setThumbnailError] = useState("");
  const [thumbnailDragOver, setThumbnailDragOver] = useState(false);
  const thumbnailInputRef = useRef(null);

  // ============================================================
  // Lưu nháp vào localStorage
  // ============================================================
  const saveDraft = useCallback(
    (data) => {
      try {
        const draftKey = getDraftKey(blog?.id);
        const draft = {
          ...data,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(draftKey, JSON.stringify(draft));
        setLastSaved(new Date());
      } catch (err) {
        console.warn("Không thể lưu nháp vào localStorage:", err);
      }
    },
    [blog?.id],
  );

  // ============================================================
  // Xoá nháp khỏi localStorage
  // ============================================================
  const clearDraft = useCallback(() => {
    const draftKey = getDraftKey(blog?.id);
    localStorage.removeItem(draftKey);
    setLastSaved(null);
    setDraftRestored(false);
  }, [blog?.id]);

  // ============================================================
  // Khởi tạo form + Khôi phục bản nháp (nếu có)
  // ============================================================
  useEffect(() => {
    isInitializedRef.current = false;
    setLastSaved(null);
    setDraftRestored(false);

    // Dữ liệu gốc từ props (nếu đang sửa bài)
    const baseData = blog
      ? {
          title: blog.title || "",
          content: blog.content || "",
          thumbnailUrl: blog.thumbnailUrl || "",
          tags: blog.tags || [],
          isPublished: blog.isPublished,
        }
      : {
          title: "",
          content: "",
          thumbnailUrl: "",
          tags: [],
          isPublished: true,
        };

    // Thử khôi phục bản nháp từ localStorage
    try {
      const draftKey = getDraftKey(blog?.id);
      const savedDraft = localStorage.getItem(draftKey);

      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        // Chỉ khôi phục nếu nháp có nội dung thực sự
        const hasMeaningfulContent =
          parsed.title?.trim() || parsed.content?.trim();

        if (hasMeaningfulContent) {
          setFormData({
            title: parsed.title ?? baseData.title,
            content: parsed.content ?? baseData.content,
            thumbnailUrl: parsed.thumbnailUrl ?? baseData.thumbnailUrl,
            tags: parsed.tags ?? baseData.tags,
            isPublished: parsed.isPublished ?? baseData.isPublished,
          });
          setDraftRestored(true);
          setLastSaved(new Date(parsed.savedAt));
          // Đợi 1 tick rồi mới bật cờ initialized
          requestAnimationFrame(() => {
            isInitializedRef.current = true;
          });
          setThumbnailError("");
          return; // Đã khôi phục nháp, không cần set baseData nữa
        }
      }
    } catch (err) {
      console.warn("Lỗi khi khôi phục bản nháp:", err);
    }

    // Không có nháp -> dùng dữ liệu gốc
    setFormData(baseData);
    requestAnimationFrame(() => {
      isInitializedRef.current = true;
    });
    setThumbnailError("");
  }, [blog]);

  // ============================================================
  // Auto-save: Debounce 1.5s khi formData thay đổi
  // ============================================================
  useEffect(() => {
    // Bỏ qua lần khởi tạo đầu tiên
    if (!isInitializedRef.current) return;

    // Clear timer cũ (debounce)
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      saveDraft(formData);
    }, AUTO_SAVE_DELAY);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [formData, saveDraft]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContentChange = (html) => {
    setFormData((prev) => ({ ...prev, content: html }));
  };

  // ============================================================
  // Tag handlers
  // ============================================================
  const handleAddTag = (e) => {
    e?.preventDefault();
    const tag = tagInput.trim();
    if (!tag || formData.tags.includes(tag) || formData.tags.length >= 10)
      return;

    setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    setTagInput("");
  };

  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // ============================================================
  // Upload thumbnail — hỗ trợ cả click và drag & drop
  // ============================================================
  const processFile = async (file) => {
    if (!file) return;

    const validation = uploadService.validateImageFile(file);
    if (!validation.valid) {
      setThumbnailError(validation.error);
      return;
    }

    setThumbnailUploading(true);
    setThumbnailError("");

    try {
      const result = await uploadService.uploadImage(file, "blog");
      setFormData((prev) => ({
        ...prev,
        thumbnailUrl: result.secureUrl || result.url,
      }));
    } catch (err) {
      setThumbnailError(err.message || "Upload ảnh bìa thất bại.");
    } finally {
      setThumbnailUploading(false);
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
    }
  };

  const handleThumbnailUpload = (e) => processFile(e.target.files?.[0]);

  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    setThumbnailDragOver(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  // ============================================================
  // Upload ảnh cho TiptapEditor
  // ============================================================
  const handleEditorImageUpload = async (file) => {
    const validation = uploadService.validateImageFile(file);
    if (!validation.valid) throw new Error(validation.error);
    const result = await uploadService.uploadImage(file, "blog");
    return result;
  };

  // ============================================================
  // Submit form
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const publishValue = formData.isPublished === true;
      const payload = {
        title: formData.title,
        content: formData.content,
        thumbnailUrl: formData.thumbnailUrl,
        tags: formData.tags,
        isPublished: publishValue,
        IsPublished: publishValue,
      };

      if (blog) {
        await blogService.updateBlog(blog.id, payload);
      } else {
        const createdBlog = await blogService.createBlog(payload);
        const createdBlogId =
          createdBlog?.data?.id ||
          createdBlog?.data?.blogId ||
          createdBlog?.id ||
          createdBlog?.blogId;

        if (!publishValue && createdBlogId) {
          await blogService.updateBlog(createdBlogId, payload);
        }
      }

      // Xoá bản nháp sau khi lưu thành công
      clearDraft();

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to save blog:", err);
      setError("Có lỗi xảy ra khi lưu bài viết. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container — cố định chiều cao, flex column */}
      <div
        className="relative z-10 w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col"
        style={{ height: "92vh" }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* ========== STICKY HEADER ========== */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-900">
              {blog ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Thông báo lỗi */}
          {error && (
            <div className="mx-8 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex-shrink-0">
              {error}
            </div>
          )}

          {/* ========== BODY — 2 cột (70 / 30) ========== */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* === CỘT TRÁI: Title + Editor (70%) === */}
            <div className="flex-[7] flex flex-col min-h-0 border-r border-gray-200">
              {/* Title — borderless, lớn */}
              <div className="px-8 py-4 flex-shrink-0">
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Nhập tiêu đề bài viết..."
                  className="w-full text-2xl font-semibold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent focus:ring-0"
                />
              </div>

              {/* Đường kẻ mảnh */}
              <div className="mx-8 border-t border-gray-100" />

              {/* Editor — chiếm toàn bộ chiều cao còn lại */}
              <div className="flex-1 min-h-0 overflow-y-auto px-8 py-4">
                <TiptapEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  onUploadImage={handleEditorImageUpload}
                />
              </div>
            </div>

            {/* === CỘT PHẢI: Sidebar cấu hình (30%) === */}
            <div className="flex-[3] overflow-y-auto bg-gray-50/50">
              <div className="p-6 space-y-6">
                {/* --- Trạng thái xuất bản --- */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Trạng thái
                  </h4>
                  <ToggleSwitch
                    checked={formData.isPublished}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, isPublished: val }))
                    }
                    label="Xuất bản ngay"
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    {formData.isPublished
                      ? "Bài viết sẽ hiển thị công khai."
                      : "Bài viết sẽ ở trạng thái bản nháp."}
                  </p>
                </div>

                {/* --- Ảnh bìa (Thumbnail) --- */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Ảnh bìa
                  </h4>

                  {/* Vùng Preview / Upload */}
                  <div
                    className={`relative rounded-xl overflow-hidden border-2 border-dashed transition-all cursor-pointer ${
                      thumbnailDragOver
                        ? "border-primary-500 bg-primary-50"
                        : formData.thumbnailUrl
                          ? "border-transparent"
                          : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
                    }`}
                    onClick={() => thumbnailInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setThumbnailDragOver(true);
                    }}
                    onDragLeave={() => setThumbnailDragOver(false)}
                    onDrop={handleThumbnailDrop}
                  >
                    {formData.thumbnailUrl ? (
                      /* Preview ảnh bìa */
                      <div className="relative aspect-video">
                        <img
                          src={formData.thumbnailUrl}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        {/* Overlay khi hover */}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center group">
                          <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Click để thay đổi
                          </span>
                        </div>
                        {/* Nút xóa */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData((prev) => ({
                              ...prev,
                              thumbnailUrl: "",
                            }));
                          }}
                          className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-500 transition-colors shadow-lg"
                          title="Xóa ảnh bìa"
                        >
                          <FaTimes size={11} />
                        </button>
                      </div>
                    ) : (
                      /* Placeholder upload */
                      <div className="aspect-video flex flex-col items-center justify-center py-6 text-gray-400">
                        {thumbnailUploading ? (
                          <>
                            <FaSpinner
                              className="animate-spin mb-2"
                              size={28}
                            />
                            <span className="text-sm">Đang tải lên...</span>
                          </>
                        ) : (
                          <>
                            <FaCloudUploadAlt className="mb-2" size={32} />
                            <span className="text-sm font-medium">
                              Click hoặc kéo ảnh vào đây
                            </span>
                            <span className="text-xs mt-1">
                              JPG, PNG, GIF, WebP — Tối đa 20MB
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />

                  {/* Lỗi upload */}
                  {thumbnailError && (
                    <p className="mt-2 text-xs text-red-600">
                      {thumbnailError}
                    </p>
                  )}
                </div>

                {/* --- Tags --- */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Tags{" "}
                    <span className="text-gray-300 font-normal">
                      ({formData.tags?.length || 0}/10)
                    </span>
                  </h4>

                  {/* Input nhập tag */}
                  <div className="relative">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag(e);
                        }
                      }}
                      disabled={formData.tags?.length >= 10}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Nhập tag rồi nhấn Enter..."
                    />
                  </div>

                  {/* Chips hiển thị tags */}
                  {formData.tags && formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full border border-primary-200 hover:bg-primary-100 transition-colors"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                            className="p-0.5 rounded-full hover:bg-primary-200 text-primary-500 hover:text-primary-700 transition-colors"
                          >
                            <FaTimes size={8} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ========== STICKY FOOTER ========== */}
          <div className="flex items-center justify-between px-8 py-4 border-t border-gray-200 bg-gray-50/80 flex-shrink-0">
            {/* Bên trái: Trạng thái Auto-Save */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              {draftRestored && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 rounded-md border border-amber-200">
                  ✨ Đã khôi phục bản nháp
                  <button
                    type="button"
                    onClick={clearDraft}
                    className="ml-1 text-amber-500 hover:text-red-500 transition-colors"
                    title="Xoá bản nháp"
                  >
                    <FaTimes size={9} />
                  </button>
                </span>
              )}
              {lastSaved && !draftRestored && (
                <span className="text-green-500">
                  ✓ Đã lưu nháp lúc{" "}
                  {lastSaved.toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>

            {/* Bên phải: Nút hành động */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" size={12} />
                    Đang lưu...
                  </>
                ) : blog ? (
                  "Cập nhật"
                ) : (
                  "Tạo bài viết"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogFormModal;
