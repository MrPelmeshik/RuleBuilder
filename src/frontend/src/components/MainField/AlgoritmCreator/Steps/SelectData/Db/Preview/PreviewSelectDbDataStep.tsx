import previewSelectDbDataStepStyle from './PreviewSelectDbDataStep.module.css'
import isDeepEqual from 'fast-deep-equal/react'
import mainFiledStyle from "../../../../../MainField.module.css";
import React, {Dispatch, useEffect, useRef, useState} from "react";
import {StepsHeader} from "../../../StepsHeader";
import {StepTypeOld} from "../../../StepType";
import {SelectDataStepType} from "../../Types/SelectDataStepType";
import {IStep} from "../../../IStep";


export const PreviewSelectDbDataStep
    :React.FC<{stepType:StepTypeOld, setDeletedStepId:Dispatch<number|null>}>
    = ({stepType, setDeletedStepId}) =>
{
    const [subTitle, setSubTitle] = useState('')
    const curStepTypeDetail = useRef(stepType.detail)

    const source = 'test_local'
    const schema = null
    const table = null

    if(!isDeepEqual(curStepTypeDetail.current, stepType.detail)) {
        curStepTypeDetail.current = stepType.detail
    }

    useEffect(() => {
        console.log(stepType.detail)
        let headerDetail = ''
        let detail = stepType.detail as SelectDataStepType
        if (detail as SelectDataStepType && detail.source) {
            headerDetail = `из ${detail.source.name}`
            if (schema) {
                headerDetail += `\tисточник:\t${schema}`
                if (table)
                    headerDetail += `.${table}`
            }
        }
        setSubTitle(headerDetail)
    }, [curStepTypeDetail])
    const getTitle = ():string => 'Чтение данных'


    return <div className={mainFiledStyle.stepPreview}>
        <StepsHeader title={getTitle()} subTitle={subTitle} stepType={stepType} setDeletedStepId={setDeletedStepId} />
        <div className={mainFiledStyle.stepPreviewDescription}>
            PreviewSelectDbDataStep description
        </div>
    </div>
}