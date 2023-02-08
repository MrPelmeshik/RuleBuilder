import mainFiledStyle from "../../MainField.module.css";
import {Button} from "@consta/uikit/Button";
import {IconSettings} from "@consta/icons/IconSettings";
import {IconClose} from "@consta/icons/IconClose";
import React, {Dispatch} from "react";

export const StepsHeader
    :React.FC<{title:string, subTitle:string, id:number, setDeletedStepId:Dispatch<number|null>}>
    = ({title, subTitle, id, setDeletedStepId}) =>
{
    return <div className={mainFiledStyle.stepPreviewHeader}>
        <div className={mainFiledStyle.stepPreviewHeaderLeftSide}>
            {title}
            <div className={mainFiledStyle.stepPreviewHeaderDetail}>{subTitle}</div>
        </div>
        <div className={mainFiledStyle.stepPreviewHeaderRightSide}>
            <Button iconRight={IconSettings}
                    onlyIcon
                    onClick={() => setDeletedStepId(id)}
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