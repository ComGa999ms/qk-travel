import React from "react";

const NavigationButtons = ({
  currentStep,
  steps,
  prevStep,
  nextStep,
  generatePlan,
  isGenerating,
}) => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100 gap-4 md:gap-0">
      <button
        onClick={prevStep}
        disabled={currentStep === 1}
        className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
          currentStep === 1
            ? "text-gray-400 cursor-not-allowed invisible"
            : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
        }`}
      >
        <i className="fas fa-arrow-left mr-2"></i>
        Quay lại
      </button>

      <div className="flex space-x-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index + 1 <= currentStep ? "bg-blue-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {currentStep < 2 ? (
        <button
          onClick={nextStep}
          className="flex items-center justify-center w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-accent-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl order-3 md:order-none"
        >
          Tiếp theo
          <i className="fas fa-arrow-right ml-2"></i>
        </button>
      ) : (
        !isGenerating && (
          <button
            onClick={generatePlan}
            className="flex items-center justify-center w-full md:w-auto px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transform hover:scale-105 shadow-xl hover:shadow-2xl text-white order-3 md:order-none"
          >
            <i className="fas fa-sparkles mr-3"></i>
            Tạo kế hoạch với AI
          </button>
        )
      )}
    </div>
  );
};

export default NavigationButtons;
