import {StepType} from "../../../StepType";
import {StepsEnum} from "../../../StepsEnum";
import {SourceMetaType} from "./SourceMetaType";
import {MetaType} from "./MetaType";
import {SchemaMetaType} from "./SchemaMetaType";
import {TableMetaType} from "./TableMetaType";


export class SelectDbDataStepType extends StepType{
    constructor(id: number, position: number) {
        super(id, position, StepsEnum.selectDbDataStep)
    }

    public source?: SourceMetaType
    public schema?: SchemaMetaType
    public table?: TableMetaType
    public metaData?: MetaType[]
}
