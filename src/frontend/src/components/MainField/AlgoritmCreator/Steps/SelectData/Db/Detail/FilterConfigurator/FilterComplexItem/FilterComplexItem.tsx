import filterComplexItemStyle from './FilterComplexItem.module.css'
import React, {Dispatch, useEffect, useState} from "react";
import {Button} from "@consta/uikit/Button";
import {FilterItem} from "./FilterItem/FilterItem";
import filterConfiguratorStyle from "../FilterConfigurator.module.css";


export const FilterComplexItem
    :React.FC<{complexFilterId:number, setDeletedComplexFilterId:Dispatch<number | null>}>
    = ({complexFilterId, setDeletedComplexFilterId}) =>
{
    const [filterItems, setFilterItems] = useState<JSX.Element[]>([])
    const [deletedFilterId, setDeletedFilterId] = useState<number | null>()

    useEffect(() => {
        setFilterItems([...(filterItems.filter(x => x.props.id !== deletedFilterId))])
        setDeletedFilterId(null)
    }, [deletedFilterId])

    const addFilterItem = (item:JSX.Element) => setFilterItems([item, ...filterItems])
    const getNextFilterItemId = ():number => Math.max(0, ...filterItems.map(x => x.props.id)) + 1

    return <div className={filterConfiguratorStyle.filterComplexFiled}>
        <b>(</b>
        <Button
            label={'+'}
            size={'xs'}
            onClick={() => {
                const componentId = getNextFilterItemId()
                addFilterItem(
                    <FilterItem
                        key={componentId}
                        id={componentId}
                        setDeletedFilterId={setDeletedFilterId}
                    />
                )
            }}
        />
        {filterItems}
        <b>)</b>
    </div>
}