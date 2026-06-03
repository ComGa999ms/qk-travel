import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, defaultUser } from "../data/users";
import useDialog from "../hooks/useDialog";
import AlertDialog from "../components/common/AlertDialog";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUserId = "current-user-id";

  const userData = getUserById(userId) || defaultUser;
  const [user, setUser] = useState(userData);

  const isOwnProfile = userId === currentUserId;
  const { alertDialog, showAlert, hideDialog } = useDialog();

  const handleAddFriend = () => {
    setUser({ ...user, isFriend: true });
  };

  const handleMessage = () => {
    showAlert({
      title: "Mở cửa sổ nhắn tin",
      message: "Chức năng nhắn tin đang được phát triển.",
      type: "info",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 lg:h-80 bg-gradient-to-br from-primary-600 to-blue-700">
        <img
          src={user.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
        >
          <i className="fas fa-arrow-left text-gray-700"></i>
        </button>
      </div>

      {/* Profile Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
              />

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start">
                  {user.name}
                  {user.verified && (
                    <i className="fas fa-check-circle text-blue-500 ml-2"></i>
                  )}
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">{user.bio}</p>

                <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                  <span className="text-primary-600 font-semibold">
                    {user.points.toLocaleString()} điểm
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center md:justify-start space-x-8 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {user.stats.posts}
                    </div>
                    <div className="text-sm text-gray-600">Bài viết</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {user.stats.friends}
                    </div>
                    <div className="text-sm text-gray-600">Bạn bè</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {user.stats.checkIns}
                    </div>
                    <div className="text-sm text-gray-600">Check-ins</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                {isOwnProfile ? (
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center">
                    <i className="fas fa-edit mr-2"></i>
                    Chỉnh sửa
                  </button>
                ) : (
                  <>
                    {!user.isFriend ? (
                      <button
                        onClick={handleAddFriend}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center"
                      >
                        <i className="fas fa-user-plus mr-2"></i>
                        Kết bạn
                      </button>
                    ) : (
                      <button
                        onClick={handleMessage}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center"
                      >
                        <i className="fas fa-comment-dots mr-2"></i>
                        Nhắn tin
                      </button>
                    )}
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-semibold transition-colors">
                      <i className="fas fa-ellipsis-h"></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {user.posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <img
                src={post.images[0]}
                alt={post.destination}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-2">
                  {post.destination}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {post.content}
                </p>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <div className="flex items-center space-x-3">
                    <span>
                      <i className="fas fa-heart text-red-500 mr-1"></i>
                      {post.likes}
                    </span>
                    <span>
                      <i className="fas fa-comment-dots text-blue-500 mr-1"></i>
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default UserProfile;
