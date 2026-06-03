import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import locationService from "../services/locationService";
import planService from "../services/planService";

// Import Components
import ProgressSteps from "../components/ai-planner/ProgressSteps";
import Step1Form from "../components/ai-planner/Step1Form";
import Step2Form from "../components/ai-planner/Step2Form";
import NavigationButtons from "../components/ai-planner/NavigationButtons";
import PlanResult from "../components/ai-planner/PlanResult";
import PlanDetailModal from "../components/ai-planner/PlanDetailModal";
import NewPlanResult from "../components/ai-planner/NewPlanResult";
import AlertDialog from "../components/common/AlertDialog";
import useDialog from "../hooks/useDialog";
import PlanningLoader from "../components/ai-planner/PlanningLoader";
import aiPlannerHero from "../assets/images/ai-planner-hero.jpg";

const AIPlanner = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const { alertDialog, showAlert, hideDialog } = useDialog();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    duration: 5, // Default 5 days
    interests: [],
    groupSize: "",
    currentLocation: "",
    travelStyle: "",
    specialRequirements: "",
  });

  // State
  const [locationsData, setLocationsData] = useState([]);
  const [hobbiesData, setHobbiesData] = useState([]);
  const [priceSettingsData, setPriceSettingsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Auth Check - Đợi loading hoàn tất trước khi kiểm tra
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [locations, hobbies, priceSettings] = await Promise.all([
          locationService.getAllLocations(),
          planService.getTravelHobbies(),
          planService.getPriceSettings(),
        ]);
        setLocationsData(locations);
        setHobbiesData(hobbies);
        setPriceSettingsData(priceSettings);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Chỉ fetch khi đã load xong auth và đã authenticated
    if (!loading && isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, loading]);

  const steps = [
    {
      number: 1,
      title: "Điểm đến",
      description: "Chọn nơi bạn muốn khám phá",
      icon: "fas fa-map-marker-alt",
    },
    {
      number: 2,
      title: "Sở thích",
      description: "Chia sẻ những gì bạn yêu thích",
      icon: "fas fa-heart",
    },
  ];

  const handleInterestToggle = (interestId) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generatePlan = async () => {
    setIsGenerating(true);
    setGeneratedPlan(null);

    const location = locationsData.find(
      (loc) => loc.name === formData.destination,
    );
    const currentLocation = locationsData.find(
      (loc) => loc.name === formData.currentLocation,
    );

    const priceSettingId = formData.travelStyle || 2;

    const planRequest = {
      locationId: location ? location.id : null,
      currentLocationId: currentLocation ? currentLocation.id : null,
      numberOfPeople: formData.groupSize,
      duration: formData.duration,
      priceSettingId: priceSettingId,
      hobbyIds: formData.interests,
      notes: formData.specialRequirements,
    };

    if (
      !formData.destination ||
      !formData.duration ||
      !formData.groupSize ||
      !formData.currentLocation ||
      !formData.travelStyle ||
      formData.interests.length === 0
    ) {
      showAlert({
        title: "Thiếu thông tin",
        message:
          "Vui lòng điền đầy đủ thông tin ở cả 2 bước trước khi tạo kế hoạch!",
        type: "warning",
      });
      setIsGenerating(false);
      return;
    }

    try {
      // Quota Check
      const quota = await planService.getQuota();
      if (quota && !quota.hasRemainingQuota) {
        showAlert({
          title: "Hết lượt sử dụng",
          message: `Bạn đã hết lượt tạo kế hoạch miễn phí (Đã dùng: ${quota.currentUsage}/${quota.limit}). Vui lòng nâng cấp gói để tiếp tục!`,
          type: "error",
        });
        setIsGenerating(false);
        return;
      }

      const response = await planService.generatePlan(planRequest);
      // setGeneratedPlan(response); // Commented out to switch to new view logic
      navigate("/ai-planner-result", { state: { planData: response } });
    } catch (error) {
      console.error("Error generating plan:", error);
      showAlert({
        title: "Lỗi",
        message: "Có lỗi xảy ra khi tạo kế hoạch. Vui lòng thử lại sau.",
        type: "error",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (generatedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <NewPlanResult
          planData={generatedPlan}
          onClose={() => setGeneratedPlan(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Loading Overlay */}
      {isGenerating && <PlanningLoader />}

      {/* Hero Section with Background Image */}
      <div className="relative h-[380px] w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage: `url(${aiPlannerHero})`,
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-start text-white text-center px-4 pt-20">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 animate-fadeIn text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            AI Trip Planner
          </h1>
          <p className="text-lg md:text-xl text-white font-medium max-w-2xl mx-auto animate-slideUp drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Tạo kế hoạch du lịch thông minh trong vài phút với sức mạnh của AI
          </p>
        </div>
      </div>

      {/* Main Content - Floating Card */}
      <div className="relative -mt-32 max-w-5xl mx-auto px-4 pb-20 z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slideUp delay-200 border border-gray-100">
          <ProgressSteps currentStep={currentStep} steps={steps} />

          {/* Form Content */}
          <div className="min-h-[400px] mt-10">
            {currentStep === 1 && (
              <Step1Form
                formData={formData}
                handleInputChange={handleInputChange}
                locationsData={locationsData}
                isLoadingLocations={isLoading}
              />
            )}
            {currentStep === 2 && (
              <Step2Form
                formData={formData}
                handleInputChange={handleInputChange}
                handleInterestToggle={handleInterestToggle}
                hobbiesData={hobbiesData}
                priceSettingsData={priceSettingsData}
              />
            )}
          </div>

          <NavigationButtons
            currentStep={currentStep}
            steps={steps}
            prevStep={prevStep}
            nextStep={nextStep}
            generatePlan={generatePlan}
            isGenerating={isGenerating}
          />
        </div>
      </div>
      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertDialog.show}
        onClose={hideDialog}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
        buttonText={alertDialog.buttonText}
      />
    </div>
  );
};

export default AIPlanner;
