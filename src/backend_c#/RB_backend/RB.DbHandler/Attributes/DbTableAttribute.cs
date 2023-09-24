namespace RB.DbHandler.Attributes;

public class DbTableAttribute: Attribute
{
    public readonly string? TableName;

    public DbTableAttribute(string? tableName)
    {
        TableName = tableName ?? throw new ArgumentNullException(nameof(tableName));
    }
}
