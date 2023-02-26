import filterConfiguratorStyle from './FilterConfigurator.module.css'
import React, {useEffect, useState} from "react";
import {FilterComplexItem} from "./FilterComplexItem/FilterComplexItem";
import {SelectDbDataStepSettingsType} from "../../../SelectData/Db/Types/SelectDbDataStepSettingsType";
import {FilterConfigType} from "../Type/FilterConfigType";
import {FilterItemType} from "../Type/FilterItemType";



export const FilterConfigurator
    :React.FC<{stepSettings: SelectDbDataStepSettingsType}>
    = ({stepSettings}) =>
{
    const [mainFilterConfig, setMainFilterConfig] = useState<FilterConfigType[] | FilterItemType[]>(stepSettings.filters && stepSettings.filters.filters ? stepSettings.filters.filters : [])
    const [deletedFilterId, setDeletedFilterId] = useState<number | null>()

    const getNextFilterItemId = (): number => mainFilterConfig && mainFilterConfig.length > 0 ? Math.max(0, ...mainFilterConfig.map(x => x.id)) + 1 : 1

    const updateFilterItem = (id: number, newFilters: FilterConfigType[] | FilterItemType[]) => {
        console.log(`(p): parentUpdateFilterItem for ${id}. Current state:`, mainFilterConfig, '. New state:', newFilters)
        setMainFilterConfig(newFilters)
    }

    const [content, setContent] = useState<JSX.Element[]>([
        <FilterComplexItem id={getNextFilterItemId()}
                           key={getNextFilterItemId()}
                           filterConfig={mainFilterConfig}
                           setParentDeletedFilterById={setDeletedFilterId}
                           getNextFilterItemIdOnParentLevel={getNextFilterItemId}
                           parentUpdateFilterItem={updateFilterItem}
                           stepSettings={stepSettings}
        />])

    useEffect(() => {
        if (deletedFilterId) {
            console.log(`(p): deleted ${deletedFilterId}`)
            if (mainFilterConfig && mainFilterConfig.length > 0) {
                const t = mainFilterConfig[0]
                if (t instanceof FilterConfigType) {
                    const newFilters = (mainFilterConfig as FilterConfigType[]).filter((x) => x.id === deletedFilterId)
                    setMainFilterConfig(newFilters)
                } else if (t instanceof FilterItemType) {
                    const newFilters = (mainFilterConfig as FilterItemType[]).filter((x) => x.id === deletedFilterId)
                    setMainFilterConfig(newFilters)
                } else {
                    console.log("Error object", t)
                    throw new Error("Incorrect type for Filter")
                }
            }
            setDeletedFilterId(null)
        }
    }, [deletedFilterId])

    useEffect(() => {
        console.log(`(p): rewrite. Current state:`, mainFilterConfig)
        stepSettings.filters = new FilterConfigType(0, mainFilterConfig)
        setContent([
            <FilterComplexItem id={getNextFilterItemId()}
                               key={getNextFilterItemId()}
                               filterConfig={mainFilterConfig}
                               setParentDeletedFilterById={setDeletedFilterId}
                               getNextFilterItemIdOnParentLevel={getNextFilterItemId}
                               parentUpdateFilterItem={updateFilterItem}
                               stepSettings={stepSettings}
            />])
    }, [JSON.stringify(mainFilterConfig), JSON.stringify(stepSettings.metaData)])

    return <div className={filterConfiguratorStyle.filterComplex}>
        {content}
    </div>
}