using AutoMapper;
using QkTravelApi.DTOs.Contact;
using QkTravelApi.Entities;

namespace QkTravelApi.Mapping;

public class ContactProfile : Profile
{
    public ContactProfile()
    {
        CreateMap<ContactMessageRequest, ContactMessage>();

        CreateMap<ContactTopic, ContactTopicDto>();
    }
}