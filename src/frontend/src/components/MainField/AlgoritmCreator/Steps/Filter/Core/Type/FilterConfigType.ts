import {FilterItemType} from "./FilterItemType";
import {FilterBaseType} from "./FilterBaseType";
import {LogicType} from "./LogicType";

export class FilterConfigType extends FilterBaseType {
    public constructor(id: number,
                       filters: (FilterConfigType[] | FilterItemType[]) | null = null,
                       connector: LogicType | null = null,
                       isNegative: boolean = false,
    ) {
        super(id)

        this.isNegative = isNegative

        if (filters !== null)
            this.filters = filters

        if (connector !== null)
            this.logicConnetor = connector
    }

    public isNegative: boolean
    public logicConnetor?: LogicType

    public filters?: FilterConfigType[] | FilterItemType[]
//     соединитель
}