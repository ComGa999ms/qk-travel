import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Error403 = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-50"></div>

          {/* Hero Icon */}
          <div className="mb-8 flex justify-center relative relative z-10">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
              <i className="fas fa-shield-alt text-4xl text-red-500"></i>
            </div>
            <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-2 bg-white rounded-full p-2 shadow-sm">
              <i className="fas fa-ban text-red-500 text-xl"></i>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">
            Không có quyền truy cập
          </h1>

          <p className="text-gray-600 mb-8 text-lg relative z-10">
            Xin lỗi, bạn không có quyền truy cập vào trang này. Vui lòng liên hệ
            với quản trị viên nếu bạn nghĩ đây là một sự nhầm lẫn.
          </p>

          <div className="flex justify-center relative z-10">
            <Link
              to="/"
              className="px-8 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <i className="fas fa-arrow-left"></i>
              Trở về trang chủ
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Error403;
