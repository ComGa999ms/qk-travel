import React, { useState, useEffect } from "react";
import contactService from "../services/contactService";
import useDialog from "../hooks/useDialog";
import AlertDialog from "../components/common/AlertDialog";
import contactBanner1 from "../assets/images/contact-banner-1.jpg";
import contactBanner2 from "../assets/images/contact-banner-2.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { alertDialog, showAlert, hideDialog } = useDialog();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await contactService.getTopics();
        setTopics(data);
      } catch (error) {
        console.error("Failed to load topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      // Map form data to API payload
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        message: formData.message,
        contactTopicId: parseInt(formData.subject),
      };

      await contactService.sendEmail(payload);

      // Show success dialog
      showAlert({
        title: "Gửi thành công!",
        message:
          "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.",
        type: "success",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      showAlert({
        title: "Gửi thất bại",
        message: error.message || "Có lỗi xảy ra, vui lòng thử lại sau.",
        type: "error",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      color: "hover:text-blue-600",
      href: "https://www.facebook.com/davisnguyen2309",
    },
    {
      name: "TikTok",
      icon: "fab fa-tiktok",
      color: "hover:text-gray-900",
      href: "https://www.tiktok.com/@comga999ms",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-gradient-to-br from-primary-600 via-blue-700 to-indigo-800 text-white py-20"
        style={{
          backgroundImage: `url(${contactBanner1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-pink-500/15 rounded-full blur-lg"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto mb-8 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center ring-4 ring-white/20">
            <i className="fas fa-headset text-white text-3xl"></i>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-10 leading-relaxed">
            Đội ngũ chuyên gia du lịch của chúng tôi luôn sẵn sàng hỗ trợ bạn
            24/7. Hãy liên hệ để được tư vấn miễn phí và tạo ra những trải
            nghiệm du lịch tuyệt vời!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-blue-100 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full transform -translate-x-12 translate-y-12"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-white text-lg"></i>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Gửi tin nhắn cho chúng tôi
                    </h2>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Họ và tên *
                      </label>
                      <div className="relative">
                        <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors"></i>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-0 transition-all duration-300 text-gray-900 placeholder-gray-500"
                          placeholder="Nhập họ và tên của bạn"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Email *
                      </label>
                      <div className="relative">
                        <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors"></i>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-0 transition-all duration-300 text-gray-900 placeholder-gray-500"
                          placeholder="Nhập email của bạn"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <i className="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors"></i>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-0 transition-all duration-300 text-gray-900 placeholder-gray-500"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Chủ đề *
                      </label>
                      <div className="relative">
                        <i className="fas fa-tag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors"></i>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-0 transition-all duration-300 text-gray-900 appearance-none bg-white"
                        >
                          <option value="">Chọn chủ đề</option>
                          {topics.map((topic) => (
                            <option key={topic.id} value={topic.id}>
                              {topic.name}
                            </option>
                          ))}
                        </select>
                        <i className="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Nội dung tin nhắn *
                    </label>
                    <div className="relative">
                      <i className="fas fa-comment-dots absolute left-4 top-6 text-gray-400 group-focus-within:text-primary-500 transition-colors"></i>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-0 transition-all duration-300 text-gray-900 placeholder-gray-500 resize-none"
                        placeholder="Mô tả chi tiết yêu cầu của bạn..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold text-lg py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitLoading ? (
                      <span className="flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin mr-3"></i>
                        Đang gửi...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <i className="fas fa-paper-plane mr-3 group-hover:scale-110 transition-transform"></i>
                        Gửi tin nhắn ngay
                        <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Background with overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${contactBanner2})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/60 to-blue-700/80"></div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-400/20 rounded-full blur-md"></div>

              <div className="relative z-10 text-white p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                    <i className="fas fa-headset text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Cần hỗ trợ nhanh?
                    </h3>
                    <p className="text-white text-sm">
                      Chúng tôi luôn sẵn sàng
                    </p>
                  </div>
                </div>

                <p className="text-blue-100 mb-6 leading-relaxed">
                  Gọi ngay cho chúng tôi để được tư vấn miễn phí từ đội ngũ
                  chuyên gia du lịch
                </p>

                <a
                  href="tel:+0369745122"
                  className="w-full bg-white text-primary-600 hover:bg-blue-50 font-bold text-lg py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center group"
                >
                  <i className="fas fa-phone mr-3 group-hover:scale-110 transition-transform"></i>
                  Gọi ngay: 0369 745 122
                </a>

                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-6 text-white text-sm">
                    <div className="flex items-center">
                      <i className="fas fa-clock mr-2"></i>
                      <span>24/7</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-shield-alt mr-2"></i>
                      <span>Miễn phí</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full transform -translate-x-10 translate-y-10"></div>

              <div className="relative z-10">
                <div className="grid grid-cols-1 gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="flex items-center space-x-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-primary-200 hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gray-100 group-hover:bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                        <i
                          className={`${social.icon} text-gray-600 text-lg ${social.color}`}
                        ></i>
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                          {social.name}
                        </span>
                      </div>
                      <i className="fas fa-arrow-right text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="card p-6">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              Vị trí văn phòng
            </h3>
            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2258522751345!2d106.79952997530923!3d10.870419189284098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527e7e8abb0eb%3A0xec43e4b99472c18a!2zVUlUIC0gQ-G7lW5nIEE!5e0!3m2!1svi!2s!4v1778407505568!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
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
    </div >
  );
};

export default Contact;
