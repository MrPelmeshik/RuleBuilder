import targetValuesStyle from './SelectorTargetValues.module.css'
import filterItemStyle from "../FilterItem.module.css";
import {AutoComplete} from "@consta/uikit/AutoCompleteCanary";
import React, {useEffect, useState} from "react";
import {Tag} from "@consta/uikit/Tag";
import {SelectItemType} from "../../../../../../../../../../Types/SelectItemType";
import {FilterItemType} from "../../../../Type/FilterItemType";
import {Button} from "@consta/uikit/Button";
import {LogicTypeList} from "../../../../Type/LogicTypeList";

export const SelectorTargetValues
    :React.FC<{fields: SelectItemType[], filterItem: FilterItemType}>
    = ({fields, filterItem}) =>
{
    const [newTargetValue, setNewTargetValue] = useState<string | null>(null)
    const [targetValueItems, setTargetValueItems] = useState<JSX.Element[]>([])

    useEffect(() => {updateTargetValueItems()}, [])

    useEffect(() => {
        console.log('newTargetValue:', newTargetValue)
    }, [newTargetValue])

    const getNextId = () =>
        Math.max(0, ...filterItem.targetValues?.map(targetValue => targetValue.id) ?? []) + 1;

    const updateTargetValueItems = () => {
        setTargetValueItems(filterItem.targetValues
            ? filterItem.targetValues.map(targetValue =>
                <Tag size={'xs'}
                     mode={'cancel'}
                     key={targetValue.id}
                     onCancel={(value) => {rmvTargetValue(targetValue.id)}}
                     label={targetValue.value.toString()} // Добавить обработку под разные типы
                />
            )
            : []
        )
    }

    const addTargetValue = (addValue: string | null) => {
        console.log('add', addValue, filterItem.targetValues)
        if (addValue)
            filterItem.targetValues.push({id: getNextId(), value: addValue})
        updateTargetValueItems()
    }

    const rmvTargetValue = (id: number) => {
        console.log('rmv', id, filterItem.targetValues)
        filterItem.targetValues = filterItem.targetValues?.filter(targetValue => targetValue.id !== id)
        updateTargetValueItems()
    }

    const saveNewTargetValue = (event: React.KeyboardEvent) => {
        console.log(`saveNewTargetValue key:${event.key}, metaKey:${event.metaKey}`)
        if (event.key === 'Enter') {
            addTargetValue(newTargetValue)
            setNewTargetValue(null)
        } else {
            setNewTargetValue(newTargetValue + event.key)
        }
    }

    return <div className={targetValuesStyle.targetValues}>
        {targetValueItems}
        <AutoComplete className={filterItemStyle.filterConfiguratorItemS}
                      items={fields}
                      size={'xs'}
                      view={'clear'}
                      width={'full'}
                      placeholder={newTargetValue ?? 'Значение для сравнения'}
                      onKeyDown={(event) => saveNewTargetValue(event)}
                      onChange={({ value }) => addTargetValue(value)}
        />
    </div>
}