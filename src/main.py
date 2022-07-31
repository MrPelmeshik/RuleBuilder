from config import *
from dbHandler import *
from graphHandler import *
import logging

if __name__ == '__main__':
    # logging.basicConfig(fsilename='logs.log', encoding='utf-8', level=logging.INFO)

    db = DbProvider(POSTGRES_CONNECTION)
    result = DbRequester.getData(
        db,
        DB_TABLES['Notes'],
        fields=['id', 'date_creation'])

    # logging.info(str(f'Read data (count:{len(result)})'))
    # print(f'Read data (count:{len(result)}):', "\n\t".join(map(str, result)))

    graph = Graph(
        DB_TABLES['Notes'],
        AxisData('date_creation', result),
        AxisData('id', result))

    graph.drawGraph(limit=1, offset=4)
