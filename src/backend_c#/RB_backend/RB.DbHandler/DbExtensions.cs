using System.Data;
using Dapper;
using RB.DbHandler.Interfaces;
using static RB.DbHandler.Attributes.AttributeExtensions;

namespace RB.DbHandler;

public static class DbExtensions
{
    public static IEnumerable<T> Read<T>(this IDbConnection connection) where T : IDataClass
    {
        var schemaName = GetSchemaName<T>();
        var tableName = GetTableName<T>();

        var selectBlock = GetSqlSelectBlock<T>();

        var query = $@"
select {selectBlock}
from {schemaName}.{tableName}
";
        return connection.Query<T>(query);
    }
    
    private static string GetSqlSelectBlock<T>()
    {
        var fields = typeof(T).GetProperties();
        return "\t" + string.Join(",\n\t", fields
        .Select(f =>
        {
            var sqlFieldName = string.Join(null, f.Name
            .Select((c, i) => char.IsUpper(c) && i != 0 ? $"_{char.ToLower(c)}" : char.ToLower(c).ToString())
            .ToArray());
            return $"{sqlFieldName} as {f.Name.ToString()}";
        }));
    }
}
