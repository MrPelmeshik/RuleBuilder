import {FilterActionEventTypesEnum} from "./FilterActionEventTypesEnum";
import {FilterItemType} from "./FilterItemType";

export type ComplexFilterItemType = {
    item: ComplexFilterItemType | FilterItemType
    filterAction: FilterActionEventTypesEnum
    isNot?: boolean
}