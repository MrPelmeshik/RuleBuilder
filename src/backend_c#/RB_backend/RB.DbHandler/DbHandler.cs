using System.Data;
using Npgsql;
using RB.DbHandler.Interfaces;
using static RB.DbHandler.Attributes.AttributeExtensions;

namespace RB.DbHandler;

public class DbHandler
{
    private readonly DbConnectionProvider _connectionProvider;
    
    public DbHandler(DbConnectionProvider connectionProvider)
    {
        _connectionProvider = connectionProvider ?? throw new ArgumentNullException(nameof(connectionProvider));
    }
    
    public IEnumerable<T> Read<T>() where T : IDataClass
    {
        var connectionName = GetSourceName<T>();
        var connectionModel = _connectionProvider.GetConnection(connectionName);

        using IDbConnection connection = new NpgsqlConnection(connectionModel.ToString());
        return connection.Read<T>();
    }
}
