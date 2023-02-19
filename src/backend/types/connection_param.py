import typing
from dataclasses import dataclass, fields
import logging


@dataclass
class ConnectionParam:
    id: int
    environment: str
    name: str
    source_type: str
    host: str
    port: int
    database: str
    search_path: str
    username: str
    password: str
    timeout: int
    command_timeout: int
    no_reset_on_close: bool
    providers: str
    protocol: str
    comment: str
    driver: str


def __createConnectionParam(connection: dict):
    connectionFiledSet = {f.name for f in fields(ConnectionParam) if f.init}
    connectionParam = {k: v for k, v in connection.items() if k in connectionFiledSet}
    return ConnectionParam(**connectionParam)


def convertDictToConnectionParamList(connections: dict):
    logging.info(f'Starting getting connections')

    connectionsParamList = []
    for connection in connections:
        connectionsParamList.append(__createConnectionParam(connection))

    logging.info(f'Finishing getting connections (Received: ${len(connectionsParamList)} connections)')
    return connectionsParamList


def getParam(connections: [ConnectionParam], connectionName: str):
    if connections is not None:
        for connection in connections:
            if connectionName == connection.name:
                return connection


