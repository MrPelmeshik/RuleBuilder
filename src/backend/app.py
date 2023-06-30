import sys
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import json
from datetime import datetime
from src.backend.types.connection_param import convertDictToConnectionParamList, getParam
from src.backend.handlers.db_handler.db_handler import DbHandler


def loadSettings():
    logging.info('Importing settings')
    with open('./settings.json') as json_data:
        settings = json.load(json_data)
    return settings


# region service settings

logging.basicConfig(filename=f'./logs/{datetime.now().strftime("%Y%m%d%H%M%S")}.log',
                    filemode='w',
                    format='%(asctime)s [%(levelname)s]: %(message)s',
                    level=logging.NOTSET)

logger = logging.getLogger(__name__)

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

# endregion

argv = sys.argv
settings = loadSettings()
system_connections = convertDictToConnectionParamList(settings['connections'])
system_connection = getParam(system_connections, 'pg_01_rb')


# region sub function

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

# region API sources

@app.get("/getSources")
async def getSources():
    """ Получение всех источников """
    dbh = DbHandler(system_connection)
    return dbh.getSorces()


@app.get("/getSorcesByEnvironmentName")
async def getSorcesByEnvironmentName(environment: str):
    """ Получение всех доступных источников """
    dbh = DbHandler(system_connection)
    return dbh.getSorces(environment)


@app.get("/getSchemasBySource")
async def getSchemasBySource(sourceId: int):
    """ Получение всех источников """
    dbh = DbHandler(system_connection)
    return dbh.getSchemasBySource(sourceId)


@app.get("/getTablesBySchema")
async def getTablesBySchema(schemaId: int):
    """ Получение таблиц схемы """
    dbh = DbHandler(system_connection)
    return dbh.getTablesBySchema(schemaId)


@app.get("/getColumnsByTable")
async def getColumnsByTable(tableId: int):
    """ Получение колонок таблицы """
    dbh = DbHandler(system_connection)
    return dbh.getColumnsByTable(tableId)

# endregion

# region API convert JSON to python file

@app.get("/getPythonFile")
async def getPythonFile():
    """ Получение python файла на основе формализованного алгоритма """
    pass

# endregion

if __name__ == "__main__":

    logging.info('Start')

    try:
        uvicorn.run(app, port=5000)

    except Exception as e:
        logging.exception(e)

    logging.info('Stop')
