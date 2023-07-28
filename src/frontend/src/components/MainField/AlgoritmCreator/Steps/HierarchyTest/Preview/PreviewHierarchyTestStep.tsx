import mainFiledStyle from "../../../../MainField.module.css";
import {StepsHeader} from "../../StepsHeader";
import React, {Dispatch} from "react";
import {HierarchyTestStepSettingsType} from "../Types/HierarchyTestStepSettingsType";

export const PreviewHierarchyTestStep
    :React.FC<{id:number, stepSettings:HierarchyTestStepSettingsType, setDeletedStepId:Dispatch<number|null>}>
    = ({id, stepSettings, setDeletedStepId}) =>
{
    return <div className={mainFiledStyle.stepPreview}>
        <StepsHeader id={id} title={'test_title'} subTitle={'test_subtitle'} stepSettings={stepSettings} setDeletedStepId={setDeletedStepId} />
        <div className={mainFiledStyle.stepPreviewDescription}>
            PreviewHierarchyTestStep description
        </div>
    </div>
}