import filterComplexItemStyle from './FilterComplexItem.module.css'
import React, {Dispatch, useEffect, useState} from "react";
import {Button} from "@consta/uikit/Button";
import {FilterItem} from "./FilterItem/FilterItem";
import filterConfiguratorStyle from "../FilterConfigurator.module.css";
import {IconTrash} from "@consta/icons/IconTrash";
import {IconAdd} from "@consta/icons/IconAdd";
import {FilterItemType} from "../../Type/FilterItemType";
import {FilterConfigType} from "../../Type/FilterConfigType";
import {Tag} from "@consta/uikit/Tag";
import {SelectDbDataStepSettingsType} from "../../../../SelectData/Db/Types/SelectDbDataStepSettingsType";


export const FilterComplexItem
    :React.FC<{id: number, filterConfig: FilterConfigType[] | FilterItemType[] | undefined, setParentDeletedFilterById: Dispatch<number| null>, parentUpdateFilterItem: Function, getNextFilterItemIdOnParentLevel: Function, stepSettings: SelectDbDataStepSettingsType}>
    = ({id, filterConfig, setParentDeletedFilterById, parentUpdateFilterItem, getNextFilterItemIdOnParentLevel, stepSettings}) => {
    const [hover, setHover] = useState<boolean>(false)
    const [hoverBtn, setHoverBtn] = useState<btnType | null>(null)
    const [hoverStyle, setHoverStyle] = useState({})
    const [deletedFilterId, setDeletedFilterId] = useState<number | null>()
    const [content, setContent] = useState<JSX.Element[]>()

    const updateFilterItem = (updatedFilterId: number, newFiltersConfig: FilterConfigType[] | FilterItemType[]) => {
        console.log(`${id}: updateFilterItem for ${updatedFilterId}. Current state:`, filterConfig, '. New state:', newFiltersConfig)
        if (filterConfig) {
            const newFilters = filterConfig.map(filter => {
                if (filter.id === updatedFilterId) {
                    if (filter instanceof FilterConfigType) {
                        filter.filters = newFiltersConfig
                    }
                }
                return filter
            })
            parentUpdateFilterItem(id, newFilters)
        }
    }

    const getNextFilterItemId = (): number => filterConfig && filterConfig.length > 0 ? Math.max(0, ...filterConfig.map(x => x.id)) + 1 : 1

    const addNewFilterItem = () => {
        console.log(`${id}: addNewFilterItem. Current state:`, filterConfig)
        if (filterConfig && filterConfig.length > 0) {
            const t = filterConfig[0]
            if (t instanceof FilterConfigType) {
                const newFilters = [...(filterConfig as FilterConfigType[]), new FilterConfigType(getNextFilterItemId())]
                parentUpdateFilterItem(id, newFilters)
            } else if (t instanceof FilterItemType) {
                const newFilters = [...(filterConfig as FilterItemType[]), new FilterItemType(getNextFilterItemId())]
                parentUpdateFilterItem(id, newFilters)
            } else {
                console.log("Error object", t)
                throw new Error("Incorrect type for Filter")
            }
        } else {
            const newFilters = [new FilterItemType(getNextFilterItemId())]
            parentUpdateFilterItem(id, newFilters)
        }
    }

    const wrapFilterItems = () => {
        console.log(`${id}: wrap. Current state:`, filterConfig)
        if (filterConfig) {
            const newFilterConfig = new FilterConfigType(getNextFilterItemIdOnParentLevel(), filterConfig)
            parentUpdateFilterItem(id, [newFilterConfig])
        }
    }

    useEffect(() => {
        let borderColor = 'var(--color-bg-ghost)'
        if (hover) {
            let borderColor = null
            if (hoverBtn === btnType.add)
                borderColor = 'var(--color-bg-success)'
            else if (hoverBtn === btnType.wrap)
                borderColor = 'var(--color-bg-brand)'
            else if (hoverBtn === btnType.delete)
                borderColor = 'var(--color-bg-warning)'
            else
                borderColor = 'var(--color-bg-ghost)'

            setHoverStyle({
                // backgroundColor: 'var(--color-bg-ghost)',
                borderLeft: '5px solid ' + borderColor
            })
        } else
            setHoverStyle({borderLeft: '5px solid ' + borderColor})
    }, [hover, hoverBtn])

    useEffect(() => {
        console.log(`${id}: prev deleted ${deletedFilterId}`)
        if (deletedFilterId) {
            console.log(`${id}: deleted ${deletedFilterId}`, filterConfig !== undefined ? filterConfig[deletedFilterId] : 'empty')
            if (filterConfig && filterConfig.length > 0) {
                const t = filterConfig[0]
                if (t instanceof FilterConfigType) {
                    const newFilters = (filterConfig as FilterConfigType[]).filter((x) => x.id !== deletedFilterId)
                    parentUpdateFilterItem(id, newFilters)
                }
                if (t instanceof FilterItemType) {
                    const newFilters = (filterConfig as FilterItemType[]).filter((x) => x.id !== deletedFilterId)
                    parentUpdateFilterItem(id, newFilters)
                }
            }
            setDeletedFilterId(null)
        }
    }, [deletedFilterId])

    useEffect(() => {
        console.log(`${id}: updated filters. Current state:`, filterConfig)
        if (filterConfig && filterConfig.length > 0) {
            const t = filterConfig[0]
            if (t instanceof FilterConfigType) {
                setContent((filterConfig as FilterConfigType[])
                    .map(filter => <FilterComplexItem key={filter.id}
                                                      id={filter.id}
                                                      filterConfig={filter.filters}
                                                      setParentDeletedFilterById={setDeletedFilterId}
                                                      getNextFilterItemIdOnParentLevel={getNextFilterItemId}
                                                      parentUpdateFilterItem={updateFilterItem}
                                                      stepSettings={stepSettings}
                    />))
            } else if (t instanceof FilterItemType) {
                setContent((filterConfig as FilterItemType[])
                    .map(filter => <FilterItem key={filter.id}
                                               id={filter.id}
                                               filterItem={filter}
                                               setParentDeletedFilterById={setDeletedFilterId}
                                               stepSettings={stepSettings}
                    />))
            } else {
                console.log("Error object", t)
                throw new Error("Incorrect type for Filter");
            }
        }
    }, [JSON.stringify(filterConfig)])

    return <div className={filterConfiguratorStyle.filterComplex}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
    >
        <b>{/*<Tag label={'id:' + id} size={'xs'} mode={'info'} />*/}(</b>
        <div className={filterConfiguratorStyle.filterComplexFiled}
             style={hoverStyle}
        >
            {content}
            <Button iconLeft={IconAdd}
                    onlyIcon
                    label={'Добавить элемент на уровень'}
                    size={'xs'}
                    view={'ghost'}
                    onClick={() => addNewFilterItem()}
                    onMouseEnter={() => setHoverBtn(btnType.add)}
                    onMouseLeave={() => setHoverBtn(null)}
            />
        </div>
        <div className={filterConfiguratorStyle.filterButtonBlock}>
            <b>)</b>
            <Button iconLeft={IconAdd}
                    onlyIcon
                    label={'Поднять на уровень'}
                    size={'xs'}
                    view={'ghost'}
                    onClick={() => wrapFilterItems()}
                    onMouseEnter={() => setHoverBtn(btnType.wrap)}
                    onMouseLeave={() => setHoverBtn(null)}
            />
            <Button iconLeft={IconTrash}
                    onlyIcon
                    label={'Удалить уровень'}
                    size={'xs'}
                    view={'ghost'}
                    onClick={() => setParentDeletedFilterById(id)}
                    onMouseEnter={() => setHoverBtn(btnType.delete)}
                    onMouseLeave={() => setHoverBtn(null)}
            />
        </div>
    </div>
}

const enum btnType {
    add,
    wrap,
    delete,
}