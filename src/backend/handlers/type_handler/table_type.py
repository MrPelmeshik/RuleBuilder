class table_type:

    @staticmethod
    def convertClickhouseTableToTable(chTable):
        if chTable is not None:
            return dict(tableName = chTable['name'])

    @staticmethod
    def convertPostgresTableToTable(pgTable):
        if pgTable is not None:
            return dict(tableName = pgTable['table_name'])
