import logging
import json
from datetime import datetime
from src.handlers.connection_param import ConnectionParam
from src.handlers.db_handler.postgres_handler import PostgresqlHandler
from src.handlers.db_handler.clickhouse_handler import ClickhouseHandler


def loadSettings():
    with open('./settings.json') as json_data:
        settings = json.load(json_data)

    logging.info('Settings imported')
    return settings

def testPg(cp: ConnectionParam):
    cp.getParam(connectionName='postgresql_local')
    ph = PostgresqlHandler(connectionParam=cp)

    result = ph.getData('schema_01', 'table_01')

    print(result)

def testCh(cp: ConnectionParam):
    cp.getParam(connectionName='clickhouse_local')
    ch = ClickhouseHandler(connectionParam=cp)

    result = ch.getData('test_02', 'table_01')

    print(result)


if __name__ == '__main__':
    logging.basicConfig(filename=f'./logs/{datetime.now().strftime("%Y%m%d%H%M%S")}.log', filemode='w', format='%(asctime)s [%(levelname)s]: %(message)s', level=logging.NOTSET)
    logging.info('Start')

    try:

        settings = loadSettings()
        cp = ConnectionParam(connections=settings['connections'])

        testCh(cp)
        testPg(cp)
        testCh(cp)
        testPg(cp)

    except Exception as e:
        logging.exception(e)

    logging.info('Stop')

