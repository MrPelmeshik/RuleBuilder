import {Modal} from "@consta/uikit/Modal";
import {Text} from "@consta/uikit/Text";
import {Button} from "@consta/uikit/Button";
import React, {Dispatch, useReducer} from "react";
import stepSettingModalStyle from './StepSettingModal.module.css';
import mainFiledStyle from "../../../MainField.module.css";
import {IconClose} from "@consta/icons/IconClose";
import {IconSave} from "@consta/icons/IconSave";
import {DetailSelectDbDataStep} from "../SelectData/Db/Detail/DetailSelectDbDataStep";
import {StepType} from "../StepType";
import {StepsEnum} from "../StepsEnum";
import {IStepSettings} from "../IStepSettings";
import {SelectDbDataStepSettingsType} from "../SelectData/Db/Types/SelectDbDataStepSettingsType";
import {CheckStepSettingsType} from "../Check/Types/CheckStepSettingsType";
import {DetailHierarchyTestStep} from "../HierarchyTest/Detail/DetailHierarchyTestStep";
import {HierarchyTestStepSettingsType} from "../HierarchyTest/Types/HierarchyTestStepSettingsType";


const getComponentDetail = (stepSettings:IStepSettings) => {
  if (stepSettings instanceof SelectDbDataStepSettingsType) {
    return <DetailSelectDbDataStep stepSettings={stepSettings} />;
  }
  if (stepSettings instanceof CheckStepSettingsType) {
    return <>Модальное окно для шага проверки</>;
  }
  if (stepSettings instanceof HierarchyTestStepSettingsType) {
    return <DetailHierarchyTestStep stepSettings={stepSettings} />
  }
};

export const StepSettingModal
    :React.FC<{title:string, stepSettings:IStepSettings, saveNewSetting: Function, isModalOpen:boolean, setIsModalOpen:Dispatch<boolean>}>
    = ({title, stepSettings, saveNewSetting, isModalOpen, setIsModalOpen}) =>
{
    return <Modal
        isOpen={isModalOpen}
        hasOverlay
        className={stepSettingModalStyle.stepSettingModal}
    >
        <div className={mainFiledStyle.stepPreviewHeader}>
            <div className={mainFiledStyle.stepPreviewHeaderLeftSide}>
                {title}
            </div>
            <div className={mainFiledStyle.stepPreviewHeaderRightSide}>
                <Button iconRight={IconSave}
                        onlyIcon
                        onClick={() => saveNewSetting(stepSettings)}
                        size={'s'}
                        view={'ghost'}
                />
                <Button iconRight={IconClose}
                        onlyIcon
                        onClick={() => setIsModalOpen(false)}
                        size={'s'}
                        view={'ghost'}
                />
            </div>
        </div>
        <div className={stepSettingModalStyle.stepSettingModalDetail}>
            {getComponentDetail(stepSettings)}
        </div>
    </Modal>
}