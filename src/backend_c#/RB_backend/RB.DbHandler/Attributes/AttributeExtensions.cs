using RB.DbHandler.Interfaces;

namespace RB.DbHandler.Attributes;

public static class AttributeExtensions
{
    public static string GetSourceName<T>() where T : IDataClass
    {
        var connectionName = typeof(T).GetAttributeProperties<DbSourceAttribute>().ConnectionName;
        return Validate<T>(connectionName, "имя источника данных");
    }
    
    public static string GetSchemaName<T>() where T : IDataClass 
    {
        var schemaName = typeof(T).GetAttributeProperties<DbSchemaAttribute>().SchemaName;
        return Validate<T>(schemaName, "имя схемы");
    }
    
    public static string GetTableName<T>() where T : IDataClass 
    {
        var tableName = typeof(T).GetAttributeProperties<DbTableAttribute>().TableName;
        return Validate<T>(tableName, "имя таблицы");
    }

    private static string Validate<T>(string? str, string detail) where T : IDataClass 
        => str ?? throw new Exception($"Неудалось получить {detail} для дата-класса '{typeof(T)}'");
    
    private static T GetAttributeProperties<T>(this Type type) where T : Attribute
    {
        return (T)type
        .GetCustomAttributes(typeof(T), false)
        .FirstOrDefault()! ?? throw new Exception($"Ошибка получения атрибута '{typeof(T)}' у класса '{type}'");
    }
}
