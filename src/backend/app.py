import fastapi as FastAPI
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import json
from datetime import datetime
from handlers.connection_param import ConnectionParam
from handlers.db_handler.postgres_handler import PostgresqlHandler
from handlers.db_handler.clickhouse_handler import ClickhouseHandler


origins = ["http://localhost:3000","http://localhost:3002"]

# app = Flask(__name__)
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


# region test endpoints
@app.get("/")
def hello():
    return "Ok!"


@app.get("/testJson")
def testJson():
    return {"text": 3}


@app.get("/clickhouse")
def clickhouse():
    settings = loadSettings()
    cp = ConnectionParam(connections=settings['connections'])

    cp.getParam(connectionName='clickhouse_local')
    ch = ClickhouseHandler(connectionParam=cp)

    result = ch.getData('test_02', 'table_01')
    return result


@app.get("/postgresql")
def postgresql():
    settings = loadSettings()
    cp = ConnectionParam(connections=settings['connections'])

    cp.getParam(connectionName='postgresql_local')
    ph = PostgresqlHandler(connectionParam=cp)

    result = ph.getData('schema_01', 'table_01')
    return result


@app.get("/create_file")
def create_file():
    fileName = f'test_{datetime.now().strftime("%Y%m%d%H%M%S")}.py'
    with open(f'./rules/{fileName}', "w") as file:
        file.write('''
def test_function():
    print('hi, this test_function')        
        ''')

    return f'create file: {fileName}'


@app.get("/open_created_file/<fileName>")
def open_created_file(fileName):
    __import_file_2(f'rules.{fileName}')
# endregion


# region source endpoint
@app.get("/getAllSource")
async def getAllSource():
    '''
    Получение всех источников
    '''
    settings = loadSettings()
    return settings['connections']


@app.get('/getAllSchemaBySource')
async def getAllSchemaBySource(source:str):
    '''
    Получение схем источника
    '''
    settings = loadSettings()
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
async def getAllTableBySchemaAndSource(source:str, schema:str):
    '''
    Получение таблиц схемы источника
    '''
    settings = loadSettings()
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
async def getPreviewDataForTable(source:str, schema:str, table:str):
    '''
    Получение примера данных с источника
    '''
    settings = loadSettings()
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
async def getColumnsForTable(source:str, schema:str, table:str):
    '''
    Получение информации о полях таблицы
    '''
    settings = loadSettings()
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
    logging.basicConfig(filename=f'./logs/{datetime.now().strftime("%Y%m%d%H%M%S")}.log',
                        filemode='w',
                        format='%(asctime)s [%(levelname)s]: %(message)s',
                        level=logging.NOTSET)
    logging.info('Start')

    while True:
        try:
            uvicorn.run(app, port=5000)

        except Exception as e:
            logging.exception(e)

        logging.info('Restart')

    logging.info('Stop')

