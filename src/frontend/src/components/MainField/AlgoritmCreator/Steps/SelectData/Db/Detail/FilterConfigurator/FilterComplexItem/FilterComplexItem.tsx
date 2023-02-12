import filterComplexItemStyle from './FilterComplexItem.module.css'
import React, {Dispatch, useEffect, useState} from "react";
import {Button} from "@consta/uikit/Button";
import {FilterItem} from "./FilterItem/FilterItem";
import filterConfiguratorStyle from "../FilterConfigurator.module.css";
import {IconTrash} from "@consta/icons/IconTrash";
import {IconAdd} from "@consta/icons/IconAdd";


export const FilterComplexItem
    :React.FC<{complexFilterId:number, setDeletedComplexFilterId:Dispatch<number | null>}>
    = ({complexFilterId, setDeletedComplexFilterId}) => {
    const [filterItems, setFilterItems] = useState<JSX.Element[]>([])
    const [deletedFilterId, setDeletedFilterId] = useState<number | null>()

    useEffect(() => {
        setFilterItems([...(filterItems.filter(x => x.props.id !== deletedFilterId))])
        setDeletedFilterId(null)
    }, [deletedFilterId])

    const addFilterItem = (item: JSX.Element) => setFilterItems([...filterItems, item])
    const getNextFilterItemId = (): number => Math.max(0, ...filterItems.map(x => x.props.id)) + 1

    return <div className={filterConfiguratorStyle.filterComplex}>
        <b>(</b>
        <div className={filterConfiguratorStyle.filterComplexFiled}>
            {filterItems}
            <Button iconLeft={IconAdd}
                    onlyIcon
                    size={'xs'}
                    view={'ghost'}
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
        </div>
        <b>)
            <Button iconLeft={IconTrash}
                    onlyIcon
                    size={'xs'}
                    view={'ghost'}
                    onClick={() => setDeletedComplexFilterId(complexFilterId)}
            />
        </b>
    </div>
}