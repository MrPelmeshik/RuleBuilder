namespace RB.DbHandler.Interfaces;

public interface IDbDataReaderProvider<out T> : IDbDataProvider<T> where T : IDataClass
{
    IEnumerable<T> GetAll();
}
