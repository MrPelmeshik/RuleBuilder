import {ComparisonType} from "./ComparisonType";
import {notEqual} from "assert";

export const ComparisonTypeList: ComparisonType[] = [
    {
        id: 0,
        label: '=',
        name: 'equal',
        description: 'Равно'
    },
    {
        id: 1,
        label: 'ПУСТОЙ',
        name: 'empty',
        description: 'Пустой'
    },
    {
        id: 2,
        label: 'НЕ ПУСТОЙ',
        name: 'notEmpty',
        description: 'Не пустой'
    },
    {
        id: 3,
        label: '>',
        name: 'more',
        description: 'Больше'
    },
    {
        id: 4,
        label: '<',
        name: 'less',
        description: 'Меньше'
    },
    {
        id: 5,
        label: String.fromCharCode(0x2265),
        name: 'moteOrEqual',
        description: 'Больше или равно'
    },
    {
        id: 6,
        label: String.fromCharCode(0x2264),
        name: 'lessOrEqual',
        description: 'Меньше или равно'
    },
    {
        id: 7,
        label: String.fromCharCode(0x2260),
        name: 'notEqual',
        description: 'Не равно'
    },
    {
        id: 8,
        label: 'СОДЕРЖИТ',
        name: 'contains',
        description: 'Содержит одно из значений'
    },
    {
        id: 9,
        label: 'НЕ СОДЕРЖИТ',
        name: 'notContains',
        description: 'Не содержит ни одно из значений'
    },
]