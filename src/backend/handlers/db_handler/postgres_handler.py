import copy
import logging
from src.backend.types.connection_param import ConnectionParam
from contextlib import closing
import psycopg2

from src.backend.types.filter_type import FilterType
from src.backend.types.meta_type_converter import MetaTypeConverter


class PostgresqlHandler:
    connectionParam: ConnectionParam

    def __init__(self, connectionParam: ConnectionParam):
        if connectionParam is None:
            raise ValueError('Connection param is empty')
        if connectionParam.source_type != 'postgres':
            raise ValueError('Invalid connection source type')

        self.connectionParam = copy.deepcopy(connectionParam)

    # region core methods

    def openConnection(self):
        """ Метод для ручного открытия подключения """
        self.connection = psycopg2.connect(dbname=self.connectionParam.database,
                                           user=self.connectionParam.username,
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
                                      user=self.connectionParam.username,
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
        """
        Формирование и исполнение SELECT запросов
        :param schema: название схемы
        :param table: название таблицы
        :param fields: список необходимых полей. По умолчанию '*'
        :param filters: список фильтрации [FilterType]
        :return: Результат запроса в формате словарая
        """
        filters = options['filters'] if 'filters' in options.keys() else None
        fields = options['fields'] if 'fields' in options.keys() else '*'
        limit = options['limit'] if 'limit' in options.keys() else None
        offset = options['offset'] if 'offset' in options.keys() else None

        query = f'select {", ".join(map(str, fields))} from {schema}.{table}'

        def getFilterValue(type, value):
            if type == int:
                return str(value)
            elif type == str:
                return value
            else:
                raise Exception('Invalid filter type')

        if filters is not None:
            whereItems = []
            for filter in filters:
                if type(filter.value) is list:
                    target = ' in(' + ', '.join(getFilterValue(filter.type, value) for value in filter.value) + ')'
                else:
                    target = ' = ' + str(getFilterValue(filter.type, filter.value))
                whereItems.append(filter.field + target)
            query += ' where ' + ' and '.join(whereItems)


        if limit is not None:
            query += f' limit {limit}'

        if offset is not None:
            query += f' offset {offset}'

        return self.queryExecute(query)

    # endregion

    # region get meta

    def getSources(self, environment: str = None):
        """ Получение источников """
        if environment is not None:
            return self.getSorcesByEnvironmentName(environment)
        else:
            return self.getData('meta', 'connection')

    def getSorcesByEnvironmentName(self, environment: str):
        """ Получение источников """
        return self.getData('meta', 'connection', filters=[FilterType('environment', str, environment)])

    def getSorceById(self, sourceId: int):
        """ Получение данных об источнике """
        return self.getData('meta', 'connection', filters=[FilterType('id', int, sourceId)])

    def getSchemasBySource(self, sourceId: int):
        """ Получение схем источника """
        return self.getData('meta', 'schema', filters=[FilterType('source_id', int, sourceId)])

    def getSchemaById(self, schemaId: int):
        """ Получение данных о схеме """
        return self.getData('meta', 'schema', filters=[FilterType('id', int, schemaId)])

    def getTablesBySchema(self, schemaId: int):
        """ Получение таблиц схемы """
        return self.getData('meta', 'table', filters=[FilterType('schema_id', int, schemaId)])

    def getTableById(self, tableId: int):
        """ Получение данных о таблице """
        return self.getData('meta', 'table', filters=[FilterType('id', int, tableId)])

    def getColumnsByTable(self, tableName: str):
        """ Получение колонок таблицы """
        columns = self.getData('information_schema', 'columns', fields=['column_name', 'data_type'], filters=[FilterType('table_name', str, tableName)])
        return [MetaTypeConverter.convertPgColumn(column) for column in columns]

    # endregion