class column_table_type:

    @staticmethod
    def convertClickhouseColumnToColumn(chColumn):
        if chColumn is not None:
            return dict(columnName = chColumn['column_name'], columnType = chColumn['column_type'])

    @staticmethod
    def convertPostgresColumnToColumn(pgColumn):
        if pgColumn is not None:
            return dict(columnName = pgColumn['column_name'], columnType = pgColumn['data_type'])