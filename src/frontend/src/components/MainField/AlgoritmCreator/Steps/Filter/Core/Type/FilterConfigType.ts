import {FilterItemType} from "./FilterItemType";
import {FilterBaseType} from "./FilterBaseType";

export class FilterConfigType extends FilterBaseType {
    public constructor(id: number, filters: (FilterConfigType[] | FilterItemType[]) | null = null) {
        super(id)

        if (filters !== null) {
            this.filters = filters
        }
    }

    public filters?: FilterConfigType[] | FilterItemType[]
//     соединитель
}