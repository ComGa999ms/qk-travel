using QkTravelApi.DTOs.Contact;
using QkTravelApi.Entities;

namespace QkTravelApi.Services.Contact;

public interface IContactService
{
    Task<bool> SendEmailAsync(ContactMessageRequest contactMessageRequest);

    Task<List<ContactTopicDto>> GetTopicsAsync();
}