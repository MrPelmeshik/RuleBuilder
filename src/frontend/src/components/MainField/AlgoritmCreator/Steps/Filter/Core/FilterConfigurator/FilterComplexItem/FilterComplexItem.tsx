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


export const FilterComplexItem
    :React.FC<{id: number, filterConfig: FilterConfigType[] | FilterItemType[] | undefined, setParentDeletedFilterById: Dispatch<number| null>, parentUpdateFilterItem: Function, getNextFilterItemIdOnParentLevel: Function}>
    = ({id, filterConfig, setParentDeletedFilterById, parentUpdateFilterItem, getNextFilterItemIdOnParentLevel}) => {
    // const [filterItems, setFilterItems] = useState<JSX.Element[]>([])
    const [deletedFilterId, setDeletedFilterId] = useState<number | null>()
    // const [filters, setFilters] = useState(filterConfig)
    const [content, setContent] = useState<JSX.Element[]>()

    const updateFilterItem = (id: number, newFilters: FilterConfigType[] | FilterItemType[]) => {
        if (filterConfig) {
            filterConfig.forEach(filter => {
                if (filter.id === id) {
                    if (filter instanceof FilterConfigType) {
                        filter.filters = newFilters
                    }
                }
            })
        }
    }

    const getNextFilterItemId = (): number => filterConfig ? Math.max(0, ...filterConfig.map(x => x.id)) + 1 : 0

    useEffect(() => {
        if (filterConfig && (filterConfig.length > 0)) {
            const t = filterConfig[0]
            if (t instanceof FilterConfigType) {
                const newFilters = (filterConfig as FilterConfigType[]).filter((x) => x.id === deletedFilterId)
                parentUpdateFilterItem(id, newFilters)
            }
        }
        setDeletedFilterId(null)
    }, [deletedFilterId])

    const addNewFilterItem = () => {
        console.log('addNewFilterItem', filterConfig)
        if (filterConfig && (filterConfig.length > 0)) {
            const t = filterConfig[0]
            if (t instanceof FilterConfigType) {
                const newFilterItem = [...(filterConfig as FilterConfigType[]), new FilterConfigType(getNextFilterItemId())]
                parentUpdateFilterItem(id, newFilterItem)
            } else if (t instanceof FilterItemType) {
                const newFilterItem = [...(filterConfig as FilterItemType[]), new FilterItemType(getNextFilterItemId())]
                parentUpdateFilterItem(id, newFilterItem)
            }
        } else {
            const newFilterItem = [new FilterItemType(getNextFilterItemId())]
            parentUpdateFilterItem(id, newFilterItem)
            // throw new Error("Empty filters");
        }
    }

    const wrapFilterItems = () => {
        if (filterConfig) {
            const newFilters = filterConfig.slice()
            const newFilterConfig = new FilterConfigType(getNextFilterItemIdOnParentLevel(), newFilters)
            parentUpdateFilterItem(id, [newFilterConfig])
        }
    }

    useEffect(() => {
        if (filterConfig && (filterConfig.length > 0)) {
            const t = filterConfig[0]
            if (t instanceof FilterConfigType) {
                const nextId = getNextFilterItemId()
                setContent((filterConfig as FilterConfigType[])
                    .map(filter => <FilterComplexItem key={nextId}
                                                      id={nextId}
                                                      filterConfig={filter.filters}
                                                      setParentDeletedFilterById={setDeletedFilterId}
                                                      getNextFilterItemIdOnParentLevel={getNextFilterItemId}
                                                      parentUpdateFilterItem={updateFilterItem}
                    />))
            } else if (t instanceof FilterItemType) {
                const nextId = getNextFilterItemId()
                setContent((filterConfig as FilterItemType[])
                    .map(filter => <FilterItem key={nextId}
                                               id={nextId}
                                               filterItem={filter}
                                               setParentDeletedFilterById={setDeletedFilterId}
                    />))
            }
            // throw new Error("Incorrect type for Filter. This: " + typeof filterConfig[0]);
        }
        // throw new Error("Empty filters");
    }, [JSON.stringify(filterConfig)])

    return <div className={filterConfiguratorStyle.filterComplex}>
        <b>(</b>
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