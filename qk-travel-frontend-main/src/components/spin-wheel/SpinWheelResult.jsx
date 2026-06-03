import React from "react";
import { motion as Motion } from "framer-motion";

const SpinWheelResult = ({ prize, onClose }) => {
  const isLucky = !prize.label.toLowerCase().includes("may mắn lần sau");

  return (
    <Motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="text-center"
    >
      {/* Sparkle effect */}
      <div className="relative inline-block mb-4">
        {isLucky && (
          <>
            {[...Array(8)].map((_, i) => (
              <Motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI) / 4) * 80,
                  y: Math.sin((i * Math.PI) / 4) * 80,
                }}
                transition={{ duration: 1, delay: 0.2, repeat: 2 }}
                style={{ left: "50%", top: "50%" }}
              />
            ))}
          </>
        )}

        <Motion.div
          animate={isLucky ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-lg ${
              isLucky
                ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                : "bg-gradient-to-br from-gray-300 to-gray-400"
            }`}
          >
            <i
              className={`fas ${prize.icon || "fa-gift"} text-4xl text-white`}
            ></i>
          </div>
        </Motion.div>
      </div>

      <Motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`text-2xl font-bold mb-2 ${
          isLucky ? "text-yellow-600" : "text-gray-600"
        }`}
      >
        {isLucky ? "🎉 Chúc mừng!" : "😊 Hẹn gặp lại!"}
      </Motion.h3>

      <Motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-gray-700 mb-2"
      >
        {isLucky ? "Bạn đã nhận được:" : prize.label}
      </Motion.p>

      {isLucky && (
        <Motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="inline-block px-6 py-3 rounded-xl text-white font-bold text-xl mb-4 shadow-lg"
          style={{ backgroundColor: prize.color }}
        >
          <i className={`fas ${prize.icon || "fa-gift"} mr-2`}></i>
          {prize.label}
        </Motion.div>
      )}

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={onClose}
          className="mt-4 px-8 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg"
        >
          Tiếp tục
        </button>
      </Motion.div>
    </Motion.div>
  );
};

export default SpinWheelResult;
