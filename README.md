# DataStat
Визуализация данных из БД

---
## Что сейчас умеет?

###Запрашивать данные с БД
Создаем объект БД:
```python
db = DbProvider(POSTGRES_CONNECTION)
```
Вызываем метод обработки для запроса данных с БД:
```python
result = DbRequester.getData(
        dbProvider,
        DB_TABLES['table'],
        ids=[1, 2, 3],
        fields=['field_1', 'field_2'])
```
Аргументы **ids** и **fields** являются необязательными. Если их опустить, то будет выполнен:`SELECT * FROM table`. В противном случае можно их можно использовать для указания необходимых полей и id для выборки.

###Рисуем график
Создаем объект графика:
```python
graph = Graph(
        'title',
        AxisData('field_x', result, 'key'),
        AxisData('field_y', result, 'key'))
```
Аргументы key можно опустить, если нет необходимости подписывать оси на графике отличными от названия полей в БД значениями.
Рисуем график:
```python
graph.drawGraph(limit, offset)
```
Аргументы **limit** и **offset** можно опустить, если нет необходимости в соотвествующих ограничениях

###Реализовано, но не используется
При необходимости можно открыть полключение вручную через `openConnection()`, выполнить необходимый запрос через `execute()`. Выжно помнить, что необходимо после этого вручную закрыть подключение через `closeConnection()`. Пример использования:
```python
db = DbProvider(POSTGRES_CONNECTION)

query = 'ВАШ ЗАПРОС'

db.openConnection()
db.cursor.execute(query)

# здесь можно забрать результат запроса из cursor

db.closeConnection()
```
---
## Как запустить?
На текущий момент в качестве БД используется **PostgreSql**.
> pip install psycopg2

Графики отрисовываются через **matplotlib** и **scipy**:
> pip install matplotlib

> pip install scipy

> pip install numpy

Для запускса необходиом добавить конфигурационный файл с информацией о подключении к БД и списком используемых таблиц. Я использую **config.py** файл, который содерит следующее:
```python
POSTGRES_CONNECTION = {
    'dbname': 'dbname',
    'user': 'postgres',
    'password': 'password',
    'host': '127.0.0.1'
}
DB_TABLES = {
    'table': 'schema.table'
}
```
