import {ColumnMetaType} from "../../../SelectData/Db/Types/ColumnMetaType";
import {FilterBaseType} from "./FilterBaseType";
import {ComparisonType} from "./ComparisonType";
import {LogicType} from "./LogicType";
import {TargetValueType} from "./TargetValueType";

export class FilterItemType extends FilterBaseType {

    public constructor(id: number,
                       ckeckedField: ColumnMetaType | null = null,
                       comparisonOperator: ComparisonType | null = null,
                       targetValues: TargetValueType[] | null = null,
                       connector: LogicType | null = null
    ) {
        super(id)

        if (ckeckedField !== null)
            this.ckeckedField = ckeckedField

        if (comparisonOperator !== null)
            this.comparisonOperator = comparisonOperator

        if (targetValues !== null)
            this.targetValues = targetValues
        else
            this.targetValues = []

        if (connector !== null)
            this.logicConnetor = connector
    }

    public ckeckedField?: ColumnMetaType
    public comparisonOperator?: ComparisonType
    public targetValues: TargetValueType[]
    public logicConnetor?: LogicType
}