import previewCheckStepStyle from './PreviewCheckStep.module.css'
import mainFiledStyle from "../../../../MainField.module.css";
import React, {Dispatch} from "react";
import {StepsHeader} from "../../StepsHeader";
import {CheckStepSettingsType} from "../Types/CheckStepSettingsType";


export const PreviewCheckStep
    :React.FC<{id:number, stepSettings:CheckStepSettingsType, setDeletedStepId:Dispatch<number|null>}>
    = ({id, stepSettings, setDeletedStepId}) =>
{
    return <div className={mainFiledStyle.stepPreview}>
        <StepsHeader id={id} title={'Проверить данные'} subTitle={''} stepSettings={stepSettings} setDeletedStepId={setDeletedStepId} />
        <div className={mainFiledStyle.stepPreviewDescription}>
            PreviewCheckStep description
        </div>
    </div>
}