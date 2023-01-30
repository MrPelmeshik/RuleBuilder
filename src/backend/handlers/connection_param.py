import logging


class ConnectionParam:
    def __init__(self, connections:dict, connectionName:str=None):
        if connections is None:
            raise ValueError('Connection name is empty value')

        self.connections = connections

        if connectionName is not None:
            self.getParam(connectionName)
        else:
            self.password = None
            self.user = None
            self.defaultShema = None
            self.database = None
            self.port = None
            self.host = None
            self.name = None

    def getParam(self, connectionName:str):
        for connection in self.connections:
            if connection['name'] == connectionName:
                logging.info(f'Getting connection param for \'{connectionName}\'')
                self.name = connection['name']
                self.host = connection['host']
                self.port = connection['port']
                self.database = connection['database']
                self.defaultShema = connection['defaultShema']
                self.user = connection['user']
                self.password = connection['password']

    def toString(self):
        return f"name:{self.name} address:{self.host}:{self.port} db:{self.database} defaultShema:{self.defaultShema} user:{self.user} password:{self.password}"