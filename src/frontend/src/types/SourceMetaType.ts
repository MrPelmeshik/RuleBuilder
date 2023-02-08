import {TableType} from "./TableType";
import {SourceType} from "./SourceType";
import {SchemaType} from "./SchemaType";
import {TableColumnType} from "./TableColumnType";

export type SourceMetaType = {
    "source": SourceType,
    "schema": SchemaType,
    "table": TableType,
    "countRow": number,
    "columns": TableColumnType[]
}