import React from "react";
import { motion } from "framer-motion";

const PlanningLoader = () => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center p-4">
      {/* Animated Icon */}
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 border-4 border-t-primary-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-4 border-4 border-t-transparent border-r-blue-500 border-b-transparent border-l-pink-500 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fas fa-brain text-4xl text-white animate-pulse"></i>
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        AI đang lên kế hoạch cho bạn
      </h2>

      {/* Steps Animation */}
      <div className="space-y-3 w-full max-w-sm">
        <LoaderStep text="Phân tích sở thích..." delay={0} duration={1500} />
        <LoaderStep
          text="Tìm kiếm địa điểm phù hợp..."
          delay={1500}
          duration={2000}
        />
        <LoaderStep
          text="Tối ưu hóa lộ trình..."
          delay={3500}
          duration={2000}
        />
        <LoaderStep
          text="Hoàn thiện kế hoạch..."
          delay={5500}
          duration={Infinity}
        />
      </div>
    </div>
  );
};

const LoaderStep = ({ text, delay, duration }) => {
  const [status, setStatus] = React.useState("waiting");

  React.useEffect(() => {
    let activeTimer, completedTimer;

    activeTimer = setTimeout(() => {
      setStatus("active");
    }, delay);

    if (duration !== Infinity) {
      completedTimer = setTimeout(() => {
        setStatus("completed");
      }, delay + duration);
    }

    return () => {
      clearTimeout(activeTimer);
      clearTimeout(completedTimer);
    };
  }, [delay, duration]);

  return (
    <div className="flex items-center gap-3">
      <div className="w-6 flex justify-center">
        {status === "waiting" && (
          <div className="w-2 h-2 bg-gray-600 rounded-full" />
        )}
        {status === "active" && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <i className="fas fa-circle-notch text-primary-400"></i>
          </motion.div>
        )}
        {status === "completed" && (
          <motion.i
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fas fa-check text-green-500"
          ></motion.i>
        )}
      </div>
      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          status === "active"
            ? "text-white"
            : status === "completed"
              ? "text-green-400"
              : "text-gray-500"
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default PlanningLoader;
