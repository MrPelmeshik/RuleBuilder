from contextlib import closing
import psycopg2


class DbProvider:

    def __init__(self, dataConnection):
        if dataConnection is None:
            raise Exception('Отсутствует строка подключения к БД')

        self.dbname = dataConnection['dbname']
        self.user = dataConnection['user']
        self.password = dataConnection['password']
        self.host = dataConnection['host']

    def openConnection(self):
        """ Метод для ручного открытия подключения в рамках объекта DbProvider """
        self.connection = psycopg2.connect(dbname=self.dbname, user=self.user,
                                           password=self.password, host=self.host)
        self.cursor = self.connection.cursor()

    def closeConnection(self):
        """ Метод для ручного закрытия подключения в рамках объекта DbProvider """
        self.cursor.close()
        self.connection.close()

    def queryExecute(self, query):
        """
        Метод для обработки запросов к БД
        (открытие и закрытие подключений происходят автоматически)
        """
        result = []
        with closing(psycopg2.connect(dbname=self.dbname, user=self.user,
                                      password=self.password, host=self.host)) as conn:
            with conn.cursor() as cursor:
                cursor.execute(query)

                for row in cursor:
                    item = {}
                    for i in range(len(row)):
                        item.update({f'{cursor.description[i].name}': row[i]})
                    result.append(item)

        return result


class DbRequester:

    @staticmethod
    def getData(db, tableName, **options):
        '''
        Формирование и исполнение SELECT запросов
        :param db: объект dbProvider
        :param tableName: название таблицы в формате schema.tableName
        :param options: Можно передать список необходимых полей и id
        :return: Результат запроса в формате словарая
        '''
        ids = options['ids'] if 'ids' in options.keys() else None
        fields = options['fields'] if 'fields' in options.keys() else '*'

        query = f'select {", ".join(map(str, fields))} from {tableName}'
        if ids is not None:
            query += f' where id in ({", ".join(map(str, ids))})'

        return db.queryExecute(query)
