import filterConfiguratorStyle from './FilterConfigurator.module.css'
import {useEffect, useState} from "react";
import {FilterComplexItem} from "./FilterComplexItem/FilterComplexItem";
import {Button} from "@consta/uikit/Button";



export const FilterConfigurator = () => {
    const [complexFilterItems, setComplexFilterItems] = useState<JSX.Element[]>([])
    const [deletedComplexFilterId, setDeletedComplexFilterId] = useState<number | null>()

    useEffect(() => {
        setComplexFilterItems([...(complexFilterItems.filter(x => x.props.id !== deletedComplexFilterId))])
        setDeletedComplexFilterId(null)
    }, [deletedComplexFilterId])

    const addComplexFilterItem = (item:JSX.Element) => setComplexFilterItems([item, ...complexFilterItems])
    const getNextComplexFilterItemId = ():number => Math.max(0, ...complexFilterItems.map(x => x.props.id)) + 1

    return <div className={filterConfiguratorStyle.filterComplexFiled}>
        <b>(</b>
        <Button
            label={'+'}
            size={'xs'}
            onClick={() => {
                const componentId = getNextComplexFilterItemId()
                addComplexFilterItem(
                    <FilterComplexItem
                        key={componentId}
                        complexFilterId={componentId}
                        setDeletedComplexFilterId={setDeletedComplexFilterId}
                    />
                )
            }}
        />
        {complexFilterItems}
        <b>)</b>
    </div>
}