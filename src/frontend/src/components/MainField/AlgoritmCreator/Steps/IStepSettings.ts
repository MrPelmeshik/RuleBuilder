export interface IStepSettings {
    copyFrom(this: IStepSettings, curStepSettings: IStepSettings): void;
    getDeepCopy(this: IStepSettings): IStepSettings;
}