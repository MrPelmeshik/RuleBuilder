import filterComplexItemStyle from './FilterComplexItem.module.css'
import React, {Dispatch, useEffect, useState} from "react";
import {Button} from "@consta/uikit/Button";
import {FilterItem} from "./FilterItem/FilterItem";
import filterConfiguratorStyle from "../FilterConfigurator.module.css";
import {IconTrash} from "@consta/icons/IconTrash";
import {IconAdd} from "@consta/icons/IconAdd";
import {FilterItemType} from "../../Type/FilterItemType";
import {FilterConfigType} from "../../Type/FilterConfigType";
import {SelectDbDataStepSettingsType} from "../../../../SelectData/Db/Types/SelectDbDataStepSettingsType";
import {LogicTypeList} from "../../Type/LogicTypeList";
import {LogicType} from "../../Type/LogicType";


export interface IFilterComplexItem {
    id: number,
    filterConfig: FilterConfigType[] | FilterItemType[] | undefined,
    setParentDeletedFilterById: Dispatch<number| null>,
    parentUpdateFilterItem: Function,
    getNextFilterItemIdOnParentLevel: Function,
    stepSettings: SelectDbDataStepSettingsType
}

export const FilterComplexItem : React.FC<IFilterComplexItem> = (props) => {
    const [logicType, setLogicType] = useState<LogicType>(LogicTypeList[0])
    const [isNegative, setIsNegative] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    const [hoverBtn, setHoverBtn] = useState<btnType | null>(null)
    const [hoverStyle, setHoverStyle] = useState({})
    const [deletedFilterId, setDeletedFilterId] = useState<number | null>()
    const [items, setItems] = useState<JSX.Element[]>()

    const updateFilterItem = (updatedFilterId: number, newFiltersConfig: FilterConfigType[] | FilterItemType[]) => {
        console.log(`${props.id}: updateFilterItem for ${updatedFilterId}. Current state:`, props.filterConfig, '. New state:', newFiltersConfig)
        if (props.filterConfig) {
            const newFilters = props.filterConfig.map(filter => {
                if (filter.id === updatedFilterId) {
                    if (filter instanceof FilterConfigType) {
                        filter.filters = newFiltersConfig
                    }
                }
                return filter
            })
            props.parentUpdateFilterItem(props.id, newFilters)
        }
    }

    const getNextFilterItemId = (): number => props.filterConfig && props.filterConfig.length > 0 ? Math.max(0, ...props.filterConfig.map(x => x.id)) + 1 : 1

    const addNewFilterItem = () => {
        console.log(`${props.id}: addNewFilterItem. Current state:`, props.filterConfig)
        if (props.filterConfig && props.filterConfig.length > 0) {
            const t = props.filterConfig[0]
            if (t instanceof FilterConfigType) {
                const newFilters = [...(props.filterConfig as FilterConfigType[]), new FilterConfigType(getNextFilterItemId())]
                props.parentUpdateFilterItem(props.id, newFilters)
            } else if (t instanceof FilterItemType) {
                const newFilters = [...(props.filterConfig as FilterItemType[]), new FilterItemType(getNextFilterItemId())]
                props.parentUpdateFilterItem(props.id, newFilters)
            } else {
                console.log("Error object", t)
                throw new Error("Incorrect type for Filter")
            }
        } else {
            const newFilters = [new FilterItemType(getNextFilterItemId())]
            props.parentUpdateFilterItem(props.id, newFilters)
        }
    }

    const wrapFilterItems = () => {
        console.log(`${props.id}: wrap. Current state:`, props.filterConfig)
        if (props.filterConfig) {
            const newFilterConfig = new FilterConfigType(props.getNextFilterItemIdOnParentLevel(), props.filterConfig)
            props.parentUpdateFilterItem(props.id, [newFilterConfig])
        }
    }

    const switchComparisonType = (filterConfigId: number) => {
        if (props.filterConfig) {
            if (logicType === LogicTypeList[1]) {
                props.filterConfig[filterConfigId].logicConnetor = LogicTypeList[2]
                setLogicType(props.filterConfig[filterConfigId].logicConnetor)
            } else if (logicType === LogicTypeList[2]) {
                props.filterConfig[filterConfigId].logicConnetor = LogicTypeList[1]
                setLogicType(props.filterConfig[filterConfigId].logicConnetor)
            } else
                throw new Error(`Incorrect comparison type: ${logicType.label}`)
        }
    }

    useEffect(() => {
        if (props.filterConfig)
            props.filterConfig.logicConnetor = logicType
    }, [logicType])

    useEffect(() => {
        if (props.filterConfig)
            props.filterConfig.isNegative = isNegative
    }, [isNegative])

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
                borderColor = 'var(--color-bg-normal)'

            setHoverStyle({
                // backgroundColor: 'var(--color-bg-ghost)',
                borderLeft: '5px solid ' + borderColor
            })
        } else {
            setHoverStyle({borderLeft: '5px solid ' + borderColor})
        }
    }, [hover, hoverBtn])

    useEffect(() => {
        console.log(`${props.id}: prev deleted ${deletedFilterId}`)
        if (deletedFilterId) {
            console.log(`${props.id}: deleted ${deletedFilterId}`, props.filterConfig !== undefined ? props.filterConfig[deletedFilterId] : 'empty')
            if (props.filterConfig && props.filterConfig.length > 0) {
                const t = props.filterConfig[0]
                if (t instanceof FilterConfigType) {
                    const newFilters = (props.filterConfig as FilterConfigType[]).filter((x) => x.id !== deletedFilterId)
                    props.parentUpdateFilterItem(props.id, newFilters)
                }
                if (t instanceof FilterItemType) {
                    const newFilters = (props.filterConfig as FilterItemType[]).filter((x) => x.id !== deletedFilterId)
                    props.parentUpdateFilterItem(props.id, newFilters)
                }
            }
            setDeletedFilterId(null)
        }
    }, [deletedFilterId])

    useEffect(() => {
        console.log(`${props.id}: updated filters. Current state:`, props.filterConfig)
        if (props.filterConfig && props.filterConfig.length > 0) {
            const t = props.filterConfig[0]
            if (t instanceof FilterConfigType) {
                setItems((props.filterConfig as FilterConfigType[])
                    .map(filter => <FilterComplexItem id={filter.id}
                                                      key={filter.id}
                                                      filterConfig={filter.filters}
                                                      setParentDeletedFilterById={setDeletedFilterId}
                                                      getNextFilterItemIdOnParentLevel={getNextFilterItemId}
                                                      parentUpdateFilterItem={updateFilterItem}
                                                      stepSettings={props.stepSettings}
                    />))
            } else if (t instanceof FilterItemType) {
                setItems((props.filterConfig as FilterItemType[])
                    .map(filter => <FilterItem key={filter.id}
                                               id={filter.id}
                                               filterItem={filter}
                                               setParentDeletedFilterById={setDeletedFilterId}
                                               stepSettings={props.stepSettings}
                    />))
            } else {
                console.log("Error object", t)
                throw new Error("Incorrect type for Filter");
            }
        }
    }, [JSON.stringify(props.filterConfig)])

    return <div className={filterConfiguratorStyle.filterComplex}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
    >
        {/*<Tag label={'id:' + id} size={'xs'} mode={'info'} />*/}
        <div className={filterComplexItemStyle.filterComplexItemOpenBracketBlock}>
            <Button label={isNegative ? LogicTypeList[0].label : ''}
                    size={'xs'}
                    view={'ghost'}
                    onClick={() => setIsNegative(!isNegative)}
            />
            <b>(</b>
        </div>
        <div className={filterConfiguratorStyle.filterComplexFiled}
             style={hoverStyle}
        >
            {items}
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
                    onClick={() => props.setParentDeletedFilterById(props.id)}
                    onMouseEnter={() => setHoverBtn(btnType.delete)}
                    onMouseLeave={() => setHoverBtn(null)}
            />
            <Button label={logicType.label}
                    size={'xs'}
                    view={'ghost'}
                    onClick={() => switchComparisonType()}
            />
        </div>
    </div>
}

const enum btnType {
    add,
    wrap,
    delete,
}