import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import blogService from "../../services/blogService";
import { useAuth } from "../../context/AuthContext";
import { FaSpinner, FaPaperPlane, FaReply, FaTimes } from "react-icons/fa";

// ============================================================
// Utility: Hiển thị thời gian thân thiện (VD: "2 giờ trước")
// ============================================================
const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "Vừa xong";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;

  // Quá 7 ngày -> hiển thị ngày tháng đầy đủ
  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ============================================================
// Avatar Component — dùng chung cho comment cha và reply
// ============================================================
const UserAvatar = ({ src, name, size = "w-10 h-10" }) => (
  <div
    className={`${size} rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold`}
  >
    {src ? (
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
    ) : null}
    <span
      className={`${src ? "hidden" : "flex"} items-center justify-center w-full h-full text-sm`}
    >
      {name?.[0]?.toUpperCase() || "?"}
    </span>
  </div>
);

// ============================================================
// CommentInput — Khung nhập bình luận (dùng chung cho gốc & reply)
// ============================================================
const CommentInput = ({
  onSubmit,
  placeholder = "Viết bình luận...",
  isReply = false,
  onCancel,
  autoFocus = false,
}) => {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    setSubmitting(true);
    try {
      await onSubmit(trimmed);
      setContent("");
    } catch (err) {
      console.error("Lỗi khi gửi bình luận:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-start">
      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={isReply ? 2 : 3}
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 hover:bg-white focus:bg-white transition-colors placeholder-gray-400"
          onKeyDown={(e) => {
            // Ctrl+Enter hoặc Cmd+Enter để gửi nhanh
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">
            Ctrl + Enter để gửi nhanh
          </span>
          <div className="flex gap-2">
            {isReply && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                Huỷ
              </button>
            )}
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {submitting ? (
                <FaSpinner className="animate-spin" size={10} />
              ) : (
                <FaPaperPlane size={10} />
              )}
              {isReply ? "Phản hồi" : "Bình luận"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

// ============================================================
// SingleComment — Hiển thị một bình luận (cha hoặc reply)
// ============================================================
const SingleComment = ({ comment, onReplySubmit, isReply = false }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const { user } = useAuth();

  const handleReply = async (content) => {
    await onReplySubmit(content, comment.id);
    setShowReplyInput(false);
  };

  return (
    <div className={`flex gap-3 ${isReply ? "ml-12 mt-3" : ""}`}>
      <UserAvatar
        src={comment.userAvatar}
        name={comment.userName}
        size={isReply ? "w-8 h-8" : "w-10 h-10"}
      />
      <div className="flex-1 min-w-0">
        {/* Tên + Thời gian */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-900">
            {comment.userName}
          </span>
          <span className="text-xs text-gray-400">
            {timeAgo(comment.createdAt)}
          </span>
        </div>

        {/* Nội dung */}
        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {comment.content}
        </p>

        {/* Nút Phản hồi — chỉ hiện ở comment cha và cho user đã đăng nhập */}
        {!isReply && user && (
          <button
            type="button"
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="inline-flex items-center gap-1 mt-1.5 text-xs text-gray-400 hover:text-primary-600 transition-colors font-medium"
          >
            {showReplyInput ? (
              <>
                <FaTimes size={10} /> Đóng
              </>
            ) : (
              <>
                <FaReply size={10} /> Phản hồi
              </>
            )}
          </button>
        )}

        {/* Khung nhập phản hồi */}
        {showReplyInput && (
          <div className="mt-3">
            <CommentInput
              onSubmit={handleReply}
              placeholder={`Phản hồi ${comment.userName}...`}
              isReply
              onCancel={() => setShowReplyInput(false)}
              autoFocus
            />
          </div>
        )}

        {/* Danh sách Replies */}
        {comment.replies?.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => (
              <SingleComment
                key={reply.id}
                comment={reply}
                onReplySubmit={onReplySubmit}
                isReply
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// BlogComments — Component chính
// ============================================================
const COMMENTS_PAGE_SIZE = 5;

const BlogComments = ({ blogId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState(null);

  // Lấy bình luận từ API
  const fetchComments = useCallback(
    async (pageNum = 1, append = false) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }
        setError(null);

        const data = await blogService.getBlogComments(
          blogId,
          pageNum,
          COMMENTS_PAGE_SIZE,
        );

        if (append) {
          setComments((prev) => [...prev, ...data.items]);
        } else {
          setComments(data.items);
        }
        setTotalCount(data.totalCount);
        setHasNextPage(data.hasNextPage);
        setPage(pageNum);
      } catch (err) {
        console.error("Lỗi khi tải bình luận:", err);
        setError("Không thể tải bình luận. Vui lòng thử lại.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [blogId],
  );

  useEffect(() => {
    if (blogId) {
      fetchComments(1);
    }
  }, [blogId, fetchComments]);

  // Xử lý đăng bình luận gốc
  const handleAddComment = async (content) => {
    const newComment = await blogService.addBlogComment(blogId, content, null);
    // Thêm bình luận mới vào đầu danh sách (hiển thị mới nhất trước)
    setComments((prev) => [newComment, ...prev]);
    setTotalCount((prev) => prev + 1);
  };

  // Xử lý đăng phản hồi (reply)
  const handleReplyComment = async (content, parentCommentId) => {
    const newReply = await blogService.addBlogComment(
      blogId,
      content,
      parentCommentId,
    );
    // Tìm comment cha trong State và append reply vào mảng replies của nó
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === parentCommentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      }),
    );
  };

  // Xử lý Xem thêm
  const handleLoadMore = () => {
    fetchComments(page + 1, true);
  };

  return (
    <section className="mt-12 pt-10 border-t border-gray-200">
      {/* Tiêu đề */}
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Bình luận</h2>
        {totalCount > 0 && (
          <span className="px-2.5 py-0.5 text-sm font-medium bg-primary-50 text-primary-700 rounded-full">
            {totalCount}
          </span>
        )}
      </div>

      {/* Khung nhập bình luận gốc */}
      {user ? (
        <div className="flex gap-3 mb-8">
          <UserAvatar src={user.avatarUrl} name={user.firstName} />
          <div className="flex-1">
            <CommentInput
              onSubmit={handleAddComment}
              placeholder="Chia sẻ suy nghĩ của bạn..."
            />
          </div>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
          <p className="text-sm text-gray-500">
            Vui lòng{" "}
            <Link
              to="/login"
              className="text-primary-600 font-medium hover:underline"
            >
              đăng nhập
            </Link>{" "}
            để bình luận.
          </p>
        </div>
      )}

      {/* Trạng thái Loading */}
      {loading && (
        <div className="flex justify-center py-8">
          <FaSpinner className="animate-spin text-primary-500" size={24} />
        </div>
      )}

      {/* Lỗi */}
      {error && (
        <div className="text-center py-6">
          <p className="text-sm text-red-500 mb-3">{error}</p>
          <button
            onClick={() => fetchComments(1)}
            className="text-sm text-primary-600 hover:underline font-medium"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Danh sách bình luận */}
      {!loading && !error && (
        <>
          {comments.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-gray-500 text-sm">
                Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ ý kiến!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <SingleComment
                  key={comment.id}
                  comment={comment}
                  onReplySubmit={handleReplyComment}
                />
              ))}
            </div>
          )}

          {/* Nút Xem thêm */}
          {hasNextPage && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 disabled:opacity-50 transition-colors border border-primary-200"
              >
                {loadingMore ? (
                  <>
                    <FaSpinner className="animate-spin" size={12} />
                    Đang tải...
                  </>
                ) : (
                  "Xem thêm bình luận"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BlogComments;
