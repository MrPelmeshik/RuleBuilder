class schema_type:

    @staticmethod
    def convertClickhouseSchemaToSchema(chSchema):
        if chSchema is not None:
            return dict(schemaName = chSchema['name'])

    @staticmethod
    def convertPostgresSchemaToSchema(pgSchema):
        if pgSchema is not None:
            return dict(schemaName = pgSchema['schema_name'])
