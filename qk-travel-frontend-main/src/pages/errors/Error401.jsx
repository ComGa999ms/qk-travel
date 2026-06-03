import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Error401 = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Hero Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
              <i className="fas fa-lock text-4xl text-orange-500"></i>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Đăng nhập để tiếp tục
          </h1>

          <p className="text-gray-600 mb-8 text-lg">
            Bạn cần đăng nhập để truy cập trang này. Phiên đăng nhập của bạn có
            thể đã hết hạn hoặc bạn chưa đăng nhập.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <i className="fas fa-sign-in-alt"></i>
              Đăng nhập ngay
            </Link>

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
          Nếu bạn cho rằng đây là lỗi, vui lòng{" "}
          <Link to="/contact" className="text-primary-600 hover:underline">
            liên hệ với chúng tôi
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Error401;
