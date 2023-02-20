import {SourceMetaType} from "./SourceMetaType";
import {ColumnMetaType} from "./ColumnMetaType";
import {SchemaMetaType} from "./SchemaMetaType";
import {TableMetaType} from "./TableMetaType";
import {IStepSettings} from "../../../IStepSettings";
import cloneDeep from "lodash.clonedeep";


export class SelectDbDataStepSettingsType implements IStepSettings {
    public source?: SourceMetaType
    public schema?: SchemaMetaType
    public table?: TableMetaType
    public metaData?: ColumnMetaType[]

    public copyFrom(this: SelectDbDataStepSettingsType, newStepSettings: SelectDbDataStepSettingsType) {
        this.source = cloneDeep(newStepSettings.source)
        this.schema = cloneDeep(newStepSettings.schema)
        this.table = cloneDeep(newStepSettings.table)
        this.metaData = cloneDeep(newStepSettings.metaData)
    }

    public getDeepCopy(this: SelectDbDataStepSettingsType): SelectDbDataStepSettingsType {
        return cloneDeep(this)
    }
}
