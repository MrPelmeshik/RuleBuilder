from flask import Flask
import logging
import json
from datetime import datetime
from handlers.connection_param import ConnectionParam
from handlers.db_handler.postgres_handler import PostgresqlHandler
from handlers.db_handler.clickhouse_handler import ClickhouseHandler


app = Flask(__name__)


def loadSettings():
    with open('./settings.json') as json_data:
        settings = json.load(json_data)

    logging.info('Settings imported')
    return settings


@app.route("/")
def hello():
    return "Ok!"


@app.route("/clickhouse")
def clickhouse():
    settings = loadSettings()
    cp = ConnectionParam(connections=settings['connections'])

    cp.getParam(connectionName='clickhouse_local')
    ch = ClickhouseHandler(connectionParam=cp)

    result = ch.getData('test_02', 'table_01')
    return result


@app.route("/postgresql")
def postgresql():
    settings = loadSettings()
    cp = ConnectionParam(connections=settings['connections'])

    cp.getParam(connectionName='postgresql_local')
    ph = PostgresqlHandler(connectionParam=cp)

    result = ph.getData('schema_01', 'table_01')
    return result


if __name__ == "__main__":
    logging.basicConfig(filename=f'./logs/{datetime.now().strftime("%Y%m%d%H%M%S")}.log',
                        filemode='w',
                        format='%(asctime)s [%(levelname)s]: %(message)s',
                        level=logging.NOTSET)
    logging.info('Start')

    try:
        app.run()

    except Exception as e:
        logging.exception(e)

    logging.info('Stop')

