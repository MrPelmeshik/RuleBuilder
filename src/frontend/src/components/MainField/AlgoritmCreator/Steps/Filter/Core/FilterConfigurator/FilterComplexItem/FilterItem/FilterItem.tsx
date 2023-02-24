import filterItemStyle from './FilterItem.module.css'
import React, {Dispatch, useEffect, useState} from "react";
import {FieldGroup} from "@consta/uikit/FieldGroup";
import {TextField} from "@consta/uikit/TextField";
import {Select} from "@consta/uikit/Select";
import {SelectItemType} from "../../../../../../../../../Types/SelectItemType";
import {LogicTypesEnum} from "../../../../../../../../../Types/LogicTypesEnum";
import {FilterActionEventTypesEnum} from "../../../../../../../../../Types/FilterActionEventTypesEnum";
import {AutoComplete} from "@consta/uikit/AutoCompleteCanary";
import {Button} from "@consta/uikit/Button";
import {FilterComplexItem} from "../FilterComplexItem";
import {IconTrash} from "@consta/icons/IconTrash";
import {FilterItemType} from "../../../Type/FilterItemType";


export const FilterItem
    :React.FC<{id:number, filterItem: FilterItemType, setParentDeletedFilterById:Dispatch<number | null>}>
    = ({id, filterItem, setParentDeletedFilterById}) => {
    const [fields, setFields] = useState<SelectItemType[]>([])
    const [selectedField, setSelectedField] = useState<SelectItemType | null>()

    const [actions, setActions] = useState<SelectItemType[]>([])
    const [selectedAction, setSelectedAction] = useState<SelectItemType | null>()

    const [connectionProperties, setConnectionProperties] = useState<SelectItemType[]>([])
    const [selectedConnectionProperty, setSelectedConnectionProperty] = useState<SelectItemType | null>()

    useEffect(() => {
        setFields([
            {
                id: 0,
                label: 'test_0'
            },
            {
                id: 1,
                label: 'test_1'
            },
            {
                id: 2,
                label: 'test_2'
            }
        ])
        setActions(
            Object.keys(LogicTypesEnum)
                .filter(x => !Number.isNaN(Number(x)))
                .map(type => ({id: Number(type), label: LogicTypesEnum[Number(type)]}))
        )
        setConnectionProperties(
            Object.keys(FilterActionEventTypesEnum)
                .filter(x => !Number.isNaN(Number(x)))
                .map(type => ({id: Number(type), label: FilterActionEventTypesEnum[Number(type)]}))
        )
    }, [])

    return <div className={filterItemStyle.filteConfigurator}>
        <Select items={fields}
                value={selectedField}
                onChange={({value}) => setSelectedField(value)}
                size={'xs'}
                view={'clear'}
                className={filterItemStyle.filteConfiguratorField}
        />
        <Select items={connectionProperties}
                value={selectedConnectionProperty}
                onChange={({value}) => setSelectedConnectionProperty(value)}
                size={'xs'}
                view={'clear'}
                className={filterItemStyle.filteConfiguratorControl}
        />
        <div className={filterItemStyle.filteConfiguratorField}>

        </div>
        <AutoComplete items={fields}
                      size={'xs'}
                      view={'clear'}
                      className={filterItemStyle.filteConfiguratorControl}
        />
        <Select items={actions}
                value={selectedAction}
                onChange={({value}) => setSelectedAction(value)}
                size={'xs'}
                view={'clear'}
                className={filterItemStyle.filteConfiguratorControl}
        />
        <Button iconLeft={IconTrash}
                onlyIcon
                size={'xs'}
                view={'ghost'}
                onClick={() => setParentDeletedFilterById(id)}
        />
    </div>
}