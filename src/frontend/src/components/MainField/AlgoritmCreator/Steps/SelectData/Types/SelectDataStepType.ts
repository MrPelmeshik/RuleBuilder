import {SelectDataType} from "./SelectDataType";
import {DbSourceType} from "./DbSourceType";

export type SelectDataStepType = {
    source: DbSourceType
    schema?: string
    table?: string
    metaData?: SelectDataType[]
}