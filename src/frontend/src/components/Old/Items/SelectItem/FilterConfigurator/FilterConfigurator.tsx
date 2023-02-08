import './FilterConfigurator.css'
import {useEffect, useState} from "react";
import {Button} from "@consta/uikit/Button";
import {FilterItem} from "./FilterItem/FilterItem";



export const FilterConfigurator = () => {
    const [complexFilterItems, setComplexFilterItems] = useState<JSX.Element[]>([])
    const [deletedFilterId, setDeletedFilterId] = useState<number | null>()

    useEffect(() => {
        setComplexFilterItems([...(complexFilterItems.filter(x => x.props.id !== deletedFilterId))])
        setDeletedFilterId(null)
    }, [deletedFilterId])

    const addFilterItem = (item:JSX.Element) => setComplexFilterItems([item, ...complexFilterItems])
    const getNextFilterItemId = ():number => Math.max(0, ...complexFilterItems.map(x => x.props.id)) + 1

    return <div className={'filter-filed'}>
        <b>(</b>
        <Button
            label={'+'}
            size={'xs'}
            onClick={() => {
                const componentId = getNextFilterItemId()
                addFilterItem(
                    <FilterItem
                        key={componentId}
                        id={componentId}
                        setDeletedFilterId={setDeletedFilterId}
                    />
                )
            }}
        />
        {complexFilterItems}
        <b>)</b>
    </div>
}