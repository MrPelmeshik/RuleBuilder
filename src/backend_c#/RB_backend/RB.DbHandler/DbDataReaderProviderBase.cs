using Microsoft.Extensions.Logging;
using RB.DbHandler.Interfaces;

namespace RB.DbHandler;

public abstract class DbDataReaderProviderBase<T> : IDbDataReaderProvider<T> where T : IDataClass
{
    protected readonly ILogger<DbDataReaderProviderBase<T>> Logger;
    protected readonly DbHandler Handler;

    protected DbDataReaderProviderBase(
        ILogger<DbDataReaderProviderBase<T>> logger,
        DbHandler dbHandler)
    {
        Logger = logger ?? throw new ArgumentNullException(nameof(logger));
        Handler = dbHandler ?? throw new ArgumentNullException(nameof(dbHandler));
    }

    public IEnumerable<T> GetAll()
    {
        return Handler.Read<T>();
    }
}
