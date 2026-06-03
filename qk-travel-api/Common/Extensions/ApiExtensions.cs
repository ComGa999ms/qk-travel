using Microsoft.OpenApi.Models;
using QkTravelApi.Common.Settings;

namespace QkTravelApi.Common.Extensions
{
    /// <summary>
    /// Extension methods for API configuration
    /// </summary>
    public static class ApiExtensions
    {
        /// <summary>
        /// Add API controllers and JSON configuration
        /// </summary>
        public static IServiceCollection AddApiConfiguration(this IServiceCollection services)
        {
            // Configure JSON serialization options
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
                    options.JsonSerializerOptions.WriteIndented = true;
                });

            // Add global exception handler
            services.AddExceptionHandler<QkTravelApi.Common.Exceptions.GlobalExceptionHandler>();
            services.AddProblemDetails();

            // Add Swagger/OpenAPI
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });

            return services;
        }

        /// <summary>
        /// Add CORS configuration
        /// </summary>
        public static IServiceCollection AddCorsConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var corsSettings = configuration.GetSection("CorsSettings").Get<CorsSettings>();

            services.AddCors(options =>
            {
                options.AddPolicy("DefaultCorsPolicy", policy =>
                {
                    // 1. NẾU QUÊN CẤU HÌNH TRÊN RENDER -> MỞ CỬA CHO TẤT CẢ (Tránh bị Crash)
                    if (corsSettings == null)
                    {
                        policy.AllowAnyOrigin()
                              .AllowAnyMethod()
                              .AllowAnyHeader();
                        return; // Thoát luôn, không chạy đoạn dưới nữa
                    }

                    // 2. NẾU CÓ CẤU HÌNH -> KIỂM TRA KỸ TỪNG MỤC TRƯỚC KHI DÙNG
                    if (corsSettings.AllowedOrigins != null && corsSettings.AllowedOrigins.Length > 0 && corsSettings.AllowedOrigins[0] != "*")
                    {
                        policy.WithOrigins(corsSettings.AllowedOrigins);
                    }
                    else
                    {
                        if (corsSettings.AllowCredentials)
                        {
                            policy.SetIsOriginAllowed(_ => true);
                        }
                        else
                        {
                            policy.AllowAnyOrigin();
                        }
                    }

                    if (corsSettings.AllowedMethods != null && corsSettings.AllowedMethods.Length > 0 && corsSettings.AllowedMethods[0] != "*")
                    {
                        policy.WithMethods(corsSettings.AllowedMethods);
                    }
                    else
                    {
                        policy.AllowAnyMethod();
                    }

                    if (corsSettings.AllowedHeaders != null && corsSettings.AllowedHeaders.Length > 0 && corsSettings.AllowedHeaders[0] != "*")
                    {
                        policy.WithHeaders(corsSettings.AllowedHeaders);
                    }
                    else
                    {
                        policy.AllowAnyHeader();
                    }

                    if (corsSettings.AllowCredentials)
                    {
                        policy.AllowCredentials();
                    }
                });
            });

            return services;
        }
    }
}