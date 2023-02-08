import copy
import logging
from contextlib import closing
import clickhouse_connect
from src.backend.handlers.type_handler.schema_type import schema_type
from ..connection_param import ConnectionParam
from src.backend.handlers.type_handler.table_type import table_type
from ..type_handler.column_table_type import column_table_type


class ClickhouseHandler:
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

        self.client = clickhouse_connect.get_client(database=self.connectionParam.database,
                                                    username=self.connectionParam.user,
                                                    host=self.connectionParam.host,
                                                    port=self.connectionParam.password)

    def queryExecute(self, query):
        """
        Метод для обработки запросов к БД
        (открытие и закрытие подключений происходят автоматически)
        """
        result = []
        with closing(clickhouse_connect.get_client(database=self.connectionParam.database,
                                                   username=self.connectionParam.user,
                                                   host=self.connectionParam.host,
                                                   port=self.connectionParam.password)) as client:

            logging.debug(f'ClickhouseHandler:queryExecute: {query}')
            res = client.query(query)

            for row in res.result_rows:
                item = {}
                for i in range(len(row)):
                    item.update({f'{res.column_names[i]}': row[i]})
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
        '''
        query = 'show databases'

        return [schema_type.convertClickhouseSchemaToSchema(chSchema=schema) for schema in self.queryExecute(query)]

    def getAllTablesBySchema(self, schema: str):
        '''
        Получение всех таблиц схемы в БД
        '''
        query = f'show tables from {schema}'

        return [table_type.convertClickhouseTableToTable(chTable=table) for table in self.queryExecute(query)]

    def getColumnsByTable(self, schema: str, table: str):
        '''
        Получение информации о полях таблицы
        '''
        query = f'select column_name, column_type from information_schema.columns where table_schema = \'{schema}\' and table_name = \'{table}\''

        return [column_table_type.convertClickhouseColumnToColumn(chColumn=column) for column in self.queryExecute(query)]
    def getPreviewDataForTable(self, schema: str, table: str):
        '''
        Получение примера данных с источника
        '''
        return self.getData(schema, table, limit=10)
