namespace RB_backend.Models;

/// <summary>
/// Сущность данных
/// </summary>
public class DataEntity
{
    public string? Name { set; get; }
    public int SourceId { set; get; }
    public int ParentId { set; get; }
    public int EntityTypeId { set; get; }
}
