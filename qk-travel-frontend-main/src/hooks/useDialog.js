import { useState, useCallback } from "react";

const useDialog = () => {
  const [alertDialog, setAlertDialog] = useState({
    show: false,
    type: "info",
    title: "",
    message: "",
    buttonText: "Đóng",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    type: "warning",
    title: "Xác nhận",
    message: "",
    confirmText: "Xác nhận",
    cancelText: "Hủy",
    onConfirm: () => {},
  });

  /**
   * Hiển thị Alert Dialog
   * @param {Object} options - Cấu hình cho alert dialog
   * @param {string} options.title - Tiêu đề dialog
   * @param {string} options.message - Nội dung thông báo
   * @param {string} [options.type="info"] - Loại dialog: info, success, error, warning
   * @param {string} [options.buttonText="Đóng"] - Text cho nút đóng
   */
  const showAlert = useCallback(
    ({ title, message, type = "info", buttonText = "Đóng", onConfirm }) => {
      setAlertDialog({
        show: true,
        type,
        title,
        message,
        buttonText,
        onConfirm,
      });
    },
    [],
  );

  const showConfirm = useCallback(
    ({
      title,
      message,
      onConfirm,
      type = "warning",
      confirmText = "Xác nhận",
      cancelText = "Hủy",
    }) => {
      setConfirmDialog({
        show: true,
        type,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: onConfirm || (() => {}),
      });
    },
    [],
  );

  const hideDialog = useCallback(() => {
    setAlertDialog((prev) => ({ ...prev, show: false }));
    setConfirmDialog((prev) => ({ ...prev, show: false }));
  }, []);

  return {
    // Alert Dialog
    alertDialog,
    showAlert,

    // Confirm Dialog
    confirmDialog,
    showConfirm,

    // Common
    hideDialog,
  };
};

export default useDialog;
