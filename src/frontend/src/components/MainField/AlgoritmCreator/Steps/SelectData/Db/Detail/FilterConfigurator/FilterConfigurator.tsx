import filterConfiguratorStyle from './FilterConfigurator.module.css'
import {useEffect, useState} from "react";
import {FilterComplexItem} from "./FilterComplexItem/FilterComplexItem";
import {Button} from "@consta/uikit/Button";
import {IconAdd} from "@consta/icons/IconAdd";



export const FilterConfigurator = () => {
    const [complexFilterItems, setComplexFilterItems] = useState<JSX.Element[]>([])
    const [deletedComplexFilterId, setDeletedComplexFilterId] = useState<number | null>()

    useEffect(() => {
        setComplexFilterItems([...(complexFilterItems.filter(x => x.props.complexFilterId !== deletedComplexFilterId))])
        setDeletedComplexFilterId(null)
    }, [deletedComplexFilterId])

    const addComplexFilterItem = (item: JSX.Element) => setComplexFilterItems([...complexFilterItems, item])
    const getNextComplexFilterItemId = (): number => Math.max(0, ...complexFilterItems.map(x => x.props.complexFilterId)) + 1

    return <div className={filterConfiguratorStyle.filterComplex}>
        <b>(</b>
        <div className={filterConfiguratorStyle.filterComplexFiled}>
            {complexFilterItems}
            <Button iconLeft={IconAdd}
                    onlyIcon
                    size={'xs'}
                    view={'ghost'}
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
        </div>
        <b>)</b>
    </div>
}