using Microsoft.Extensions.Logging;
using RB.DbHandler.Interfaces;

namespace RB.DbHandler;

public abstract class DbDataProviderBase<T> : DbDataReaderProviderBase<T> where T : IDataClass, IDbDataWriterProvider<T>
{
    protected DbDataProviderBase(
        ILogger<DbDataProviderBase<T>> logger,
        DbHandler dbHandler) : base(logger, dbHandler)
    { }
}
