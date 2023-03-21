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
import {LogicType} from "../../../Type/LogicType";
import {SelectorTargetValues} from "./SelectorTargetValues/SelectorTargetValues";
import {ColumnMetaType} from "../../../../../SelectData/Db/Types/ColumnMetaType";
import cloneDeep from "lodash.clonedeep";
import {TargetValueType} from "../../../Type/TargetValueType";


export const FilterItem
    :React.FC<{id:number, filterItem: FilterItemType, setParentDeletedFilterById:Dispatch<number | null>, stepSettings: SelectDbDataStepSettingsType}>
    = ({id, filterItem, setParentDeletedFilterById, stepSettings}) => {
    const [fields, setFields] = useState<SelectItemType[]>([])
    const [selectedField, setSelectedField] = useState<SelectItemType | null>()

    const [connectionProperties, setConnectionProperties] = useState<SelectItemType[]>([])
    const [selectedConnectionProperty, setSelectedConnectionProperty] = useState<SelectItemType | null>()

    const [logicType, setLogicType] = useState<LogicType>(LogicTypeList[0])

    useEffect(() => {
        setFields(
            stepSettings.metaData?.filter(column => column.isActive).map((column, index) => ({
                id: index,
                label: column.columnName
            })) ?? []
        )
        setConnectionProperties(
            ComparisonTypeList.map(comparisonType => ({
                id: comparisonType.id,
                label: comparisonType.label
            }))
        )

        // region init state

        if (filterItem.ckeckedField)
            setSelectedField({
                id: fields.filter(field => field.label === filterItem.ckeckedField?.columnName)[0].id ?? -1,
                label: filterItem.ckeckedField.columnName
            })
        setLogicType(filterItem.logicConnetor ?? LogicTypeList[1])

        // endregion
    }, [])

    useEffect(() => {
        filterItem.logicConnetor = logicType
    }, [logicType])

    const switchComparisonType = () => {
        if (logicType === LogicTypeList[1]) {
            filterItem.comparisonOperator = LogicTypeList[2]
            setLogicType(filterItem.comparisonOperator)
        } else if (logicType === LogicTypeList[2]) {
            filterItem.comparisonOperator = LogicTypeList[1]
            setLogicType(filterItem.comparisonOperator)
        } else
            throw new Error(`Incorrect comparison type: ${logicType.label}`)
    }

    return <div className={filterItemStyle.filterConfigurator}>
        {/*<Tag label={'id:' + id} size={'xs'} mode={'info'} />*/}
        <Select className={filterItemStyle.filterConfiguratorItemM}
                items={fields}
                value={selectedField}
                onChange={({value}) => setSelectedField(value)}
                size={'xs'}
                view={'clear'}
        />
        <Select className={filterItemStyle.filterConfiguratorItemS}
                items={connectionProperties}
                value={selectedConnectionProperty}
                onChange={({value}) => setSelectedConnectionProperty(value)}
                size={'xs'}
                view={'clear'}
        />
        <SelectorTargetValues fields={fields} filterItem={filterItem} />
        <Button label={logicType.label}
                size={'xs'}
                view={'ghost'}
                onClick={() => switchComparisonType()}
        />
        <Button iconLeft={IconTrash}
                onlyIcon
                size={'xs'}
                view={'ghost'}
                onClick={() => setParentDeletedFilterById(id)}
        />
    </div>
}