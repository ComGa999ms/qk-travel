import React, { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaUndo,
  FaRedo,
  FaImage,
  FaLink,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaYoutube,
  FaHighlighter,
  FaMinus,
  FaRemoveFormat,
  FaUpload,
  FaSpinner,
  FaCloudUploadAlt,
} from "react-icons/fa";

// ============================================================
// Modal chèn ảnh nâng cao: hỗ trợ 2 tab (URL + Upload)
// Cho phép chọn và upload NHIỀU ảnh cùng lúc
// ============================================================
const ImageInsertModal = ({
  isOpen,
  onClose,
  onInsertUrl,
  onUploadImages, // Nhận mảng files, upload song song
  uploading,
}) => {
  const [activeTab, setActiveTab] = useState("upload"); // "url" | "upload"
  const [urlValue, setUrlValue] = useState("");
  // Hỗ trợ nhiều file: state là mảng
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  // Reset state khi mở/đóng modal
  useEffect(() => {
    if (isOpen) {
      setUrlValue("");
      setSelectedFiles([]);
      setPreviews([]);
      setUploadError("");
      setActiveTab("upload");
    }
  }, [isOpen]);

  // Tạo previews khi danh sách file thay đổi
  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }
    const urls = selectedFiles.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [selectedFiles]);

  if (!isOpen) return null;

  // Thêm files mới vào danh sách đã chọn (không xóa file cũ)
  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (newFiles.length === 0) return;
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setUploadError("");
  };

  // Xóa 1 file khỏi danh sách
  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Xử lý chọn file từ input (cho phép chọn nhiều)
  const handleFileSelect = (e) => {
    if (e.target.files?.length) {
      addFiles(e.target.files);
    }
    // Reset input để có thể chọn lại cùng file
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Upload tất cả file đã chọn
  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !onUploadImages) return;
    setUploadError("");

    try {
      await onUploadImages(selectedFiles);
      onClose();
    } catch (err) {
      setUploadError(err.message || "Upload thất bại. Vui lòng thử lại.");
    }
  };

  // Xử lý kéo thả file vào modal (nhiều file)
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      addFiles(e.dataTransfer.files);
      setActiveTab("upload");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-2 sm:p-6 sm:pb-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Chèn hình ảnh
            </h3>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "upload"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaUpload className="inline mr-2" size={12} />
                Tải lên
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("url")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "url"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaLink className="inline mr-2" size={12} />
                Nhập URL
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-4 pb-4 sm:px-6">
            {/* ===== Tab Upload ===== */}
            {activeTab === "upload" && (
              <div>
                {/* Vùng kéo thả */}
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {selectedFiles.length > 0 ? (
                    <div className="space-y-3">
                      {/* Grid preview nhiều ảnh */}
                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                        {previews.map((src, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={src}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            {/* Nút xóa từng ảnh */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(idx);
                              }}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow"
                              title="Xóa ảnh này"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        Đã chọn {selectedFiles.length} ảnh — Click để thêm
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FaCloudUploadAlt
                        className="mx-auto text-gray-400"
                        size={40}
                      />
                      <p className="text-sm text-gray-600">
                        Kéo thả ảnh vào đây hoặc{" "}
                        <span className="text-primary-600 font-medium">
                          chọn file
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        JPG, PNG, GIF, WebP — Tối đa 20MB — Có thể chọn nhiều
                        ảnh
                      </p>
                    </div>
                  )}
                </div>

                {/* Input file — cho phép chọn nhiều */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Thông báo lỗi */}
                {uploadError && (
                  <p className="mt-2 text-sm text-red-600">{uploadError}</p>
                )}

                {/* Nút Upload */}
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0 || uploading}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <FaSpinner className="animate-spin" size={12} />
                        Đang tải lên...
                      </>
                    ) : (
                      <>
                        <FaUpload size={12} />
                        Tải lên & Chèn
                        {selectedFiles.length > 1
                          ? ` (${selectedFiles.length})`
                          : ""}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ===== Tab URL ===== */}
            {activeTab === "url" && (
              <div>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="https://example.com/image.jpg"
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (urlValue.trim()) {
                        onInsertUrl(urlValue.trim());
                        onClose();
                      }
                    }
                  }}
                  autoFocus
                />
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (urlValue.trim()) {
                        onInsertUrl(urlValue.trim());
                        onClose();
                      }
                    }}
                    disabled={!urlValue.trim()}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50"
                  >
                    Chèn ảnh
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Modal đơn giản cho Link / Youtube (giữ nguyên logic cũ)
// ============================================================
const EditorPromptModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  initialValue = "",
  placeholder,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {title}
              </h3>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
              />
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Xác nhận
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Thanh công cụ (MenuBar)
// ============================================================
const MenuBar = ({ editor, onOpenImageModal, onOpenModal }) => {
  if (!editor) {
    return null;
  }

  const addYoutube = () => {
    onOpenModal("youtube", "", "Nhập URL Video Youtube");
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    onOpenModal("link", previousUrl || "", "Nhập URL liên kết");
  };

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50 rounded-t-lg items-center">
      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 text-gray-600"
          title="Hoàn tác"
        >
          <FaUndo size={12} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 text-gray-600"
          title="Làm lại"
        >
          <FaRedo size={12} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="p-2 rounded hover:bg-gray-200 text-gray-600"
          title="Xóa định dạng"
        >
          <FaRemoveFormat size={12} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bold") ? "bg-gray-300 text-black" : "text-gray-600"
        }`}
        title="In đậm"
      >
        <FaBold size={12} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("italic") ? "bg-gray-300 text-black" : "text-gray-600"
        }`}
        title="In nghiêng"
      >
        <FaItalic size={12} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("underline")
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Gạch chân"
      >
        <FaUnderline size={12} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("strike") ? "bg-gray-300 text-black" : "text-gray-600"
        }`}
        title="Gạch ngang"
      >
        <FaStrikethrough size={12} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("highlight")
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Highlight"
      >
        <FaHighlighter size={12} />
      </button>

      {/* Color Picker */}
      <div className="flex items-center mx-1">
        <input
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes("textStyle").color || "#000000"}
          className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer"
          title="Màu chữ"
        />
      </div>

      <div className="w-px bg-gray-300 mx-1 h-6"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "left" })
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Căn trái"
      >
        <FaAlignLeft size={12} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "center" })
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Căn giữa"
      >
        <FaAlignCenter size={12} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "right" })
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Căn phải"
      >
        <FaAlignRight size={12} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "justify" })
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Căn đều"
      >
        <FaAlignJustify size={12} />
      </button>

      <div className="w-px bg-gray-300 mx-1 h-6"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 rounded hover:bg-gray-200 text-sm font-bold ${
          editor.isActive("heading", { level: 1 })
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Tiêu đề 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 rounded hover:bg-gray-200 text-sm font-bold ${
          editor.isActive("heading", { level: 2 })
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Tiêu đề 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-1 rounded hover:bg-gray-200 text-sm font-bold ${
          editor.isActive("heading", { level: 3 })
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Tiêu đề 3"
      >
        H3
      </button>

      <div className="w-px bg-gray-300 mx-1 h-6"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bulletList")
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Danh sách"
      >
        <FaListUl size={12} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("orderedList")
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Danh sách số"
      >
        <FaListOl size={12} />
      </button>

      <div className="w-px bg-gray-300 mx-1 h-6"></div>

      <button
        type="button"
        onClick={setLink}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("link") ? "bg-gray-300 text-black" : "text-gray-600"
        }`}
        title="Thêm liên kết"
      >
        <FaLink size={12} />
      </button>
      <button
        type="button"
        onClick={onOpenImageModal}
        className="p-2 rounded hover:bg-gray-200 text-gray-600"
        title="Thêm hình ảnh"
      >
        <FaImage size={12} />
      </button>
      <button
        type="button"
        onClick={addYoutube}
        className="p-2 rounded hover:bg-gray-200 text-gray-600"
        title="Thêm Video Youtube"
      >
        <FaYoutube size={12} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="p-2 rounded hover:bg-gray-200 text-gray-600"
        title="Đường kẻ ngang"
      >
        <FaMinus size={12} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("blockquote")
            ? "bg-gray-300 text-black"
            : "text-gray-600"
        }`}
        title="Trích dẫn"
      >
        <FaQuoteRight size={12} />
      </button>
    </div>
  );
};

// ============================================================
// Component chính: TiptapEditor
// ============================================================
const TiptapEditor = ({
  value,
  onChange,
  placeholder = "Nhập nội dung bài viết...",
  onUploadImage, // Hàm upload ảnh từ parent (nhận File, trả về secureUrl)
}) => {
  // State cho Image Modal (mới — hỗ trợ upload)
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // State cho Prompt Modal (Link, Youtube — giữ nguyên logic cũ)
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "",
    initialValue: "",
    title: "",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Youtube.configure({
        controls: false,
      }),
      Highlight,
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[300px] p-4 bg-white",
      },
      // Hỗ trợ Drag & Drop NHIỀU ảnh vào editor
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && onUploadImage) {
          const files = Array.from(event.dataTransfer.files);
          const imageFiles = files.filter((f) => f.type.startsWith("image/"));

          if (imageFiles.length > 0) {
            event.preventDefault();
            // Upload tất cả ảnh song song khi drop
            (async () => {
              try {
                const results = await Promise.allSettled(
                  imageFiles.map((file) => onUploadImage(file)),
                );
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });
                let insertPos = coordinates?.pos;
                if (!insertPos) return;

                const { schema } = view.state;
                let tr = view.state.tr;
                // Chèn lần lượt từng ảnh upload thành công
                results.forEach((r) => {
                  if (r.status === "fulfilled") {
                    const imageUrl = r.value.secureUrl || r.value.url;
                    if (imageUrl) {
                      const node = schema.nodes.image.create({ src: imageUrl });
                      tr = tr.insert(insertPos, node);
                      insertPos += node.nodeSize;
                    }
                  }
                });
                view.dispatch(tr);
              } catch (err) {
                console.error("Drop upload failed:", err);
              }
            })();
            return true;
          }
        }
        return false;
      },
      // Hỗ trợ Paste ảnh từ clipboard
      handlePaste: (view, event) => {
        if (!onUploadImage) return false;

        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find((item) => item.type.startsWith("image/"));

        if (imageItem) {
          event.preventDefault();
          const file = imageItem.getAsFile();
          if (file) {
            (async () => {
              try {
                const result = await onUploadImage(file);
                const imageUrl = result.secureUrl || result.url;
                if (imageUrl && view) {
                  const { schema } = view.state;
                  const node = schema.nodes.image.create({ src: imageUrl });
                  const transaction = view.state.tr.replaceSelectionWith(node);
                  view.dispatch(transaction);
                }
              } catch (err) {
                console.error("Paste upload failed:", err);
              }
            })();
          }
          return true;
        }
        return false;
      },
    },
  });

  // Cập nhật ref cho handleUploadAndInsert khi editor thay đổi
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      if (!editor.isFocused) {
        editor.commands.setContent(value);
      }
    }
  }, [value, editor]);

  // Mở modal Prompt (cho Link, Youtube)
  const handleOpenModal = (type, initialValue, title) => {
    setModalConfig({ isOpen: true, type, initialValue, title });
  };

  const handleCloseModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // Xử lý submit từ Prompt Modal (Link, Youtube)
  const handleModalSubmit = (url) => {
    if (!editor) return;

    if (modalConfig.type === "youtube") {
      if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
    } else if (modalConfig.type === "link") {
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
      } else {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      }
    }
  };

  // Chèn ảnh bằng URL (từ tab URL trong ImageInsertModal)
  const handleInsertImageUrl = (url) => {
    if (editor && url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="rounded-lg border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all flex flex-col bg-white">
      <MenuBar
        editor={editor}
        onOpenImageModal={() => setImageModalOpen(true)}
        onOpenModal={handleOpenModal}
      />
      <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-b-lg">
        <EditorContent editor={editor} className="min-h-[300px]" />
      </div>
      <style>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>

      {/* Modal chèn ảnh — hỗ trợ upload NHIỀU ảnh cùng lúc */}
      <ImageInsertModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        onInsertUrl={handleInsertImageUrl}
        onUploadImages={
          onUploadImage
            ? async (files) => {
                setUploading(true);
                try {
                  // Upload song song tất cả file
                  const results = await Promise.allSettled(
                    files.map((file) => onUploadImage(file)),
                  );
                  // Chèn lần lượt từng ảnh upload thành công
                  results.forEach((r) => {
                    if (r.status === "fulfilled") {
                      const imageUrl = r.value.secureUrl || r.value.url;
                      if (imageUrl && editor) {
                        editor
                          .chain()
                          .focus()
                          .setImage({ src: imageUrl })
                          .run();
                      }
                    }
                  });
                  // Báo lỗi nếu có ảnh upload thất bại
                  const failed = results.filter((r) => r.status === "rejected");
                  if (failed.length > 0) {
                    throw new Error(
                      `${failed.length}/${files.length} ảnh upload thất bại.`,
                    );
                  }
                } finally {
                  setUploading(false);
                }
              }
            : null
        }
        uploading={uploading}
      />

      {/* Modal cho Link / Youtube (giữ nguyên) */}
      <EditorPromptModal
        isOpen={modalConfig.isOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        title={modalConfig.title}
        initialValue={modalConfig.initialValue}
        placeholder="https://example.com/..."
      />
    </div>
  );
};

export default TiptapEditor;
