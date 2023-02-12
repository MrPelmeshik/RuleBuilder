import argparse
import sys
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import json
from datetime import datetime
from handlers.connection_param import ConnectionParam
from handlers.db_handler.postgres_handler import PostgresqlHandler
from handlers.db_handler.clickhouse_handler import ClickhouseHandler


origins = ["http://localhost:3000", "http://localhost:3002"]

app = FastAPI(
    title="RuleBUilder API",
    description="",
    license_info={
        "name": "The Unlicense",
        "url": "https://unlicense.org",
    },
)

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])

settings = []
system_connections = []
system_cp = None


# region sub function
def loadSettings():
    with open('./settings.json') as json_data:
        settings = json.load(json_data)

    logging.info('Settings imported')
    return settings


def __import_file(full_path_to_module):
    try:
        import os
        module_dir, module_file = os.path.split(full_path_to_module)
        module_name, module_ext = os.path.splitext(module_file)
        save_cwd = os.getcwd()
        os.chdir(module_dir)
        module_obj = __import__(module_name)
        module_obj.__file__ = full_path_to_module
        globals()[module_name] = module_obj
        os.chdir(save_cwd)
    except Exception as e:
        raise ImportError(e)
    return module_obj


def __import_file_2(moduleName):
    import importlib.machinery
    import importlib.util
    from pathlib import Path

    # Get path to mymodule
    script_dir = Path(__file__).parent
    mymodule_path = str(script_dir.joinpath('rules'))

    # Import mymodule
    loader = importlib.machinery.SourceFileLoader(moduleName, mymodule_path)
    spec = importlib.util.spec_from_loader(moduleName, loader)
    mymodule = importlib.util.module_from_spec(spec)
    loader.exec_module(mymodule)

    # Use mymodule
    mymodule.test_function()


# endregion


# region source endpoint
@app.get("/getAllSource")
async def getAllSource():
    '''
    Получение всех источников
    '''
    system_cp.getParam(connectionName=argv[0])
    ph = PostgresqlHandler(connectionParam=system_cp)
    schemasBySource = ph.getAllSchema()

    return settings['connections']


@app.get('/getAllSchemaBySource')
async def getAllSchemaBySource(source: str):
    '''
    Получение схем источника
    '''
    cp = ConnectionParam(connections=settings['connections'])

    cp.getParam(connectionName=source)

    schemasBySource = []
    if cp.type == "postgresql":
        ph = PostgresqlHandler(connectionParam=cp)
        schemasBySource = ph.getAllSchema()
    elif cp.type == "clickhouse":
        ch = ClickhouseHandler(connectionParam=cp)
        schemasBySource = ch.getAllSchema()

    return schemasBySource


@app.get('/getAllTableBySchemaAndSource')
async def getAllTableBySchemaAndSource(source: str, schema: str):
    '''
    Получение таблиц схемы источника
    '''
    cp = ConnectionParam(connections=settings['connections'])

    cp.getParam(connectionName=source)

    tablesBySource = []
    if cp.type == "postgresql":
        ph = PostgresqlHandler(connectionParam=cp)
        tablesBySource = ph.getAllTablesBySchema(schema)
    elif cp.type == "clickhouse":
        ch = ClickhouseHandler(connectionParam=cp)
        tablesBySource = ch.getAllTablesBySchema(schema)

    return tablesBySource


@app.get('/getPreviewDataForTable')
async def getPreviewDataForTable(source: str, schema: str, table: str):
    '''
    Получение примера данных с источника
    '''
    cp = ConnectionParam(connections=settings['connections'])

    cp.getParam(connectionName=source)

    previewData = []
    if cp.type == "postgresql":
        ph = PostgresqlHandler(connectionParam=cp)
        previewData = ph.getPreviewDataForTable(schema, table)
    elif cp.type == "clickhouse":
        ch = ClickhouseHandler(connectionParam=cp)
        previewData = ch.getPreviewDataForTable(schema, table)

    return previewData


@app.get('/getColumnsForTable')
async def getColumnsForTable(source: str, schema: str, table: str):
    '''
    Получение информации о полях таблицы
    '''
    cp = ConnectionParam(connections=settings['connections'])

    cp.getParam(connectionName=source)

    columns = []
    if cp.type == "postgresql":
        ph = PostgresqlHandler(connectionParam=cp)
        columns = ph.getColumnsByTable(schema, table)
    elif cp.type == "clickhouse":
        ch = ClickhouseHandler(connectionParam=cp)
        columns = ch.getColumnsByTable(schema, table)

    return columns
# endregion


if __name__ == "__main__":

    argv = sys.argv
    settings = loadSettings()

    logging.basicConfig(filename=f'./logs/{datetime.now().strftime("%Y%m%d%H%M%S")}.log',
                        filemode='w',
                        format='%(asctime)s [%(levelname)s]: %(message)s',
                        level=logging.NOTSET)
    logging.info('Start')

    while True:
        try:
            settings = loadSettings()
            system_connections = settings['connections']
            system_cp = ConnectionParam(connections=system_connections)

            uvicorn.run(app, port=5000)

        except Exception as e:
            logging.exception(e)

        logging.info('Restart')

    logging.info('Stop')