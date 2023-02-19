class MetaTypeConverter:

    # region column converters

    @staticmethod
    def convertChColumn(column):
        if column is not None:
            return dict(columnName=column['column_name'], columnType=column['column_type'])

    @staticmethod
    def convertPgColumn(column):
        if column is not None:
            return dict(columnName=column['column_name'], columnType=column['data_type'])

    # endregion

    # region schema converters

    @staticmethod
    def convertClickhouseSchemaToSchema(chSchema):
        if chSchema is not None:
            return dict(schemaName=chSchema['name'])

    @staticmethod
    def convertPostgresSchemaToSchema(pgSchema):
        if pgSchema is not None:
            return dict(schemaName=pgSchema['schema_name'])

    # endregion

    # region table converters

    @staticmethod
    def convertClickhouseTableToTable(chTable):
        if chTable is not None:
            return dict(tableName=chTable['name'])

    @staticmethod
    def convertPostgresTableToTable(pgTable):
        if pgTable is not None:
            return dict(tableName=pgTable['table_name'])

    # endregion
