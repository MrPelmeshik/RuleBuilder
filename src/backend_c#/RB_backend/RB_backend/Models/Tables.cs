using RB.DbHandler.Attributes;

namespace RB_backend.Models;

/// <summary>
/// Список таблиц
/// </summary>
[DbSource("pg_01_rb")]
[DbSchema("information_schema")]
[DbTable("tables")]
public class Tables
{
    public string? TableCatalog { set; get; }
    public string? TableSchema { set; get; }
    public string? TableName { set; get; }
    public string? TableType { set; get; }
}
