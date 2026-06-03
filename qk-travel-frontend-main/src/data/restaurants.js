// Restaurant data for booking feature
export const restaurants = [
  {
    id: "1",
    name: "Nhà Hàng Hải Sản Biển Đông",
    slug: "hai-san-bien-dong",
    cuisine: "Hải sản",
    location: {
      city: "Đà Nẵng",
      address: "123 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng",
      coordinates: { lat: 16.0544, lng: 108.2442 },
    },
    rating: 4.7,
    reviewCount: 245,
    priceRange: "$$",
    averagePrice: 350000,
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7e1ca5b7c8?w=800",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800",
    ],
    description:
      "Nhà hàng hải sản cao cấp với view biển tuyệt đẹp, chuyên các món hải sản tươi sống được chế biến theo phong cách Việt Nam truyền thống và hiện đại. Không gian sang trọng, phục vụ tận tình, phù hợp cho gia đình và tiệc tùng.",
    features: [
      {
        icon: "fa-utensils",
        name: "Buffet hải sản",
        available: true,
      },
      {
        icon: "fa-water",
        name: "View biển",
        available: true,
      },
      {
        icon: "fa-wifi",
        name: "WiFi miễn phí",
        available: true,
      },
      {
        icon: "fa-parking",
        name: "Bãi đỗ xe",
        available: true,
      },
      {
        icon: "fa-snowflake",
        name: "Điều hòa",
        available: true,
      },
      {
        icon: "fa-music",
        name: "Nhạc sống",
        available: true,
      },
      {
        icon: "fa-glass-cheers",
        name: "Bar",
        available: true,
      },
      {
        icon: "fa-wheelchair",
        name: "Tiện nghi cho người khuyết tật",
        available: false,
      },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Món khai vị",
        dishes: [
          {
            id: "1",
            name: "Gỏi ngó sen tôm thịt",
            price: 120000,
            description: "Ngó sen giòn, tôm tươi, thịt ba chỉ",
            image:
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
          },
          {
            id: "2",
            name: "Salad hải sản",
            price: 150000,
            description: "Tôm, mực, cua với rau trộn",
            image:
              "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
          },
        ],
      },
      {
        id: "2",
        name: "Món chính",
        dishes: [
          {
            id: "3",
            name: "Tôm hùm nướng phô mai",
            price: 850000,
            description: "Tôm hùm tươi sống nướng với phô mai Úc",
            image:
              "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400",
            popular: true,
          },
          {
            id: "4",
            name: "Cua hoàng đế hấp",
            price: 1200000,
            description: "Cua hoàng đế Alaska hấp gừng",
            image:
              "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400",
          },
          {
            id: "5",
            name: "Cá song nướng muối ớt",
            price: 680000,
            description: "Cá song tươi nướng muối ớt Thái",
            image:
              "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
            popular: true,
          },
          {
            id: "6",
            name: "Nghêu hấp xả",
            price: 180000,
            description: "Nghêu tươi hấp sả, gừng",
            image:
              "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400",
          },
        ],
      },
      {
        id: "3",
        name: "Món tráng miệng",
        dishes: [
          {
            id: "7",
            name: "Chè dừa dầm",
            price: 45000,
            description: "Chè dừa dầm truyền thống",
            image:
              "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
          },
          {
            id: "8",
            name: "Kem dừa tươi",
            price: 55000,
            description: "Kem dừa tươi handmade",
            image:
              "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400",
          },
        ],
      },
    ],
    openingHours: {
      weekday: "10:00 - 22:00",
      weekend: "09:00 - 23:00",
    },
    reviews: [
      {
        id: "1",
        userName: "Nguyễn Minh Anh",
        userAvatar: "https://i.pravatar.cc/150?img=1",
        rating: 5,
        date: "2024-10-15",
        comment:
          "Nhà hàng tuyệt vời! Hải sản tươi ngon, không gian đẹp, view biển cực kỳ lãng mạn. Đặc biệt món tôm hùm nướng phô mai rất ngon. Nhân viên phục vụ nhiệt tình. Sẽ quay lại!",
        helpful: 24,
      },
      {
        id: "2",
        userName: "Trần Văn Hùng",
        userAvatar: "https://i.pravatar.cc/150?img=12",
        rating: 4,
        date: "2024-10-10",
        comment:
          "Đồ ăn ngon, giá hơi cao nhưng chất lượng xứng đáng. Cua hoàng đế tươi ngon. Bãi đỗ xe rộng rãi, tiện lợi.",
        helpful: 18,
      },
      {
        id: "3",
        userName: "Lê Thị Mai",
        userAvatar: "https://i.pravatar.cc/150?img=5",
        rating: 5,
        date: "2024-10-05",
        comment:
          "Đi ăn gia đình rất hài lòng. Món ăn đa dạng, phong phú. Nhạc sống buổi tối rất hay. Không gian thoáng mát.",
        helpful: 15,
      },
    ],
    policies: {
      reservation: "Nên đặt bàn trước từ 1-2 ngày",
      cancellation: "Hủy miễn phí trước 24 giờ",
      deposit: "Yêu cầu đặt cọc 30% cho nhóm từ 10 người",
      children: "Chào đón trẻ em, có ghế cao cho em bé",
      pets: "Không cho phép mang thú cưng",
    },
    contact: {
      phone: "0236 3999 888",
      email: "contact@haisanbienlong.vn",
      website: "haisanbienlong.vn",
    },
    hostInfo: {
      name: "Nguyễn Văn Hải",
      avatar: "https://i.pravatar.cc/150?img=33",
      verified: true,
      responseRate: "98%",
      responseTime: "Trong vòng 1 giờ",
    },
  },
  {
    id: "2",
    name: "Quán Ăn Phố Cổ Hà Nội",
    slug: "quan-an-pho-co-hanoi",
    cuisine: "Món Việt",
    location: {
      city: "Hà Nội",
      address: "45 Hàng Bạc, Hoàn Kiếm, Hà Nội",
      coordinates: { lat: 21.0285, lng: 105.8542 },
    },
    rating: 4.8,
    reviewCount: 312,
    priceRange: "$",
    averagePrice: 150000,
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7e1ca5b7c8?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
    ],
    description:
      "Quán ăn truyền thống giữa lòng phố cổ Hà Nội, chuyên các món ăn đặc sản Hà Thành như phở, bún chả, chả cá Lã Vọng. Không gian nhỏ nhắn, ấm cúng với phong cách cổ điển, mang đậm nét văn hóa Việt Nam.",
    features: [
      {
        icon: "fa-utensils",
        name: "Món ăn truyền thống",
        available: true,
      },
      {
        icon: "fa-home",
        name: "Không gian ấm cúng",
        available: true,
      },
      {
        icon: "fa-wifi",
        name: "WiFi miễn phí",
        available: true,
      },
      {
        icon: "fa-parking",
        name: "Bãi đỗ xe",
        available: false,
      },
      {
        icon: "fa-snowflake",
        name: "Điều hòa",
        available: true,
      },
      {
        icon: "fa-credit-card",
        name: "Thanh toán thẻ",
        available: true,
      },
      {
        icon: "fa-baby",
        name: "Thân thiện với trẻ em",
        available: true,
      },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Món ăn sáng",
        dishes: [
          {
            id: "1",
            name: "Phở bò Hà Nội",
            price: 65000,
            description: "Phở bò truyền thống với nước dùng hầm xương 12 tiếng",
            image:
              "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400",
            popular: true,
          },
          {
            id: "2",
            name: "Bún chả Hà Nội",
            price: 60000,
            description: "Bún chả nướng than hồng thơm phức",
            image:
              "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
            popular: true,
          },
        ],
      },
      {
        id: "2",
        name: "Món ăn chính",
        dishes: [
          {
            id: "3",
            name: "Chả cá Lã Vọng",
            price: 180000,
            description: "Chả cá truyền thống Hà Nội với mẻ và riềng",
            image:
              "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
          },
          {
            id: "4",
            name: "Bún đậu mắm tôm",
            price: 70000,
            description: "Bún đậu mắm tôm đặc sản Hà Thành",
            image:
              "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
          },
        ],
      },
    ],
    openingHours: {
      weekday: "06:00 - 22:00",
      weekend: "06:00 - 22:30",
    },
    reviews: [
      {
        id: "1",
        userName: "David Smith",
        userAvatar: "https://i.pravatar.cc/150?img=15",
        rating: 5,
        date: "2024-10-20",
        comment:
          "Authentic Vietnamese food in the heart of Old Quarter! The pho is amazing, best I've had in Hanoi. Very reasonable prices.",
        helpful: 32,
      },
      {
        id: "2",
        userName: "Phạm Thu Hà",
        userAvatar: "https://i.pravatar.cc/150?img=9",
        rating: 5,
        date: "2024-10-12",
        comment:
          "Quán ăn ngon, phục vụ nhanh, giá cả phải chăng. Phở bò và bún chả đều rất ngon, nước phở đậm đà.",
        helpful: 28,
      },
    ],
    policies: {
      reservation: "Nhận đặt bàn qua điện thoại",
      cancellation: "Hủy miễn phí trước 2 giờ",
      deposit: "Không yêu cầu đặt cọc",
      children: "Chào đón trẻ em",
      pets: "Không cho phép thú cưng",
    },
    contact: {
      phone: "024 3828 5555",
      email: "quananphoco@gmail.com",
      website: "quananphoco.vn",
    },
    hostInfo: {
      name: "Bà Nguyễn Thị Lan",
      avatar: "https://i.pravatar.cc/150?img=20",
      verified: true,
      responseRate: "100%",
      responseTime: "Trong vòng 30 phút",
    },
  },
  {
    id: "3",
    name: "BBQ Garden Sài Gòn",
    slug: "bbq-garden-saigon",
    cuisine: "BBQ & Nướng",
    location: {
      city: "TP. Hồ Chí Minh",
      address: "78 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      coordinates: { lat: 10.7769, lng: 106.7009 },
    },
    rating: 4.6,
    reviewCount: 189,
    priceRange: "$$",
    averagePrice: 400000,
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    ],
    description:
      "Nhà hàng BBQ buffet cao cấp với vườn xanh mát, chuyên các món nướng Hàn Quốc, Nhật Bản và Việt Nam. Menu buffet đa dạng với hơn 100 món, bao gồm thịt bò Mỹ, hải sản tươi sống và rau củ hữu cơ.",
    features: [
      {
        icon: "fa-fire",
        name: "BBQ Buffet",
        available: true,
      },
      {
        icon: "fa-tree",
        name: "Vườn ngoài trời",
        available: true,
      },
      {
        icon: "fa-wifi",
        name: "WiFi miễn phí",
        available: true,
      },
      {
        icon: "fa-parking",
        name: "Bãi đỗ xe",
        available: true,
      },
      {
        icon: "fa-snowflake",
        name: "Điều hòa",
        available: true,
      },
      {
        icon: "fa-users",
        name: "Phòng riêng",
        available: true,
      },
      {
        icon: "fa-birthday-cake",
        name: "Dịch vụ tiệc",
        available: true,
      },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Buffet Packages",
        dishes: [
          {
            id: "1",
            name: "Buffet Premium",
            price: 499000,
            description:
              "Buffet cao cấp với thịt bò Mỹ, hải sản tươi, và hơn 100 món",
            image:
              "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
            popular: true,
          },
          {
            id: "2",
            name: "Buffet Standard",
            price: 299000,
            description: "Buffet tiêu chuẩn với đa dạng món nướng và lẩu",
            image:
              "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
          },
        ],
      },
    ],
    openingHours: {
      weekday: "11:00 - 23:00",
      weekend: "10:00 - 23:30",
    },
    reviews: [
      {
        id: "1",
        userName: "Võ Hoàng Long",
        userAvatar: "https://i.pravatar.cc/150?img=13",
        rating: 5,
        date: "2024-10-18",
        comment:
          "Buffet BBQ tuyệt vời! Thịt bò Mỹ rất ngon, tươi. Không gian vườn rất đẹp và thoáng mát. Giá hơi cao nhưng đáng đồng tiền.",
        helpful: 21,
      },
      {
        id: "2",
        userName: "Kim Min Jung",
        userAvatar: "https://i.pravatar.cc/150?img=25",
        rating: 4,
        date: "2024-10-08",
        comment:
          "Good BBQ buffet with Korean style. Fresh ingredients and nice garden atmosphere. Staff is friendly.",
        helpful: 16,
      },
    ],
    policies: {
      reservation: "Đặt bàn trước từ 1 ngày",
      cancellation: "Hủy trước 24 giờ để được hoàn tiền",
      deposit: "Đặt cọc 50% cho buffet",
      children: "Trẻ em dưới 1m: miễn phí, 1m-1m3: giảm 50%",
      pets: "Không cho phép thú cưng",
    },
    contact: {
      phone: "028 3822 9999",
      email: "bbqgarden@saigon.vn",
      website: "bbqgarden.vn",
    },
    hostInfo: {
      name: "Park Ji Hoon",
      avatar: "https://i.pravatar.cc/150?img=30",
      verified: true,
      responseRate: "95%",
      responseTime: "Trong vòng 2 giờ",
    },
  },
  {
    id: "4",
    name: "Nhà Hàng Chay An Lạc",
    slug: "nha-hang-chay-an-lac",
    cuisine: "Chay",
    location: {
      city: "Đà Lạt",
      address: "25 Phan Đình Phùng, Phường 2, Đà Lạt, Lâm Đồng",
      coordinates: { lat: 11.9404, lng: 108.4583 },
    },
    rating: 4.9,
    reviewCount: 156,
    priceRange: "$",
    averagePrice: 120000,
    images: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800",
    ],
    description:
      "Nhà hàng chay thanh tịnh giữa lòng Đà Lạt, chuyên các món chay đặc sắc từ nguyên liệu hữu cơ. Không gian yên tĩnh, trang trí theo phong cách Zen, phù hợp cho người ăn chay và những ai muốn tìm sự bình yên.",
    features: [
      {
        icon: "fa-leaf",
        name: "100% Chay",
        available: true,
      },
      {
        icon: "fa-spa",
        name: "Không gian Zen",
        available: true,
      },
      {
        icon: "fa-seedling",
        name: "Nguyên liệu hữu cơ",
        available: true,
      },
      {
        icon: "fa-wifi",
        name: "WiFi miễn phí",
        available: true,
      },
      {
        icon: "fa-parking",
        name: "Bãi đỗ xe",
        available: true,
      },
      {
        icon: "fa-mountain",
        name: "View núi đồi",
        available: true,
      },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Món chính",
        dishes: [
          {
            id: "1",
            name: "Bún riêu chay",
            price: 55000,
            description: "Bún riêu chay với nước dùng đậu nành thơm ngon",
            image:
              "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
          },
          {
            id: "2",
            name: "Cơm niêu chay",
            price: 65000,
            description: "Cơm niêu chay với rau củ hữu cơ Đà Lạt",
            image:
              "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
            popular: true,
          },
          {
            id: "3",
            name: "Lẩu nấm chay",
            price: 280000,
            description: "Lẩu nấm các loại cho 2-3 người",
            image:
              "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
          },
        ],
      },
    ],
    openingHours: {
      weekday: "07:00 - 21:00",
      weekend: "07:00 - 21:00",
    },
    reviews: [
      {
        id: "1",
        userName: "Trần Thị Hương",
        userAvatar: "https://i.pravatar.cc/150?img=10",
        rating: 5,
        date: "2024-10-22",
        comment:
          "Nhà hàng chay tuyệt vời nhất Đà Lạt! Đồ ăn ngon, không gian yên tĩnh, view đẹp. Cơm niêu chay rất đáng thử!",
        helpful: 19,
      },
      {
        id: "2",
        userName: "Nguyễn Văn An",
        userAvatar: "https://i.pravatar.cc/150?img=11",
        rating: 5,
        date: "2024-10-15",
        comment:
          "Mình không ăn chay nhưng ghé vào đây và rất bất ngờ. Món ăn ngon, giá cả hợp lý, nhân viên thân thiện.",
        helpful: 14,
      },
    ],
    policies: {
      reservation: "Nhận đặt bàn qua điện thoại",
      cancellation: "Hủy miễn phí trước 1 giờ",
      deposit: "Không yêu cầu đặt cọc",
      children: "Chào đón trẻ em",
      pets: "Không cho phép thú cưng",
    },
    contact: {
      phone: "0263 3555 777",
      email: "nhahangchayanlac@gmail.com",
      website: "nhahangchayanlac.vn",
    },
    hostInfo: {
      name: "Thầy Minh Tuệ",
      avatar: "https://i.pravatar.cc/150?img=35",
      verified: true,
      responseRate: "100%",
      responseTime: "Trong vòng 30 phút",
    },
  },
  {
    id: "5",
    name: "Quán Cơm Bình Dân Sài Gòn",
    slug: "com-binh-dan-saigon",
    cuisine: "Món Việt",
    location: {
      city: "TP. Hồ Chí Minh",
      address: "89 Pasteur, Quận 1, TP. HCM",
      coordinates: { lat: 10.7797, lng: 106.6986 },
    },
    rating: 4.4,
    reviewCount: 523,
    priceRange: "$",
    averagePrice: 60000,
    images: [
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
    ],
    description:
      "Quán cơm bình dân giá rẻ phục vụ các món ăn Việt Nam truyền thống. Thực đơn đa dạng, giá cả phải chăng, phù hợp cho sinh viên và người lao động. Không gian đơn giản nhưng sạch sẽ.",
    features: [
      { icon: "fa-utensils", name: "Cơm tấm", available: true },
      { icon: "fa-bowl-rice", name: "Cơm phần", available: true },
      { icon: "fa-clock", name: "Phục vụ nhanh", available: true },
      { icon: "fa-money-bill-wave", name: "Giá rẻ", available: true },
      { icon: "fa-box", name: "Đóng gói mang đi", available: true },
      { icon: "fa-motorcycle", name: "Giao hàng", available: true },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Cơm phần",
        dishes: [
          {
            id: "1",
            name: "Cơm sườn bì chả",
            price: 45000,
            description: "Sườn nướng, bì, chả",
            image:
              "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400",
          },
          {
            id: "2",
            name: "Cơm gà xối mỡ",
            price: 50000,
            description: "Gà luộc xối mỡ hành",
            image:
              "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400",
          },
        ],
      },
    ],
    openingHours: "6:00 - 22:00 hàng ngày",
    reviews: [
      {
        id: 1,
        userName: "Nguyễn Minh",
        userAvatar: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        date: "2024-10-15",
        comment: "Cơm ngon, giá rẻ, phục vụ nhanh. Rất hợp túi tiền sinh viên!",
        helpful: 23,
      },
      {
        id: 2,
        userName: "Trần Thị Thu",
        userAvatar: "https://i.pravatar.cc/150?img=25",
        rating: 4,
        date: "2024-10-10",
        comment: "Quán sạch sẽ, món ăn đa dạng. Giờ cao điểm hơi đông.",
        helpful: 15,
      },
    ],
    policies: {
      reservation: "Không cần đặt bàn trước",
      cancellation: "Không áp dụng",
      deposit: "Không yêu cầu đặt cọc",
      children: "Chào đón trẻ em",
    },
    contact: {
      phone: "028 3824 5678",
      email: "combinhdansaigon@gmail.com",
    },
    hostInfo: {
      name: "Chị Loan",
      avatar: "https://i.pravatar.cc/150?img=40",
      verified: true,
      responseRate: "95%",
      responseTime: "Trong vòng 2 giờ",
    },
  },
  {
    id: "6",
    name: "Phở Gia Truyền Bát Đàn",
    slug: "pho-gia-truyen-bat-dan",
    cuisine: "Món Việt",
    location: {
      city: "Hà Nội",
      address: "49 Bát Đàn, Hoàn Kiếm, Hà Nội",
      coordinates: { lat: 21.0285, lng: 105.8542 },
    },
    rating: 4.7,
    reviewCount: 892,
    priceRange: "$",
    averagePrice: 70000,
    images: [
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800",
      "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800",
      "https://png.pngtree.com/thumb_back/fh260/background/20240328/pngtree-pho-bo-vietnamese-soup-with-pork-and-rice-noodles-image_15645564.jpg",
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
    ],
    description:
      "Quán phở gia truyền nổi tiếng Hà Nội với công thức nước dùng truyền thống. Thịt bò tươi ngon, bánh phở dai, nước dùng trong ngọt. Luôn đông khách từ sáng đến tối.",
    features: [
      { icon: "fa-utensils", name: "Phở bò truyền thống", available: true },
      { icon: "fa-history", name: "Hơn 50 năm", available: true },
      { icon: "fa-clock", name: "Mở cửa sớm", available: true },
      { icon: "fa-star", name: "Nổi tiếng", available: true },
      { icon: "fa-box", name: "Mang đi", available: true },
      { icon: "fa-parking", name: "Gửi xe gần", available: true },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Phở",
        dishes: [
          {
            id: "1",
            name: "Phở bò tái",
            price: 65000,
            description: "Phở với thịt bò tái",
            image:
              "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
          },
          {
            id: "2",
            name: "Phở bò chín",
            price: 70000,
            description: "Phở với thịt bò chín",
            image:
              "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400",
          },
          {
            id: "3",
            name: "Phở đặc biệt",
            price: 80000,
            description: "Phở đầy đủ các loại thịt",
            image:
              "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
          },
        ],
      },
    ],
    openingHours: "6:00 - 21:00 hàng ngày",
    reviews: [
      {
        id: 1,
        userName: "Lê Văn Hùng",
        userAvatar: "https://i.pravatar.cc/150?img=18",
        rating: 5,
        date: "2024-10-18",
        comment:
          "Phở ngon nhất Hà Nội! Nước dùng ngọt thanh, thịt bò tươi mềm.",
        helpful: 45,
      },
      {
        id: 2,
        userName: "Mai Phương",
        userAvatar: "https://i.pravatar.cc/150?img=28",
        rating: 5,
        date: "2024-10-12",
        comment:
          "Quán phở gia truyền 50 năm, chất lượng không bàn cãi. Sáng nào cũng đông!",
        helpful: 32,
      },
    ],
    policies: {
      reservation: "Không cần đặt bàn",
      cancellation: "Không áp dụng",
      deposit: "Không yêu cầu",
      children: "Chào đón gia đình có trẻ nhỏ",
    },
    contact: {
      phone: "024 3826 1234",
      email: "phobatdan@gmail.com",
    },
    hostInfo: {
      name: "Ông Tuấn",
      avatar: "https://i.pravatar.cc/150?img=62",
      verified: true,
      responseRate: "90%",
      responseTime: "Trong vòng 3 giờ",
    },
  },
  {
    id: "7",
    name: "Bún Chả Hương Liên",
    slug: "bun-cha-huong-lien",
    cuisine: "Món Việt",
    location: {
      city: "Hà Nội",
      address: "24 Lê Văn Hưu, Hai Bà Trưng, Hà Nội",
      coordinates: { lat: 21.0164, lng: 105.8486 },
    },
    rating: 4.6,
    reviewCount: 1245,
    priceRange: "$",
    averagePrice: 80000,
    images: [
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    ],
    description:
      "Quán bún chả nổi tiếng được Tổng thống Obama ghé thăm năm 2016. Bún chả thơm ngon với chả nướng than hoa, nước mắm chua ngọt đậm đà. Không gian bình dân, giá cả phải chăng.",
    features: [
      { icon: "fa-fire", name: "Nướng than hoa", available: true },
      { icon: "fa-star", name: "Obama set", available: true },
      { icon: "fa-utensils", name: "Bún chả Hà Nội", available: true },
      { icon: "fa-box", name: "Mang về", available: true },
      { icon: "fa-clock", name: "Phục vụ cả ngày", available: true },
      { icon: "fa-parking", name: "Gửi xe", available: true },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Món chính",
        dishes: [
          {
            id: "1",
            name: "Bún chả Hà Nội",
            price: 50000,
            description: "Bún chả truyền thống",
            image:
              "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
          },
          {
            id: "2",
            name: "Combo Obama",
            price: 80000,
            description: "Bún chả + chả giò + bia Hà Nội",
            image:
              "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400",
            popular: true,
          },
        ],
      },
    ],
    openingHours: "8:00 - 21:00 hàng ngày",
    reviews: [
      {
        id: 1,
        userName: "Barack Obama",
        userAvatar: "https://i.pravatar.cc/150?img=50",
        rating: 5,
        date: "2016-05-23",
        comment:
          "Great food! The bun cha was delicious. Very authentic Vietnamese cuisine.",
        helpful: 999,
      },
      {
        id: 2,
        userName: "Hoàng Anh",
        userAvatar: "https://i.pravatar.cc/150?img=22",
        rating: 5,
        date: "2024-10-20",
        comment:
          "Bún chả thơm ngon, chả nướng than hoa rất đặc biệt. Combo Obama là must-try!",
        helpful: 67,
      },
    ],
    policies: {
      reservation: "Không cần đặt bàn",
      cancellation: "Không áp dụng",
      deposit: "Không yêu cầu",
      children: "Thân thiện với gia đình",
    },
    contact: {
      phone: "024 3943 4106",
      email: "bunchahuonglien@gmail.com",
    },
    hostInfo: {
      name: "Bà Liên",
      avatar: "https://i.pravatar.cc/150?img=45",
      verified: true,
      responseRate: "85%",
      responseTime: "Trong vòng 4 giờ",
    },
  },
  {
    id: "8",
    name: "Nhà Hàng Lẩu Nướng Kichi Kichi",
    slug: "kichi-kichi-buffet",
    cuisine: "Lẩu",
    location: {
      city: "TP. Hồ Chí Minh",
      address: "19 Cao Thắng, Quận 3, TP. HCM",
      coordinates: { lat: 10.7753, lng: 106.6922 },
    },
    rating: 4.5,
    reviewCount: 678,
    priceRange: "$$",
    averagePrice: 250000,
    images: [
      "https://pasgo.vn/Upload/anh-chi-tiet/nha-hang-lau-nuong-khong-khoi-sai-gon-slide-8-normal-2186326736757.webp",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb29EroTfisxGSGY7uJcyEZz2TWdhh8eVjtHFFcC83wdNhzQdZnq04LLyicNAzlsg4zDo&usqp=CAU",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
    ],
    description:
      "Nhà hàng buffet lẩu và nướng với hơn 200 món ăn đa dạng. Nguyên liệu tươi sống, gia vị phong phú, không gian hiện đại. Giá buffet cố định, ăn thoải mái không giới hạn.",
    features: [
      { icon: "fa-infinity", name: "Buffet không giới hạn", available: true },
      { icon: "fa-fish", name: "Hải sản tươi sống", available: true },
      { icon: "fa-fire", name: "Lẩu & nướng", available: true },
      { icon: "fa-ice-cream", name: "Tráng miệng", available: true },
      { icon: "fa-snowflake", name: "Điều hòa", available: true },
      { icon: "fa-parking", name: "Bãi đỗ xe", available: true },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Buffet",
        dishes: [
          {
            id: "1",
            name: "Buffet Premium",
            price: 299000,
            description: "Buffet lẩu nướng cao cấp",
            image:
              "https://images.unsplash.com/photo-1541417904950-b855846fe074?w=400",
            popular: true,
          },
          {
            id: "2",
            name: "Buffet Standard",
            price: 249000,
            description: "Buffet lẩu nướng tiêu chuẩn",
            image:
              "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
          },
        ],
      },
    ],
    openingHours: "10:00 - 22:00 hàng ngày",
    reviews: [
      {
        id: 1,
        userName: "Phạm Thị Hương",
        userAvatar: "https://i.pravatar.cc/150?img=30",
        rating: 4,
        date: "2024-10-22",
        comment:
          "Buffet đa dạng, hải sản tươi. Phù hợp cho gia đình và nhóm bạn.",
        helpful: 28,
      },
      {
        id: 2,
        userName: "Đặng Minh Tuấn",
        userAvatar: "https://i.pravatar.cc/150?img=15",
        rating: 5,
        date: "2024-10-18",
        comment: "Giá buffet hợp lý, món ăn ngon, nhân viên phục vụ tốt.",
        helpful: 19,
      },
    ],
    policies: {
      reservation: "Nên đặt bàn trước vào cuối tuần",
      cancellation: "Hủy miễn phí trước 2 giờ",
      deposit: "Cọc 100k/người cho nhóm từ 8 người",
      children: "Trẻ em dưới 1m tính nửa giá",
    },
    contact: {
      phone: "028 3930 5555",
      email: "kichikichi@gmail.com",
      website: "kichikichi.com.vn",
    },
    hostInfo: {
      name: "Kichi Kichi Group",
      avatar: "https://i.pravatar.cc/150?img=63",
      verified: true,
      responseRate: "100%",
      responseTime: "Trong vòng 15 phút",
    },
  },
  {
    id: "9",
    name: "La Verticale Restaurant",
    slug: "la-verticale-restaurant",
    cuisine: "Món Âu",
    location: {
      city: "Hà Nội",
      address: "19 Ngô Văn Sở, Ba Đình, Hà Nội",
      coordinates: { lat: 21.0343, lng: 105.8325 },
    },
    rating: 4.9,
    reviewCount: 234,
    priceRange: "$$$",
    averagePrice: 850000,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    ],
    description:
      "Nhà hàng Fine Dining cao cấp phục vụ ẩm thực Pháp đương đại. Đầu bếp từng đạt sao Michelin, không gian sang trọng trong biệt thự Pháp cổ, wine cellar phong phú. Lý tưởng cho các dịp đặc biệt.",
    features: [
      { icon: "fa-wine-glass", name: "Wine cellar", available: true },
      { icon: "fa-star", name: "Đầu bếp Michelin", available: true },
      { icon: "fa-landmark", name: "Biệt thự Pháp", available: true },
      { icon: "fa-user-tie", name: "Dress code", available: true },
      { icon: "fa-concierge-bell", name: "Private dining", available: true },
      { icon: "fa-parking", name: "Valet parking", available: true },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Set Menu",
        dishes: [
          {
            id: "1",
            name: "Degustation Menu 5 courses",
            price: 1200000,
            description: "5 món signature của chef",
            image:
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
            popular: true,
          },
          {
            id: "2",
            name: "A la carte",
            price: 850000,
            description: "Gọi món theo menu",
            image:
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400",
          },
        ],
      },
    ],
    openingHours: "18:00 - 23:00 (Đóng cửa thứ 2)",
    reviews: [
      {
        id: 1,
        userName: "Catherine Martin",
        userAvatar: "https://i.pravatar.cc/150?img=47",
        rating: 5,
        date: "2024-10-25",
        comment:
          "Exceptional French cuisine in Hanoi! The degustation menu was outstanding.",
        helpful: 56,
      },
      {
        id: 2,
        userName: "Nguyễn Quốc Anh",
        userAvatar: "https://i.pravatar.cc/150?img=19",
        rating: 5,
        date: "2024-10-20",
        comment:
          "Nhà hàng Pháp đẳng cấp nhất Hà Nội. Không gian sang trọng, món ăn tinh tế.",
        helpful: 42,
      },
    ],
    policies: {
      reservation: "Bắt buộc đặt bàn trước ít nhất 3 ngày",
      cancellation: "Hủy miễn phí trước 48 giờ",
      deposit: "Yêu cầu cọc 50% giá trị bàn ăn",
      children: "Không khuyến khích trẻ em dưới 12 tuổi",
    },
    contact: {
      phone: "024 3944 6317",
      email: "info@laverticale.com",
      website: "verticale-hanoi.com",
    },
    hostInfo: {
      name: "Chef Didier Corlou",
      avatar: "https://i.pravatar.cc/150?img=64",
      verified: true,
      responseRate: "100%",
      responseTime: "Trong vòng 10 phút",
    },
  },
  {
    id: "10",
    name: "The Deck Saigon",
    slug: "the-deck-saigon",
    cuisine: "Món Âu",
    location: {
      city: "TP. Hồ Chí Minh",
      address: "38 Nguyễn U Dĩ, Thảo Điền, Quận 2, TP. HCM",
      coordinates: { lat: 10.8085, lng: 106.7359 },
    },
    rating: 4.8,
    reviewCount: 567,
    priceRange: "$$$",
    averagePrice: 750000,
    images: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    ],
    description:
      "Nhà hàng fine dining view sông Sài Gòn tuyệt đẹp, chuyên ẩm thực Địa Trung Hải và Châu Âu. Không gian lãng mạn với live music, phù hợp cho các buổi hẹn hò và kỷ niệm đặc biệt.",
    features: [
      { icon: "fa-water", name: "View sông", available: true },
      { icon: "fa-music", name: "Live music", available: true },
      { icon: "fa-wine-glass", name: "Wine bar", available: true },
      { icon: "fa-utensils", name: "Fine dining", available: true },
      { icon: "fa-cocktail", name: "Signature cocktails", available: true },
      { icon: "fa-parking", name: "Valet parking", available: true },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Main courses",
        dishes: [
          {
            id: "1",
            name: "Grilled Australian Beef",
            price: 890000,
            description: "Thịt bò Úc nướng",
            image:
              "https://images.unsplash.com/photo-1558030006-450675393462?w=400",
            popular: true,
          },
          {
            id: "2",
            name: "Mediterranean Seafood Platter",
            price: 950000,
            description: "Hải sản Địa Trung Hải",
            image:
              "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400",
          },
        ],
      },
    ],
    openingHours: "11:00 - 23:00 hàng ngày",
    reviews: [
      {
        id: 1,
        userName: "Jennifer Lee",
        userAvatar: "https://i.pravatar.cc/150?img=38",
        rating: 5,
        date: "2024-10-23",
        comment: "Amazing riverside dining! Live music and romantic ambiance.",
        helpful: 51,
      },
      {
        id: 2,
        userName: "Trần Văn Khánh",
        userAvatar: "https://i.pravatar.cc/150?img=14",
        rating: 5,
        date: "2024-10-19",
        comment:
          "View sông Sài Gòn tuyệt đẹp, món ăn ngon, phù hợp hẹn hò và kỷ niệm.",
        helpful: 38,
      },
    ],
    policies: {
      reservation: "Đề xuất đặt bàn trước 1-2 ngày",
      cancellation: "Hủy miễn phí trước 24 giờ",
      deposit: "Cọc 50% cho bàn từ 6 người trở lên",
      children: "Chào đón trẻ em",
    },
    contact: {
      phone: "028 3744 6632",
      email: "info@thedecksaigon.com",
      website: "thedecksaigon.com",
    },
    hostInfo: {
      name: "The Deck Management",
      avatar: "https://i.pravatar.cc/150?img=65",
      verified: true,
      responseRate: "100%",
      responseTime: "Trong vòng 20 phút",
    },
  },
  {
    id: "11",
    name: "Sushi Hokkaido Sachi",
    slug: "sushi-hokkaido-sachi",
    cuisine: "Món Nhật",
    location: {
      city: "Đà Nẵng",
      address: "Tầng 19, Vincom Center, 910A Ngô Quyền, Đà Nẵng",
      coordinates: { lat: 16.0544, lng: 108.2022 },
    },
    rating: 4.9,
    reviewCount: 189,
    priceRange: "$$$",
    averagePrice: 900000,
    images: [
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
      "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800",
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800",
    ],
    description:
      "Nhà hàng sushi Nhật Bản chính thống với chef người Nhật, nguyên liệu nhập khẩu trực tiếp từ chợ cá Tsukiji. Omakase experience cao cấp, không gian zen đẹp, view biển tuyệt vời.",
    features: [
      { icon: "fa-fish", name: "Cá tươi Nhật Bản", available: true },
      { icon: "fa-user-chef", name: "Chef Nhật", available: true },
      { icon: "fa-water", name: "View biển", available: true },
      { icon: "fa-utensils", name: "Omakase", available: true },
      { icon: "fa-wine-glass", name: "Sake premium", available: true },
      { icon: "fa-snowflake", name: "Phòng riêng", available: true },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Omakase",
        dishes: [
          {
            id: "1",
            name: "Omakase Premium 12 pieces",
            price: 1500000,
            description: "12 miếng sushi do chef chọn",
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
            popular: true,
          },
          {
            id: "2",
            name: "Sashimi Deluxe",
            price: 950000,
            description: "Sashimi cao cấp",
            image:
              "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400",
          },
        ],
      },
    ],
    openingHours: "11:30 - 14:00, 17:30 - 22:00 (Đóng cửa thứ 2)",
    reviews: [
      {
        id: 1,
        userName: "Yamamoto Kenji",
        userAvatar: "https://i.pravatar.cc/150?img=52",
        rating: 5,
        date: "2024-10-26",
        comment: "本格的な日本料理！新鮮な魚と素晴らしいサービス。",
        helpful: 34,
      },
      {
        id: 2,
        userName: "Lê Minh Châu",
        userAvatar: "https://i.pravatar.cc/150?img=27",
        rating: 5,
        date: "2024-10-21",
        comment: "Sushi tươi ngon nhất Đà Nẵng! Omakase experience đỉnh cao.",
        helpful: 29,
      },
    ],
    policies: {
      reservation: "Bắt buộc đặt bàn trước",
      cancellation: "Hủy miễn phí trước 24 giờ",
      deposit: "Cọc 30% giá trị đơn hàng",
      children: "Phù hợp cho trẻ em từ 10 tuổi trở lên",
    },
    contact: {
      phone: "0236 3888 999",
      email: "sachi@sushihokkaido.vn",
      website: "sushihokkaido.vn",
    },
    hostInfo: {
      name: "Chef Tanaka",
      avatar: "https://i.pravatar.cc/150?img=68",
      verified: true,
      responseRate: "100%",
      responseTime: "Trong vòng 15 phút",
    },
  },
  {
    id: "12",
    name: "EON51 Fine Dining",
    slug: "eon51-fine-dining",
    cuisine: "Fusion",
    location: {
      city: "TP. Hồ Chí Minh",
      address: "Tầng 51, Bitexco Tower, 2 Hải Triều, Quận 1, TP. HCM",
      coordinates: { lat: 10.7718, lng: 106.7042 },
    },
    rating: 4.9,
    reviewCount: 423,
    priceRange: "$$$$",
    averagePrice: 1800000,
    images: [
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80",
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&q=80",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80",
    ],
    description:
      "Nhà hàng fine dining trên tầng 51 tòa Bitexco với view 360 độ Sài Gòn. Ẩm thực fusion sáng tạo kết hợp Âu - Á, wine pairing cao cấp, không gian sang trọng bậc nhất. Cần đặt bàn trước.",
    features: [
      { icon: "fa-building", name: "Tầng 51", available: true },
      { icon: "fa-city", name: "View 360°", available: true },
      { icon: "fa-wine-glass", name: "Wine cellar 500+", available: true },
      { icon: "fa-star", name: "Fine dining", available: true },
      { icon: "fa-user-tie", name: "Dress code nghiêm", available: true },
      {
        icon: "fa-concierge-bell",
        name: "Personal sommelier",
        available: true,
      },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Degustation",
        dishes: [
          {
            id: "1",
            name: "Signature Degustation 8 courses",
            price: 2500000,
            description: "8 món signature + wine pairing",
            image:
              "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400",
            popular: true,
          },
          {
            id: "2",
            name: "Chef's Selection 6 courses",
            price: 1800000,
            description: "6 món của chef",
            image:
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400",
          },
        ],
      },
    ],
    openingHours: "18:00 - 23:00 (Đóng cửa Chủ nhật)",
    reviews: [
      {
        id: 1,
        userName: "Michael Chen",
        userAvatar: "https://i.pravatar.cc/150?img=55",
        rating: 5,
        date: "2024-10-27",
        comment:
          "Best fine dining in Saigon! Panoramic city views from 51st floor.",
        helpful: 67,
      },
      {
        id: 2,
        userName: "Phạm Thị Lan",
        userAvatar: "https://i.pravatar.cc/150?img=31",
        rating: 5,
        date: "2024-10-24",
        comment:
          "Trải nghiệm ẩm thực đỉnh cao với view 360 độ tuyệt vời. Đắt nhưng xứng đáng!",
        helpful: 53,
      },
    ],
    policies: {
      reservation: "Bắt buộc đặt bàn trước tối thiểu 5 ngày",
      cancellation: "Hủy miễn phí trước 72 giờ",
      deposit: "Yêu cầu cọc 100% giá trị bàn ăn",
      children: "Chỉ dành cho khách từ 16 tuổi trở lên",
    },
    contact: {
      phone: "028 3915 6156",
      email: "reservation@eon51.com",
      website: "eon51.com",
    },
    hostInfo: {
      name: "EON51 Management",
      avatar: "https://i.pravatar.cc/150?img=70",
      verified: true,
      responseRate: "100%",
      responseTime: "Trong vòng 10 phút",
    },
  },
  {
    id: "13",
    name: "Salt Restaurant & Bar",
    slug: "salt-restaurant-bar",
    cuisine: "Món Âu",
    location: {
      city: "Nha Trang",
      address: "Tầng 42, Havana Nha Trang, 38 Trần Phú, Nha Trang",
      coordinates: { lat: 12.2485, lng: 109.1914 },
    },
    rating: 4.8,
    reviewCount: 312,
    priceRange: "$$$$",
    averagePrice: 1500000,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    ],
    description:
      "Rooftop restaurant cao nhất Nha Trang với view biển 360 độ tuyệt đẹp. Chuyên ẩm thực Âu đương đại, hải sản cao cấp, bar cocktails sáng tạo. Lý tưởng cho sunset dinner và các dịp đặc biệt.",
    features: [
      { icon: "fa-building", name: "Rooftop cao nhất", available: true },
      { icon: "fa-water", name: "View biển 360°", available: true },
      { icon: "fa-cocktail", name: "Signature cocktails", available: true },
      { icon: "fa-music", name: "Live DJ", available: true },
      { icon: "fa-utensils", name: "Fine dining", available: true },
      { icon: "fa-parking", name: "Valet parking", available: true },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Premium Selection",
        dishes: [
          {
            id: "1",
            name: "Wagyu Beef Tenderloin",
            price: 2200000,
            description: "Thăn bò Wagyu A5",
            image:
              "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
            popular: true,
          },
          {
            id: "2",
            name: "Lobster Thermidor",
            price: 1800000,
            description: "Tôm hùm nướng phô mai",
            image:
              "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400",
          },
        ],
      },
    ],
    openingHours: "17:00 - 01:00 hàng ngày",
    reviews: [
      {
        id: 1,
        userName: "David Brown",
        userAvatar: "https://i.pravatar.cc/150?img=58",
        rating: 5,
        date: "2024-10-28",
        comment:
          "Spectacular rooftop dining with 360° ocean views. Perfect for sunset!",
        helpful: 48,
      },
      {
        id: 2,
        userName: "Võ Thị Mai",
        userAvatar: "https://i.pravatar.cc/150?img=33",
        rating: 5,
        date: "2024-10-25",
        comment:
          "Rooftop cao nhất Nha Trang, view biển tuyệt đẹp. Wagyu beef tuyệt vời!",
        helpful: 41,
      },
    ],
    policies: {
      reservation: "Đề xuất đặt bàn trước 2-3 ngày",
      cancellation: "Hủy miễn phí trước 48 giờ",
      deposit: "Cọc 50% cho nhóm từ 6 người",
      children: "Phù hợp cho trẻ em trên 12 tuổi",
    },
    contact: {
      phone: "0258 3525 252",
      email: "salt@havananhatrang.com",
      website: "saltrestaurant.vn",
    },
    hostInfo: {
      name: "Havana Group",
      avatar: "https://i.pravatar.cc/150?img=72",
      verified: true,
      responseRate: "100%",
      responseTime: "Trong vòng 20 phút",
    },
  },
  {
    id: "14",
    name: "La Maison 1888",
    slug: "la-maison-1888",
    cuisine: "Món Âu",
    location: {
      city: "Đà Nẵng",
      address: "InterContinental Danang, Bãi Bắc, Sơn Trà, Đà Nẵng",
      coordinates: { lat: 16.0627, lng: 108.2492 },
    },
    rating: 5.0,
    reviewCount: 156,
    priceRange: "$$$$",
    averagePrice: 2500000,
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    ],
    description:
      "Nhà hàng 3 sao Michelin duy nhất tại Việt Nam do Chef Pierre Gagnaire điều hành. Ẩm thực Pháp haute cuisine trong không gian resort 5 sao, wine cellar hàng nghìn chai. Trải nghiệm ẩm thực đỉnh cao.",
    features: [
      { icon: "fa-star", name: "3 sao Michelin", available: true },
      { icon: "fa-user-chef", name: "Chef Pierre Gagnaire", available: true },
      { icon: "fa-wine-glass", name: "Wine cellar 5000+", available: true },
      { icon: "fa-water", name: "View biển riêng", available: true },
      { icon: "fa-concierge-bell", name: "Butler service", available: true },
      { icon: "fa-parking", name: "Valet parking", available: true },
    ],
    menuCategories: [
      {
        id: "1",
        name: "Haute Cuisine",
        dishes: [
          {
            id: "1",
            name: "Menu Dégustation 10 courses",
            price: 4500000,
            description: "10 món haute cuisine + wine pairing",
            image:
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400",
            popular: true,
          },
          {
            id: "2",
            name: "Menu Prestige 7 courses",
            price: 2800000,
            description: "7 món signature",
            image:
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
          },
        ],
      },
    ],
    openingHours: "18:30 - 22:30 (Thứ 3 - Chủ nhật, đóng cửa thứ 2)",
    reviews: [
      {
        id: 1,
        userName: "Sophie Laurent",
        userAvatar: "https://i.pravatar.cc/150?img=42",
        rating: 5,
        date: "2024-10-29",
        comment:
          "Authentique cuisine française! Chef Pierre Gagnaire est un génie. Meilleur restaurant au Vietnam!",
        helpful: 89,
      },
      {
        id: 2,
        userName: "Nguyễn Đức Minh",
        userAvatar: "https://i.pravatar.cc/150?img=20",
        rating: 5,
        date: "2024-10-26",
        comment:
          "Nhà hàng Michelin 3 sao duy nhất VN. Trải nghiệm haute cuisine đẳng cấp thế giới!",
        helpful: 76,
      },
    ],
    policies: {
      reservation: "Bắt buộc đặt bàn trước tối thiểu 1 tuần",
      cancellation: "Hủy miễn phí trước 1 tuần, sau đó phí 100%",
      deposit: "Yêu cầu thanh toán trước 100%",
      children: "Chỉ phục vụ khách từ 18 tuổi trở lên",
    },
    contact: {
      phone: "0236 3938 888",
      email: "lamaison1888@ihg.com",
      website: "lamaison1888.com",
    },
    hostInfo: {
      name: "Chef Pierre Gagnaire",
      avatar: "https://i.pravatar.cc/150?img=75",
      verified: true,
      responseRate: "100%",
      responseTime: "Trong vòng 5 phút",
    },
  },
  // Hội An Restaurants
  {
    id: "15",
    name: "Morning Glory Restaurant",
    slug: "morning-glory-hoian",
    cuisine: "Món Việt",
    location: {
      city: "Hội An",
      address: "106 Nguyễn Thái Học, Phố Cổ Hội An",
      coordinates: { lat: 15.8801, lng: 108.338 },
    },
    rating: 4.7,
    reviewCount: 892,
    priceRange: "80,000 - 200,000",
    averagePrice: 140000,
    images: [
      "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
      "https://img.freepik.com/free-photo/restaurant-with-green-wall-wooden-table-with-row-tables-planter-with-plant-background_188544-37710.jpg?semt=ais_hybrid&w=740&q=80",
    ],
    description:
      "Nhà hàng nổi tiếng tại phố cổ Hội An, chuyên các món ăn truyền thống Việt Nam và đặc sản Hội An. Không gian ấm cúng, menu đa dạng.",
    features: [
      { icon: "fa-utensils", text: "Đặc sản Hội An" },
      { icon: "fa-home", text: "Phố cổ" },
      { icon: "fa-wifi", text: "WiFi miễn phí" },
      { icon: "fa-language", text: "Menu đa ngôn ngữ" },
    ],
    openingHours: {
      monday: "07:00 - 22:00",
      tuesday: "07:00 - 22:00",
      wednesday: "07:00 - 22:00",
      thursday: "07:00 - 22:00",
      friday: "07:00 - 22:00",
      saturday: "07:00 - 22:00",
      sunday: "07:00 - 22:00",
    },
    menuCategories: [
      {
        id: "1",
        name: "Đặc sản Hội An",
        dishes: [
          {
            id: "1",
            name: "Cao Lầu",
            price: 60000,
            description: "Món mì đặc trưng Hội An",
            image:
              "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
          },
          {
            id: "2",
            name: "Bánh Bao Bánh Vạc",
            price: 50000,
            description: "Há cảo Hội An",
            image:
              "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400",
          },
          {
            id: "3",
            name: "Mì Quảng",
            price: 55000,
            description: "Mì Quảng truyền thống",
            image:
              "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Sarah Johnson",
        userAvatar: "https://i.pravatar.cc/150?img=45",
        rating: 5,
        date: "2024-11-01",
        comment:
          "Best Cao Lau in Hoi An! Authentic flavors and great atmosphere.",
        helpful: 67,
      },
    ],
    policies: {
      reservation: "Không bắt buộc, khuyến khích đặt trước giờ cao điểm",
      cancellation: "Linh hoạt",
      children: "Thân thiện với gia đình",
    },
    contact: {
      phone: "0235 2241 555",
      email: "info@morninggloryhoian.com",
      website: "morninggloryhoian.com",
    },
    hostInfo: {
      name: "Ms. Trinh Diem Vy",
      avatar: "https://i.pravatar.cc/150?img=33",
      verified: true,
      responseRate: "98%",
      responseTime: "Trong vòng 1 giờ",
    },
  },
  {
    id: "16",
    name: "Bánh Mì Phượng",
    slug: "banh-mi-phuong-hoian",
    cuisine: "Món Việt",
    location: {
      city: "Hội An",
      address: "2B Phan Châu Trinh, Phố Cổ Hội An",
      coordinates: { lat: 15.8794, lng: 108.327 },
    },
    rating: 4.6,
    reviewCount: 1523,
    priceRange: "20,000 - 50,000",
    averagePrice: 35000,
    images: [
      "https://cdnmedia.baotintuc.vn/Upload/XmrgEWAN1PzjhSWqVO54A/files/2020/03/2303/2403-banhmi.jpg",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
      "https://amaviehouse.vn/wp-content/uploads/2022/12/banh-mi-viet-cua-toi.jpg",
      "https://media.phunutoday.vn/files/content/2020/02/26/nuoc-sot-banh-mi-kep-thit-1446.jpg",
    ],
    description:
      "Tiệm bánh mì nổi tiếng được Anthony Bourdain ca ngợi. Bánh mì giòn rụm, nhân đầy đặn với giá bình dân.",
    features: [
      { icon: "fa-utensils", text: "Bánh mì nổi tiếng" },
      { icon: "fa-dollar-sign", text: "Giá rẻ" },
      { icon: "fa-map-marker-alt", text: "Gần phố cổ" },
    ],
    openingHours: {
      monday: "06:30 - 21:30",
      tuesday: "06:30 - 21:30",
      wednesday: "06:30 - 21:30",
      thursday: "06:30 - 21:30",
      friday: "06:30 - 21:30",
      saturday: "06:30 - 21:30",
      sunday: "06:30 - 21:30",
    },
    menuCategories: [
      {
        id: "1",
        name: "Bánh mì",
        dishes: [
          {
            id: "1",
            name: "Bánh Mì Thập Cẩm",
            price: 25000,
            description: "Nhân đầy đủ",
            image:
              "https://images.unsplash.com/photo-1558855370-89eec3e80b29?w=400",
          },
          {
            id: "2",
            name: "Bánh Mì Pate",
            price: 20000,
            description: "Pate tự làm",
            image:
              "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Michael Chen",
        userAvatar: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        date: "2024-10-30",
        comment: "Anthony Bourdain was right! Best banh mi ever!",
        helpful: 234,
      },
    ],
    policies: {
      reservation: "Không nhận đặt bàn",
      cancellation: "N/A",
      children: "Phù hợp mọi lứa tuổi",
    },
    contact: {
      phone: "0235 3846 007",
      email: "",
      website: "",
    },
    hostInfo: {
      name: "Bà Phượng",
      avatar: "https://i.pravatar.cc/150?img=48",
      verified: true,
      responseRate: "85%",
      responseTime: "Không cố định",
    },
  },
  {
    id: "17",
    name: "Nu Eatery",
    slug: "nu-eatery-hoian",
    cuisine: "Món Việt",
    location: {
      city: "Hội An",
      address: "10 Nguyễn Thị Minh Khai, Hội An",
      coordinates: { lat: 15.8785, lng: 108.3291 },
    },
    rating: 4.8,
    reviewCount: 456,
    priceRange: "200,000 - 500,000",
    averagePrice: 350000,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    ],
    description:
      "Nhà hàng hiện đại phục vụ ẩm thực Việt Nam đương đại với nguyên liệu organic. Không gian sang trọng, menu sáng tạo.",
    features: [
      { icon: "fa-leaf", text: "Organic" },
      { icon: "fa-award", text: "Fine dining" },
      { icon: "fa-wine-glass", text: "Wine pairing" },
      { icon: "fa-wifi", text: "WiFi" },
    ],
    openingHours: {
      monday: "11:00 - 22:00",
      tuesday: "Đóng cửa",
      wednesday: "11:00 - 22:00",
      thursday: "11:00 - 22:00",
      friday: "11:00 - 22:00",
      saturday: "11:00 - 22:00",
      sunday: "11:00 - 22:00",
    },
    menuCategories: [
      {
        name: "Signature dishes",
        items: [
          {
            name: "Tôm Hùm Nướng",
            price: "850k",
            description: "Hùm tươi nướng bơ tỏi",
          },
          {
            name: "Bò Úc Wagyu",
            price: "950k",
            description: "Wagyu A5 imported",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Emma Watson",
        userAvatar: "https://i.pravatar.cc/150?img=23",
        rating: 5,
        date: "2024-10-28",
        comment:
          "Modern Vietnamese cuisine at its finest! Beautiful presentation.",
        helpful: 89,
      },
    ],
    policies: {
      reservation: "Khuyến khích đặt trước",
      cancellation: "Hủy miễn phí trước 24h",
      children: "Phù hợp từ 10 tuổi",
    },
    contact: {
      phone: "0235 3927 555",
      email: "info@nueatery.com",
      website: "nueatery.com",
    },
    hostInfo: {
      name: "Chef Thanh Nguyen",
      avatar: "https://i.pravatar.cc/150?img=52",
      verified: true,
      responseRate: "100%",
      responseTime: "Trong vòng 30 phút",
    },
  },
  // Phú Quốc Restaurants
  {
    id: "18",
    name: "Nhà Hàng Hải Sản Phú Quốc",
    slug: "hai-san-phu-quoc",
    cuisine: "Hải sản",
    location: {
      city: "Phú Quốc",
      address: "Bãi Trường, Phú Quốc",
      coordinates: { lat: 10.2208, lng: 103.9678 },
    },
    rating: 4.5,
    reviewCount: 678,
    priceRange: "150,000 - 400,000",
    averagePrice: 275000,
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800",
    ],
    description:
      "Nhà hàng hải sản tươi sống ngay bãi biển Bãi Trường. Hải sản được đánh bắt hàng ngày, chế biến theo yêu cầu.",
    features: [
      { icon: "fa-fish", text: "Hải sản tươi sống" },
      { icon: "fa-umbrella-beach", text: "View biển" },
      { icon: "fa-parking", text: "Bãi đỗ xe" },
      { icon: "fa-wifi", text: "WiFi" },
    ],
    openingHours: {
      monday: "10:00 - 22:00",
      tuesday: "10:00 - 22:00",
      wednesday: "10:00 - 22:00",
      thursday: "10:00 - 22:00",
      friday: "10:00 - 22:00",
      saturday: "10:00 - 22:00",
      sunday: "10:00 - 22:00",
    },
    menuCategories: [
      {
        name: "Hải sản",
        items: [
          {
            name: "Ghẹ Hấp Bia",
            price: "350k/kg",
            description: "Ghẹ tươi hấp bia gừng",
          },
          {
            name: "Tôm Hùm Nướng Pho Mai",
            price: "850k/kg",
            description: "Hùm tươi nướng",
          },
          {
            name: "Cá Mú Hấp",
            price: "450k/kg",
            description: "Cá mú tươi hấp Hồng Kông",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Nguyễn Văn Hải",
        userAvatar: "https://i.pravatar.cc/150?img=15",
        rating: 5,
        date: "2024-10-29",
        comment: "Hải sản tươi ngon, view biển đẹp. Giá hợp lý!",
        helpful: 45,
      },
    ],
    policies: {
      reservation: "Nhận đặt bàn trước",
      cancellation: "Linh hoạt",
      children: "Thân thiện gia đình",
    },
    contact: {
      phone: "0297 3999 888",
      email: "info@haisanphuquoc.vn",
      website: "",
    },
    hostInfo: {
      name: "Anh Tuấn",
      avatar: "https://i.pravatar.cc/150?img=61",
      verified: true,
      responseRate: "95%",
      responseTime: "Trong vòng 2 giờ",
    },
  },
  {
    id: "19",
    name: "Quán Ăn Phú Quốc",
    slug: "quan-an-phu-quoc",
    cuisine: "Món Việt",
    location: {
      city: "Phú Quốc",
      address: "30 Tháng 4, Dương Đông, Phú Quốc",
      coordinates: { lat: 10.2272, lng: 103.9707 },
    },
    rating: 4.4,
    reviewCount: 234,
    priceRange: "50,000 - 150,000",
    averagePrice: 100000,
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    ],
    description:
      "Quán ăn bình dân phục vụ các món đặc sản Phú Quốc với giá phải chăng. Không gian đơn giản, hương vị đậm đà.",
    features: [
      { icon: "fa-utensils", text: "Đặc sản địa phương" },
      { icon: "fa-dollar-sign", text: "Giá bình dân" },
      { icon: "fa-users", text: "Đông khách" },
    ],
    openingHours: {
      monday: "07:00 - 21:00",
      tuesday: "07:00 - 21:00",
      wednesday: "07:00 - 21:00",
      thursday: "07:00 - 21:00",
      friday: "07:00 - 21:00",
      saturday: "07:00 - 21:00",
      sunday: "07:00 - 21:00",
    },
    menuCategories: [
      {
        name: "Đặc sản",
        items: [
          {
            name: "Bánh Canh Ghẹ",
            price: "50k",
            description: "Bánh canh ghẹ đặc sản",
          },
          {
            name: "Gỏi Cá Trích",
            price: "80k",
            description: "Đặc sản Phú Quốc",
          },
          {
            name: "Bún Kèn",
            price: "45k",
            description: "Bún kèn truyền thống",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Trần Thị Mai",
        userAvatar: "https://i.pravatar.cc/150?img=28",
        rating: 4,
        date: "2024-10-27",
        comment: "Món ăn ngon, giá rẻ. Phù hợp với du khách tiết kiệm.",
        helpful: 23,
      },
    ],
    policies: {
      reservation: "Không nhận đặt bàn",
      cancellation: "N/A",
      children: "Phù hợp mọi lứa tuổi",
    },
    contact: {
      phone: "0297 3888 777",
      email: "",
      website: "",
    },
    hostInfo: {
      name: "Chị Lan",
      avatar: "https://i.pravatar.cc/150?img=38",
      verified: true,
      responseRate: "80%",
      responseTime: "Không cố định",
    },
  },
  {
    id: "20",
    name: "The Spice House at Cassia Cottage",
    slug: "spice-house-phu-quoc",
    cuisine: "Món Á",
    location: {
      city: "Phú Quốc",
      address: "Mũi Ông Đội, Phú Quốc",
      coordinates: { lat: 10.1653, lng: 103.9985 },
    },
    rating: 4.9,
    reviewCount: 342,
    priceRange: "400,000 - 900,000",
    averagePrice: 650000,
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    ],
    description:
      "Nhà hàng cao cấp trong khu resort Cassia Cottage, phục vụ ẩm thực Á - Âu fusion với view biển tuyệt đẹp.",
    features: [
      { icon: "fa-award", text: "Fine dining" },
      { icon: "fa-umbrella-beach", text: "Beach view" },
      { icon: "fa-wine-glass", text: "Wine selection" },
      { icon: "fa-wifi", text: "WiFi" },
    ],
    openingHours: {
      monday: "11:00 - 23:00",
      tuesday: "11:00 - 23:00",
      wednesday: "11:00 - 23:00",
      thursday: "11:00 - 23:00",
      friday: "11:00 - 23:00",
      saturday: "11:00 - 23:00",
      sunday: "11:00 - 23:00",
    },
    menuCategories: [
      {
        name: "Signature",
        items: [
          {
            name: "Lobster Thermidor",
            price: "1,200k",
            description: "French style lobster",
          },
          { name: "Wagyu Beef", price: "1,500k", description: "A5 Wagyu 200g" },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "James Anderson",
        userAvatar: "https://i.pravatar.cc/150?img=71",
        rating: 5,
        date: "2024-10-25",
        comment:
          "Exceptional food and stunning sunset views. Worth every penny!",
        helpful: 67,
      },
    ],
    policies: {
      reservation: "Bắt buộc đặt trước",
      cancellation: "Hủy miễn phí trước 48h",
      deposit: "Cọc 50%",
      children: "Phù hợp từ 12 tuổi",
    },
    contact: {
      phone: "0297 6268 999",
      email: "dining@cassiacottage.com",
      website: "cassiacottage.com",
    },
    hostInfo: {
      name: "Chef David Lee",
      avatar: "https://i.pravatar.cc/150?img=69",
      verified: true,
      responseRate: "100%",
      responseTime: "Trong vòng 15 phút",
    },
  },
  // Sa Pa Restaurants
  {
    id: "21",
    name: "Nhà Hàng H'Mông",
    slug: "hmong-restaurant-sapa",
    cuisine: "Món Việt",
    location: {
      city: "Sa Pa",
      address: "Fansipan Plaza, Sa Pa",
      coordinates: { lat: 22.3364, lng: 103.8438 },
    },
    rating: 4.6,
    reviewCount: 456,
    priceRange: "80,000 - 200,000",
    averagePrice: 140000,
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
    description:
      "Nhà hàng chuyên món ăn dân tộc H'Mông và đặc sản vùng cao Sa Pa. Không gian truyền thống, ấm cúng.",
    features: [
      { icon: "fa-utensils", text: "Đặc sản Sa Pa" },
      { icon: "fa-fire", text: "Lẩu cá hồi" },
      { icon: "fa-mug-hot", text: "Rượu ngô" },
      { icon: "fa-wifi", text: "WiFi" },
    ],
    openingHours: {
      monday: "08:00 - 22:00",
      tuesday: "08:00 - 22:00",
      wednesday: "08:00 - 22:00",
      thursday: "08:00 - 22:00",
      friday: "08:00 - 22:00",
      saturday: "08:00 - 22:00",
      sunday: "08:00 - 22:00",
    },
    menuCategories: [
      {
        name: "Đặc sản",
        items: [
          {
            name: "Lẩu Cá Hồi",
            price: "280k",
            description: "Cá hồi Sa Pa tươi",
          },
          {
            name: "Thịt Trâu Gác Bếp",
            price: "180k",
            description: "Đặc sản H'Mông",
          },
          {
            name: "Thịt Lợn Cắp Nách",
            price: "150k",
            description: "Món truyền thống",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Phạm Minh Tuấn",
        userAvatar: "https://i.pravatar.cc/150?img=32",
        rating: 5,
        date: "2024-10-30",
        comment: "Lẩu cá hồi tuyệt vời! Thịt trâu gác bếp rất đặc biệt.",
        helpful: 56,
      },
    ],
    policies: {
      reservation: "Nhận đặt bàn",
      cancellation: "Linh hoạt",
      children: "Thân thiện gia đình",
    },
    contact: {
      phone: "0214 3871 234",
      email: "hmongrestaurant@gmail.com",
      website: "",
    },
    hostInfo: {
      name: "Anh Sơn",
      avatar: "https://i.pravatar.cc/150?img=54",
      verified: true,
      responseRate: "92%",
      responseTime: "Trong vòng 1 giờ",
    },
  },
  // Hạ Long Restaurants
  {
    id: "22",
    name: "Nhà Hàng Hải Sản Hạ Long",
    slug: "hai-san-ha-long",
    cuisine: "Hải sản",
    location: {
      city: "Hạ Long",
      address: "Bãi Cháy, TP. Hạ Long, Quảng Ninh",
      coordinates: { lat: 20.9517, lng: 107.0439 },
    },
    rating: 4.6,
    reviewCount: 892,
    priceRange: "150,000 - 400,000",
    averagePrice: 275000,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7IUWBD7g12U_eBr17io6QpUPvZ1tDmdTruiJy3yVPTJK2uUo5-vf32oMw2z2GdDE6QI&usqp=CAU",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000",
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    ],
    description:
      "Nhà hàng hải sản tươi sống với view Vịnh Hạ Long tuyệt đẹp. Chuyên các món hải sản đặc sản vùng biển Quảng Ninh.",
    features: [
      { icon: "fa-fish", text: "Hải sản tươi sống" },
      { icon: "fa-umbrella-beach", text: "View vịnh" },
      { icon: "fa-parking", text: "Bãi đỗ xe" },
      { icon: "fa-wifi", text: "WiFi" },
    ],
    openingHours: {
      monday: "10:00 - 22:00",
      tuesday: "10:00 - 22:00",
      wednesday: "10:00 - 22:00",
      thursday: "10:00 - 22:00",
      friday: "10:00 - 22:00",
      saturday: "10:00 - 22:00",
      sunday: "10:00 - 22:00",
    },
    menuCategories: [
      {
        name: "Hải sản",
        items: [
          {
            name: "Cua Hương Hấp",
            price: "400k/kg",
            description: "Cua hương Hạ Long",
          },
          {
            name: "Sò Huyết Nướng",
            price: "120k",
            description: "Sò tươi nướng mỡ hành",
          },
          {
            name: "Mực Hấp Gừng",
            price: "250k/kg",
            description: "Mực tươi Hạ Long",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Trần Văn Hải",
        userAvatar: "https://i.pravatar.cc/150?img=15",
        rating: 5,
        date: "2024-10-31",
        comment: "Hải sản tươi ngon, view đẹp. Cua hương rất ngon!",
        helpful: 78,
      },
    ],
    policies: {
      reservation: "Nhận đặt bàn trước",
      cancellation: "Linh hoạt",
      children: "Thân thiện gia đình",
    },
    contact: {
      phone: "0203 3842 888",
      email: "haisanhalong@gmail.com",
      website: "",
    },
    hostInfo: {
      name: "Anh Dũng",
      avatar: "https://i.pravatar.cc/150?img=61",
      verified: true,
      responseRate: "96%",
      responseTime: "Trong vòng 1 giờ",
    },
  },
  {
    id: "23",
    name: "Quán Ăn Bình Dân Hạ Long",
    slug: "quan-an-binh-dan-ha-long",
    cuisine: "Món Việt",
    location: {
      city: "Hạ Long",
      address: "Hùng Thắng, Hạ Long, Quảng Ninh",
      coordinates: { lat: 20.957, lng: 107.0432 },
    },
    rating: 4.3,
    reviewCount: 234,
    priceRange: "50,000 - 120,000",
    averagePrice: 85000,
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    ],
    description:
      "Quán ăn bình dân phục vụ các món ăn Việt Nam và đặc sản Quảng Ninh với giá cả phải chăng.",
    features: [
      { icon: "fa-utensils", text: "Đặc sản địa phương" },
      { icon: "fa-dollar-sign", text: "Giá bình dân" },
      { icon: "fa-users", text: "Đông khách" },
    ],
    openingHours: {
      monday: "06:00 - 21:00",
      tuesday: "06:00 - 21:00",
      wednesday: "06:00 - 21:00",
      thursday: "06:00 - 21:00",
      friday: "06:00 - 21:00",
      saturday: "06:00 - 21:00",
      sunday: "06:00 - 21:00",
    },
    menuCategories: [
      {
        name: "Đặc sản",
        items: [
          {
            name: "Nem Cua Bể",
            price: "80k",
            description: "Đặc sản Quảng Ninh",
          },
          {
            name: "Chả Mực Hạ Long",
            price: "100k",
            description: "Chả mực tươi",
          },
          { name: "Bún Sứa", price: "50k", description: "Món ăn truyền thống" },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Lê Thị Mai",
        userAvatar: "https://i.pravatar.cc/150?img=28",
        rating: 4,
        date: "2024-10-29",
        comment: "Món ăn ngon, giá rẻ. Nem cua bể rất đặc biệt.",
        helpful: 34,
      },
    ],
    policies: {
      reservation: "Không nhận đặt bàn",
      cancellation: "N/A",
      children: "Phù hợp mọi lứa tuổi",
    },
    contact: {
      phone: "0203 3625 777",
      email: "",
      website: "",
    },
    hostInfo: {
      name: "Chị Hoa",
      avatar: "https://i.pravatar.cc/150?img=38",
      verified: true,
      responseRate: "85%",
      responseTime: "Không cố định",
    },
  },
  // Huế Restaurants
  {
    id: "24",
    name: "Nhà Hàng Cung Đình Huế",
    slug: "cung-dinh-hue",
    cuisine: "Món Việt",
    location: {
      city: "Huế",
      address: "3 Nguyễn Sinh Cung, Huế",
      coordinates: { lat: 16.4637, lng: 107.5909 },
    },
    rating: 4.7,
    reviewCount: 1234,
    priceRange: "200,000 - 500,000",
    averagePrice: 350000,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://morsels.com.au/wp-content/uploads/restaurant-food-salat-2.jpg",
    ],
    description:
      "Nhà hàng chuyên ẩm thực cung đình Huế với không gian sang trọng. Phục vụ các món ăn hoàng gia theo công thức truyền thống.",
    features: [
      { icon: "fa-crown", text: "Ẩm thực cung đình" },
      { icon: "fa-award", text: "Cao cấp" },
      { icon: "fa-music", text: "Nhạc cung đình" },
      { icon: "fa-wifi", text: "WiFi" },
    ],
    openingHours: {
      monday: "10:00 - 22:00",
      tuesday: "10:00 - 22:00",
      wednesday: "10:00 - 22:00",
      thursday: "10:00 - 22:00",
      friday: "10:00 - 22:00",
      saturday: "10:00 - 22:00",
      sunday: "10:00 - 22:00",
    },
    menuCategories: [
      {
        name: "Món cung đình",
        items: [
          { name: "Cơm Hến", price: "80k", description: "Đặc sản Huế" },
          { name: "Bún Bò Huế", price: "70k", description: "Món truyền thống" },
          { name: "Bánh Khoái", price: "90k", description: "Bánh xèo Huế" },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Emma Watson",
        userAvatar: "https://i.pravatar.cc/150?img=23",
        rating: 5,
        date: "2024-10-30",
        comment:
          "Authentic Hue royal cuisine! Beautiful presentation and atmosphere.",
        helpful: 92,
      },
    ],
    policies: {
      reservation: "Khuyến khích đặt trước",
      cancellation: "Hủy miễn phí trước 24h",
      children: "Phù hợp mọi lứa tuổi",
    },
    contact: {
      phone: "0234 3888 777",
      email: "info@cungdinhhue.vn",
      website: "cungdinhhue.vn",
    },
    hostInfo: {
      name: "Chef Phạm Tuấn",
      avatar: "https://i.pravatar.cc/150?img=52",
      verified: true,
      responseRate: "99%",
      responseTime: "Trong vòng 30 phút",
    },
  },
  {
    id: "25",
    name: "Quán Bún Bò Huế Đông Ba",
    slug: "bun-bo-hue-dong-ba",
    cuisine: "Món Việt",
    location: {
      city: "Huế",
      address: "Chợ Đông Ba, Huế",
      coordinates: { lat: 16.4696, lng: 107.5895 },
    },
    rating: 4.5,
    reviewCount: 567,
    priceRange: "30,000 - 60,000",
    averagePrice: 45000,
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
    description:
      "Quán bún bò Huế nổi tiếng tại chợ Đông Ba với hương vị đậm đà, chính gốc. Giá bình dân, đông khách.",
    features: [
      { icon: "fa-utensils", text: "Đặc sản Huế" },
      { icon: "fa-dollar-sign", text: "Giá rẻ" },
      { icon: "fa-users", text: "Nổi tiếng" },
    ],
    openingHours: {
      monday: "06:00 - 14:00",
      tuesday: "06:00 - 14:00",
      wednesday: "06:00 - 14:00",
      thursday: "06:00 - 14:00",
      friday: "06:00 - 14:00",
      saturday: "06:00 - 14:00",
      sunday: "06:00 - 14:00",
    },
    menuCategories: [
      {
        name: "Bún bò",
        items: [
          {
            name: "Bún Bò Huế Đặc Biệt",
            price: "50k",
            description: "Đầy đủ topping",
          },
          { name: "Bún Bò Chả", price: "45k", description: "Bún bò với chả" },
          {
            name: "Bún Bò Giò Heo",
            price: "55k",
            description: "Bún bò giò heo",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Michael Chen",
        userAvatar: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        date: "2024-10-28",
        comment: "Best Bun Bo Hue I've ever had! Must try when in Hue!",
        helpful: 156,
      },
    ],
    policies: {
      reservation: "Không nhận đặt bàn",
      cancellation: "N/A",
      children: "Phù hợp mọi lứa tuổi",
    },
    contact: {
      phone: "0234 3822 555",
      email: "",
      website: "",
    },
    hostInfo: {
      name: "Bà Hương",
      avatar: "https://i.pravatar.cc/150?img=48",
      verified: true,
      responseRate: "90%",
      responseTime: "Không cố định",
    },
  },
  // Cần Thơ Restaurants
  {
    id: "26",
    name: "Nhà Hàng Sông Nước",
    slug: "song-nuoc-can-tho",
    cuisine: "Món Việt",
    location: {
      city: "Cần Thơ",
      address: "Bờ sông Hậu, Ninh Kiều, Cần Thơ",
      coordinates: { lat: 10.034, lng: 105.722 },
    },
    rating: 4.6,
    reviewCount: 678,
    priceRange: "100,000 - 250,000",
    averagePrice: 175000,
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
    description:
      "Nhà hàng bên bờ sông Hậu chuyên các món ăn miền Tây Nam Bộ. View sông đẹp, không gian thoáng mát.",
    features: [
      { icon: "fa-fish", text: "Cá sông tươi" },
      { icon: "fa-water", text: "View sông" },
      { icon: "fa-utensils", text: "Đặc sản miền Tây" },
      { icon: "fa-wifi", text: "WiFi" },
    ],
    openingHours: {
      monday: "09:00 - 22:00",
      tuesday: "09:00 - 22:00",
      wednesday: "09:00 - 22:00",
      thursday: "09:00 - 22:00",
      friday: "09:00 - 22:00",
      saturday: "09:00 - 22:00",
      sunday: "09:00 - 22:00",
    },
    menuCategories: [
      {
        name: "Đặc sản",
        items: [
          { name: "Lẩu Mắm", price: "200k", description: "Lẩu mắm miền Tây" },
          {
            name: "Cá Lóc Nướng Trui",
            price: "180k",
            description: "Đặc sản Cần Thơ",
          },
          {
            name: "Bánh Xèo Miền Tây",
            price: "120k",
            description: "Bánh xèo lá dứa",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Nguyễn Văn An",
        userAvatar: "https://i.pravatar.cc/150?img=32",
        rating: 5,
        date: "2024-10-31",
        comment: "Lẩu mắm ngon tuyệt! View sông rất đẹp vào buổi chiều.",
        helpful: 45,
      },
    ],
    policies: {
      reservation: "Nhận đặt bàn",
      cancellation: "Linh hoạt",
      children: "Thân thiện gia đình",
    },
    contact: {
      phone: "0292 3811 888",
      email: "songnuoc@gmail.com",
      website: "",
    },
    hostInfo: {
      name: "Anh Tú",
      avatar: "https://i.pravatar.cc/150?img=54",
      verified: true,
      responseRate: "95%",
      responseTime: "Trong vòng 1 giờ",
    },
  },
  {
    id: "27",
    name: "Quán Cơm Miền Tây",
    slug: "com-mien-tay-can-tho",
    cuisine: "Món Việt",
    location: {
      city: "Cần Thơ",
      address: "Chợ Cần Thơ, Ninh Kiều",
      coordinates: { lat: 10.0342, lng: 105.7278 },
    },
    rating: 4.3,
    reviewCount: 234,
    priceRange: "40,000 - 80,000",
    averagePrice: 60000,
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    ],
    description:
      "Quán cơm bình dân phục vụ các món ăn miền Tây với giá cả phải chăng. Đông khách địa phương.",
    features: [
      { icon: "fa-utensils", text: "Cơm bình dân" },
      { icon: "fa-dollar-sign", text: "Giá rẻ" },
      { icon: "fa-users", text: "Đông khách" },
    ],
    openingHours: {
      monday: "06:00 - 20:00",
      tuesday: "06:00 - 20:00",
      wednesday: "06:00 - 20:00",
      thursday: "06:00 - 20:00",
      friday: "06:00 - 20:00",
      saturday: "06:00 - 20:00",
      sunday: "06:00 - 20:00",
    },
    menuCategories: [
      {
        name: "Cơm",
        items: [
          { name: "Cơm Tấm", price: "40k", description: "Cơm tấm sườn bì" },
          { name: "Cá Kho Tộ", price: "50k", description: "Cá kho miền Tây" },
          { name: "Canh Chua", price: "45k", description: "Canh chua cá lóc" },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Trần Thị Lan",
        userAvatar: "https://i.pravatar.cc/150?img=28",
        rating: 4,
        date: "2024-10-27",
        comment: "Cơm ngon, giá rẻ. Phục vụ nhanh.",
        helpful: 23,
      },
    ],
    policies: {
      reservation: "Không nhận đặt bàn",
      cancellation: "N/A",
      children: "Phù hợp mọi lứa tuổi",
    },
    contact: {
      phone: "0292 3755 666",
      email: "",
      website: "",
    },
    hostInfo: {
      name: "Chị Bảy",
      avatar: "https://i.pravatar.cc/150?img=38",
      verified: true,
      responseRate: "80%",
      responseTime: "Không cố định",
    },
  },
  // Vũng Tàu Restaurants
  {
    id: "28",
    name: "Nhà Hàng Hải Sản Vũng Tàu",
    slug: "hai-san-vung-tau",
    cuisine: "Hải sản",
    location: {
      city: "Vũng Tàu",
      address: "Bãi Trước, Vũng Tàu",
      coordinates: { lat: 10.346, lng: 107.0843 },
    },
    rating: 4.5,
    reviewCount: 789,
    priceRange: "150,000 - 400,000",
    averagePrice: 275000,
    images: [
      "https://png.pngtree.com/thumb_back/fw800/background/20220206/pngtree-generous-platter-of-fresh-raw-seafood-to-savor-and-share-photo-image_35293122.jpg",
      "https://png.pngtree.com/thumb_back/fw800/background/20250712/pngtree-a-plate-of-assorted-seafood-featuring-lobster-shrimp-and-crab-accompanied-image_17582458.webp",
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    ],
    description:
      "Nhà hàng hải sản tươi sống view biển Bãi Trước. Hải sản đa dạng, giá hợp lý.",
    features: [
      { icon: "fa-fish", text: "Hải sản tươi" },
      { icon: "fa-umbrella-beach", text: "View biển" },
      { icon: "fa-parking", text: "Bãi đỗ xe" },
      { icon: "fa-wifi", text: "WiFi" },
    ],
    openingHours: {
      monday: "09:00 - 22:00",
      tuesday: "09:00 - 22:00",
      wednesday: "09:00 - 22:00",
      thursday: "09:00 - 22:00",
      friday: "09:00 - 22:00",
      saturday: "09:00 - 22:00",
      sunday: "09:00 - 22:00",
    },
    menuCategories: [
      {
        name: "Hải sản",
        items: [
          {
            name: "Ghẹ Rang Me",
            price: "350k/kg",
            description: "Ghẹ tươi Vũng Tàu",
          },
          { name: "Cá Mú Hấp", price: "400k/kg", description: "Cá mú tươi" },
          {
            name: "Ốc Hương Xào",
            price: "180k",
            description: "Ốc hương xào bơ tỏi",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Lê Văn Hùng",
        userAvatar: "https://i.pravatar.cc/150?img=15",
        rating: 5,
        date: "2024-10-30",
        comment: "Hải sản tươi ngon, view biển đẹp. Giá hợp lý!",
        helpful: 67,
      },
    ],
    policies: {
      reservation: "Nhận đặt bàn",
      cancellation: "Linh hoạt",
      children: "Thân thiện gia đình",
    },
    contact: {
      phone: "0254 3856 888",
      email: "haisanvungtau@gmail.com",
      website: "",
    },
    hostInfo: {
      name: "Anh Tâm",
      avatar: "https://i.pravatar.cc/150?img=61",
      verified: true,
      responseRate: "96%",
      responseTime: "Trong vòng 1 giờ",
    },
  },
  {
    id: "29",
    name: "Bánh Khọt Gốc Vũng Tàu",
    slug: "banh-khot-vung-tau",
    cuisine: "Món Việt",
    location: {
      city: "Vũng Tàu",
      address: "14 Xô Viết Nghệ Tĩnh, Vũng Tàu",
      coordinates: { lat: 10.3456, lng: 107.0892 },
    },
    rating: 4.6,
    reviewCount: 456,
    priceRange: "30,000 - 80,000",
    averagePrice: 55000,
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
    description:
      "Quán bánh khọt nổi tiếng Vũng Tàu, bánh giòn tan, nhân tôm tươi. Đặc sản không thể bỏ qua.",
    features: [
      { icon: "fa-utensils", text: "Đặc sản Vũng Tàu" },
      { icon: "fa-dollar-sign", text: "Giá bình dân" },
      { icon: "fa-users", text: "Nổi tiếng" },
    ],
    openingHours: {
      monday: "07:00 - 21:00",
      tuesday: "07:00 - 21:00",
      wednesday: "07:00 - 21:00",
      thursday: "07:00 - 21:00",
      friday: "07:00 - 21:00",
      saturday: "07:00 - 21:00",
      sunday: "07:00 - 21:00",
    },
    menuCategories: [
      {
        name: "Đặc sản",
        items: [
          {
            name: "Bánh Khọt Tôm",
            price: "60k",
            description: "10 bánh khọt tôm",
          },
          {
            name: "Bánh Khọt Thập Cẩm",
            price: "70k",
            description: "Đầy đủ topping",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Sarah Lee",
        userAvatar: "https://i.pravatar.cc/150?img=25",
        rating: 5,
        date: "2024-10-29",
        comment: "Delicious Banh Khot! Crispy and full of shrimp. Must try!",
        helpful: 89,
      },
    ],
    policies: {
      reservation: "Không nhận đặt bàn",
      cancellation: "N/A",
      children: "Phù hợp mọi lứa tuổi",
    },
    contact: {
      phone: "0254 3522 777",
      email: "",
      website: "",
    },
    hostInfo: {
      name: "Chị Sáu",
      avatar: "https://i.pravatar.cc/150?img=48",
      verified: true,
      responseRate: "88%",
      responseTime: "Không cố định",
    },
  },
  // Quy Nhơn Restaurants
  {
    id: "30",
    name: "Nhà Hàng Hải Sản Quy Nhơn",
    slug: "hai-san-quy-nhon",
    cuisine: "Hải sản",
    location: {
      city: "Quy Nhơn",
      address: "Bãi Xép, Quy Nhơn, Bình Định",
      coordinates: { lat: 13.783, lng: 109.2198 },
    },
    rating: 4.5,
    reviewCount: 567,
    priceRange: "150,000 - 350,000",
    averagePrice: 250000,
    images: [
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    ],
    description:
      "Nhà hàng hải sản tươi sống tại Bãi Xép với view biển đẹp. Chuyên các món hải sản đặc sản Quy Nhơn.",
    features: [
      { icon: "fa-fish", text: "Hải sản tươi" },
      { icon: "fa-umbrella-beach", text: "View biển" },
      { icon: "fa-parking", text: "Bãi đỗ xe" },
      { icon: "fa-wifi", text: "WiFi" },
    ],
    openingHours: {
      monday: "09:00 - 22:00",
      tuesday: "09:00 - 22:00",
      wednesday: "09:00 - 22:00",
      thursday: "09:00 - 22:00",
      friday: "09:00 - 22:00",
      saturday: "09:00 - 22:00",
      sunday: "09:00 - 22:00",
    },
    menuCategories: [
      {
        name: "Hải sản",
        items: [
          {
            name: "Nhum Nướng",
            price: "200k",
            description: "Nhum biển Quy Nhơn",
          },
          { name: "Tôm Hùm Nướng", price: "700k/kg", description: "Hùm tươi" },
          {
            name: "Ghẹ Xào",
            price: "300k/kg",
            description: "Ghẹ tươi Quy Nhơn",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Phạm Văn Nam",
        userAvatar: "https://i.pravatar.cc/150?img=22",
        rating: 5,
        date: "2024-10-31",
        comment: "Nhum nướng rất ngon! View biển tuyệt đẹp.",
        helpful: 56,
      },
    ],
    policies: {
      reservation: "Nhận đặt bàn",
      cancellation: "Linh hoạt",
      children: "Thân thiện gia đình",
    },
    contact: {
      phone: "0256 3822 888",
      email: "haisanquynhon@gmail.com",
      website: "",
    },
    hostInfo: {
      name: "Anh Bình",
      avatar: "https://i.pravatar.cc/150?img=55",
      verified: true,
      responseRate: "94%",
      responseTime: "Trong vòng 1 giờ",
    },
  },
  {
    id: "31",
    name: "Bánh Xèo Tôm Nhảy",
    slug: "banh-xeo-tom-nhay-quy-nhon",
    cuisine: "Món Việt",
    location: {
      city: "Quy Nhơn",
      address: "Nguyễn Huệ, Quy Nhơn",
      coordinates: { lat: 13.7754, lng: 109.2196 },
    },
    rating: 4.4,
    reviewCount: 345,
    priceRange: "40,000 - 90,000",
    averagePrice: 65000,
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
    description:
      "Quán bánh xèo nổi tiếng với tôm nhảy còn tươi. Đặc sản Quy Nhơn không thể bỏ qua.",
    features: [
      { icon: "fa-utensils", text: "Đặc sản Quy Nhơn" },
      { icon: "fa-dollar-sign", text: "Giá bình dân" },
      { icon: "fa-users", text: "Nổi tiếng" },
    ],
    openingHours: {
      monday: "07:00 - 21:00",
      tuesday: "07:00 - 21:00",
      wednesday: "07:00 - 21:00",
      thursday: "07:00 - 21:00",
      friday: "07:00 - 21:00",
      saturday: "07:00 - 21:00",
      sunday: "07:00 - 21:00",
    },
    menuCategories: [
      {
        name: "Đặc sản",
        items: [
          {
            name: "Bánh Xèo Tôm Nhảy",
            price: "70k",
            description: "Tôm tươi còn nhảy",
          },
          { name: "Bánh Căn", price: "50k", description: "Bánh căn Bình Định" },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Lisa Brown",
        userAvatar: "https://i.pravatar.cc/150?img=31",
        rating: 4,
        date: "2024-10-28",
        comment: "Fresh shrimp still jumping! Unique experience. Tasty!",
        helpful: 78,
      },
    ],
    policies: {
      reservation: "Không nhận đặt bàn",
      cancellation: "N/A",
      children: "Phù hợp mọi lứa tuổi",
    },
    contact: {
      phone: "0256 3711 555",
      email: "",
      website: "",
    },
    hostInfo: {
      name: "Chị Năm",
      avatar: "https://i.pravatar.cc/150?img=42",
      verified: true,
      responseRate: "85%",
      responseTime: "Không cố định",
    },
  },
  // Hải Phòng Restaurants
  {
    id: "32",
    name: "Nhà Hàng Hải Sản Đồ Sơn",
    slug: "hai-san-do-son",
    cuisine: "Hải sản",
    location: {
      city: "Hải Phòng",
      address: "Bãi biển Đồ Sơn, Hải Phòng",
      coordinates: { lat: 20.7056, lng: 106.7934 },
    },
    rating: 4.5,
    reviewCount: 678,
    priceRange: "150,000 - 350,000",
    averagePrice: 250000,
    images: [
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    ],
    description:
      "Nhà hàng hải sản tươi sống tại Đồ Sơn với view biển đẹp. Chuyên các món hải sản đặc sản Hải Phòng.",
    features: [
      { icon: "fa-fish", text: "Hải sản tươi" },
      { icon: "fa-umbrella-beach", text: "View biển" },
      { icon: "fa-parking", text: "Bãi đỗ xe" },
      { icon: "fa-wifi", text: "WiFi" },
    ],
    openingHours: {
      monday: "09:00 - 22:00",
      tuesday: "09:00 - 22:00",
      wednesday: "09:00 - 22:00",
      thursday: "09:00 - 22:00",
      friday: "09:00 - 22:00",
      saturday: "09:00 - 22:00",
      sunday: "09:00 - 22:00",
    },
    menuCategories: [
      {
        name: "Hải sản",
        items: [
          {
            name: "Sam Biển Nướng",
            price: "200k",
            description: "Đặc sản Đồ Sơn",
          },
          {
            name: "Ghẹ Rang Muối",
            price: "350k/kg",
            description: "Ghẹ tươi Hải Phòng",
          },
          {
            name: "Cua Huyết Hấp",
            price: "280k/kg",
            description: "Cua huyết đặc sản",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Hoàng Văn Đức",
        userAvatar: "https://i.pravatar.cc/150?img=15",
        rating: 5,
        date: "2024-10-31",
        comment: "Sam biển nướng rất ngon! View biển tuyệt đẹp.",
        helpful: 67,
      },
    ],
    policies: {
      reservation: "Nhận đặt bàn",
      cancellation: "Linh hoạt",
      children: "Thân thiện gia đình",
    },
    contact: {
      phone: "0225 3861 888",
      email: "haisandoson@gmail.com",
      website: "",
    },
    hostInfo: {
      name: "Anh Hải",
      avatar: "https://i.pravatar.cc/150?img=61",
      verified: true,
      responseRate: "95%",
      responseTime: "Trong vòng 1 giờ",
    },
  },
  {
    id: "33",
    name: "Quán Bánh Đa Cua",
    slug: "banh-da-cua-hai-phong",
    cuisine: "Món Việt",
    location: {
      city: "Hải Phòng",
      address: "Lạch Tray, Ngô Quyền, Hải Phòng",
      coordinates: { lat: 20.8651, lng: 106.6838 },
    },
    rating: 4.6,
    reviewCount: 892,
    priceRange: "40,000 - 80,000",
    averagePrice: 60000,
    images: [
      "https://i-giadinh.vnecdn.net/2023/02/25/Buoc-12-thanh-pham-12-3879-1677318715.jpg",
      "https://static.vinwonders.com/production/banh-da-cua-hai-phong-o-ha-noi-banner.jpg",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
    description:
      "Quán bánh đa cua nổi tiếng Hải Phòng với hương vị đậm đà, chính gốc. Đặc sản không thể bỏ qua.",
    features: [
      { icon: "fa-utensils", text: "Đặc sản Hải Phòng" },
      { icon: "fa-dollar-sign", text: "Giá bình dân" },
      { icon: "fa-users", text: "Nổi tiếng" },
    ],
    openingHours: {
      monday: "06:00 - 20:00",
      tuesday: "06:00 - 20:00",
      wednesday: "06:00 - 20:00",
      thursday: "06:00 - 20:00",
      friday: "06:00 - 20:00",
      saturday: "06:00 - 20:00",
      sunday: "06:00 - 20:00",
    },
    menuCategories: [
      {
        name: "Đặc sản",
        items: [
          {
            name: "Bánh Đa Cua Đỏ",
            price: "50k",
            description: "Bánh đa cua Hải Phòng",
          },
          {
            name: "Bánh Đa Cua Ghẹ",
            price: "60k",
            description: "Bánh đa cua ghẹ đặc biệt",
          },
          {
            name: "Nem Cua Bể",
            price: "70k",
            description: "Nem cua đặc sản",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Phạm Thị Lan",
        userAvatar: "https://i.pravatar.cc/150?img=28",
        rating: 5,
        date: "2024-10-30",
        comment: "Bánh đa cua ngon nhất Hải Phòng! Nước dùng đậm đà, cua tươi.",
        helpful: 123,
      },
    ],
    policies: {
      reservation: "Không nhận đặt bàn",
      cancellation: "N/A",
      children: "Phù hợp mọi lứa tuổi",
    },
    contact: {
      phone: "0225 3745 666",
      email: "",
      website: "",
    },
    hostInfo: {
      name: "Chị Ba",
      avatar: "https://i.pravatar.cc/150?img=38",
      verified: true,
      responseRate: "88%",
      responseTime: "Không cố định",
    },
  },
  // Mỹ Tho Restaurants
  {
    id: "34",
    name: "Nhà Hàng Cồn Tân Phong",
    slug: "con-tan-phong-my-tho",
    cuisine: "Món Việt",
    location: {
      city: "Mỹ Tho",
      address: "Cồn Tân Phong, Mỹ Tho, Tiền Giang",
      coordinates: { lat: 10.342, lng: 106.3555 },
    },
    rating: 4.5,
    reviewCount: 567,
    priceRange: "80,000 - 200,000",
    averagePrice: 140000,
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
    description:
      "Nhà hàng trên cồn nổi tiếng tại Mỹ Tho, chuyên các món ăn miền Tây và trái cây vườn. Không gian xanh mát, yên tĩnh.",
    features: [
      { icon: "fa-utensils", text: "Đặc sản miền Tây" },
      { icon: "fa-apple-alt", text: "Trái cây vườn" },
      { icon: "fa-tree", text: "Không gian vườn" },
      { icon: "fa-wifi", text: "WiFi" },
    ],
    openingHours: {
      monday: "08:00 - 20:00",
      tuesday: "08:00 - 20:00",
      wednesday: "08:00 - 20:00",
      thursday: "08:00 - 20:00",
      friday: "08:00 - 20:00",
      saturday: "08:00 - 20:00",
      sunday: "08:00 - 20:00",
    },
    menuCategories: [
      {
        name: "Đặc sản",
        items: [
          {
            name: "Cá Lóc Nướng Trui",
            price: "180k",
            description: "Cá lóc tươi vùng sông",
          },
          {
            name: "Gỏi Cuốn Tôm Thịt",
            price: "100k",
            description: "Gỏi cuốn tươi ngon",
          },
          {
            name: "Hủ Tiếu Mỹ Tho",
            price: "60k",
            description: "Hủ tiếu đặc sản",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Nguyễn Văn Bình",
        userAvatar: "https://i.pravatar.cc/150?img=32",
        rating: 5,
        date: "2024-10-31",
        comment: "Không gian yên tĩnh, đồ ăn ngon. Trái cây vườn rất tươi!",
        helpful: 78,
      },
    ],
    policies: {
      reservation: "Nhận đặt bàn",
      cancellation: "Linh hoạt",
      children: "Thân thiện gia đình",
    },
    contact: {
      phone: "0273 3877 888",
      email: "contanphong@gmail.com",
      website: "",
    },
    hostInfo: {
      name: "Anh Năm",
      avatar: "https://i.pravatar.cc/150?img=54",
      verified: true,
      responseRate: "94%",
      responseTime: "Trong vòng 1 giờ",
    },
  },
  {
    id: "35",
    name: "Hủ Tiếu Mỹ Tho 24",
    slug: "hu-tieu-my-tho-24",
    cuisine: "Món Việt",
    location: {
      city: "Mỹ Tho",
      address: "24 Nguyễn Trung Trực, Mỹ Tho",
      coordinates: { lat: 10.3605, lng: 106.3598 },
    },
    rating: 4.4,
    reviewCount: 456,
    priceRange: "30,000 - 60,000",
    averagePrice: 45000,
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
    description:
      "Quán hủ tiếu Mỹ Tho nổi tiếng với nước dùng ngọt thanh từ xương heo. Giá bình dân, đông khách.",
    features: [
      { icon: "fa-utensils", text: "Đặc sản Mỹ Tho" },
      { icon: "fa-dollar-sign", text: "Giá rẻ" },
      { icon: "fa-users", text: "Nổi tiếng" },
    ],
    openingHours: {
      monday: "05:30 - 14:00",
      tuesday: "05:30 - 14:00",
      wednesday: "05:30 - 14:00",
      thursday: "05:30 - 14:00",
      friday: "05:30 - 14:00",
      saturday: "05:30 - 14:00",
      sunday: "05:30 - 14:00",
    },
    menuCategories: [
      {
        name: "Hủ tiếu",
        items: [
          {
            name: "Hủ Tiếu Mỹ Tho Đặc Biệt",
            price: "50k",
            description: "Đầy đủ topping",
          },
          {
            name: "Hủ Tiếu Khô",
            price: "45k",
            description: "Hủ tiếu khô truyền thống",
          },
          {
            name: "Hủ Tiếu Nước",
            price: "40k",
            description: "Hủ tiếu nước thanh",
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "Lisa Chen",
        userAvatar: "https://i.pravatar.cc/150?img=25",
        rating: 4,
        date: "2024-10-29",
        comment:
          "Authentic My Tho Hu Tieu! Sweet broth and fresh ingredients. Must try!",
        helpful: 89,
      },
    ],
    policies: {
      reservation: "Không nhận đặt bàn",
      cancellation: "N/A",
      children: "Phù hợp mọi lứa tuổi",
    },
    contact: {
      phone: "0273 3522 444",
      email: "",
      website: "",
    },
    hostInfo: {
      name: "Chị Tư",
      avatar: "https://i.pravatar.cc/150?img=42",
      verified: true,
      responseRate: "82%",
      responseTime: "Không cố định",
    },
  },
];

// Filter data
export const cities = [
  "Tất cả",
  "Hà Nội",
  "Hạ Long",
  "Hải Phòng",
  "Sa Pa",
  "Huế",
  "Hội An",
  "Đà Nẵng",
  "Nha Trang",
  "Quy Nhơn",
  "Đà Lạt",
  "TP. Hồ Chí Minh",
  "Vũng Tàu",
  "Cần Thơ",
  "Mỹ Tho",
  "Phú Quốc",
];

export const cuisines = [
  "Tất cả",
  "Món Việt",
  "Hải sản",
  "BBQ & Nướng",
  "Lẩu",
  "Chay",
  "Món Á",
  "Món Âu",
];

export const priceRanges = [
  { label: "Tất cả", min: 0, max: Infinity },
  { label: "$ (< 200k)", min: 0, max: 200000 },
  { label: "$$ (200k - 500k)", min: 200000, max: 500000 },
  { label: "$$$ (500k - 1tr)", min: 500000, max: 1000000 },
  { label: "$$$$ (> 1tr)", min: 1000000, max: Infinity },
];

// Helper functions
export const getRestaurantById = (id) => {
  return restaurants.find(
    (restaurant) =>
      restaurant.id == id ||
      restaurant.id === String(id) ||
      restaurant.id === Number(id)
  );
};

export const getRestaurantBySlug = (slug) => {
  return restaurants.find((restaurant) => restaurant.slug === slug);
};
