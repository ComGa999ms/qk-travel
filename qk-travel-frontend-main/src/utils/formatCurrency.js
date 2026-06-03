/**
 * Format số tiền theo chuẩn Việt Nam: 000.000 VND
 * @param {number} amount - Số tiền cần format
 * @returns {string} - Chuỗi đã format, ví dụ: "1.500.000 VND"
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "0 VND";
  }

  // Chuyển số thành chuỗi và thêm dấu chấm phân cách hàng nghìn
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${formatted} VND`;
};

/**
 * Format số tiền ngắn gọn cho hiển thị (dùng trong card nhỏ)
 * @param {number} amount - Số tiền cần format
 * @returns {string} - Chuỗi đã format, ví dụ: "1.5M VND" hoặc "500K VND"
 */
export const formatCurrencyCompact = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "0 VND";
  }

  // Nếu >= 1 tỷ
  if (amount >= 1000000000) {
    const billions = (amount / 1000000000).toFixed(1);
    return `${billions.replace(".", ",")} tỷ VND`;
  }

  // Nếu >= 1 triệu
  if (amount >= 1000000) {
    const millions = (amount / 1000000).toFixed(1);
    return `${millions.replace(".", ",")} triệu VND`;
  }

  // Dưới 1 triệu: hiển thị đầy đủ
  return formatCurrency(amount);
};
