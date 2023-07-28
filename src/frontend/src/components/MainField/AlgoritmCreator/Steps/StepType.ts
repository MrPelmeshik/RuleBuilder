import {StepsEnum} from "./StepsEnum";
import {IStep} from "./IStep";
import {IStepSettings} from "./IStepSettings";

export class StepType implements IStep {
    public constructor(id: number, position: number, type: StepsEnum, settings: IStepSettings) {
        this.id = id
        this.position = position
        this.type = type
        this.settings = settings
    }

    public id: number;
    public position: number;
    public type: StepsEnum;
    public settings: IStepSettings;
}
