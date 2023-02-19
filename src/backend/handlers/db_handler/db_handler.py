from src.backend.types.connection_param import ConnectionParam, convertDictToConnectionParamList
from src.backend.handlers.db_handler.clickhouse_handler import ClickhouseHandler
from src.backend.handlers.db_handler.postgres_handler import PostgresqlHandler


def getHandler(connectionParam: ConnectionParam):
    if connectionParam is None:
        raise ValueError('Connection param is empty')

    if connectionParam.source_type == 'postgres':
        return PostgresqlHandler(connectionParam)
    elif connectionParam.source_type == 'clickhouse':
        return ClickhouseHandler(connectionParam)
    else:
        raise ValueError('Invalid connection source type')


class DbHandler:

    def __init__(self, connectionParam: ConnectionParam):
        self.handler = getHandler(connectionParam)

    # region get meta

    def getSorces(self, environment: str = None):
        """ Получение источников """
        return self.handler.getSources(environment)

    def getSchemasBySource(self, sourceId: int):
        """ Получение схем источника """
        return self.handler.getSchemasBySource(sourceId)

    def getTablesBySchema(self, schemaId: int):
        """ Получение таблиц схемы """
        return self.handler.getTablesBySchema(schemaId)

    def getColumnsByTable(self, tableId: int):
        """ Получение колонок таблицы """
        table = self.handler.getTableById(tableId)[0]

        schema = self.handler.getSchemaById(table['schema_id'])[0]
        source = self.handler.getSorceById(schema['source_id'])[0]
        connection = convertDictToConnectionParamList([source])[0]

        handler = getHandler(connection)
        tableName = '\'' + table['name'] + '\''
        return handler.getColumnsByTable(tableName)

    def getPreviewDataByTable(self):
        """ Получение примера данных с источника """
        raise Exception('getPreviewDataByTable not implement')

    # endregion
