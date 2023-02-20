import {StepsEnum} from "./StepsEnum";
import {IStepSettings} from "./IStepSettings";

export interface IStep {
    id: number
    position: number
    type: StepsEnum
    settings: IStepSettings
}