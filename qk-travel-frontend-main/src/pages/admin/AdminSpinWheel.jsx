import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import spinPrizeService from "../../services/spinPrizeService";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import SpinWheel from "../../components/spin-wheel/SpinWheel";

const RANDOM_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#74b9ff",
  "#fd79a8",
  "#55efc4",
  "#a29bfe",
  "#fab1a0",
  "#00cec9",
  "#e17055",
  "#6c5ce7",
  "#ff7675",
  "#0984e3",
  "#00b894",
  "#fdcb6e",
  "#e84393",
  "#636e72",
];

const getRandomColor = () =>
  RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];

const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const AdminSpinWheel = () => {
  const [prizes, setPrizes] = useState([]);
  const [config, setConfig] = useState({ isEnabled: false });
  const [loading, setLoading] = useState(true);
  const [newPrizeName, setNewPrizeName] = useState("");
  const [saving, setSaving] = useState(false);
  const [togglingConfig, setTogglingConfig] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  // Edit modal state
  const [editModal, setEditModal] = useState({ open: false, prize: null });
  const [editName, setEditName] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  // Delete confirm state
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    prizeId: null,
    prizeName: "",
  });

  // Settings modal state
  const [settingsModal, setSettingsModal] = useState(false);
  const [configPrizes, setConfigPrizes] = useState([]);
  const [configShuffle, setConfigShuffle] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  // Preview modal state
  const [previewModal, setPreviewModal] = useState(false);
  const [previewPrizes, setPreviewPrizes] = useState([]);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const normalizeList = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  // Unwrap API response: { success, message, data: <actual>, errors, timestamp } -> <actual>
  const unwrapResponse = (res) => {
    if (res && typeof res === "object" && "success" in res && "data" in res) {
      return res.data;
    }
    return res;
  };

  const normalizeConfig = (data) => {
    const raw = unwrapResponse(data);
    return {
      ...raw,
      isEnabled: raw?.isEnabled ?? false,
    };
  };

  // Fetch prizes and config from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prizesData, configData] = await Promise.all([
          spinPrizeService.getAdminPrizes(),
          spinPrizeService.getConfig(),
        ]);
        setPrizes(normalizeList(unwrapResponse(prizesData)));
        if (configData) setConfig(normalizeConfig(configData));
      } catch (error) {
        console.error("Failed to fetch spin wheel data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Toggle isEnabled — fetch current config first, then send full config with updated isEnabled
  const handleToggleEnabled = async () => {
    try {
      setTogglingConfig(true);
      const currentConfigRaw = await spinPrizeService.getConfig();
      const currentConfig = normalizeConfig(currentConfigRaw);
      const newEnabled = !currentConfig.isEnabled;
      const updatedConfig = {
        ...currentConfig,
        isEnabled: newEnabled,
      };
      await spinPrizeService.saveConfig(updatedConfig);
      setConfig((prev) => ({ ...prev, isEnabled: newEnabled }));
    } catch (error) {
      console.error("Failed to toggle config:", error);
    } finally {
      setTogglingConfig(false);
    }
  };

  // Add prize
  const handleAddPrize = async () => {
    if (!newPrizeName.trim()) return;
    try {
      setSaving(true);
      const created = await spinPrizeService.createPrize({
        name: newPrizeName.trim(),
        isActive: true,
        color: getRandomColor(),
      });
      const raw = unwrapResponse(created) || created;
      const newItem = {
        id: raw.id,
        name: raw.name || newPrizeName.trim(),
        isActive: raw.isActive !== undefined ? raw.isActive : true,
        color: raw.color || getRandomColor(),
      };
      setPrizes((prev) => [...prev, newItem]);
      setNewPrizeName("");
    } catch (error) {
      console.error("Failed to add prize:", error);
    } finally {
      setSaving(false);
    }
  };

  // Toggle prize isActive
  const handleToggleActive = async (prize) => {
    try {
      setTogglingId(prize.id);
      await spinPrizeService.updatePrize(prize.id, {
        name: prize.name,
        color: prize.color,
        isActive: !prize.isActive,
      });
      setPrizes((prev) =>
        prev.map((p) =>
          p.id === prize.id ? { ...p, isActive: !p.isActive } : p,
        ),
      );
    } catch (error) {
      console.error("Failed to toggle prize:", error);
    } finally {
      setTogglingId(null);
    }
  };

  // Delete prize
  const handleDeletePrize = async () => {
    if (!deleteConfirm.prizeId) return;
    try {
      await spinPrizeService.deletePrize(deleteConfirm.prizeId);
      setPrizes((prev) => prev.filter((p) => p.id !== deleteConfirm.prizeId));
    } catch (error) {
      console.error("Failed to delete prize:", error);
    } finally {
      setDeleteConfirm({ show: false, prizeId: null, prizeName: "" });
    }
  };

  // Open edit modal
  const openEditModal = (prize) => {
    setEditModal({ open: true, prize });
    setEditName(prize.name);
  };

  // Save edit
  const handleSaveEdit = async () => {
    if (!editName.trim() || !editModal.prize) return;
    try {
      setEditSaving(true);
      await spinPrizeService.updatePrize(editModal.prize.id, {
        name: editName.trim(),
        color: editModal.prize.color,
        isActive: editModal.prize.isActive,
      });
      setPrizes((prev) =>
        prev.map((p) =>
          p.id === editModal.prize.id ? { ...p, name: editName.trim() } : p,
        ),
      );
      setEditModal({ open: false, prize: null });
    } catch (error) {
      console.error("Failed to update prize:", error);
    } finally {
      setEditSaving(false);
    }
  };

  // ---- Settings Modal ----
  const openSettingsModal = async () => {
    try {
      const configRaw = await spinPrizeService.getConfig();
      const configData = unwrapResponse(configRaw);
      const rawList = Array.isArray(configData?.prizes)
        ? configData.prizes
        : [];
      if (rawList.length > 0) {
        setConfigPrizes(
          rawList.map((p) => ({
            id: p.id,
            name: p.name,
            color: p.color || getRandomColor(),
            icon: p.icon || null,
          })),
        );
        setConfigShuffle(!!configData?.isShuffled);
      } else {
        // No config saved yet — fetch active prizes from GET /api/SpinPrizes
        const activePrizesRaw = await spinPrizeService.getAllPrizes();
        const activeList = normalizeList(unwrapResponse(activePrizesRaw));
        setConfigPrizes(
          activeList.map((p) => ({
            id: p.id,
            name: p.name,
            color: getRandomColor(),
            icon: null,
          })),
        );
        setConfigShuffle(false);
      }
    } catch (error) {
      console.error("Failed to fetch config for settings:", error);
      try {
        const activePrizesRaw = await spinPrizeService.getAllPrizes();
        const activeList = normalizeList(unwrapResponse(activePrizesRaw));
        setConfigPrizes(
          activeList.map((p) => ({
            id: p.id,
            name: p.name,
            color: getRandomColor(),
            icon: null,
          })),
        );
      } catch {
        setConfigPrizes([]);
      }
      setConfigShuffle(false);
    }
    setSettingsModal(true);
  };

  const handleConfigShuffle = () => {
    setConfigPrizes((prev) => shuffleArray(prev));
    setConfigShuffle(true);
  };

  const handleConfigDuplicate = () => {
    setConfigPrizes((prev) => [
      ...prev,
      ...prev.map((p) => ({ ...p, color: getRandomColor() })),
    ]);
  };

  const handleUseLatestPrizes = async () => {
    try {
      const raw = await spinPrizeService.getAllPrizes();
      const list = normalizeList(unwrapResponse(raw));
      setConfigPrizes(
        list.map((p) => ({
          id: p.id,
          name: p.name,
          color: getRandomColor(),
          icon: null,
        })),
      );
    } catch (error) {
      console.error("Failed to fetch latest prizes:", error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSavingSettings(true);
      const currentConfigRaw = await spinPrizeService.getConfig();
      const currentConfig = unwrapResponse(currentConfigRaw) || {};
      await spinPrizeService.saveConfig({
        ...currentConfig,
        isEnabled: config.isEnabled,
        isShuffled: configShuffle,
        prizes: configPrizes.map((p) => ({
          id: p.id,
          name: p.name,
          color: p.color,
          icon: null,
        })),
      });
      setSettingsModal(false);
    } catch (error) {
      console.error("Failed to save config:", error);
    } finally {
      setSavingSettings(false);
    }
  };

  // ---- Preview Modal ----
  const openPreviewModal = async () => {
    try {
      setLoadingPreview(true);
      const configRaw = await spinPrizeService.getConfig();
      const configData = unwrapResponse(configRaw);
      const rawList = Array.isArray(configData?.prizes)
        ? configData.prizes
        : [];
      let mapped;
      if (rawList.length > 0) {
        mapped = rawList.map((p) => ({
          id: p.id,
          label: p.name,
          color: p.color || getRandomColor(),
        }));
      } else {
        // Fallback: use local active prizes if config has no prizes yet
        mapped = prizes
          .filter((p) => p.isActive)
          .map((p) => ({
            id: p.id,
            label: p.name,
            color: p.color || getRandomColor(),
          }));
      }
      const finalPrizes = configData?.isShuffled
        ? shuffleArray(mapped)
        : mapped;
      setPreviewPrizes(finalPrizes);
      setPreviewModal(true);
    } catch (error) {
      console.error("Failed to load preview:", error);
    } finally {
      setLoadingPreview(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            <i className="fas fa-dharmachakra mr-3 text-primary-600"></i>
            Cấu hình Vòng Quay May Mắn
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý phần thưởng và bật/tắt chức năng vòng quay cho người dùng
            mới
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Preview button */}
          <button
            onClick={openPreviewModal}
            disabled={loadingPreview}
            className="px-4 py-2.5 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loadingPreview ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
            Xem trước
          </button>

          {/* Settings button */}
          <button
            onClick={openSettingsModal}
            className="px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-cog"></i>
            Cài đặt vòng quay
          </button>

          {/* Global Enable/Disable Toggle */}
          <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-200 px-5 py-2.5">
            <span className="text-sm font-medium text-gray-700">
              Trạng thái
            </span>
            <button
              onClick={handleToggleEnabled}
              disabled={togglingConfig || loading}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 ${
                config.isEnabled ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                  config.isEnabled ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-semibold ${config.isEnabled ? "text-green-600" : "text-gray-400"}`}
            >
              {config.isEnabled ? "Bật" : "Tắt"}
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <i className="fas fa-spinner fa-spin text-4xl text-primary-600 mb-3"></i>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Add New Prize */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              <i className="fas fa-plus-circle mr-2 text-green-500"></i>
              Thêm phần thưởng
            </h2>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Tên phần thưởng
                </label>
                <input
                  type="text"
                  value={newPrizeName}
                  onChange={(e) => setNewPrizeName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddPrize()}
                  placeholder="VD: Giảm 20%, Free Ship, 50K Voucher..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
              <button
                onClick={handleAddPrize}
                disabled={!newPrizeName.trim() || saving}
                className="px-6 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-plus"></i>
                )}
                Thêm
              </button>
            </div>
          </div>

          {/* Prize List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                <i className="fas fa-list mr-2 text-primary-600"></i>
                Danh sách phần thưởng ({prizes.length})
              </h2>
            </div>

            {prizes.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <i className="fas fa-inbox text-4xl mb-3 block"></i>
                <p>Chưa có phần thưởng nào. Hãy thêm phần thưởng ở trên.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {prizes.map((prize, index) => (
                    <Motion.div
                      key={prize.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group"
                    >
                      {/* Index */}
                      <span className="text-gray-400 text-sm w-6 text-center font-mono">
                        {index + 1}
                      </span>

                      {/* Name */}
                      <span
                        className={`flex-1 font-medium ${prize.isActive ? "text-gray-700" : "text-gray-400 line-through"}`}
                      >
                        {prize.name}
                      </span>

                      {/* Active toggle */}
                      <button
                        onClick={() => handleToggleActive(prize)}
                        disabled={togglingId === prize.id}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
                          prize.isActive ? "bg-green-500" : "bg-gray-300"
                        }`}
                        title={prize.isActive ? "Đang hoạt động" : "Đã tắt"}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                            prize.isActive ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => openEditModal(prize)}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                        title="Chỉnh sửa"
                      >
                        <i className="fas fa-pen text-xs"></i>
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          setDeleteConfirm({
                            show: true,
                            prizeId: prize.id,
                            prizeName: prize.name,
                          })
                        }
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                        title="Xóa"
                      >
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                    </Motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.show}
        onClose={() =>
          setDeleteConfirm({ show: false, prizeId: null, prizeName: "" })
        }
        onConfirm={handleDeletePrize}
        title="Xóa phần thưởng"
        message={`Bạn có chắc chắn muốn xóa phần thưởng "${deleteConfirm.prizeName}" không?`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />

      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={() => setEditModal({ open: false, prize: null })}
            />
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                <i className="fas fa-pen mr-2 text-blue-500"></i>
                Chỉnh sửa phần thưởng
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Tên phần thưởng
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditModal({ open: false, prize: null })}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={!editName.trim() || editSaving}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {editSaving && <i className="fas fa-spinner fa-spin"></i>}
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={() => setSettingsModal(false)}
            />
            <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-5">
                <i className="fas fa-cog mr-2 text-primary-600"></i>
                Cài đặt vòng quay
              </h3>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <button
                  onClick={handleUseLatestPrizes}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-sync-alt"></i>
                  Sử dụng dữ liệu mới nhất
                </button>
                <button
                  onClick={handleConfigShuffle}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-random"></i>
                  Trộn
                </button>
                <button
                  onClick={handleConfigDuplicate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-clone"></i>
                  x2
                </button>
                {configShuffle && (
                  <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full font-medium">
                    <i className="fas fa-check mr-1"></i>Đã trộn
                  </span>
                )}
              </div>

              {/* Config prize list */}
              <div className="mb-5">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Phần thưởng trong vòng quay ({configPrizes.length})
                </p>
                {configPrizes.length === 0 ? (
                  <div className="text-center py-6 text-gray-400">
                    <i className="fas fa-inbox text-2xl mb-2 block"></i>
                    <p className="text-sm">
                      Không có phần thưởng nào đang hoạt động
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1 border border-gray-100 rounded-lg p-3">
                    {configPrizes.map((prize, index) => (
                      <div
                        key={`${prize.id}-${index}`}
                        className="flex items-center gap-3 p-2 rounded-lg bg-gray-50"
                      >
                        <span className="text-gray-400 text-sm w-6 text-center font-mono">
                          {index + 1}
                        </span>
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0 ring-1 ring-white shadow-sm"
                          style={{ backgroundColor: prize.color }}
                        />
                        <span className="flex-1 text-gray-700 text-sm font-medium">
                          {prize.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setSettingsModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveSettings}
                  disabled={savingSettings || configPrizes.length === 0}
                  className="px-5 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {savingSettings && <i className="fas fa-spinner fa-spin"></i>}
                  <i className="fas fa-save"></i>
                  Lưu cài đặt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={() => setPreviewModal(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  <i className="fas fa-eye mr-2 text-amber-500"></i>
                  Xem trước vòng quay
                </h3>
                <button
                  onClick={() => setPreviewModal(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              {previewPrizes.length > 0 ? (
                <>
                  <div className="flex justify-center">
                    <SpinWheel prizes={previewPrizes} onFinish={() => {}} />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400">
                      {previewPrizes.length} phần thưởng đang hiển thị
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 text-gray-400">
                  <i className="fas fa-inbox text-4xl mb-3 block"></i>
                  <p>
                    Chưa có phần thưởng nào. Hãy lưu cài đặt vòng quay trước.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSpinWheel;
