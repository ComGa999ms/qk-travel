import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import planService from "../services/planService";

import NewPlanResult from "../components/ai-planner/NewPlanResult";
import ConfirmDialog from "../components/common/ConfirmDialog";

const MyPlans = () => {
  const [savedPlans, setSavedPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  useEffect(() => {
    fetchMyPlans();
  }, []);

  const fetchMyPlans = async () => {
    try {
      setIsLoading(true);
      const data = await planService.getMyPlans();
      setSavedPlans(data);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
      setError("Không thể tải danh sách kế hoạch. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetail = async (planId) => {
    try {
      setIsDetailLoading(true);
      const detail = await planService.getPlanDetail(planId);
      setSelectedPlan(detail);
    } catch (err) {
      console.error("Failed to fetch plan detail:", err);
      alert("Không thể tải chi tiết kế hoạch. Vui lòng thử lại.");
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleDeleteClick = (e, plan) => {
    e.stopPropagation();
    setPlanToDelete(plan);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!planToDelete) return;

    try {
      await planService.deletePlan(planToDelete.id);
      setSavedPlans((prev) => prev.filter((p) => p.id !== planToDelete.id));
      setShowDeleteConfirm(false);
      setPlanToDelete(null);
    } catch (err) {
      console.error("Failed to delete plan:", err);
      alert("Không thể xóa kế hoạch. Vui lòng thử lại.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4 text-xl">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Detail Modal */}
      {selectedPlan && (
        <NewPlanResult
          planData={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}

      {/* Loading Overlay for Detail */}
      {isDetailLoading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
            <span className="font-medium text-gray-700">
              Đang tải chi tiết...
            </span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Xóa kế hoạch"
        message={`Bạn có chắc chắn muốn xóa kế hoạch du lịch đến "${planToDelete?.location?.name}" không? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Kế hoạch của tôi
            </h1>
            <p className="text-gray-600 mt-2">
              Quản lý các kế hoạch đã tạo và lưu trữ
            </p>
          </div>
          {savedPlans.length > 0 && (
            <Link
              to="/ai-planner"
              className="btn btn-primary shadow-lg hover:shadow-xl transition-all"
            >
              <i className="fas fa-plus mr-2"></i>
              Tạo kế hoạch mới
            </Link>
          )}
        </div>

        {savedPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100 relative"
              >
                <button
                  onClick={(e) => handleDeleteClick(e, plan)}
                  className="absolute top-4 left-4 z-20 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all shadow-sm border border-white/30 group-hover:opacity-100 opacity-0"
                  title="Xóa kế hoạch"
                >
                  <i className="fas fa-trash-alt text-xs"></i>
                </button>

                {/* Image Header */}
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 transition-transform duration-700 group-hover:scale-105"></div>

                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-sm shadow-sm">
                      Đã lưu
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 pt-16 bg-gradient-to-t from-black/50 to-transparent">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                        <i className="fas fa-map-marker-alt text-white"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-white drop-shadow-sm truncate">
                        {plan.location?.name || "Điểm đến chưa cập nhật"}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/90 font-medium">
                      <span className="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        <i className="fas fa-clock text-blue-200"></i>{" "}
                        {plan.duration} ngày
                      </span>
                      <span className="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        <i className="fas fa-user-friends text-blue-200"></i>{" "}
                        {plan.numberOfPeople} người
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">
                        Ngân sách dự kiến
                      </div>
                      <div className="font-bold text-gray-900 text-lg">
                        {formatCurrency(plan.totalCostEstimatedTo)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 mb-1">
                        Phong cách
                      </div>
                      <div className="inline-block px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-sm font-medium">
                        {plan.priceSetting}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      Đã tạo:{" "}
                      {new Date(plan.generatedAt).toLocaleDateString("vi-VN")}
                    </div>
                    <button
                      onClick={() => handleViewDetail(plan.id)}
                      className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1"
                    >
                      Xem chi tiết <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 text-4xl">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Chưa có kế hoạch nào
            </h3>
            <p className="text-gray-500 mb-6">
              Hãy thử tạo kế hoạch du lịch đầu tiên của bạn với AI Planner
            </p>
            <Link to="/ai-planner" className="btn btn-outline">
              Tạo kế hoạch ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlans;
