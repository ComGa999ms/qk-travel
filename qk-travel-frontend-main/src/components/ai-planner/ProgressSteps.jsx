import React from "react";

const ProgressSteps = ({ currentStep, steps }) => {
  return (
    <div className="mb-10">
      {/* Step Counter Text */}
      <div className="flex justify-between items-end mb-4">
        <div className="flex-1"></div>
        <div className="text-gray-400 text-sm font-medium">
          Bước <span className="text-gray-900 font-bold">{currentStep}</span> /{" "}
          {steps.length}
        </div>
      </div>

      <div className="relative flex items-center justify-between">
        {/* Connecting Line - Background */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10"></div>

        {/* Connecting Line - Active Progress */}
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 rounded-full transition-all duration-500 -z-10"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {steps.map((step, index) => {
          const isActive = currentStep >= step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center relative bg-white px-2"
            >
              {/* Icon Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 border-blue-600 text-white shadow-md transform scale-110"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                <i className={`${step.icon} text-lg`}></i>
              </div>

              {/* Title */}
              <div
                className={`mt-2 text-xs md:text-sm font-semibold transition-colors duration-300 ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {step.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;
