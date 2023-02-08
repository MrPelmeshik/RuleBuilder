import {ColumnFilterType} from "./ColumnFilterType";

export type TableColumnType = {
    "columnName": string,
    "columnType": string,
    "filters": ColumnFilterType[],
}