import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";

const FeedbackTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-[50%] right-0 z-[40] -translate-y-1/2 bg-white border border-r-0 border-gray-200 text-gray-700 hover:text-primary-600 py-3 px-2 rounded-l-lg shadow-[-2px_0_10px_rgba(0,0,0,0.1)] font-medium text-sm flex flex-col items-center gap-2 transition-all hover:pr-3 group"
      >
        <i className="fas fa-comment-dots text-primary-500 text-lg group-hover:scale-110 transition-transform"></i>
        <span
          className="text-base font-bold"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Feedback
        </span>
      </button>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FeedbackTab;
