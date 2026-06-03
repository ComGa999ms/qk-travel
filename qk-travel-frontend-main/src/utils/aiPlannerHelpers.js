import { restaurants } from "../data/restaurants";
import { hotels } from "../data/hotels";
import { formatCurrency } from "../utils/formatCurrency";

// Map destination values to actual city names in data
export const destinationMapping = {
  hanoi: "Hà Nội",
  halong: "Hạ Long",
  sapa: "Sa Pa",
  hue: "Huế",
  hoian: "Hội An",
  danang: "Đà Nẵng",
  nhatrang: "Nha Trang",
  dalat: "Đà Lạt",
  hcmc: "TP. Hồ Chí Minh",
  hochiminh: "TP. Hồ Chí Minh",
  phuquoc: "Phú Quốc",
  cantho: "Cần Thơ",
  vungtau: "Vũng Tàu",
  haiphong: "Hải Phòng",
  quyinhon: "Quy Nhơn",
  mytho: "Mỹ Tho",
};

// Helper function to format currency range
export const formatCurrencyRange = (min, max) => {
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

export const getCategoryStars = (category, budgetLevel) => {
  if (category === "Resort")
    return budgetLevel === "budget" ? 3 : budgetLevel === "balanced" ? 4 : 5;
  if (category === "Hotel")
    return budgetLevel === "budget" ? 2 : budgetLevel === "balanced" ? 4 : 5;
  if (category === "Villa")
    return budgetLevel === "budget" ? 3 : budgetLevel === "balanced" ? 4 : 5;
  return 3;
};

// Restaurant and hotel data by destination
export const getRestaurantsByDestination = (destination, budgetLevel) => {
  // Map budget levels to price ranges
  const priceRanges = {
    budget: { min: 0, max: 150000 },
    balanced: { min: 150000, max: 500000 },
    premium: { min: 500000, max: Infinity },
  };

  const priceRange = priceRanges[budgetLevel];

  // Convert destination from form value to city name
  const cityName = destinationMapping[destination] || destination;

  // Filter restaurants from restaurants.js by destination and price range
  const filteredRestaurants = restaurants
    .filter((r) => r.location.city === cityName)
    .filter(
      (r) =>
        r.averagePrice >= priceRange.min && r.averagePrice <= priceRange.max,
    )
    .slice(0, 3); // Get max 3 restaurants

  // Map to match the structure we need
  const mappedRestaurants = filteredRestaurants.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    cuisine: r.cuisine,
    priceRange: formatCurrency(r.averagePrice),
    rating: r.rating,
    location: r.location.address.split(",")[0], 
  }));

  return mappedRestaurants.length > 0 ? mappedRestaurants : [];
};

export const getHotelsByDestination = (destination, budgetLevel) => {
  // Map budget levels to price ranges (per night)
  const priceRanges = {
    budget: { min: 0, max: 800000 },
    balanced: { min: 800000, max: 3000000 },
    premium: { min: 3000000, max: Infinity },
  };

  const priceRange = priceRanges[budgetLevel];

  // Convert destination from form value to city name
  const cityName = destinationMapping[destination] || destination;

  // Filter hotels from hotels.js by destination and price range
  const filteredHotels = hotels
    .filter((h) => h.location.city === cityName)
    .filter(
      (h) =>
        h.startingPrice >= priceRange.min && h.startingPrice <= priceRange.max,
    )
    .slice(0, 2); // Get max 2 hotels

  // Map to match the structure we need
  const mappedHotels = filteredHotels.map((h) => ({
    id: h.id,
    slug: h.slug,
    name: h.name,
    stars: getCategoryStars(h.category, budgetLevel),
    pricePerNight: h.priceRange, // Lấy full range thay vì chỉ giá min
    rating: h.rating,
    amenities: h.amenities
      .filter((a) => a.available)
      .slice(0, 3)
      .map((a) => a.name),
  }));

  return mappedHotels.length > 0 ? mappedHotels : [];
};

export const getDefaultRestaurants = (budgetLevel) => {
  const defaultData = {
    "Hà Nội": {
      budget: [
        {
          name: "Phở Thìn",
          cuisine: "Phở truyền thống",
          priceRange: formatCurrencyRange(40000, 60000),
          rating: 4.5,
          location: "Lò Đúc",
          slug: "pho-gia-truyen-bat-dan",
        },
        {
          name: "Bún Chả Đắc Kim",
          cuisine: "Bún chả Hà Nội",
          priceRange: formatCurrencyRange(50000, 70000),
          rating: 4.6,
          location: "Hàng Mành",
          slug: "bun-cha-huong-lien",
        },
        {
          name: "Bánh Mì 25",
          cuisine: "Bánh mì",
          priceRange: formatCurrencyRange(25000, 35000),
          rating: 4.3,
          location: "Hoàn Kiếm",
          slug: "quan-an-pho-co-hanoi",
        },
      ],
      balanced: [
        {
          name: "Nhà Hàng Madame Hiền",
          cuisine: "Việt Nam",
          priceRange: formatCurrencyRange(150000, 250000),
          rating: 4.7,
          location: "Hoàn Kiếm",
        },
        {
          name: "Essence Restaurant",
          cuisine: "Á - Âu",
          priceRange: formatCurrencyRange(200000, 350000),
          rating: 4.5,
          location: "Hai Bà Trưng",
        },
        {
          name: "Chả Cá Lã Vọng",
          cuisine: "Chả cá đặc sản",
          priceRange: formatCurrencyRange(180000, 280000),
          rating: 4.4,
          location: "Hồ Hoàn Kiếm",
        },
      ],
      premium: [
        {
          name: "La Verticale",
          cuisine: "Fine Dining Pháp",
          priceRange: formatCurrencyRange(500000, 800000),
          rating: 4.8,
          location: "Hoàn Kiếm",
        },
        {
          name: "Home Hanoi Restaurant",
          cuisine: "Cao cấp Việt Nam",
          priceRange: formatCurrencyRange(450000, 700000),
          rating: 4.7,
          location: "Tràng Tiền",
        },
        {
          name: "Maison Sen",
          cuisine: "Fusion Á-Âu",
          priceRange: formatCurrencyRange(600000, 900000),
          rating: 4.9,
          location: "Hồ Tây",
        },
      ],
    },
    "Hạ Long": {
      budget: [
        {
          name: "Hải Sản Bình Dân",
          cuisine: "Hải sản tươi",
          priceRange: formatCurrencyRange(80000, 120000),
          rating: 4.3,
          location: "Bãi Cháy",
        },
        {
          name: "Bánh Đa Cua",
          cuisine: "Đặc sản Hạ Long",
          priceRange: formatCurrencyRange(50000, 80000),
          rating: 4.4,
          location: "Chợ Hạ Long",
        },
        {
          name: "Quán Ốc Sài Gòn",
          cuisine: "Ốc các loại",
          priceRange: formatCurrencyRange(60000, 100000),
          rating: 4.2,
          location: "Hùng Thắng",
        },
      ],
      balanced: [
        {
          name: "Quán Nhà Hàng Sapa",
          cuisine: "Hải sản",
          priceRange: formatCurrencyRange(200000, 350000),
          rating: 4.5,
          location: "Bãi Cháy",
        },
        {
          name: "Emeralda Restaurant",
          cuisine: "Á - Âu",
          priceRange: formatCurrencyRange(250000, 400000),
          rating: 4.6,
          location: "Hạ Long",
        },
        {
          name: "Hải Sản Vịnh Hạ Long",
          cuisine: "Hải sản cao cấp",
          priceRange: formatCurrencyRange(300000, 500000),
          rating: 4.7,
          location: "Cảng tàu",
        },
      ],
      premium: [
        {
          name: "Au Lac Legend Cruise",
          cuisine: "Fine Dining",
          priceRange: formatCurrencyRange(600000, 1000000),
          rating: 4.9,
          location: "Du thuyền 5 sao",
        },
        {
          name: "Paradise Suites Restaurant",
          cuisine: "Fusion Seafood",
          priceRange: formatCurrencyRange(700000, 1200000),
          rating: 4.8,
          location: "Bãi Cháy",
        },
        {
          name: "Vinpearl Ha Long",
          cuisine: "Cao cấp quốc tế",
          priceRange: formatCurrencyRange(800000, 1500000),
          rating: 4.9,
          location: "Vinpearl Resort",
        },
      ],
    },
  };

  return defaultData[budgetLevel] || defaultData.balanced;
};

export const getHobbyIcon = (id) => {
  const icons = {
    1: "fas fa-spa", // Nghỉ dưỡng
    2: "fas fa-hiking", // Khám phá
    3: "fas fa-utensils", // Ẩm thực
    4: "fas fa-mountain", // Thiên nhiên
    5: "fas fa-landmark", // Văn hoá - Lịch sử
  };
  return icons[id] || "fas fa-heart";
};

export const getPriceSettingStyle = (id) => {
  const styles = {
    1: {
      icon: "💰",
      color: "from-green-400 to-green-600",
      desc: "Tối ưu chi phí",
    },
    2: {
      icon: "⭐",
      color: "from-yellow-400 to-yellow-600",
      desc: "Chất lượng ổn định",
    },
    3: {
      icon: "✨",
      color: "from-blue-400 to-blue-600",
      desc: "Cân bằng giá và chất lượng",
    },
    4: {
      icon: "🎯",
      color: "from-purple-400 to-purple-600",
      desc: "Tùy chỉnh theo nhu cầu",
    },
  };
  return (
    styles[id] || {
      icon: "✈️",
      color: "from-gray-400 to-gray-600",
      desc: "",
    }
  );
};
