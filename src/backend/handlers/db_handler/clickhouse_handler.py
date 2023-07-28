import copy
import logging
from contextlib import closing

import clickhouse_connect
from src.backend.types.connection_param import ConnectionParam


class ClickhouseHandler:
    connectionParam: ConnectionParam

    def __init__(self, connectionParam: ConnectionParam):
        if connectionParam is None:
            raise ValueError('Connection param is empty')
        if connectionParam.source_type != 'clickhouse':
            raise ValueError('Invalid connection source type')

        self.connectionParam = copy.deepcopy(connectionParam)

    # region core methods

    def openConnection(self):
        """ Метод для ручного открытия подключения """

        self.client = clickhouse_connect.get_client(database=self.connectionParam.database,
                                                    username=self.connectionParam.username,
                                                    host=self.connectionParam.host,
                                                    port=self.connectionParam.password)

    def queryExecute(self, query):
        """
        Метод для обработки запросов к БД
        (открытие и закрытие подключений происходят автоматически)
        """
        result = []
        with closing(clickhouse_connect.get_client(database=self.connectionParam.database,
                                                   username=self.connectionParam.username,
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
        """
        Формирование и исполнение SELECT запросов
        :param schema: название схемы
        :param table: название таблицы
        :param fields: список необходимых полей. По умолчанию '*'
        :param filters: список фильтрации ...
        :return: Результат запроса в формате словарая
        """
        # filters = options['filters'] if 'filters' in options.keys() else None
        fields = options['fields'] if 'fields' in options.keys() else '*'
        limit = options['limit'] if 'limit' in options.keys() else None
        offset = options['offset'] if 'offset' in options.keys() else None

        query = f'select {", ".join(map(str, fields))} from {schema}.{table}'

        # if filters is not None:
        #     whereItems = []
        #     for filter in filters:
        #         target = None
        #         if type(filter[1]) is list:
        #             target = 'in(' + filter[1].join(', ') + ')'
        #         else:
        #             target = '=' + filter[1]
        #
        #         whereItems.append(filter[0] + target)

        if limit is not None:
            query += f' limit {limit}'

        if offset is not None:
            query += f' offset {offset}'

        return self.queryExecute(query)

    # endregion

    # region get meta

    # region invalid method

    def getSources(self, environment: str = None):
        """ Получение источников """
        if environment is not None:
            return self.getSorcesByEnvironmentName(environment)
        else:
            raise Exception('getSources is not implement')

    def getSorcesByEnvironmentName(self, environment: str):
        """ Получение источников """
        raise Exception('getSorcesByEnvironmentName is not implement')

    def getSchemasBySource(self, sourceId: int):
        """ Получение схем источника """
        raise Exception('getSchemasBySource is not implement')

    def getTablesBySchema(self, schemaId: int):
        """ Получение таблиц схемы """
        raise Exception('getTablesBySchema is not implement')

    # endregion

    def getColumnsByTable(self, tableId: int):
        """ Получение колонок таблицы """
        pass

    # endregion

    # def getSchemas(self, sourceId: int):
    #     """ Получение всех схем истоника """
    #     query = 'show databases'
    #
    #     return [schema_type.convertClickhouseSchemaToSchema(chSchema=schema) for schema in self.queryExecute(query)]
    #
    # def getAllTablesBySchema(self, schema: str):
    #     """
    #     Получение всех таблиц схемы в БД
    #     """
    #     query = f'show tables from {schema}'
    #
    #     return [table_type.convertClickhouseTableToTable(chTable=table) for table in self.queryExecute(query)]
    #
    # def getColumnsByTable(self, schema: str, table: str):
    #     """
    #     Получение информации о полях таблицы
    #     """
    #     query = f'select column_name, column_type from information_schema.columns where table_schema = \'{schema}\' and table_name = \'{table}\''
    #
    #     return [column_table_type.convertClickhouseColumnToColumn(chColumn=column) for column in self.queryExecute(query)]
    #
    # def getPreviewDataForTable(self, schema: str, table: str):
    #     '''
    #     Получение примера данных с источника
    #     '''
    #     return self.getData(schema, table, limit=10)
