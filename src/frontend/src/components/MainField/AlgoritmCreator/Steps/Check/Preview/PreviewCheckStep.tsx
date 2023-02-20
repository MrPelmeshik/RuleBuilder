import previewCheckStepStyle from './PreviewCheckStep.module.css'
import mainFiledStyle from "../../../../MainField.module.css";
import React, {Dispatch} from "react";
import {StepsHeader} from "../../StepsHeader";
import {StepType} from "../../StepType";


export const PreviewCheckStep
    :React.FC<{id:number, stepType:StepType, setDeletedStepId:Dispatch<number|null>}>
    = ({id, stepType, setDeletedStepId}) =>
{
    return <div className={mainFiledStyle.stepPreview}>
        <StepsHeader id={id} title={'Проверить данные'} subTitle={''} stepSettings={stepType} setDeletedStepId={setDeletedStepId} />
        <div className={mainFiledStyle.stepPreviewDescription}>
            PreviewCheckStep description
        </div>
    </div>
}