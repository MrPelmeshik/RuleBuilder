namespace RB.DbHandler.Attributes;

public class DbSchemaAttribute: Attribute
{
    public readonly string? SchemaName;

    public DbSchemaAttribute(string? schemaName)
    {
        SchemaName = schemaName ?? throw new ArgumentNullException(nameof(schemaName));
    }
}
