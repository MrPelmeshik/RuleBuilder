import {StepType} from "../../StepType";
import {StepsEnum} from "../../StepsEnum";
import {IStepSettings} from "../../IStepSettings";
import cloneDeep from "lodash.clonedeep";

export class CheckStepSettingsType implements IStepSettings {
    public result?: string;


    public copyFrom(this: CheckStepSettingsType, newStepSettings: CheckStepSettingsType) {
        this.result = cloneDeep(newStepSettings.result)
    }

    public getDeepCopy(this: CheckStepSettingsType): CheckStepSettingsType {
        return cloneDeep(this)
    }
}