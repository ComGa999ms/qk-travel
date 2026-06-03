import React, { useState, useEffect } from "react";
import feedbackService from "../../services/feedbackService";
import useDialog from "../../hooks/useDialog";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useDialog();

  const fetchFeedbacks = async () => {
    try {
      setIsLoading(true);
      const response = await feedbackService.getAll();
      if (response && response.success) {
        setFeedbacks(response.data || []);
      } else {
        setFeedbacks([]);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      showAlert({
        title: "Lỗi",
        message: "Không thể tải danh sách phản hồi",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const getUsefulnessLabel = (value) => {
    switch (value) {
      case "NotUseful":
        return (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
            Không hữu ích
          </span>
        );
      case "SlightlyUseful":
        return (
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
            Hơi hữu ích
          </span>
        );
      case "Useful":
        return (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
            Hữu ích
          </span>
        );
      case "VeryUseful":
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
            Rất hữu ích
          </span>
        );
      default:
        return value;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Phản hồi</h1>
          <p className="text-gray-600">Xem ý kiến đóng góp từ người dùng</p>
        </div>
        <button
          onClick={fetchFeedbacks}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg transition-colors"
        >
          <i className="fas fa-sync-alt mr-2"></i> Làm mới
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Người dùng
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Đánh giá
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  AI Trip Planner
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Giới thiệu
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase w-1/3">
                  Nội dung
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Thời gian
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <i className="fas fa-spinner fa-spin mr-2"></i> Đang tải dữ
                    liệu...
                  </td>
                </tr>
              ) : feedbacks.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Chưa có phản hồi nào.
                  </td>
                </tr>
              ) : (
                feedbacks.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${i < item.rating ? "" : "text-gray-200"} text-xs`}
                          ></i>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getUsefulnessLabel(item.aiTripPlannerUsefulness)}
                    </td>
                    <td className="px-6 py-4">
                      {item.wouldRecommend ? (
                        <span className="text-green-600">
                          <i className="fas fa-check-circle mr-1"></i> Có
                        </span>
                      ) : (
                        <span className="text-red-500">
                          <i className="fas fa-times-circle mr-1"></i> Không
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p
                        className="text-sm text-gray-600 line-clamp-2"
                        title={item.content}
                      >
                        {item.content || (
                          <span className="italic text-gray-400">
                            Không có nội dung
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.createdAt
                        ? format(new Date(item.createdAt), "dd/MM/yyyy HH:mm", {
                            locale: vi,
                          })
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;
