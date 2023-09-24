namespace RB.DbHandler.Interfaces;

public interface IDbDataWriterProvider<T> : IDbDataProvider<T>  where T : IDataClass
{
    // todo: Надо что-то придумать для интерфейса провайдера для записи данных в БД

    void Insert(IEnumerable<T> data);
    void Insert(T data);
    void Update(IEnumerable<T> data);
    void Update(T data);
    void InsertOrUpdate(IEnumerable<T> data);
    void InsertOrUpdate(T data);
}
