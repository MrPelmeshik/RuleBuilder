import previewSelectDbDataStepStyle from './PreviewSelectDbDataStep.module.css'
import mainFiledStyle from "../../../../../MainField.module.css";
import React, {Dispatch} from "react";
import {StepsHeader} from "../../../StepsHeader";


export const PreviewSelectDbDataStep:React.FC<{id:number, setDeletedStepId:Dispatch<number|null>}> = ({id, setDeletedStepId}) => {

    const source = 'test_local'
    const schema = 'test_schema'
    const table = 'test_table'

    const getSourceDetails = ():string => {
        let headerDetail = ''
        if (source) {
            headerDetail = `из ${source}`
            if (schema) {
                headerDetail += `\tисточник:\t${schema}`
                if (table)
                    headerDetail += `.${table}`
            }
        }
        return headerDetail
    }
    const getTitle = ():string => 'Чтение данных'


    return <div className={mainFiledStyle.stepPreview}>
        <StepsHeader title={getTitle()} subTitle={getSourceDetails()} id={id} setDeletedStepId={setDeletedStepId} />
        <div className={mainFiledStyle.stepPreviewDescription}>
            PreviewSelectDbDataStep description
        </div>
    </div>
}