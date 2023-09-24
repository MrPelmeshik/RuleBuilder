using RB.DbHandler.Attributes;
using RB.DbHandler.Interfaces;

namespace RB.DbHandler.Models;

/// <summary>
/// Подключения
/// </summary>
[DbSource("pg_01_rb")]
[DbSchema("meta")]
[DbTable("connection")]
public class Connection : IDataClass
{
    public int Id { set; get; }
    public string? Environment { set; get; }
    public string? Name { set; get; }
    public string? SourceType { set; get; }
    public string? Host { set; get; }
    public int? Port { set; get; }
    public string? Database { set; get; }
    public string? SearchPath { set; get; }
    public string? Username { set; get; }
    public string? Password { set; get; }
    public int? Timeout { set; get; }
    public int? CommandTimeout { set; get; }
    public bool? NoResetOnClose { set; get; }
    public string? Providers { set; get; }
    public string? Protocol { set; get; }
    public string? Comment { set; get; }
    public string? Driver { set; get; }
    
    
    public override string ToString()
    {
        return $"Host={Host};Port={Port};Database={Database};Username={Username};Password={Password}";
    }
}
