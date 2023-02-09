import previewCheckStepStyle from './PreviewCheckStep.module.css'
import mainFiledStyle from "../../../../MainField.module.css";
import React, {Dispatch} from "react";
import {StepsHeader} from "../../StepsHeader";
import {StepTypeOld} from "../../StepType";


export const PreviewCheckStep:React.FC<{stepType:StepTypeOld, setDeletedStepId:Dispatch<number|null>}> = ({stepType, setDeletedStepId}) => {
    return <div className={mainFiledStyle.stepPreview}>
        <StepsHeader title={'Проверить данные'} subTitle={''} stepType={stepType} setDeletedStepId={setDeletedStepId} />
        <div className={mainFiledStyle.stepPreviewDescription}>
            PreviewCheckStep description
        </div>
    </div>
}