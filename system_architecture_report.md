# Báo Cáo Phân Tích & Thiết Kế Hệ Thống Chi Tiết: QK Travel

Tài liệu này trình bày chi tiết về kiến trúc tổng thể, nghiệp vụ người dùng, mô hình dữ liệu, sơ đồ hệ thống tương tác và các công nghệ cốt lõi đang được sử dụng thực tế trong source code của dự án QK Travel.

---

## 1. Phân Tích Người Dùng & Nhu Cầu (Use-cases)

Hệ thống được thiết kế với sự phân quyền rõ ràng qua `IdentityRole` và các middleware bảo vệ route, chia thành 4 nhóm chính:

1.  **Traveler (Người đi du lịch):**
    *   *Nhu cầu:* Tìm kiếm ý tưởng du lịch, lập kế hoạch chi tiết, đặt chỗ.
    *   *Use-cases:* Đăng ký/Đăng nhập (hỗ trợ JWT & Google Auth), Xem Điểm đến/Nhà hàng/Khách sạn/Tour, **Sử dụng AI Planner** để tạo lịch trình tự động, Lưu lịch trình cá nhân (My Plans), Đọc Blog/Community, Mua gói Subscription (Premium) qua SePay, Chơi Vòng quay may mắn (Spin Wheel) lấy Giftcode.
2.  **Local Buddy (Thổ địa/Người dân địa phương):**
    *   *Nhu cầu:* Giới thiệu văn hóa địa phương, cung cấp dịch vụ hướng dẫn, kết nối cộng đồng.
    *   *Use-cases:* Quản lý Local Buddy Dashboard, Viết Blog chia sẻ, Quản lý hồ sơ cá nhân để nhận liên hệ từ Traveler.
3.  **B2B / Partner (Đối tác doanh nghiệp):**
    *   *Nhu cầu:* Cung cấp dịch vụ (Tour, Khách sạn, Nhà hàng).
    *   *Use-cases:* Truy cập cổng `B2BDashboard`, Quản lý dịch vụ (Service Management), Quản lý đặt chỗ (Booking Management), Quản lý tin tức B2B.
4.  **Admin (Quản trị viên hệ thống):**
    *   *Nhu cầu:* Kiểm soát toàn bộ dữ liệu, người dùng, giao dịch và nội dung.
    *   *Use-cases:* Truy cập `AdminDashboard`, Quản lý Users, Quản lý Destinations, Quản lý Blogs (Duyệt/Xóa), Quản lý Giftcodes/Spin Wheel, Xem Feedback & Audit Logs.

### Tính năng giữ chân (Retention) & Điểm nhấn (USP)
*   **AI Planner:** Tích hợp OpenAI (`gpt-4o-mini`) giúp tạo lịch trình du lịch cá nhân hóa (Accommodation, Food, Transportation) chỉ với vài thao tác.
*   **Hệ sinh thái toàn diện:** Tích hợp từ khâu tìm hiểu (Blog, Community) -> Lên kế hoạch (AI Planner, My Plans) -> Kết nối thực tế (Local Buddy) -> Thanh toán tiện lợi (SePay QR).

---

## 2. Kiến Trúc Hệ Thống (System Architecture)

QK Travel sử dụng kiến trúc **Client-Server** hiện đại, phân tách hoàn toàn Frontend và Backend (Decoupled Architecture), giao tiếp qua RESTful APIs.

```mermaid
graph TD
    %% Clients
    Client[Browser / Mobile Web]

    %% Frontend App (Vercel)
    subgraph Frontend_Vite_React [Frontend - Vercel Deployment]
        ReactApp[ReactJS SPA]
        Axios[Axios Interceptors]
        State[React Context / Hooks]
        Router[React Router DOM]
        ReactApp --> Axios
        ReactApp --> State
        ReactApp --> Router
    end

    %% Backend API (Render/VPS)
    subgraph Backend_DotNet8 [Backend - C# .NET 8 Web API]
        Controllers[API Controllers]
        Services[Business Logic Services]
        EFCore[Entity Framework Core]
        AIWorker[OpenAI Integration]
        Auth[JWT + Identity]
        BgWorker[Background Workers: PaymentCleanup]
        Controllers --> Services
        Controllers --> Auth
        Services --> EFCore
        Services --> AIWorker
    end

    %% Storage & Caching
    subgraph Data_Layer [Data & Storage]
        PostgreSQL[(PostgreSQL Db)]
        Redis[(Redis Cache)]
        S3[AWS S3 - Assets Storage]
    end

    %% External APIs
    subgraph External_APIs [Third Party Services]
        SePay[SePay Webhook - VietQR]
        OpenAI[OpenAI API]
        SMTP[Gmail SMTP - Emails]
    end

    %% Connections
    Client <-->|HTTPS| Frontend_Vite_React
    Axios <-->|REST API + Bearer Token| Controllers
    EFCore <-->|TCP / SSL| PostgreSQL
    Services <-->|TCP| Redis
    Services <-->|AWS SDK| S3
    Services <-->|HTTP| OpenAI
    Services -->|SMTP| SMTP
    SePay -->|POST Webhook| Controllers
```

**Mô tả kỹ thuật chi tiết:**
1.  **Frontend Layer:** Sử dụng `ReactJS` + `Vite` + `TailwindCSS` + `Framer Motion` (Animation). Axios interceptor được cấu hình tinh vi để tự động gọi API `/api/Auth/refresh-token` khi Access Token hết hạn, giúp phiên đăng nhập không bị gián đoạn.
2.  **Backend Layer:** Framework `ASP.NET Core 8`. Cấu trúc phân lớp rõ ràng (Controllers -> Services -> Data/Repositories). Sử dụng `AutoMapper` để map DTO, có hệ thống `AuditLog` để track thay đổi, và Background Worker (`PaymentCleanupWorker`) để dọn dẹp các giao dịch lỗi/hết hạn.
3.  **Data Layer:** RDBMS là `PostgreSQL` xử lý quan hệ phức tạp. Ảnh/Video được upload và phục vụ trực tiếp từ `AWS S3 Bucket` thay vì lưu trong server, giảm tải băng thông.
4.  **Tích hợp AI:** `AIPlanner` truyền prompt người dùng về server, C# server dùng API key của `OpenAI` để gen dữ liệu, parse sang JSON và trả về Frontend.

---

## 3. Thiết Kế Luồng Dữ Liệu & UML

### 3.1. Sơ đồ Use-Case Tổng quan

```mermaid
flowchart LR
    %% Actors
    Traveler((Traveler))
    LocalBuddy((LocalBuddy))
    Admin((Admin))

    %% System
    subgraph QK_Travel_App [QK Travel App]
        direction TB
        UC1([Sử dụng AI Trip Planner])
        UC2([Quản lý My Plans])
        UC3([Thanh toán gói Premium])
        UC4([Viết Blog/Tạo Content])
        UC5([Quản lý Profile/Dashboard])
        UC6([Quản lý Toàn Hệ thống])
    end

    %% Relationships
    Traveler --> UC1
    Traveler --> UC2
    Traveler --> UC3
    Traveler --> UC4
    
    LocalBuddy --> UC4
    LocalBuddy --> UC5

    Admin --> UC6
```

### 3.2. Sơ đồ Tuần tự (Sequence Diagram): Luồng Tạo Lịch Trình bằng AI

```mermaid
sequenceDiagram
    participant User
    participant ReactApp
    participant API
    participant OpenAI
    participant PostgreSQL

    User->>ReactApp: Nhập điểm đến, ngày đi, sở thích vào form
    ReactApp->>API: POST /api/Plan/ai-planner (Kèm Token)
    API->>API: Validate quyền (Free/Premium Quota)
    API->>OpenAI: Gọi API ChatCompletion với System Prompt
    OpenAI-->>API: Trả về JSON lịch trình gợi ý
    API->>PostgreSQL: Lưu bản nháp (Plan & Daily Itinerary)
    API-->>ReactApp: Trả về cấu trúc JSON Plan đầy đủ
    ReactApp-->>User: Render giao diện Lịch trình từng ngày
```

### 3.3. Sơ đồ Tuần tự (Sequence Diagram): Cấu hình Refresh Token Tự Động

```mermaid
sequenceDiagram
    participant Axios
    participant BackendAPI

    Axios->>BackendAPI: GET /api/Profile (Kèm Access Token cũ)
    BackendAPI-->>Axios: 401 Unauthorized (Token Expired)
    Axios->>Axios: Interceptor chặn lỗi 401, tạm dừng các request khác
    Axios->>BackendAPI: POST /api/Auth/refresh-token (Truyền Refresh Token)
    BackendAPI-->>Axios: 200 OK (Access Token mới, Refresh Token mới)
    Axios->>Axios: Cập nhật Token vào LocalStorage
    Axios->>BackendAPI: GET /api/Profile (Gửi lại request cũ với Token mới)
    BackendAPI-->>Axios: 200 OK (Dữ liệu Profile)
```

---

## 4. Thiết Kế Cơ Sở Dữ Liệu (ERD)

Database sử dụng **PostgreSQL** kết hợp **Entity Framework Core**. Hệ thống hiện tại có khoảng hơn 20 bảng (Entities) cốt lõi. Dưới đây là lược đồ rút gọn các quan hệ chính:

```mermaid
erDiagram
    APPLICATIONUSER {
        uuid Id PK
        string Email
        string PasswordHash
        string Gender
    }
    REFRESHTOKEN {
        int Id PK
        string Token
        uuid UserId FK
    }
    PLAN {
        int Id PK
        uuid UserId FK
        string Title
        string AIModel
        bool IsSaved
    }
    DAILYITINERARY {
        int Id PK
        int PlanId FK
        int DayNumber
        string Summary
    }
    ACTIVITY {
        int Id PK
        int DailyItineraryId FK
        string Name
    }
    FOODRECOMMENDATION {
        int Id PK
        int DailyItineraryId FK
        string DishName
    }
    PAYMENTTRANSACTION {
        int Id PK
        uuid UserId FK
        string OrderCode UK
        decimal Amount
        string Status
    }
    BLOG {
        int Id PK
        uuid AuthorId FK
        string Title
    }

    APPLICATIONUSER ||--o{ REFRESHTOKEN : "has"
    APPLICATIONUSER ||--o{ PLAN : "creates"
    APPLICATIONUSER ||--o{ PAYMENTTRANSACTION : "makes"
    APPLICATIONUSER ||--o{ BLOG : "writes"
    PLAN ||--|{ DAILYITINERARY : "contains"
    DAILYITINERARY ||--o{ ACTIVITY : "includes"
    DAILYITINERARY ||--o{ FOODRECOMMENDATION : "suggests"
```

*Lưu ý: ApplicationUser sử dụng hệ thống ASP.NET Core Identity để mã hóa mật khẩu, phân quyền và quản lý Claim bảo mật cao.*

---

## 5. Báo Cáo Tiến Độ Chức Năng Đã Hoàn Thành Thực Tế (MVP Status)

Dựa trên cấu trúc source code, hệ thống đã hoàn thiện các tính năng cốt lõi sau cho phiên bản MVP:

**1. Bảo mật & Xác thực (Hoàn thành 100%)**
- Đăng nhập/Đăng ký tài khoản (Custom JWT + Refresh token rotation).
- Đăng nhập qua Google Auth.
- Quên mật khẩu & Gửi Email xác thực bằng SMTP (MailKit).

**2. Module Giao Dịch & Thanh Toán (Hoàn thành 100%)**
- Khởi tạo giao dịch nạp tiền/mua gói cước (Premium Subscription).
- Tích hợp SePay tự động bắt webhook biến động số dư VietQR để kích hoạt gói cước ngay lập tức.
- Tích hợp vòng quay may mắn (Spin Wheel) và quản lý mã giảm giá (Giftcode).

**3. Module Lên Lịch Trình - Core Value (Hoàn thành 90%)**
- Giao diện `AIPlanner` truyền dữ liệu sở thích (Travel Hobbies).
- Tích hợp OpenAI Prompting để sinh lịch trình tự động (`DailyItinerary`, `FoodRecommendation`, `AccommodationRecommendation`, `TransportationRecommendation`).
- Lưu trữ/Sửa lịch trình vào mục My Plans.

**4. Module Nội Dung & Tương Tác (Hoàn thành 90%)**
- Xem danh sách Điểm đến (Destinations), Tour, Nhà hàng, Khách sạn.
- Hệ thống Blog & Community (Tạo bài viết, Comment phân cấp).
- Dashboard phân quyền rõ ràng: Local Buddy, Admin (quản lý Destinations, Blogs, Users, Audit Logs) và B2B Dashboard.

**5. Hạ tầng (Infrastructure)**
- Cấu hình sẵn sàng AWS S3 Upload file, PostgreSQL database, Docker container (`Dockerfile`).
- Cấu hình Deployment cho Vercel (Frontend) và Render/GCP (Backend).
