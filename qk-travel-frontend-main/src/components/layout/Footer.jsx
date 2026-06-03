import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerSections = [
    {
      title: "Tính năng",
      links: [
        { name: "AI Trip Planner", path: "/ai-planner", icon: "fas fa-robot" },
        {
          name: "Điểm đến",
          path: "/destinations",
          icon: "fas fa-map-marker-alt",
        },
      ],
    },
    {
      title: "Dịch vụ",
      links: [{ name: "Hỗ trợ 24/7", path: "/contact", icon: "fas fa-clock" }],
    },
    {
      title: "Công ty",
      links: [
        { name: "Giới thiệu", path: "/about", icon: "fas fa-info-circle" },

        { name: "Liên hệ", path: "/contact", icon: "fas fa-envelope" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      color: "hover:text-blue-600",
      href: "https://www.facebook.com/qktravel.vn",
    },
    {
      name: "Instagram",
      icon: "fab fa-instagram",
      color: "hover:text-pink-600",
      href: "#",
    },
    {
      name: "YouTube",
      icon: "fab fa-youtube",
      color: "hover:text-red-600",
      href: "#",
    },
    {
      name: "TikTok",
      icon: "fab fa-tiktok",
      color: "hover:text-gray-900",
      href: "https://www.tiktok.com/@qktravel.ai.vn?is_from_webapp=1&sender_device=pc",
    },
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      color: "hover:text-blue-400",
      href: "#",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo_tagline.png"
                alt="QkTravel Logo"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              Nền tảng du lịch thông minh tích hợp AI cá nhân hóa lộ trình du
              lịch Việt Nam. Trải nghiệm du lịch tối ưu với công nghệ tiên tiến.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-200 ${social.color} hover:bg-gray-700 hover:scale-110`}
                  aria-label={social.name}
                >
                  <i className={`${social.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-base font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors duration-200 group text-sm"
                    >
                      <i
                        className={`${link.icon} text-xs w-4 group-hover:scale-110 transition-transform`}
                      ></i>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
