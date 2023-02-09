import {StepsEnum} from "./StepsEnum";
import {IStep} from "./IStep";

export abstract class StepType implements IStep {
    protected constructor(id: number, position: number, type:StepsEnum) {
        this.id = id
        this.position = position
        this.type = type
    }

    public id: number;
    public position: number;
    public type: StepsEnum;
}
