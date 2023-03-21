import {LogicType} from "./LogicType";

export const LogicTypeList: LogicType[] = [
    {
        id: 0,
        label: 'НЕ',
        name: 'not',
        description: 'логическое отрицание'
    },
    {
        id: 1,
        label: 'И',
        name: 'and',
        description: 'логическое И'
    },
    {
        id: 2,
        label: 'ИЛИ',
        name: 'or',
        description: 'логическое ИЛИ'
    },
]