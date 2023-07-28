import detailHierarchyTestStepStyle from './DetailHierarchyTestStep.module.css'
import mainFiledStyle from "../../../../MainField.module.css";
import React, {useEffect, useState} from "react";
import {HierarchyTestStepSettingsType} from "../Types/HierarchyTestStepSettingsType";
import {ComplexItem} from "./ComplexItem/ComplexItem";

export const DetailHierarchyTestStep
    :React.FC<{stepSettings: HierarchyTestStepSettingsType}>
    = ({stepSettings}) => {
    const [items, setItems] = useState<testComplexItem[] | testItem[]>([{
        id: 1,
        detail: 1
    }])
    const [elements, setElements] = useState<JSX.Element[]>([<ComplexItem complexItems={items}/>])

    return <div>
        {elements}
    </div>
}

export interface testItem {
    id: number
    detail: number
}

export interface testComplexItem {
    id: number
    detail: testComplexItem[] | testItem[]
}