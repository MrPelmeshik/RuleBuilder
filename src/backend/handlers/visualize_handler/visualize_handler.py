import matplotlib.pyplot as plt
import numpy as np
import scipy.stats as st


class AxisData:
    def __init__(self, columnName: str, data, fieldName=None):
        self.columnName = columnName
        self.values = [item for item in [res[fieldName if fieldName else columnName] for res in data]]


class Graph:
    def __init__(self, title: str, x: AxisData, y: AxisData):
        if not title or not x or not y:
            raise Exception('Невозможно создать график')

        self.title = title
        self.x = x
        self.y = y

    def drawGraph(self, **options):
        lenX = len(self.x.values)
        lenY = len(self.y.values)
        if lenX != lenY:
            raise Exception(f'The lengths of the arrays do not match (len(x):{lenX} != len(y):{lenY})')
        count = lenX

        x = self.x.values
        y = self.y.values
        offset = options['offset'] if 'offset' in options.keys() else 0
        limit = options['limit'] if 'limit' in options.keys() else count - offset

        if limit > count or limit + offset > count or offset >= count:
            raise Exception(f'Filter limit({limit}) or offset({offset}) incorrect (count data:{count} row)')
        else:
            newX = []
            newY = []
            for i in range(offset, limit + offset):
                newX.append(x[i])
                newY.append(y[i])

        x = newX
        y = newY

        plt.scatter(x, y)
        plt.title(self.title)
        plt.xlabel(self.x.columnName)
        plt.ylabel(self.y.columnName)

        plt.xticks(rotation=30, ha='right')

        plt.show()
