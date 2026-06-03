import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreatePostModal from "../components/social/CreatePostModal";
import {
  currentUser,
  suggestedUsers,
  reviews,
  achievements,
  leaderboard,
  dailyQuests,
  weeklyQuests,
  specialQuests,
} from "../data/community";

const Community = () => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [userPoints, setUserPoints] = useState(9999);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [friendRequests, setFriendRequests] = useState({});

  const handleAddFriend = (userId) => {
    setFriendRequests({ ...friendRequests, [userId]: "pending" });
  };

  const handleCancelRequest = (userId) => {
    const updated = { ...friendRequests };
    delete updated[userId];
    setFriendRequests(updated);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        ></i>,
      );
    }
    return stars;
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Gold":
        return "bg-yellow-100 text-yellow-800";
      case "Silver":
        return "bg-gray-100 text-gray-800";
      case "Bronze":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const handleCreatePost = (newPost) => {
    console.log("New post created:", newPost);
    setShowCreatePost(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Banner */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                <img
                  src="https://www.bleepstatic.com/content/hl-images/2022/03/11/kali-linux.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Devip666</h2>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-red-500 text-yellow-400 text-sm font-medium rounded-full">
                    Super User
                  </span>
                  <span className="text-gray-600">
                    {userPoints.toLocaleString()} điểm
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to={`/community/profile/${currentUser.id}`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center"
              >
                <i className="fas fa-user mr-2"></i>
                Trang cá nhân
              </Link>
              <button
                onClick={() => setShowCreatePost(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center"
              >
                <i className="fas fa-plus mr-2"></i>
                Chia sẻ trải nghiệm
              </button>
            </div>
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                  activeTab === "reviews"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <i className="fas fa-comments mr-2"></i>
                Bảng tin
              </button>
              <button
                onClick={() => setActiveTab("people")}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                  activeTab === "people"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <i className="fas fa-users mr-2"></i>
                Mọi người
              </button>
              <button
                onClick={() => setActiveTab("quests")}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                  activeTab === "quests"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <i className="fas fa-tasks mr-2"></i>
                Nhiệm vụ
              </button>
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                  activeTab === "leaderboard"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <i className="fas fa-trophy mr-2"></i>
                Bảng xếp hạng
              </button>
              <button
                onClick={() => setActiveTab("achievements")}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                  activeTab === "achievements"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <i className="fas fa-medal mr-2"></i>
                Thành tựu
              </button>
            </nav>
          </div>
        </div>
        {/* Main Content Grid - Conditional Layout */}
        <div
          className={`grid grid-cols-1 gap-8 ${
            activeTab === "reviews" ? "lg:grid-cols-3" : ""
          }`}
        >
          {/* Main Content */}
          <div className={activeTab === "reviews" ? "lg:col-span-2" : ""}>
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Reviews Feed */}
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <Link
                          to={`/community/profile/${review.user.id}`}
                          className="flex items-center space-x-3"
                        >
                          <img
                            src={review.user.avatar}
                            alt={review.user.name}
                            // className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100"
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100 hover:ring-primary-300 transition-all cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors flex items-center">
                                {review.user.name}
                              </h4>
                              {review.verified && (
                                <i className="fas fa-check-circle text-blue-500 text-sm"></i>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <i className="fas fa-map-marker-alt"></i>
                              <span>{review.destination}</span>
                              <span>•</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </Link>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
                              review.user.level,
                            )}`}
                          >
                            {review.user.level}
                          </span>
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>

                      <h5 className="text-lg font-bold text-gray-900 mb-3">
                        {review.title}
                      </h5>
                      <p className="text-gray-600 leading-relaxed">
                        {review.content}
                      </p>
                    </div>

                    {/* Images */}
                    {review.images.length > 0 && (
                      <div className="px-6 pb-4">
                        <div
                          className={`grid gap-2 ${
                            review.images.length === 1
                              ? "grid-cols-1"
                              : "grid-cols-2"
                          }`}
                        >
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review ${index + 1}`}
                              className={`object-cover rounded-xl ${
                                review.images.length === 1 ? "h-128" : "h-64"
                              } w-full`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors group">
                            <i className="fas fa-heart group-hover:scale-110 transition-transform"></i>
                            <span className="font-medium">{review.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group">
                            <i className="fas fa-comment-dots group-hover:scale-110 transition-transform"></i>
                            <span className="font-medium">
                              {review.comments}
                            </span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors group">
                            <i className="fas fa-share-alt group-hover:scale-110 transition-transform"></i>
                            <span className="font-medium">Chia sẻ</span>
                          </button>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-primary-600 font-medium">
                          <i className="fas fa-coins"></i>
                          <span>+{review.likes * 2} điểm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "leaderboard" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <i className="fas fa-trophy mr-3"></i>
                    Bảng xếp hạng tháng này
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {leaderboard.map((user, index) => (
                      <div
                        key={user.rank}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-sm ${
                          index < 3
                            ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                              user.rank === 1
                                ? "bg-yellow-500 text-white"
                                : user.rank === 2
                                  ? "bg-gray-400 text-white"
                                  : user.rank === 3
                                    ? "bg-orange-600 text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {user.rank <= 3 ? (
                              <i
                                className={`fas fa-trophy ${
                                  user.rank === 1
                                    ? "text-yellow-200"
                                    : user.rank === 2
                                      ? "text-gray-200"
                                      : "text-orange-200"
                                }`}
                              ></i>
                            ) : (
                              user.rank
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">
                              {user.name}
                            </h4>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
                                user.level,
                              )}`}
                            >
                              {user.level}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">
                            {user.points.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">điểm</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "quests" && (
              <div className="space-y-8">
                {/* Quest Tips at the top - Refined Design */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-500 px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <i className="fas fa-lightbulb text-white text-lg"></i>
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        Mẹo hoàn thành nhiệm vụ
                      </h4>
                    </div>
                  </div>

                  {/* Tips Grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Tip 1 */}
                      <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <i className="fas fa-calendar-check text-white text-sm"></i>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 text-sm mb-1">
                              Ưu tiên hàng ngày
                            </h5>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              Hoàn thành nhiệm vụ hàng ngày để tích lũy điểm ổn
                              định
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tip 2 */}
                      <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <i className="fas fa-clock text-white text-sm"></i>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 text-sm mb-1">
                              Nắm bắt thời hạn
                            </h5>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              Nhiệm vụ đặc biệt có giới hạn thời gian - đừng bỏ
                              lỡ!
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tip 3 */}
                      <div className="group p-4 rounded-xl bg-gradient-to-br from-green-50 to-white border border-green-100 hover:border-green-300 hover:shadow-md transition-all">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <i className="fas fa-layer-group text-white text-sm"></i>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 text-sm mb-1">
                              Kết hợp thông minh
                            </h5>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              Làm nhiều nhiệm vụ cùng lúc để tối ưu thời gian
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily Quests */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <i className="fas fa-calendar-day mr-3 text-blue-500"></i>
                      Nhiệm vụ hàng ngày
                    </h3>
                    <div className="text-sm text-gray-500">
                      Làm mới sau:{" "}
                      <span className="font-semibold text-blue-600">
                        23:45:12
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dailyQuests.map((quest) => (
                      <div
                        key={quest.id}
                        className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 border-2 ${
                          quest.completed
                            ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50"
                            : "border-gray-100 hover:border-primary-200"
                        }`}
                      >
                        {/* Quest Icon & Points */}
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${quest.color} flex items-center justify-center text-white text-xl shadow-lg`}
                          >
                            <i className={quest.icon}></i>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary-600">
                              +{quest.points}
                            </div>
                            <div className="text-xs text-gray-500">điểm</div>
                          </div>
                        </div>

                        {/* Quest Info */}
                        <h4 className="font-bold text-gray-900 text-lg mb-2">
                          {quest.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">
                          {quest.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Tiến độ</span>
                            <span
                              className={`font-semibold ${quest.textColor}`}
                            >
                              {quest.progress}/{quest.goal}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${quest.color} transition-all duration-500 rounded-full`}
                              style={{
                                width: `${
                                  (quest.progress / quest.goal) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Action Button */}
                        {quest.completed ? (
                          <button
                            disabled
                            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center"
                          >
                            <i className="fas fa-check-circle mr-2"></i>
                            Đã hoàn thành
                          </button>
                        ) : (
                          <button
                            className={`w-full bg-gradient-to-r ${quest.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center group`}
                          >
                            <i className="fas fa-play mr-2 group-hover:scale-110 transition-transform"></i>
                            Bắt đầu
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Quests */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <i className="fas fa-calendar-week mr-3 text-purple-500"></i>
                      Nhiệm vụ hàng tuần
                    </h3>
                    <div className="text-sm text-gray-500">
                      Làm mới sau:{" "}
                      <span className="font-semibold text-purple-600">
                        6 ngày
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {weeklyQuests.map((quest) => (
                      <div
                        key={quest.id}
                        className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 border-2 ${
                          quest.completed
                            ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50"
                            : "border-gray-100 hover:border-primary-200"
                        }`}
                      >
                        {/* Quest Icon & Points */}
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${quest.color} flex items-center justify-center text-white text-xl shadow-lg`}
                          >
                            <i className={quest.icon}></i>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary-600">
                              +{quest.points}
                            </div>
                            <div className="text-xs text-gray-500">điểm</div>
                          </div>
                        </div>

                        {/* Quest Info */}
                        <h4 className="font-bold text-gray-900 text-lg mb-2">
                          {quest.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">
                          {quest.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Tiến độ</span>
                            <span
                              className={`font-semibold ${quest.textColor}`}
                            >
                              {quest.progress}/{quest.goal}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${quest.color} transition-all duration-500 rounded-full`}
                              style={{
                                width: `${
                                  (quest.progress / quest.goal) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Action Button */}
                        {quest.completed ? (
                          <button
                            disabled
                            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center"
                          >
                            <i className="fas fa-check-circle mr-2"></i>
                            Đã hoàn thành
                          </button>
                        ) : (
                          <button
                            className={`w-full bg-gradient-to-r ${quest.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center group`}
                          >
                            <i className="fas fa-play mr-2 group-hover:scale-110 transition-transform"></i>
                            Tiếp tục
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Quests */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <i className="fas fa-star mr-3 text-yellow-500"></i>
                      Nhiệm vụ đặc biệt
                    </h3>
                    <div className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
                      <span className="text-sm font-semibold text-orange-700">
                        <i className="fas fa-fire mr-1"></i>
                        Thưởng cao!
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {specialQuests.map((quest) => (
                      <div
                        key={quest.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-white to-yellow-50"
                      >
                        {/* Quest Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${quest.color} flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-orange-100`}
                            >
                              <i className={quest.icon}></i>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-xl mb-1">
                                {quest.title}
                              </h4>
                              <div className="flex items-center text-orange-600 text-sm font-semibold">
                                <i className="fas fa-clock mr-1"></i>
                                {quest.timeLimit}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                              +{quest.points}
                            </div>
                            <div className="text-xs text-gray-500">điểm</div>
                          </div>
                        </div>

                        {/* Quest Description */}
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {quest.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600 font-medium">
                              Tiến độ
                            </span>
                            <span className={`font-bold ${quest.textColor}`}>
                              {quest.progress}/{quest.goal}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                            <div
                              className={`h-full bg-gradient-to-r ${quest.color} transition-all duration-500 rounded-full relative`}
                              style={{
                                width: `${
                                  (quest.progress / quest.goal) * 100
                                }%`,
                              }}
                            >
                              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        {quest.completed ? (
                          <button
                            disabled
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center shadow-lg"
                          >
                            <i className="fas fa-trophy mr-2"></i>
                            Đã hoàn thành
                          </button>
                        ) : (
                          <button
                            className={`w-full bg-gradient-to-r ${quest.color} hover:scale-105 text-white py-3 rounded-xl font-bold text-lg transition-all flex items-center justify-center shadow-lg group`}
                          >
                            <i className="fas fa-rocket mr-2 group-hover:scale-110 transition-transform"></i>
                            Bắt đầu thử thách
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements
                    .sort((a, b) => {
                      // Sắp xếp: unlocked (true) lên trước, unlocked (false) xuống sau
                      if (a.unlocked === b.unlocked) return 0;
                      return a.unlocked ? -1 : 1;
                    })
                    .map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`bg-white rounded-2xl shadow-sm p-6 transition-all hover:shadow-md ${
                          achievement.unlocked
                            ? "ring-2 ring-green-200 bg-gradient-to-br from-green-50 to-emerald-50"
                            : "opacity-75"
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            className={`text-4xl ${
                              achievement.unlocked ? "" : "grayscale opacity-50"
                            }`}
                          >
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2">
                              {achievement.name}
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              {achievement.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-primary-600 font-bold">
                                +{achievement.points} điểm
                              </span>
                              {achievement.unlocked && (
                                <div className="flex items-center text-green-600">
                                  <i className="fas fa-check-circle mr-1"></i>
                                  <span className="text-sm font-medium">
                                    Đã mở khóa
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === "people" && (
              <div className="space-y-6">
                {/* Suggested Users Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-5"
                    >
                      {/* User Info - Compact */}
                      <div className="flex items-start gap-3 mb-4">
                        <Link to={`/community/profile/${user.id}`}>
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 hover:ring-primary-300 transition-all"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/community/profile/${user.id}`}
                            className="hover:text-primary-600 transition-colors"
                          >
                            <h4 className="font-bold text-gray-900 truncate">
                              {user.name}
                            </h4>
                          </Link>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className={`px-1.5 py-0.5 text-xs font-semibold rounded ${
                                user.level === "Gold"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : user.level === "Silver"
                                    ? "bg-gray-200 text-gray-800"
                                    : user.level === "Bronze"
                                      ? "bg-orange-200 text-orange-800"
                                      : "bg-red-500 text-yellow-400" // Super User
                              }`}
                            >
                              {user.level}
                            </span>
                            <span className="text-gray-400 text-xs">•</span>
                            <span className="text-gray-500 text-xs truncate">
                              {user.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats - Simplified */}
                      <div className="flex items-center justify-around py-3 mb-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="font-bold text-gray-900 text-sm">
                            {user.posts}
                          </div>
                          <div className="text-xs text-gray-500">Posts</div>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900 text-sm">
                            {user.friends}
                          </div>
                          <div className="text-xs text-gray-500">Friends</div>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="text-center">
                          <div className="font-bold text-primary-600 text-sm">
                            {user.points}
                          </div>
                          <div className="text-xs text-gray-500">Points</div>
                        </div>
                      </div>

                      {/* Mutual Friends - Compact */}
                      {user.mutualFriends > 0 && (
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <i className="fas fa-user-friends mr-1.5 text-primary-400"></i>
                          <span>{user.mutualFriends} bạn chung</span>
                        </div>
                      )}

                      {/* Action Buttons - Compact */}
                      {friendRequests[user.id] === "pending" ? (
                        <button
                          onClick={() => handleCancelRequest(user.id)}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <i className="fas fa-clock text-xs"></i>
                          Đã gửi
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddFriend(user.id)}
                            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-colors"
                          >
                            <i className="fas fa-user-plus text-xs mr-1"></i>
                            Kết nối
                          </button>
                          <Link
                            to={`/community/profile/${user.id}`}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <i className="fas fa-eye text-sm"></i>
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Only show on "reviews" tab */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Quick Stats Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-chart-line mr-2 text-primary-600"></i>
                  Hoạt động của bạn
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-blue-800">Reviews</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-sm text-green-800">Check-ins</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-xl">
                    <div className="text-2xl font-bold text-red-600">45</div>
                    <div className="text-sm text-red-800">Likes</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">23</div>
                    <div className="text-sm text-purple-800">Shares</div>
                  </div>
                </div>
              </div>

              

              {/* Trending Topics */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-fire mr-2 text-orange-500"></i>
                  Trending
                </h3>
                <div className="space-y-3">
                  {[
                    "#DaLat2025",
                    "#HaLongBay",
                    "#SapaTravel",
                    "#PhuQuocBeach",
                  ].map((tag, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="font-semibold text-primary-600">
                        {tag}
                      </div>
                      <div className="text-sm text-gray-500">
                        {Math.floor(Math.random() * 1000)} bài viết
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          isOpen={showCreatePost}
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default Community;
