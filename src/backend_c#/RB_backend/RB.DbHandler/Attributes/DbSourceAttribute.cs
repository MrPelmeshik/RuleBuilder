namespace RB.DbHandler.Attributes;

public class DbSourceAttribute: Attribute
{
    public readonly string ConnectionName;

    public DbSourceAttribute(string connectionName)
    {
        ConnectionName = connectionName ?? throw new ArgumentNullException(nameof(connectionName));
    }
}
