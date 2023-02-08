import previewCheckStepStyle from './PreviewCheckStep.module.css'
import mainFiledStyle from "../../../../MainField.module.css";
import React, {Dispatch} from "react";
import {StepsHeader} from "../../StepsHeader";


export const PreviewCheckStep:React.FC<{id:number, setDeletedStepId:Dispatch<number|null>}> = ({id, setDeletedStepId}) => {
    return <div className={mainFiledStyle.stepPreview}>
        <StepsHeader title={'Проверить данные'} subTitle={''} id={id} setDeletedStepId={setDeletedStepId} />
        <div className={mainFiledStyle.stepPreviewDescription}>
            PreviewCheckStep description
        </div>
    </div>
}