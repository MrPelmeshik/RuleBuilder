import {StepType} from "../../StepType";
import {StepsEnum} from "../../StepsEnum";
import {IStepSettings} from "../../IStepSettings";
import cloneDeep from "lodash.clonedeep";

export class HierarchyTestStepSettingsType implements IStepSettings {
    public result?: string;


    public copyFrom(this: HierarchyTestStepSettingsType, newStepSettings: HierarchyTestStepSettingsType) {
        this.result = cloneDeep(newStepSettings.result)
    }

    public getDeepCopy(this: HierarchyTestStepSettingsType): HierarchyTestStepSettingsType {
        return cloneDeep(this)
    }
}