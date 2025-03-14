using backend.Services;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Extensions{
    public static class ServiceExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services){
            // services.AddScoped<UserService>();
            services.AddScoped<HelloService>();
            services.AddScoped<IMessageService, SMSService>();
            services.AddScoped<Notification>();
            services.AddScoped<IRoleService,RoleService>();
            services.AddScoped<IPermissionService, PermissionService>();
            services.AddScoped<IUserService, UesrService>();
        }
    }
}