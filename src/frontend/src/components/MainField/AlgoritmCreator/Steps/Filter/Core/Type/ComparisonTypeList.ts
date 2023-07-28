import {ComparisonType} from "./ComparisonType";

export const ComparisonTypeList: ComparisonType[] = [
    {
        label: '=',
        name: 'equal',
        description: 'Равно'
    },
    {
        label: 'ПУСТОЙ',
        name: 'isNull',
        description: 'Пустой'
    },
    {
        label: 'НЕ ПУСТОЙ',
        name: 'isNotNull',
        description: 'Не пустой'
    },
    {
        label: '>',
        name: 'more',
        description: 'Больше'
    },
    {
        label: '<',
        name: 'less',
        description: 'Меньше'
    },
    {
        label: '>=',
        name: 'moteOrEqual',
        description: 'Больше или равно'
    },
    {
        label: '<=',
        name: 'lessOrEqual',
        description: 'Меньше или равно'
    },
]