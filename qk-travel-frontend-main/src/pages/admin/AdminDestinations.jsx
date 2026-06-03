import React, { useState, useEffect } from "react";
import destinationService from "../../services/destinationService";
import CreateDestinationModal from "../../components/admin/CreateDestinationModal";
import DestinationDetailModal from "../../components/admin/DestinationDetailModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [editDestinationId, setEditDestinationId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    destinationId: null,
    destinationName: "",
  });

  // Fetch destinations
  const fetchDestinations = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await destinationService.getDestinationsAdmin({
        page: currentPage,
        pageSize,
        keyword: searchTerm,
      });

      setDestinations(data.items || []);
      setTotalPages(data.totalPages || 0);
      setTotalCount(data.totalCount || 0);
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setError("Không thể tải danh sách điểm đến");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      fetchDestinations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    setEditDestinationId(null);
    setCurrentPage(1);
    fetchDestinations();
  };

  const handleEditFromDetail = (destination) => {
    setSelectedDestinationId(null);
    setEditDestinationId(destination.id);
    setShowCreateModal(true);
  };

  const handleUpdateDestination = (updatedDestination) => {
    if (updatedDestination) {
      setDestinations((prev) =>
        prev.map((item) =>
          item.id === updatedDestination.id
            ? { ...item, ...updatedDestination }
            : item,
        ),
      );
    } else {
      fetchDestinations();
    }
  };

  const handleDeleteDestination = async () => {
    if (!confirmDelete.destinationId) return;

    try {
      setDeletingId(confirmDelete.destinationId);
      await destinationService.deleteDestination(confirmDelete.destinationId);

      if (
        destinations.length === 1 &&
        currentPage > 1 &&
        currentPage === totalPages
      ) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchDestinations();
      }
    } catch (err) {
      console.error("Error deleting destination:", err);
      setError(err.message || "Không thể xóa điểm đến");
    } finally {
      setDeletingId(null);
      setConfirmDelete({
        show: false,
        destinationId: null,
        destinationName: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quản lý điểm đến
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Quản lý tất cả các điểm đến du lịch
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-96">
                  <input
                    type="text"
                    placeholder="Tìm kiếm điểm đến..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setCurrentPage(1);
                        fetchDestinations();
                      }
                    }}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>

                {searchTerm && (
                  <button
                    onClick={() => {
                      setCurrentPage(1);
                      fetchDestinations();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                    title="Tìm kiếm"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  setEditDestinationId(null);
                  setShowCreateModal(true);
                }}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <i className="fas fa-plus"></i>
                Tạo mới
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <p className="text-sm text-gray-600">
            Tổng số điểm đến:{" "}
            <span className="font-bold text-gray-900">{totalCount}</span>
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <i className="fas fa-spinner fa-spin text-4xl text-primary-600 mb-3"></i>
              <p className="text-gray-600">Đang tải...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-3"></i>
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchDestinations}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Thử lại
              </button>
            </div>
          ) : destinations.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
              <p className="text-gray-600">Chưa có điểm đến nào</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tiêu đề
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Địa điểm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tags
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {destinations.map((destination) => (
                      <tr
                        key={destination.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedDestinationId(destination.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {destination.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {destination.name || destination.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 truncate max-w-xs">
                            {destination.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {destination.locationName || "-"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {destination.tags && destination.tags.length > 0 ? (
                              destination.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded"
                                >
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                            {destination.tags &&
                              destination.tags.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{destination.tags.length - 3}
                                </span>
                              )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {destination.isVisible ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Hiển thị
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Đã ẩn
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDelete({
                                show: true,
                                destinationId: destination.id,
                                destinationName:
                                  destination.name || destination.title || "",
                              });
                            }}
                            disabled={deletingId === destination.id}
                            className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="Xóa điểm đến"
                          >
                            <i
                              className={`fas ${
                                deletingId === destination.id
                                  ? "fa-spinner fa-spin"
                                  : "fa-trash"
                              }`}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Trang <span className="font-medium">{currentPage}</span> /{" "}
                      <span className="font-medium">{totalPages}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateDestinationModal
          onClose={() => {
            setShowCreateModal(false);
            setEditDestinationId(null);
          }}
          onSuccess={handleCreateSuccess}
          destinationId={editDestinationId}
        />
      )}

      {/* Detail Modal */}
      {selectedDestinationId && (
        <DestinationDetailModal
          destinationId={selectedDestinationId}
          onClose={() => setSelectedDestinationId(null)}
          onEdit={handleEditFromDetail}
          onUpdate={handleUpdateDestination}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDelete.show}
        onClose={() =>
          setConfirmDelete({
            show: false,
            destinationId: null,
            destinationName: "",
          })
        }
        onConfirm={handleDeleteDestination}
        title="Xóa điểm đến"
        message={`Bạn có chắc chắn muốn xóa điểm đến "${confirmDelete.destinationName}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
};

export default AdminDestinations;
