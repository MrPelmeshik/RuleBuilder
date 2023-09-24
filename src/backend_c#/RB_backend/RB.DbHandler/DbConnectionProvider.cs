using System.Data;
using RB.DbHandler.Models;
using Npgsql;

namespace RB.DbHandler;

public class DbConnectionProvider
{
    private static readonly Connection BaseConnection = new Connection
    {
        Host = "postgres",
        Port = 5432,
        Database = "rb",
        Username = "postgres",
        Password = "password_pg_01"
    };

    private readonly IEnumerable<Connection> _connections;

    public DbConnectionProvider()
    {
        _connections = GetConnections();
    }
    
    public Connection GetConnection(string? connectionName)
    {
        if (string.IsNullOrEmpty(connectionName))
            throw new ArgumentNullException(nameof(connectionName));

        return _connections.FirstOrDefault(conn => conn.Name == connectionName) 
               ?? throw new Exception($"Неудалось получить подключение по наименованию '{connectionName}'");
    }

    private IEnumerable<Connection> GetConnections()
    {
        using IDbConnection connection = new NpgsqlConnection(BaseConnection.ToString());
        return connection.Read<Connection>();
    }
}
