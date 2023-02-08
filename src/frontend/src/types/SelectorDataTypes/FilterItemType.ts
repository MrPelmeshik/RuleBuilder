import {TableColumnType} from "../TableColumnType";
import {FilterActionEventTypesEnum} from "./FilterActionEventTypesEnum";

export type FilterItemType = {
    filed: TableColumnType
    filterAction: FilterActionEventTypesEnum
    value?:
        TableColumnType | TableColumnType[] |
        number | number[] |
        string | string[] |
        boolean | boolean[] |
        Date | Date[]
    isNot?: boolean
}