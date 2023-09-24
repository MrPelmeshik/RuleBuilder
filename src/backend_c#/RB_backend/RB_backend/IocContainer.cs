using RB_backend.Providers;
using RB.DbHandler.Interfaces;
using RB.DbHandler.Models;

namespace RB_backend;

public static class IocContainer
{
    public static void AddBase(this IServiceCollection services)
    {
        services.AddSingleton<IDbDataReaderProvider<Connection>, ConnectionProvider>();
    }
}
