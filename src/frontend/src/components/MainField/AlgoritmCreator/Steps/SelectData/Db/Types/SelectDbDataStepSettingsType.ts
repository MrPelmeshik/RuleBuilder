import {SourceMetaType} from "./SourceMetaType";
import {ColumnMetaType} from "./ColumnMetaType";
import {SchemaMetaType} from "./SchemaMetaType";
import {TableMetaType} from "./TableMetaType";
import {IStepSettings} from "../../../IStepSettings";


export class SelectDbDataStepSettingsType implements IStepSettings {
    public source?: SourceMetaType
    public schema?: SchemaMetaType
    public table?: TableMetaType
    public metaData?: ColumnMetaType[]

    // public copy(curStepSettings: SelectDbDataStepSettingsType): SelectDbDataStepSettingsType {
    //     return curStepSettings
    // }

}
