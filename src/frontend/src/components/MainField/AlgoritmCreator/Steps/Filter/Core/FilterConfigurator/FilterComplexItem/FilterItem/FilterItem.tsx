import filterItemStyle from './FilterItem.module.css'
import React, {Dispatch, useEffect, useState} from "react";
import {FieldGroup} from "@consta/uikit/FieldGroup";
import {TextField} from "@consta/uikit/TextField";
import {Select} from "@consta/uikit/Select";
import {SelectItemType} from "../../../../../../../../../Types/SelectItemType";
import {AutoComplete} from "@consta/uikit/AutoCompleteCanary";
import {Button} from "@consta/uikit/Button";
import {FilterComplexItem} from "../FilterComplexItem";
import {IconTrash} from "@consta/icons/IconTrash";
import {FilterItemType} from "../../../Type/FilterItemType";
import {Tag} from "@consta/uikit/Tag";
import {SelectDbDataStepSettingsType} from "../../../../../SelectData/Db/Types/SelectDbDataStepSettingsType";
import {LogicTypeList} from "../../../Type/LogicTypeList";
import {ComparisonTypeList} from "../../../Type/ComparisonTypeList";


export const FilterItem
    :React.FC<{id:number, filterItem: FilterItemType, setParentDeletedFilterById:Dispatch<number | null>, stepSettings: SelectDbDataStepSettingsType}>
    = ({id, filterItem, setParentDeletedFilterById, stepSettings}) => {
    const [fields, setFields] = useState<SelectItemType[]>([])
    const [selectedField, setSelectedField] = useState<SelectItemType | null>()

    const [actions, setActions] = useState<SelectItemType[]>([])
    const [selectedAction, setSelectedAction] = useState<SelectItemType | null>()

    const [connectionProperties, setConnectionProperties] = useState<SelectItemType[]>([])
    const [selectedConnectionProperty, setSelectedConnectionProperty] = useState<SelectItemType | null>()

    useEffect(() => {
        setFields(
            stepSettings.metaData?.filter(column => column.isActive).map((column, index) => ({
                id: index,
                label: column.columnName
            })) ?? []
        )
        setActions(
            LogicTypeList.map((logicType, index) => ({
                id: index,
                label: logicType
            }))
        )
        setConnectionProperties(
            ComparisonTypeList.map((comparisonType, index) => ({
                id: index,
                label: comparisonType.label
            }))
        )
    }, [])

    return <div className={filterItemStyle.filteConfigurator}>
        {/*<Tag label={'id:' + id} size={'xs'} mode={'info'} />*/}
        <div className={filterItemStyle.filteConfiguratorItemM}>
            <Select items={fields}
                    value={selectedField}
                    onChange={({value}) => setSelectedField(value)}
                    size={'xs'}
                    view={'clear'}
                    className={filterItemStyle.filteConfiguratorField}
            />
        </div>
        <div className={filterItemStyle.filteConfiguratorItemS}>
            <Select items={connectionProperties}
                    value={selectedConnectionProperty}
                    onChange={({value}) => setSelectedConnectionProperty(value)}
                    size={'xs'}
                    view={'clear'}
                    className={filterItemStyle.filteConfiguratorField}
            />
        </div>
        <div className={filterItemStyle.filteConfiguratorItemL}>
            <div className={filterItemStyle.filteConfiguratorField}>
                target_values
            </div>
        </div>
        <div className={filterItemStyle.filteConfiguratorItemS}>
            <AutoComplete items={fields}
                          size={'xs'}
                          view={'clear'}
                          width={'full'}
                          className={filterItemStyle.filteConfiguratorControl}
            />
        </div>
        <div className={filterItemStyle.filteConfiguratorItemS}>
            <Select items={actions}
                    value={selectedAction}
                    onChange={({value}) => setSelectedAction(value)}
                    size={'xs'}
                    view={'clear'}
                    className={filterItemStyle.filteConfiguratorField}
            />
        </div>
        <Button iconLeft={IconTrash}
                onlyIcon
                size={'xs'}
                view={'ghost'}
                onClick={() => setParentDeletedFilterById(id)}
        />
    </div>
}