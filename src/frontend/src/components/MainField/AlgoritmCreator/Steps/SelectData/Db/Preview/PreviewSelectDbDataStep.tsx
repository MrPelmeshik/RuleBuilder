import previewSelectDbDataStepStyle from './PreviewSelectDbDataStep.module.css'
import mainFiledStyle from "../../../../../MainField.module.css";
import React, {Dispatch, useEffect, useState} from "react";
import {StepsHeader} from "../../../StepsHeader";
import {SelectDbDataStepSettingsType} from "../Types/SelectDbDataStepSettingsType";


export const PreviewSelectDbDataStep
    :React.FC<{id: number, stepSettings:SelectDbDataStepSettingsType, setDeletedStepId:Dispatch<number|null>}>
    = ({id, stepSettings, setDeletedStepId}) =>
{
    const [subTitle, setSubTitle] = useState('')

    const updateMetaDataPreview = () => {
        let headerDetail = ''
        if (stepSettings.source?.name) {
            headerDetail = `из ${stepSettings.source?.name}`
            if (stepSettings.schema?.name) {
                headerDetail += `\tисточник:\t${stepSettings.schema.name}`
                if (stepSettings.table?.name)
                    headerDetail += `.${stepSettings.table.name}`
            }
        }
        setSubTitle(headerDetail)
    }

    useEffect(() => {
        console.log('change stepSettings', stepSettings)
        updateMetaDataPreview()
    }, [stepSettings])
    const getTitle = ():string => 'Чтение данных из БД'


    return <div className={mainFiledStyle.stepPreview}>
        <StepsHeader id={id} title={getTitle()} subTitle={subTitle} stepSettings={stepSettings} setDeletedStepId={setDeletedStepId} />
        <div className={mainFiledStyle.stepPreviewDescription}>
            PreviewSelectDbDataStep description
        </div>
    </div>
}