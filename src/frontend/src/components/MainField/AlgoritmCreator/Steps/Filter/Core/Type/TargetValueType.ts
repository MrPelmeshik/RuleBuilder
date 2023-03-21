import {ColumnMetaType} from "../../../SelectData/Db/Types/ColumnMetaType";

export interface TargetValueType {
    id: number
    value: ColumnMetaType | string | number | boolean
}