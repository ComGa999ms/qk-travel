import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion as Motion } from "framer-motion";
import PricingModal from "../booking/PricingModal";

const PricingButton = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!user || user.subscriptionPlan !== "Basic") {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <Motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-8 w-16 h-16 left-6 z-40 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300"
        aria-label="Xem gói Premium"
      >
        <Motion.div
          animate={{
            rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <i className="fas fa-crown text-2xl"></i>
        </Motion.div>

        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75"></span>

        {/* Badge */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
          HOT
        </span>
      </Motion.button>

      {/* Tooltip */}
      <Motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
        className="fixed bottom-10 left-28 z-40 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <i className="fas fa-star text-yellow-400"></i>
          <span className="font-semibold">Nâng cấp Premium</span>
        </div>
        <div className="text-xs text-gray-300 mt-1">
          Trải nghiệm đầy đủ tính năng
        </div>
        {/* Arrow */}
        <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-900"></div>
      </Motion.div>

      {/* Modal */}
      <PricingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default PricingButton;
