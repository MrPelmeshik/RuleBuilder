import {ColumnMetaType} from "../../../SelectData/Db/Types/ColumnMetaType";
import {FilterBaseType} from "./FilterBaseType";

export class FilterItemType extends FilterBaseType {

    public constructor(id: number, ckeckedField: ColumnMetaType | null = null, targetValues: (ColumnMetaType | string | number)[] | null = null) {
        super(id)

        if (ckeckedField !== null) {
            this.ckeckedField = ckeckedField
        }

        if (targetValues !== null) {
            this.targetValues = targetValues
        }
    }

    public ckeckedField?: ColumnMetaType
//     логический оператор
    public targetValues?: (ColumnMetaType | string | number)[]
//     соединитель
}