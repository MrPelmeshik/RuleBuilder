import {Modal} from "@consta/uikit/Modal";
import {Text} from "@consta/uikit/Text";
import {Button} from "@consta/uikit/Button";
import React, {Dispatch, useReducer} from "react";
import stepSettingModalStyle from './StepSettingModal.module.css';
import mainFiledStyle from "../../../MainField.module.css";
import {IconClose} from "@consta/icons/IconClose";
import {IconSave} from "@consta/icons/IconSave";
import {DetailSelectDbDataStep} from "../SelectData/Db/Detail/DetailSelectDbDataStep";
import {StepTypeOld} from "../StepType";
import {StepsEnum} from "../StepsEnum";


const getComponentDetail = (stepType:StepTypeOld) => {
  if (stepType.type === StepsEnum.selectDbDataStep) {
    return <DetailSelectDbDataStep stepType={stepType}/>;
  }
  if (stepType.type === StepsEnum.checkStep) {
    return <>Модальное окно для шага проверки</>;
  }
};

export const StepSettingModal
    :React.FC<{title:string, stepType:StepTypeOld, isModalOpen:boolean, setIsModalOpen:Dispatch<boolean>}>
    = ({title, stepType, isModalOpen, setIsModalOpen}) =>
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
                        onClick={() => setIsModalOpen(false)}
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
            {getComponentDetail(stepType)}
        </div>
    </Modal>
}