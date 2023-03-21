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
import {LogicTypeList} from "../../Type/LogicTypeList";
import {LogicType} from "../../Type/LogicType";


export interface IFilterComplexItemViewMode {
    id: number,
    filterConfig: FilterConfigType[] | FilterItemType[] | undefined,
    stepSettings: SelectDbDataStepSettingsType
}


export const FilterComplexItemViewMode
    :React.FC<IFilterComplexItemViewMode>
    = (props) => {
    const [logicType, setLogicType] = useState<LogicType>(LogicTypeList[0])
    const [isNegative, setIsNegative] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    const [hoverBtn, setHoverBtn] = useState<btnType | null>(null)
    const [hoverStyle, setHoverStyle] = useState({})
    const [deletedFilterId, setDeletedFilterId] = useState<number | null>()
    const [items, setItems] = useState<JSX.Element[]>()
    const [content, setContent] = useState<JSX.Element>(<></>)

    useEffect(() => {
        if (props.filterConfig && props.filterConfig.length > 0) {
            const t = props.filterConfig[0]
            if (t instanceof FilterConfigType) {
                setItems((props.filterConfig as FilterConfigType[])
                    .map(filter => <FilterComplexItemViewMode id={filter.id}
                                                                  key={filter.id}
                                                                  filterConfig={filter.filters}
                                                                  stepSettings={props.stepSettings}
                    />))
            }
            else if (t instanceof FilterItemType) {
                setItems((props.filterConfig as FilterItemType[])
                    .map(filter => <FilterItem key={filter.id}
                                               id={filter.id}
                                               filterItem={filter}
                                               setParentDeletedFilterById={setDeletedFilterId}
                                               stepSettings={props.stepSettings}
                    />))
            }
            else {
                console.log("Error object", t)
                throw new Error("Incorrect type for Filter");
            }
        }
    }, [])

    return <div className={filterConfiguratorStyle.filterComplex}>
            <div className={filterComplexItemStyle.filterComplexItemOpenBracketBlock}>
                <b>{isNegative ? 'НЕ' : ''}(</b>
            </div>
            <div className={filterConfiguratorStyle.filterComplexFiled}
                 style={hoverStyle}
            >
                {items}
            </div>
            <div className={filterConfiguratorStyle.filterButtonBlock}>
                <b>){props.filterConfig && props.filterConfig[0] instanceof FilterConfigType ? (props.filterConfig as FilterConfigType).logicConnetor?.label : ''}</b>
            </div>
        </div>
}