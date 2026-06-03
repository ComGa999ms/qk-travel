import React from "react";
import { Link } from "react-router-dom";

const UserProfileCard = ({ user, currentUserId, onAddFriend, onMessage }) => {
  const isFriend = user.isFriend;
  const isCurrentUser = user.id === currentUserId;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <Link to={`/community/profile/${user.id}`}>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-100 hover:ring-primary-300 transition-all cursor-pointer"
          />
        </Link>

        <div className="flex-1">
          {/* User Info */}
          <Link to={`/community/profile/${user.id}`}>
            <h4 className="font-bold text-gray-900 hover:text-primary-600 transition-colors cursor-pointer flex items-center">
              {user.name}
              {user.verified && (
                <i className="fas fa-check-circle text-blue-500 text-sm ml-2"></i>
              )}
            </h4>
          </Link>

          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.level === "Gold"
                  ? "bg-yellow-100 text-yellow-800"
                  : user.level === "Silver"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {user.level}
            </span>
            <span>•</span>
            <span>{user.points} điểm</span>
          </div>

          <p className="text-gray-600 text-sm mb-3">{user.bio}</p>

          {/* Action Buttons */}
          {!isCurrentUser && (
            <div className="flex items-center space-x-2">
              {!isFriend ? (
                <button
                  onClick={() => onAddFriend(user.id)}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  Kết bạn
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onMessage(user.id)}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-comment-dots mr-2"></i>
                    Nhắn tin
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <i className="fas fa-user-check"></i>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
