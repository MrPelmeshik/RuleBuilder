import {SourceMetaType} from "./SourceMetaType";
import {ColumnMetaType} from "./ColumnMetaType";
import {SchemaMetaType} from "./SchemaMetaType";
import {TableMetaType} from "./TableMetaType";
import {IStepSettings} from "../../../IStepSettings";
import cloneDeep from "lodash.clonedeep";
import {FilterConfigType} from "../../../Filter/Core/Type/FilterConfigType";


export class SelectDbDataStepSettingsType implements IStepSettings {
    public source?: SourceMetaType
    public schema?: SchemaMetaType
    public table?: TableMetaType
    public metaData?: ColumnMetaType[]
    public filters?: FilterConfigType

    public copyFrom(this: SelectDbDataStepSettingsType, newStepSettings: SelectDbDataStepSettingsType) {
        this.source = cloneDeep(newStepSettings.source)
        this.schema = cloneDeep(newStepSettings.schema)
        this.table = cloneDeep(newStepSettings.table)
        this.metaData = cloneDeep(newStepSettings.metaData)
        this.filters = cloneDeep(newStepSettings.filters)
    }

    public getDeepCopy(this: SelectDbDataStepSettingsType): SelectDbDataStepSettingsType {
        return cloneDeep(this)
    }
}
