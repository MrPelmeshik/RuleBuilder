import stepLoopStyle from './PreviewStepLoop.module.css';
import React, {Dispatch, useEffect, useState} from "react";
import {SelectDbDataStepSettingsType} from "../../SelectData/Db/Types/SelectDbDataStepSettingsType";
import mainFiledStyle from "../../../../MainField.module.css";
import {StepsHeader} from "../../StepsHeader";
import {PreviewSelectDbDataStep} from "../../SelectData/Db/Preview/PreviewSelectDbDataStep";

export const PreviewStepLoop
    :React.FC<{id: number, stepSettings:SelectDbDataStepSettingsType, setDeletedStepId:Dispatch<number|null>}>
    = ({id, stepSettings, setDeletedStepId}) => {
    const [subTitle, setSubTitle] = useState('')


    useEffect(() => {
        console.log('change stepSettings', stepSettings)
    }, [stepSettings.source, stepSettings.schema, stepSettings.table])
    const getTitle = (): string => 'Цикл по _'


    return <div className={mainFiledStyle.stepPreview}>
        <StepsHeader id={id} title={getTitle()} subTitle={subTitle} stepSettings={stepSettings}
                     setDeletedStepId={setDeletedStepId}/>
        <div className={mainFiledStyle.stepPreviewDescription}>
            PreviewSelectDbDataStep description
        </div>
    </div>
}