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
            self.type = None
            self.name = None
            self.id = None

    def getParam(self, connectionName:str):
        for connection in self.connections:
            if connection['name'] == connectionName:
                logging.info(f'Getting connection param for \'{connectionName}\'')
                self.id = connection['id']
                self.name = connection['name']
                self.type = connection['type']
                self.host = connection['host']
                self.port = connection['port']
                self.database = connection['database']
                self.defaultShema = connection['defaultShema']
                self.user = connection['user']
                self.password = connection['password']

    def toString(self):
        return f"id:{self.id} name:{self.name} type:{self.type} address:{self.host}:{self.port} db:{self.database} defaultShema:{self.defaultShema} user:{self.user} password:{self.password}"