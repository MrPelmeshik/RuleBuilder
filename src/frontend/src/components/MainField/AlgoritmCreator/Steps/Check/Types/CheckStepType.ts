import {StepType} from "../../StepType";
import {StepsEnum} from "../../StepsEnum";

export class CheckStepType extends StepType {
    constructor(id: number, position: number, result: string) {
        super(id, position, StepsEnum.selectDbDataStep)
        this.result = result
    }

    public result: string;
}