import React, { useState, useEffect } from "react";
import giftcodeService from "../../services/giftcodeService";
import useDialog from "../../hooks/useDialog";
import AlertDialog from "../../components/common/AlertDialog";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const AdminGiftcodes = () => {
  const [giftcodes, setGiftcodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const { alertDialog, showAlert, hideDialog, showConfirm, confirmDialog } =
    useDialog();

  const [formData, setFormData] = useState({
    code: "",
    discountPercentage: 0,
    maximumDiscountAmount: "",
    description: "",
    validFrom: "",
    validTo: "",
    isActive: true,
    usageLimit: 100,
  });

  // Fetch giftcodes
  const fetchGiftcodes = async () => {
    try {
      setIsLoading(true);
      const response = await giftcodeService.getAll(page, pageSize);
      if (response && response.success) {
        // Handle paginated response
        let dataList = [];
        if (Array.isArray(response.data)) {
          dataList = response.data;
        } else if (response.data && Array.isArray(response.data.items)) {
          dataList = response.data.items;
          setTotalPages(response.data.totalPages || 1);
        }

        setGiftcodes(dataList);
      } else {
        setGiftcodes([]);
      }
    } catch (error) {
      console.error("Error fetching giftcodes:", error);
      showAlert({
        title: "Lỗi",
        message: "Không thể tải danh sách giftcode",
        type: "error",
      });
      setGiftcodes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGiftcodes();
  }, [page, pageSize]); // Refetch when page changes

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      code: "",
      discountPercentage: 0,
      maximumDiscountAmount: "",
      description: "",
      validFrom: "",
      validTo: "",
      isActive: true,
      usageLimit: 100,
    });
    setIsEditMode(false);
    setCurrentId(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (giftcode) => {
    setIsEditMode(true);
    setCurrentId(giftcode.id);

    // Format dates for input datetime-local
    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toISOString().slice(0, 16);
    };

    setFormData({
      code: giftcode.code,
      discountPercentage: giftcode.discountPercentage,
      maximumDiscountAmount: giftcode.maximumDiscountAmount,
      description: giftcode.description || "",
      validFrom: formatDateForInput(giftcode.validFrom),
      validTo: formatDateForInput(giftcode.validTo),
      isActive: giftcode.isActive,
      usageLimit: giftcode.usageLimit,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.validFrom) >= new Date(formData.validTo)) {
      showAlert({
        title: "Lỗi",
        message: "Thời gian kết thúc phải sau thời gian bắt đầu",
        type: "error",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Base data for both Create and Update
      const baseData = {
        discountPercentage: Number(formData.discountPercentage),
        maximumDiscountAmount: Number(formData.maximumDiscountAmount),
        description: formData.description,
        validFrom: new Date(formData.validFrom).toISOString(),
        validTo: new Date(formData.validTo).toISOString(),
        isActive: formData.isActive,
        usageLimit: Number(formData.usageLimit),
      };

      let response;
      if (isEditMode) {
        response = await giftcodeService.update(currentId, baseData);
      } else {
        const createData = {
          ...baseData,
          code: formData.code,
        };
        response = await giftcodeService.create(createData);
      }

      if (response && response.success) {
        showAlert({
          title: "Thành công",
          message: isEditMode
            ? "Cập nhật thành công!"
            : "Tạo giftcode thành công!",
          type: "success",
        });
        setShowModal(false);
        fetchGiftcodes();
      } else {
        throw new Error(response.message || "Thao tác thất bại");
      }
    } catch (error) {
      console.error("Submit error:", error);
      showAlert({
        title: "Lỗi",
        message:
          error.response?.data?.message || error.message || "Có lỗi xảy ra",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    showConfirm({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa giftcode này không?",
      onConfirm: async () => {
        try {
          const response = await giftcodeService.delete(id);
          if (response && response.success) {
            showAlert({
              title: "Thành công",
              message: "Đã xóa giftcode",
              type: "success",
            });
            fetchGiftcodes();
          }
        } catch (error) {
          console.error("Delete error:", error);
          showAlert({
            title: "Lỗi",
            message: "Xóa thất bại",
            type: "error",
          });
        }
      },
    });
  };

  const handleToggleActive = async (giftcode) => {
    try {
      const newStatus = !giftcode.isActive;
      const response = await giftcodeService.update(giftcode.id, {
        ...giftcode,
        isActive: newStatus,
        discountPercentage: Number(giftcode.discountPercentage),
        maximumDiscountAmount: Number(giftcode.maximumDiscountAmount),
        usageLimit: Number(giftcode.usageLimit),
        validFrom: new Date(giftcode.validFrom).toISOString(),
        validTo: new Date(giftcode.validTo).toISOString(),
      });

      if (response && response.success) {
        showAlert({
          title: "Thành công",
          message: `Đã ${newStatus ? "hiển thị" : "ẩn"} giftcode`,
          type: "success",
        });
        fetchGiftcodes();
      }
    } catch (error) {
      console.error("Toggle active error:", error);
      showAlert({
        title: "Lỗi",
        message: "Thay đổi trạng thái thất bại",
        type: "error",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Giftcode</h1>
          <p className="text-gray-600">Quản lý mã giảm giá và khuyến mãi</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <i className="fas fa-plus"></i>
          Thêm Giftcode
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Mã Code
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Giảm giá
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Ngày Bắt Đầu
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Ngày Kết Thúc
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Giới hạn
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <i className="fas fa-spinner fa-spin mr-2"></i> Đang tải dữ
                    liệu...
                  </td>
                </tr>
              ) : giftcodes.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Chưa có giftcode nào.
                  </td>
                </tr>
              ) : (
                giftcodes.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        {item.code}
                      </span>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                          {item.description}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.discountPercentage > 0 ? (
                        <>
                          <span className="text-blue-600 font-bold">
                            {item.discountPercentage}%
                          </span>
                          <span className="text-xs text-gray-500 block">
                            Tối đa:{" "}
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.maximumDiscountAmount)}
                          </span>
                        </>
                      ) : (
                        new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.maximumDiscountAmount)
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {format(new Date(item.validFrom), "dd/MM/yyyy")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {format(new Date(item.validTo), "dd/MM/yyyy")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.usageCount} / {item.usageLimit}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.isActive ? "Hoạt động" : "Vô hiệu"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleActive(item)}
                        className={`${
                          item.isActive
                            ? "text-green-600 hover:text-green-800"
                            : "text-gray-400 hover:text-gray-600"
                        } p-1`}
                        title={
                          item.isActive ? "Ẩn giftcode" : "Hiển thị giftcode"
                        }
                      >
                        <i
                          className={`fas ${
                            item.isActive ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </button>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Chỉnh sửa"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Xóa"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">Trang {page}</div>
        <div className="space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Trước
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            // Disable next if no items or naive check (ideally rely on totalPages from BE)
            disabled={giftcodes.length < pageSize}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>

      {/* Modal Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={() => setShowModal(false)}
              ></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {isEditMode ? "Cập nhật Giftcode" : "Tạo Giftcode mới"}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <form
                  id="giftcodeForm"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mã Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${isEditMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      placeholder="VD: SUMMER2026"
                      disabled={isEditMode}
                    />
                  </div>

                  {/* Discount Percentage & Amount */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phần trăm giảm (%)
                      </label>
                      <input
                        type="number"
                        name="discountPercentage"
                        value={formData.discountPercentage}
                        onChange={handleInputChange}
                        required
                        min="0"
                        max="100"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="0 nếu giảm tiền trực tiếp"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {formData.discountPercentage > 0
                          ? "Giảm tối đa (VND)"
                          : "Số tiền giảm (VND)"}
                      </label>
                      <input
                        type="number"
                        name="maximumDiscountAmount"
                        value={formData.maximumDiscountAmount}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mô tả
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="2"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    ></textarea>
                  </div>

                  {/* Valid Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bắt đầu
                      </label>
                      <input
                        type="datetime-local"
                        name="validFrom"
                        value={formData.validFrom}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Kết thúc
                      </label>
                      <input
                        type="datetime-local"
                        name="validTo"
                        value={formData.validTo}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Usage Limit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Giới hạn sử dụng
                    </label>
                    <input
                      type="number"
                      name="usageLimit"
                      value={formData.usageLimit}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  form="giftcodeForm"
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Đang xử lý..."
                    : isEditMode
                      ? "Cập nhật"
                      : "Tạo mới"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Component */}
      <AlertDialog
        isOpen={alertDialog.show}
        onClose={hideDialog}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
        buttonText={alertDialog.buttonText}
      />

      {/* Confirm Component */}
      <ConfirmDialog
        isOpen={confirmDialog.show}
        onClose={hideDialog}
        type={confirmDialog.type}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        onConfirm={confirmDialog.onConfirm}
      />
    </div>
  );
};

export default AdminGiftcodes;
