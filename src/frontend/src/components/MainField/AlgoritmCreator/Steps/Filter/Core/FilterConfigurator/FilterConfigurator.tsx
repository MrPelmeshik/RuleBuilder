import filterConfiguratorStyle from './FilterConfigurator.module.css'
import React, {useEffect, useState} from "react";
import {FilterComplexItem} from "./FilterComplexItem/FilterComplexItem";
import {Button} from "@consta/uikit/Button";
import {IconAdd} from "@consta/icons/IconAdd";
import {SelectDbDataStepSettingsType} from "../../../SelectData/Db/Types/SelectDbDataStepSettingsType";
import {FilterConfigType} from "../Type/FilterConfigType";
import {FilterItemType} from "../Type/FilterItemType";



export const FilterConfigurator
    :React.FC<{stepSettings: SelectDbDataStepSettingsType}>
    = ({stepSettings}) => {
    const [mainFilterConfig, setMainFilterConfig] = useState<FilterConfigType[] | FilterItemType[]>([new FilterConfigType(0)])
    const [deletedFilterId, setDeletedFilterId] = useState<number | null>()
    const getNextFilterItemId = (): number => mainFilterConfig ? Math.max(0, ...mainFilterConfig.map(x => x.id)) + 1 : 0
    const updateFilterItem = (id: number, newFilters: FilterConfigType[] | FilterItemType[]) => {
        console.log('updateFilterItem', id, mainFilterConfig, newFilters)
        /*if (mainFilterConfig) {
            mainFilterConfig.map(filter => {
                if (filter.id === id) {
                    if (filter instanceof FilterConfigType) {
                        console.log('updated')
                        filter.filters = newFilters
                    }
                }
            })
        }*/
        setMainFilterConfig([new FilterConfigType(0, newFilters)])
    }
    useEffect(() => {
        if (mainFilterConfig && (mainFilterConfig.length > 0)) {
            const t = mainFilterConfig[0]
            if (t instanceof FilterConfigType) {
                const newFilters = (mainFilterConfig as FilterConfigType[]).filter((x) => x.id === deletedFilterId)
                setMainFilterConfig(newFilters)
            }
        }
        setDeletedFilterId(null)
    }, [deletedFilterId])
    const [content, setContent] = useState<JSX.Element[]>([
        <FilterComplexItem id={0}
                           key={0}
                           filterConfig={mainFilterConfig}
                           setParentDeletedFilterById={setDeletedFilterId}
                           getNextFilterItemIdOnParentLevel={getNextFilterItemId}
                           parentUpdateFilterItem={updateFilterItem}
        />])

    useEffect(() => {
        console.log('trigger')
        setContent([
        <FilterComplexItem id={0}
                           key={0}
                           filterConfig={mainFilterConfig}
                           setParentDeletedFilterById={setDeletedFilterId}
                           getNextFilterItemIdOnParentLevel={getNextFilterItemId}
                           parentUpdateFilterItem={updateFilterItem}
        />])
    }, [JSON.stringify(mainFilterConfig)])

    return <div className={filterConfiguratorStyle.filterComplex}>
        {content}
    </div>
}