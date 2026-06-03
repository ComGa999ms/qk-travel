import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import SpinWheel from "./SpinWheel";
import SpinWheelResult from "./SpinWheelResult";
import spinPrizeService from "../../services/spinPrizeService";
import { shuffleArray } from "../../data/spinWheelConfig";

const SpinWheelModal = ({ isOpen, onClose }) => {
  const [result, setResult] = useState(null);
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const configRaw = await spinPrizeService.getConfig();
        // Unwrap API response: { success, data: { isEnabled, prizes, ... } }
        const configData =
          configRaw && typeof configRaw === "object" && "success" in configRaw
            ? configRaw.data
            : configRaw;

        // Extract prizes from config
        const rawList = Array.isArray(configData?.prizes)
          ? configData.prizes
          : [];
        const mapped = rawList.map((p) => ({
          id: p.id,
          label: p.name,
          color: p.color,
          icon: p.icon,
        }));

        const finalPrizes = configData?.isShuffled
          ? shuffleArray(mapped)
          : mapped;
        setPrizes(finalPrizes);
      } catch (error) {
        console.error("Failed to fetch spin wheel data:", error);
        setPrizes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen]);

  const handleFinish = (prize) => {
    setResult(prize);
  };

  const handleClose = () => {
    setResult(null);
    onClose();
  };

  if (!isOpen || loading || prizes.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] overflow-y-auto">
        {/* Backdrop */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Content */}
        <div className="flex min-h-full items-center justify-center p-4">
          <Motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative bg-gradient-to-b from-[#1a1a4e] to-[#2d1b69] rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-purple-400/30"
          >
            {/* Decorative stars */}
            <div className="absolute top-4 left-6 text-yellow-300 text-xs opacity-60">
              ★
            </div>
            <div className="absolute top-8 right-8 text-yellow-300 text-sm opacity-40">
              ★
            </div>
            <div className="absolute bottom-12 left-8 text-yellow-300 text-xs opacity-50">
              ★
            </div>
            <div className="absolute bottom-20 right-6 text-yellow-300 text-sm opacity-30">
              ★
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <Motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400"
              >
                🎡 Vòng Quay May Mắn
              </Motion.h2>
              <Motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-purple-200 text-sm mt-2"
              >
                Chào mừng bạn mới! Quay để nhận quà 🎁
              </Motion.p>
            </div>

            {/* Wheel or Result */}
            <div className="flex justify-center">
              {result ? (
                <SpinWheelResult prize={result} onClose={handleClose} />
              ) : (
                <SpinWheel prizes={prizes} onFinish={handleFinish} />
              )}
            </div>

            {/* Skip button (only before spinning) */}
            {!result && (
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-4"
              >
                <button
                  onClick={handleClose}
                  className="text-purple-300 hover:text-white text-sm underline transition-colors"
                >
                  Bỏ qua
                </button>
              </Motion.div>
            )}
          </Motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default SpinWheelModal;
