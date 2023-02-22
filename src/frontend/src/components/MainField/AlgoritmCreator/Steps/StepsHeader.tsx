import mainFiledStyle from "../../MainField.module.css";
import {Button} from "@consta/uikit/Button";
import {IconSettings} from "@consta/icons/IconSettings";
import {IconClose} from "@consta/icons/IconClose";
import React, {Dispatch, useState} from "react";
import {StepSettingModal} from "./StepSettingModal/StepSettingModal";
import {IStepSettings} from "./IStepSettings";

export const StepsHeader
    :React.FC<{id:number, title:string, subTitle:string, stepSettings:IStepSettings, setDeletedStepId:Dispatch<number|null>}>
    = ({id, title, subTitle, stepSettings, setDeletedStepId}) =>
{
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const saveNewSetting = (newStepSettings: IStepSettings) => stepSettings.copyFrom(newStepSettings)
    const getCopyStepSettings = (curStepSettings: IStepSettings): IStepSettings => curStepSettings.getDeepCopy()

    return <div className={mainFiledStyle.stepPreviewHeader}>
        <StepSettingModal title={title} stepSettings={getCopyStepSettings(stepSettings)} saveNewSetting={saveNewSetting} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <div className={mainFiledStyle.stepPreviewHeaderLeftSide}>
            {title}
            <div className={mainFiledStyle.stepPreviewHeaderDetail}>{subTitle}</div>
        </div>
        <div className={mainFiledStyle.stepPreviewHeaderRightSide}>
            <Button iconRight={IconSettings}
                    onlyIcon
                    onClick={() => setIsModalOpen(true)}
                    size={'xs'}
                    view={'ghost'}
            />
            <Button iconRight={IconClose}
                    onlyIcon
                    onClick={() => setDeletedStepId(id)}
                    size={'xs'}
                    view={'ghost'}
            />
        </div>
    </div>
}