# 🌏 QkTravel - Nền tảng Du lịch Thông minh Việt Nam

> **"Discover Vietnam, Smarter with QkTravel"**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.18-cyan.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 Tổng quan dự án

**QkTravel** là nền tảng web du lịch thông minh tích hợp AI cá nhân hóa, giúp du khách khám phá Việt Nam với trải nghiệm thuận tiện, tối ưu và chi phí hợp lý.

### Vision 🎯

_"Trở thành nền tảng du lịch thông minh hàng đầu Việt Nam, đưa danh lam thắng cảnh Việt Nam đến gần hơn với thế giới."_

### Mission 🚀

_"Ứng dụng công nghệ AI & dữ liệu số để cá nhân hóa hành trình, quảng bá văn hóa – du lịch Việt Nam, mang lại trải nghiệm thuận tiện, chi phí hợp lý cho mọi người."_

---

## ✨ Tính năng chính

### 🤖 AI Planning - Lên kế hoạch thông minh

- **Cá nhân hóa lộ trình**: AI gợi ý lịch trình dựa trên sở thích, ngân sách, thời gian, số lượng người
- **Tự động tính toán**: Thời gian di chuyển và chi phí dự kiến
- **Tùy chỉnh linh hoạt**: Cho phép người dùng điều chỉnh và lưu hành trình
- **Tích hợp Google Maps**: Dẫn đường và ước lượng khoảng cách chính xác
- **Gợi ý theo xu hướng**: Trend du lịch, mùa lễ hội, sự kiện văn hóa

### 🏨 Khám phá địa điểm

- **Giới thiệu toàn diện**: Danh lam thắng cảnh, di tích lịch sử, văn hóa Việt Nam
- **Khách sạn & Nhà hàng**: Thông tin chi tiết về chỗ ở và ẩm thực
- **Đánh giá từ cộng đồng**: Reviews với hình ảnh thực tế
- **Tìm kiếm thông minh**: Lọc theo danh mục, giá cả, vị trí

### 🌟 Gamification - Tích điểm & Phần thưởng

- **Check-in**: Nhận điểm khi check-in tại địa điểm
- **Review & Chia sẻ**: Tích sao khi đánh giá, chia sẻ kinh nghiệm
- **Upload hình ảnh**: Đóng góp tối đa 5 ảnh mỗi review
- **Voucher**: Đổi điểm lấy ưu đãi từ đối tác

### 🧭 Trợ lý ảo AI

- **Google Maps Integration**: Gợi ý nhà hàng gần nhất, tuyến đường ngắn nhất
- **Dự báo thời tiết**: Cảnh báo thời tiết và giao thông
- **AI Story**: Kể chuyện về địa điểm bằng AI voice
- **Thông báo thông minh**: Nhắc nhở về lịch trình

### 👥 Local Buddy - Bạn đồng hành địa phương

- **Hướng dẫn viên chuyên nghiệp**: Có chứng chỉ, thành thạo nhiều ngôn ngữ
- **Đa ngôn ngữ**: Tiếng Việt, English, 中文, 한국어, 日本語
- **Dashboard quản lý**: Theo dõi tours, bookings, đánh giá
- **Lịch trình linh hoạt**: Xác nhận/từ chối booking, nhắn tin với khách

### 💼 B2B Dashboard - Quản lý doanh nghiệp

- **Quản lý dịch vụ**: Tours, hotels, restaurants, local buddy
- **Theo dõi booking**: Chờ xác nhận, đã xác nhận, hoàn thành, hủy
- **Thống kê doanh thu**: Biểu đồ 6 tháng, tổng quan chi tiết
- **Quản lý tin tức**: Đăng bài, chỉnh sửa, quản lý nội dung
- **Báo cáo chi tiết**: Đánh giá, số lượng khách, tỷ lệ chuyển đổi

### 📝 Reviews & Sharing

- **Chia sẻ trải nghiệm**: Viết review với đánh giá 1-5 sao
- **Upload hình ảnh**: Tối đa 5 ảnh/review
- **Lightbox gallery**: Xem ảnh phóng to với navigation
- **Preview & Quản lý**: Xem trước và xóa ảnh trước khi gửi

---

## 🛠️ Công nghệ sử dụng

### Frontend Core

- **React 19.1.0**: UI Framework
- **Vite 6.3.5**: Build tool & dev server
- **React Router DOM 7.9.3**: Client-side routing

### Styling & Animation

- **TailwindCSS 3.4.18**: Utility-first CSS framework
- **Framer Motion 12.23.22**: Animation library
- **Swiper 12.0.2**: Touch slider

### Development Tools

- **ESLint 9.25.0**: Code linting
- **PostCSS 8.5.6**: CSS processing
- **Autoprefixer 10.4.21**: CSS vendor prefixing

---

## 📁 Cấu trúc dự án

```
qk-travel/qk-travel-frontend-main/
├── public/               # Static assets
├── src/
│   ├── assets/          # Images, fonts, icons
│   ├── components/      # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Destinations.jsx
│   │   ├── Planning.jsx
│   │   ├── B2BDashboard.jsx
│   │   ├── BuddyDashboard.jsx
│   │   └── ...
│   ├── data/            # Mock data & constants
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── B2B_AND_LOCALBUDDY_GUIDE.md
├── REVIEWS_FEATURE.md
├── description.txt
├── package.json
└── README.md
```

---

## 🚀 Cài đặt & Chạy dự án

### Yêu cầu hệ thống

- Node.js >= 18.0.0
- npm >= 9.0.0

### Cài đặt

```bash
# Clone repository
git clone https://github.com/ComGa999ms/qk-travel.git

# Di chuyển vào thư mục dự án
cd qk-travel/qk-travel-frontend-main

# Cài đặt dependencies
npm install
```

### Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại: `http://localhost:5173`

### Build production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint code

```bash
npm run lint
```

---

## 🎯 Khách hàng mục tiêu

### 👨‍🎓 Sinh viên & Gen Z (18-25 tuổi)

- Yêu thích du lịch trải nghiệm, khám phá địa điểm mới lạ
- Ngân sách hạn chế, ưu tiên chi phí hợp lý
- Thường đi theo nhóm bạn
- Tiếp cận qua TikTok, Instagram, Facebook

### 💼 Người đi làm trẻ (25-35 tuổi)

- Thu nhập ổn định, sẵn sàng chi trả cho dịch vụ chất lượng
- Ưu tiên homestay, resort, nhà hàng địa phương cao cấp
- Tối ưu hóa thời gian (2-4 ngày) nhưng đầy đủ trải nghiệm

### 🌍 Khách du lịch quốc tế

- Cần công cụ đa ngôn ngữ, dễ sử dụng
- Ưa thích hành trình tự túc, tiết kiệm thời gian
- Muốn khám phá di sản, văn hóa, ẩm thực bản địa

---

## 🗺️ Thị trường chính

- **Hà Nội**: Văn Miếu, Hoàng Thành Thăng Long, Phố Cổ, Hồ Hoàn Kiếm
- **Sa Pa**: Núi non hùng vĩ, văn hóa dân tộc
- **Hạ Long**: Di sản thiên nhiên thế giới
- **Đà Nẵng**: Bãi biển, Bà Nà Hills
- **Ninh Bình**: Tràng An, Tam Cốc
- **Huế**: Cố đô, di tích lịch sử
- **Nha Trang**: Biển đảo, nghỉ dưỡng

---

## 💰 Mô hình kinh doanh

### 1. Freemium + Subscription

- **Miễn phí**: Xem thông tin cơ bản, lịch trình 1-2 ngày
- **Premium**: Lên kế hoạch dài ngày, tải PDF/Excel, không quảng cáo, ưu đãi độc quyền

### 2. Hoa hồng từ B2B

- Khách sạn, homestay, resort: % hoa hồng từ booking
- Nhà hàng: Phí hợp tác hoặc chia sẻ doanh thu
- Tour/xe du lịch: Hoa hồng từ đặt dịch vụ

### 3. Quảng cáo & Tài trợ

- Banner, top search từ đối tác
- Tài trợ từ Sở Du lịch, công ty tour

### 4. Loyalty Program

- Tích điểm qua review, check-in, chia sẻ
- Đổi điểm lấy voucher
- Đối tác trả phí để voucher xuất hiện

---

## 📱 Responsive Design

### 📱 Mobile (< 640px)

- Hamburger menu
- Stacked layouts
- Touch-friendly buttons (min 44px)
- 1-2 column grids

### 📲 Tablet (640px - 1024px)

- 2-3 column grids
- Collapsed navigation
- Optimized spacing

### 💻 Desktop (> 1024px)

- Full navigation
- 3-4 column grids
- Hover effects
- Sidebar layouts

---

## 🎨 Design System

### Colors

- **Primary**: Blue gradient (#3B82F6 to #2563EB)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)
- **Neutral**: Gray shades

### Typography

- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold, larger sizes
- **Body**: Regular, readable line-height

### Components

- Cards với subtle shadows
- Rounded corners (xl/2xl)
- Smooth transitions
- Gradient backgrounds

---

## 🔐 An ninh & Bảo mật

- SSL/TLS encryption
- Mã hóa dữ liệu người dùng
- Tuân thủ GDPR cho khách quốc tế
- Payment gateway integration (VNPay, PayPal)

---

## 📚 Tài liệu tham khảo

- [B2B & Local Buddy Guide](./B2B_AND_LOCALBUDDY_GUIDE.md) - Hướng dẫn sử dụng B2B Dashboard và Local Buddy
- [Reviews Feature](./REVIEWS_FEATURE.md) - Chi tiết về tính năng review và upload ảnh
- [Description](./description.txt) - Mô tả chi tiết dự án

---

## 👥 Đội ngũ phát triển

- **CEO/CFO**: Định hướng chiến lược, quản lý tài chính
- **CTO**: Phát triển web, AI recommendation, tích hợp API
- **CDO**: Thiết kế UI/UX, branding
- **CMO**: Marketing, social media, KOL partnerships

---

## 🛣️ Roadmap

### ✅ Phase 1 - MVP (Hoàn thành)

- [x] Landing page với hero section
- [x] Giới thiệu địa điểm du lịch
- [x] AI Planning mockup
- [x] Review & rating system
- [x] Upload hình ảnh (max 5)
- [x] B2B Dashboard
- [x] Local Buddy Dashboard
- [x] Responsive design

### 🚧 Phase 2 - Backend Integration (Đang phát triển)

- [ ] API integration
- [ ] User authentication
- [ ] Database setup
- [ ] Cloud storage cho ảnh
- [ ] Payment gateway

### 🔮 Phase 3 - Advanced Features

- [ ] Real AI recommendation engine
- [ ] Realtime notifications
- [ ] AR/VR tour experiences
- [ ] Mobile app (Flutter/React Native)
- [ ] Multi-language support
- [ ] Dark mode

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---
