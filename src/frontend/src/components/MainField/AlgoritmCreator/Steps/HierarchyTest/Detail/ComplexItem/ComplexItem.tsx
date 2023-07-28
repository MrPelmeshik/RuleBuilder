import React, {useEffect, useState} from "react";
import {testComplexItem, testItem} from "../DetailHierarchyTestStep";
import {Item} from "./Item/Item";
import detailHierarchyTestStepStyle from "../DetailHierarchyTestStep.module.css";
import {Button} from "@consta/uikit/Button";

export const ComplexItem
    :React.FC<{complexItems: testComplexItem[] | testItem[]}>
    = ({complexItems}) =>
{
    const [items, setitems] = useState(complexItems)
    const [content, setContent] = useState<JSX.Element[]>()

    const addNewItemOnLevel = () => {
        if (typeof items[0].detail === "number") {
            setitems([
                ...(items as testItem[]),
                {
                    id: items.length + 1,
                    detail: 1
                } as testItem
            ])
        } else {
            setitems([
                ...(items as testComplexItem[]),
                {
                    id: items.length + 1,
                    detail: [{
                        id: items.length + 2,
                        detail: 1
                    }]
                } as testComplexItem
            ])
        }
    }
    const wrapLevel = () => {
        setitems([{
            id: items.length + 1,
            detail: items.slice()
        }])
    }

    useEffect(() => {
        if (typeof items[0].detail === "number") {
            setContent((items as testItem[]).map(item => <Item item={item}/>))
        } else {
            setContent((items as testComplexItem[]).map(item => <ComplexItem complexItems={item.detail}/>))
        }
    }, [JSON.stringify(items)])

    return <div className={detailHierarchyTestStepStyle.item}>
        {content}
        <Button label={'add'} size={'xs'} onClick={() => addNewItemOnLevel()}/>
        <Button label={'wrap'} size={'xs'} onClick={() => wrapLevel()}/>
    </div>
}