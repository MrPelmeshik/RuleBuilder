using Microsoft.Extensions.DependencyInjection;

namespace RB.DbHandler;

public static class IocContainer
{
    public static void AddDbHandler(this IServiceCollection services)
    {
        services.AddSingleton<DbHandler>();
        services.AddSingleton<DbConnectionProvider>();
    }
}
