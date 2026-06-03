import api from "./api";

// Các định dạng ảnh được phép upload
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

// Dung lượng tối đa: 20MB
const MAX_FILE_SIZE = 20 * 1024 * 1024;

/**
 * Validate file ảnh trước khi upload
 * @param {File} file - File cần kiểm tra
 * @returns {{ valid: boolean, error: string | null }}
 */
const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: "Vui lòng chọn file ảnh." };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Định dạng không hợp lệ. Chỉ chấp nhận: JPG, PNG, GIF, WebP, SVG.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File quá lớn (${sizeMB}MB). Dung lượng tối đa là 20MB.`,
    };
  }

  return { valid: true, error: null };
};

const normalizeUploadResult = (url) => ({
  url,
  secureUrl: url,
});

const uploadService = {
  /**
   * Upload 1 ảnh
   * @param {File} file - File ảnh cần upload
   * @returns {Promise<{ url: string, secureUrl: string }>}
   */
  uploadImage: async (file) => {
    // Validate file trước khi gửi
    const validation = validateImageFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/api/Files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return normalizeUploadResult(response.data.data.url);
  },

  /**
   * Upload nhiều ảnh cùng lúc
   * @param {File[]} files - Danh sách file ảnh
   * @returns {Promise<Array<{ url: string, secureUrl: string }>>}
   */
  uploadMultipleImages: async (files) => {
    // Validate từng file
    for (const file of files) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        throw new Error(`File "${file.name}": ${validation.error}`);
      }
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await api.post("/api/Files/upload-multiple", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data.map(normalizeUploadResult);
  },

  // Export hằng số để sử dụng ở component khác
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  validateImageFile,
};

export default uploadService;
