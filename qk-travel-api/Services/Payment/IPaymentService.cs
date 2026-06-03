using QkTravelApi.Common;
using QkTravelApi.DTOs.Common;
using QkTravelApi.DTOs.Payment;

namespace QkTravelApi.Services.Payment
{
    public interface IPaymentService
    {
        Task<PaymentOrderResponse> CreatePaymentOrderAsync(string userId, CreatePaymentRequest dto);
        Task<PaymentTransactionResponse> GetPaymentByIdAsync(Guid paymentId, string userId);
        Task<PagedResult<PaymentTransactionResponse>> GetUserPaymentHistoryAsync(string userId, int page, int pageSize);
        Task<bool> IsOrderPaidAsync(string orderCode);
        Task ProcessWebhookAsync(SepayWebhookRequest webhookData);
    }
}
