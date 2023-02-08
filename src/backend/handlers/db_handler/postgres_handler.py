import copy
import logging
from ..connection_param import ConnectionParam
from contextlib import closing
import psycopg2
from src.backend.handlers.type_handler.schema_type import schema_type
from src.backend.handlers.type_handler.table_type import table_type
from ..type_handler.column_table_type import column_table_type


class PostgresqlHandler:
    connectionParam: ConnectionParam

    def __init__(self, connectionParam: ConnectionParam):
        self.setConnectionParam(connectionParam)

    def setConnectionParam(self, connectionParam: ConnectionParam):
        """ Метод для установки параметров подключения """
        if connectionParam is None:
            raise ValueError('Connection param is empty')

        self.connectionParam = copy.deepcopy(connectionParam)

    def openConnection(self):
        """ Метод для ручного открытия подключения """
        self.connection = psycopg2.connect(dbname=self.connectionParam.database,
                                           user=self.connectionParam.user,
                                           password=self.connectionParam.password,
                                           host=self.connectionParam.host,
                                           port=self.connectionParam.port)
        self.cursor = self.connection.cursor()

    def closeConnection(self):
        """ Метод для ручного закрытия подключения """
        self.cursor.close()
        self.connection.close()

    def queryExecute(self, query):
        """
        Метод для обработки запросов к БД
        (открытие и закрытие подключений происходят автоматически)
        """
        result = []
        with closing(psycopg2.connect(dbname=self.connectionParam.database,
                                      user=self.connectionParam.user,
                                      password=self.connectionParam.password,
                                      host=self.connectionParam.host,
                                      port=self.connectionParam.port)) as connection:
            with connection.cursor() as cursor:
                logging.debug(f'PostgresqlHandler:queryExecute: {query}')
                cursor.execute(query)

                for row in cursor:
                    item = {}
                    for i in range(len(row)):
                        item.update({f'{cursor.description[i].name}': row[i]})
                    result.append(item)

        return result

    def getData(self, schema: str, table: str, **options):
        '''
        Формирование и исполнение SELECT запросов
        :param schema: название схемы
        :param table: название таблицы
        :param fields: список необходимых полей. По умолчанию '*'
        :param ids: список id для фильтрации по полю 'id'
        :return: Результат запроса в формате словарая
        '''
        ids = options['ids'] if 'ids' in options.keys() else None
        fields = options['fields'] if 'fields' in options.keys() else '*'
        limit = options['limit'] if 'limit' in options.keys() else ''
        offset = options['offset'] if 'offset' in options.keys() else ''

        query = f'select {", ".join(map(str, fields))} from {schema}.{table}'
        if ids is not None:
            query += f' where id in ({", ".join(map(str, ids))})'
        if limit is not None:
            query += f' limit {limit}'
        if offset is not None:
            offset += f' offset {offset}'

        return self.queryExecute(query)

    def getAllSchema(self):
        '''
        Получение всех схем БД

            select schema_name
            from information_schema.schemata;
        '''
        query = 'select schema_name from information_schema.schemata'

        return [schema_type.convertPostgresSchemaToSchema(pgSchema=schema) for schema in self.queryExecute(query)]

    def getAllTablesBySchema(self, schema: str):
        '''
        Получение всех таблиц схемы в БД
        '''
        query = f'select table_name from information_schema.tables where table_schema = \'{schema}\''

        return [table_type.convertPostgresTableToTable(pgTable=table) for table in self.queryExecute(query)]

    def getColumnsByTable(self, schema: str, table: str):
        '''
        Получение информации о полях таблицы
        '''
        query = f'select column_name, data_type from information_schema.columns where table_schema = \'{schema}\' and table_name =  \'{table}\''

        return [column_table_type.convertPostgresColumnToColumn(pgColumn=column) for column in self.queryExecute(query)]

    def getPreviewDataForTable(self, schema: str, table: str):
        '''
        Получение примера данных с источника
        '''
        return self.getData(schema, table, limit=10)
