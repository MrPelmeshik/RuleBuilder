import previewSelectDbDataStepStyle from './PreviewSelectDbDataStep.module.css'
import isDeepEqual from 'fast-deep-equal/react'
import mainFiledStyle from "../../../../../MainField.module.css";
import React, {Dispatch, useEffect, useRef, useState} from "react";
import {StepsHeader} from "../../../StepsHeader";
import {StepType} from "../../../StepType";
import {SelectDbDataStepType} from "../Types/SelectDbDataStepType";
import {IStep} from "../../../IStep";


export const PreviewSelectDbDataStep
    :React.FC<{stepType:StepType, setDeletedStepId:Dispatch<number|null>}>
    = ({stepType, setDeletedStepId}) =>
{
    const [subTitle, setSubTitle] = useState('')

    const source = 'test_local'
    const schema = 'test_schema'
    const table = 'test_table'

    useEffect(() => {
        let headerDetail = ''
        if (source) {
            headerDetail = `из ${source}`
            if (schema) {
                headerDetail += `\tисточник:\t${schema}`
                if (table)
                    headerDetail += `.${table}`
            }
        }
        setSubTitle(headerDetail)
    }, [stepType instanceof SelectDbDataStepType ? stepType.source?.name : stepType])
    const getTitle = ():string => 'Чтение данных'


    return <div className={mainFiledStyle.stepPreview}>
        <StepsHeader title={getTitle()} subTitle={subTitle} stepType={stepType} setDeletedStepId={setDeletedStepId} />
        <div className={mainFiledStyle.stepPreviewDescription}>
            PreviewSelectDbDataStep description
        </div>
    </div>
}