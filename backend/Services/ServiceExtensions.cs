using backend.Services;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Extensions{
    public static class ServiceExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services){
            // services.AddScoped<UserService>();
            services.AddScoped<HelloService>();
        }
    }
}