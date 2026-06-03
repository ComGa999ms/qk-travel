import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import blogService from "../services/blogService";
import BlogComments from "../components/blog/BlogComments";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const data = await blogService.getBlogById(id);
        if (!data) {
          throw new Error("Blog not found");
        }
        setBlog(data);
      } catch (err) {
        console.error("Failed to fetch blog detail:", err);
        setError("Không tìm thấy bài viết hoặc có lỗi xảy ra.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
        <i className="fas fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Đã có lỗi xảy ra
        </h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => navigate("/blogs")}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Header Image */}
      <div className="relative h-[400px] w-full group">
        <Link
          to="/blogs"
          className="absolute top-6 left-6 z-10 inline-flex items-center text-white/90 hover:text-white font-medium text-lg group-hover:-translate-x-1 transition-all"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Quay lại danh sách bài viết
        </Link>
        <img
          src={blog.thumbnailUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary-600/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center text-white/90 text-sm md:text-base space-x-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md mr-3 text-white font-bold">
                  {blog.authorAvatar ? (
                    <img
                      src={blog.authorAvatar}
                      alt={blog.authorName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    blog.authorName?.[0] || "A"
                  )}
                </div>
                <span>{blog.authorName || "Đội ngũ QkTravel"}</span>
              </div>
              <span className="flex items-center">
                <i className="far fa-calendar-alt mr-2"></i>
                {new Date(blog.createdAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}

        {/* Article Body */}
        <article className="prose prose-xl md:prose-2xl max-w-none prose-img:rounded-2xl prose-headings:text-gray-900 prose-p:text-gray-700">
          {/* Using dangerouslySetInnerHTML assuming content might be HTML.
                 In a real app, should sanitize this. */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>

        {/* Khu vực Bình luận */}
        <BlogComments blogId={blog.id} />
      </div>
    </div>
  );
};

export default BlogDetail;
