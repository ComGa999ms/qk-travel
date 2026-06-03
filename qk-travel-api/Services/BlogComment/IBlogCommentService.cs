using QkTravelApi.DTOs.BlogComment;
using QkTravelApi.DTOs.Common;

namespace QkTravelApi.Services.BlogComment
{
    public interface IBlogCommentService
    {
        Task<BlogCommentResponse> CreateCommentAsync(int blogId, string userId, CreateBlogCommentRequest request);
        Task<PagedResult<BlogCommentResponse>> GetCommentsByBlogIdAsync(int blogId, int page, int pageSize);
    }
}
