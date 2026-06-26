using System.Text.Json.Serialization;
using StackExchange.Redis;
using QkTravelApi.Common.Filters;
using QkTravelApi.Common.Settings;
using QkTravelApi.Services.AI;
using QkTravelApi.Services.Auth;
using QkTravelApi.Services.File;
using QkTravelApi.Services.Contact;
using QkTravelApi.Services.Destination;
using QkTravelApi.Services.Email;
using QkTravelApi.Services.Payment;
using QkTravelApi.Services.Plan;
using QkTravelApi.Services.Quota;
using QkTravelApi.Services.UserPlanSubscription;
using QkTravelApi.Services.Giftcode;
using QkTravelApi.Services.WebsiteFeedback;
using QkTravelApi.Services.User;
using QkTravelApi.Services.Audit;
using QkTravelApi.Services.Blog;
using QkTravelApi.Services.BlogComment;
using QkTravelApi.Services.SpinPrize;
using QkTravelApi.Services.Crawling;

namespace QkTravelApi.Common.Extensions
{
    /// <summary>
    /// Extension methods for application services registration
    /// </summary>
    public static class ServiceExtensions
    {
        /// <summary>
        /// Register application services
        /// </summary>
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Register AutoMapper
            services.AddAutoMapper(typeof(Program).Assembly);

            services.AddHttpContextAccessor();

            // Register application services
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IEmailService, SmtpEmailService>();
            services.AddScoped<IFileService, S3Service>();
            services.AddScoped<IRegionService, RegionService>();
            services.AddScoped<ILocationService, LocationService>();
            services.AddScoped<IDestinationService, DestinationService>();
            services.AddScoped<IAIService, OpenAIService>();
            services.AddScoped<IPlanGenerationService, PlanGenerationService>();
            services.AddScoped<IUserPlanSubscriptionService, UserPlanSubscriptionService>();
            services.AddScoped<IQuotaService, QuotaService>();
            services.AddScoped<ITravelHobbyService, TravelHobbyService>();
            services.AddScoped<IPriceSettingService, PriceSettingService>();
            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IPaymentService, SepayPaymentService>();
            services.AddScoped<IGiftcodeService, GiftcodeService>();
            services.AddScoped<IWebsiteFeedbackService, WebsiteFeedbackService>();
            services.AddScoped<IUserManagementService, UserManagementService>();
            services.AddScoped<IAuditLogService, AuditLogService>();
            services.AddScoped<IBlogService, BlogService>();
            services.AddScoped<IBlogCommentService, Services.BlogComment.BlogCommentService>();
            services.AddScoped<ISpinPrizeService, SpinPrizeService>();
            services.AddScoped<ICrawlJobService, CrawlJobService>();
            services.AddScoped<ITravelCrawler, VietnamTravelCrawler>();
            services.AddScoped<ITravelCrawler, WikivoyageCrawler>();
            services.AddScoped<ITravelCrawler, VnExpressTravelCrawler>();

            // Register Hosted Services
            services.AddHostedService<QkTravelApi.Worker.PaymentCleanupWorker>();

            return services;
        }

        /// <summary>
        /// Configure email settings
        /// </summary>
        public static IServiceCollection AddConfigurations(this IServiceCollection services, IConfiguration configuration)
        {
            // Email Settings
            services.Configure<QkTravelApi.Common.Settings.EmailSettings>(
                configuration.GetSection("EmailSettings"));

            // JWT Settings
            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));

            // AWS Settings
            services.Configure<AwsSettings>(configuration.GetSection("AwsSettings"));

            // AI Settings
            services.Configure<AISettings>(configuration.GetSection("AISettings"));

            services.Configure<SepaySettings>(configuration.GetSection("SepaySettings"));

            // Google Auth Settings
            services.Configure<GoogleAuthSettings>(configuration.GetSection("GoogleAuthSettings"));

            return services;
        }

        /// <summary>
        /// Register logging action filter
        /// </summary>
        public static IServiceCollection AddLoggingFilter(this IServiceCollection services)
        {
            services.AddControllers(options =>
            {
                options.Filters.Add<LoggingActionFilter>();
            });
            return services;
        }

        public static IServiceCollection AddJsonConverter(this IServiceCollection services)
        {
            services.AddControllers()
            .AddJsonOptions(o =>
            {
                o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
            return services;
        }

    }
}
