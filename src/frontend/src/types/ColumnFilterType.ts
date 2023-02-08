import {FilterActionEventTypesEnum} from "./SelectorDataTypes/FilterActionEventTypesEnum";

export type ColumnFilterType = {
    "filterAction": FilterActionEventTypesEnum,
    "values"?: number[]
    "value"?: number
}