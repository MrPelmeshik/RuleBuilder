using RB.DbHandler;
using RB.DbHandler.Interfaces;
using RB.DbHandler.Models;

namespace RB_backend.Providers;

public class ConnectionProvider : DbDataReaderProviderBase<Connection>
{
    public ConnectionProvider(
        ILogger<ConnectionProvider> logger,
        DbHandler dbHandler) : base(logger, dbHandler) 
    { }
}
