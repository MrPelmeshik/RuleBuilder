import copy
import logging

from src.handlers.connection_param import ConnectionParam
from contextlib import closing
import psycopg2


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

    def getData(self, schema:str, table:str, **options):
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

        query = f'select {", ".join(map(str, fields))} from {schema}.{table}'
        if ids is not None:
            query += f' where id in ({", ".join(map(str, ids))})'

        return self.queryExecute(query)