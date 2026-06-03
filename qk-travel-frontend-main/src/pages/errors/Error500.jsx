import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Error500 = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative"
        >
          {/* Hero Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
              <i className="fas fa-cogs text-4xl text-indigo-500"></i>
            </div>
          </div>

          <h1 className="text-8xl font-black text-gray-100 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none -z-10">
            500
          </h1>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lỗi máy chủ nội bộ
          </h2>

          <p className="text-gray-600 mb-8 text-lg">
            Đã có sự cố xảy ra từ phía chúng tôi. Đội ngũ kỹ thuật đã được thông
            báo và đang khắc phục sự cố này.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReload}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <i className="fas fa-redo-alt"></i>
              Thử lại
            </button>

            <Link
              to="/"
              className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-home"></i>
              Về trang chủ
            </Link>
          </div>
        </motion.div>

        <p className="mt-8 text-gray-500 text-sm">
          Mã lỗi:{" "}
          <span className="font-mono bg-gray-200 px-2 py-1 rounded text-gray-700">
            500_INTERNAL_SERVER_ERROR
          </span>
        </p>
      </div>
    </div>
  );
};

export default Error500;
