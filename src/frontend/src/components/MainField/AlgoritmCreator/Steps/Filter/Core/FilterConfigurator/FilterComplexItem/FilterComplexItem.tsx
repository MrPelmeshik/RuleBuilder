import filterComplexItemStyle from './FilterComplexItem.module.css'
import React, {Dispatch, useEffect, useState} from "react";
import {Button} from "@consta/uikit/Button";
import {FilterItem} from "./FilterItem/FilterItem";
import filterConfiguratorStyle from "../FilterConfigurator.module.css";
import {IconTrash} from "@consta/icons/IconTrash";
import {IconAdd} from "@consta/icons/IconAdd";
import {FilterItemType} from "../../Type/FilterItemType";
import {FilterConfigType} from "../../Type/FilterConfigType";
import {testComplexItem, testItem} from "../../../../HierarchyTest/Detail/DetailHierarchyTestStep";
import {Item} from "../../../../HierarchyTest/Detail/ComplexItem/Item/Item";
import {debug} from "util";
import {Tag} from "@consta/uikit/Tag";


export const FilterComplexItem
    :React.FC<{id: number, filterConfig: FilterConfigType[] | FilterItemType[] | undefined, setParentDeletedFilterById: Dispatch<number| null>, parentUpdateFilterItem: Function, getNextFilterItemIdOnParentLevel: Function}>
    = ({id, filterConfig, setParentDeletedFilterById, parentUpdateFilterItem, getNextFilterItemIdOnParentLevel}) => {
    const [deletedFilterId, setDeletedFilterId] = useState<number | null>()
    const [content, setContent] = useState<JSX.Element[]>()
    const [filters, setFilters] = useState<FilterConfigType[] | FilterItemType[] | undefined>(filterConfig)

    const updateFilterItem = (updatedFilterId: number, newFiltersConfig: FilterConfigType[] | FilterItemType[]) => {
        console.log(`${id}: updateFilterItem for ${updatedFilterId}. Current state:`, filters, '. New state:', newFiltersConfig)
        if (filters) {
            const newFilters = filters.map(filter => {
                if (filter.id === updatedFilterId) {
                    if (filter instanceof FilterConfigType) {
                        filter.filters = newFiltersConfig
                    }
                }
                return filter
            })
            setFilters(newFilters)
            parentUpdateFilterItem(id, newFilters)
        }
    }

    const getNextFilterItemId = (): number => filters && filters.length > 0 ? Math.max(0, ...filters.map(x => x.id)) + 1 : 0

    useEffect(() => {
        if (deletedFilterId) {
            console.log(`${id}: deleted ${deletedFilterId}`)
            if (filters && filters.length > 0) {
                const t = filters[0]
                if (t instanceof FilterConfigType) {
                    const newFilters = (filters as FilterConfigType[]).filter((x) => x.id === deletedFilterId)
                    parentUpdateFilterItem(id, newFilters)
                }
                if (t instanceof FilterItemType) {
                    const newFilters = (filters as FilterItemType[]).filter((x) => x.id === deletedFilterId)
                    parentUpdateFilterItem(id, newFilters)
                }
            }
            setDeletedFilterId(null)
        }
    }, [deletedFilterId])

    const addNewFilterItem = () => {
        console.log(`${id}: addNewFilterItem. Current state:`, filters)
        if (filters && filters.length > 0) {
            const t = filters[0]
            if (t instanceof FilterConfigType) {
                const newFilters = [...(filters as FilterConfigType[]), new FilterConfigType(getNextFilterItemId())]
                parentUpdateFilterItem(id, newFilters)
                // setFilters([...(filters as FilterConfigType[]), new FilterConfigType(getNextFilterItemId())])
            } else if (t instanceof FilterItemType) {
                const newFilters = [...(filters as FilterItemType[]), new FilterItemType(getNextFilterItemId())]
                parentUpdateFilterItem(id, newFilters)
                // setFilters([...(filters as FilterItemType[]), new FilterItemType(getNextFilterItemId())])
            } else {
                console.log("Error object", t)
                throw new Error("Incorrect type for Filter")
            }
        } else {
            const newFilters = [new FilterItemType(getNextFilterItemId())]
            parentUpdateFilterItem(id, newFilters)
            // setFilters([new FilterItemType(getNextFilterItemId())])
        }
    }

    const wrapFilterItems = () => {
        console.log(`${id}: wrap. Current state:`, filters)
        if (filters) {
            const newFilterConfig = new FilterConfigType(getNextFilterItemIdOnParentLevel(), filters)
            parentUpdateFilterItem(id, [newFilterConfig])
        }
    }

    useEffect(() => {
        console.log(`${id}: updated filters. Current state:`, filters)
        if (filters && filters.length > 0) {
            const t = filters[0]
            if (t instanceof FilterConfigType) {
                setContent((filters as FilterConfigType[])
                    .map(filter => <FilterComplexItem key={filter.id}
                                                      id={filter.id}
                                                      filterConfig={filter.filters}
                                                      setParentDeletedFilterById={setDeletedFilterId}
                                                      getNextFilterItemIdOnParentLevel={getNextFilterItemId}
                                                      parentUpdateFilterItem={updateFilterItem}
                    />))
            } else if (t instanceof FilterItemType) {
                setContent((filters as FilterItemType[])
                    .map(filter => <FilterItem key={filter.id}
                                               id={filter.id}
                                               filterItem={filter}
                                               setParentDeletedFilterById={setDeletedFilterId}
                    />))
            } else {
                console.log("Error object", t)
                throw new Error("Incorrect type for Filter");
            }
        }
        // throw new Error("Empty filters");
    }, [JSON.stringify(filters), JSON.stringify(filterConfig)])

    return <div className={filterConfiguratorStyle.filterComplex}>
        <b><Tag label={'id:' + id} size={'xs'} mode={'info'} />(</b>
        <div className={filterConfiguratorStyle.filterComplexFiled}>
            {content}
        </div>
        <div className={filterConfiguratorStyle.filterButtonBlock}>
            <b>)</b>
            <Button iconLeft={IconAdd}
                    onlyIcon
                    size={'xs'}
                    view={'ghost'}
                    onClick={() => addNewFilterItem()}
            />
            <Button iconLeft={IconAdd}
                    onlyIcon
                    size={'xs'}
                    view={'ghost'}
                    onClick={() => wrapFilterItems()}
            />
            <Button iconLeft={IconTrash}
                    onlyIcon
                    size={'xs'}
                    view={'ghost'}
                    onClick={() => setParentDeletedFilterById(id)}
            />
        </div>
    </div>
}