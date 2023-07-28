import React from "react";
import {testItem} from "../../DetailHierarchyTestStep";
import detailHierarchyTestStepStyle from "../../DetailHierarchyTestStep.module.css";

export const Item
    :React.FC<{item: testItem}>
    = ({item}) =>
{
    return <div className={detailHierarchyTestStepStyle.item}>
        {item.detail}
    </div>
}