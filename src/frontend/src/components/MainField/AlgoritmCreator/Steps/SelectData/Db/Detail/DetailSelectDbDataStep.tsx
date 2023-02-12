import '../../../../../../Old/Items/Item.css'
import detailSelectDbDataStepStyle from './DetailSelectDbDataStep.module.css'
import {Select} from "@consta/uikit/Select";
import React, {useEffect, useState} from "react";
import {IconClose} from "@consta/icons/IconClose";
import {
    getAllSchemaBySource,
    getAllSource,
    getAllTableBySchemaAndSource, getColumnsForTable,
    getPreviewDataForTable
} from "../../../../../../../services/SourceService";
import {Table} from "./Table/Table";
import {CollapseGroup} from "@consta/uikit/CollapseGroup";
import {IconFilter} from "@consta/icons/IconFilter";
import {Text} from "@consta/uikit/Text";
import {IconEye} from "@consta/icons/IconEye";
import {IconSettings} from "@consta/icons/IconSettings";
import {Switch} from "@consta/uikit/Switch";
import {FilterConfigurator} from "./FilterConfigurator/FilterConfigurator";
import {StepType} from "../../../StepType";
import {MetaType} from "../Types/MetaType";
import {SourceMetaType} from "../Types/SourceMetaType";
import {SelectItemType} from "../../../../../../../Types/SelectItemType";


export const DetailSelectDbDataStep
    :React.FC<{stepType: StepType}>
    = ({stepType}) =>
{
    const [sourceItem, setSourceItem] = useState<SelectItemType | null>()
    const [schemaItem, setSchemaItem] = useState<SelectItemType | null>()
    const [tableItem, setTableItem] = useState<SelectItemType | null>()

    const [sourcesItems, setSourcesItems] = useState<SelectItemType[]>([])
    const [schemasItems, setSchemasItems] = useState<SelectItemType[]>([])
    const [tablesItems, setTablesItems] = useState<SelectItemType[]>([])

    const [sources, setSources] = useState<SourceMetaType[]>([])
    // const [schemas, setSchemas] = useState<any[]>([])
    // const [tables, setTables] = useState<any[]>([])

    const [dataPreview, setDataPreview] = useState<any[] | null>([])
    const [columns, setColumns] = useState<any[] | null>([])

    useEffect(() => {
        getAllSource()
            .then(response => setSources(response.slice()))
    }, [])

    useEffect(() => setSourcesItems(sources.map(src => ({label: src.name, id: src.id}))), [sources])

    useEffect(() => {
        if (sourceItem) {
            getAllSchemaBySource(sourceItem.label).then(response => setSchemasItems(() => {
                const schemaList: SelectItemType[] = []
                for (let i = 0; i < response.length; i++) {
                    /*schemaList.push({
                        label: response[i].schemaName,
                        id: i
                    })*/
                }
                return schemaList
            }))
        }
        setSchemaItem(null)
    }, [sourceItem, sourcesItems])

    useEffect(() => {
        if (sourceItem && schemaItem)
            getAllTableBySchemaAndSource(sourceItem.label, schemaItem.label).then(response => setTablesItems(() => {
                const tableList: SelectItemType[] = []
                for (let i = 0; i < response.length; i++) {
                    tableList.push({
                        label: response[i].tableName,
                        id: i
                    })
                }
                return tableList
            }))
        setTableItem(null)
    }, [schemaItem, schemasItems])

    useEffect(() => {
        if (sourceItem && schemaItem && tableItem) {

            getPreviewDataForTable(sourceItem.label, schemaItem.label, tableItem.label)
                .then(response => setDataPreview(() => response))

            getColumnsForTable(sourceItem.label, schemaItem.label, tableItem.label)
                .then(response => setColumns(() =>
                    response.map(r => ({
                        'columnName': r.columnName,
                        'columnType': r.columnType,
                        'isActive': <Switch size={'s'} checked={true}/>
                    }))))
        }
        setDataPreview(null)
        setColumns(null)
    }, [tableItem, tablesItems])

    return <div className={detailSelectDbDataStepStyle.modalField}>
        <div className={detailSelectDbDataStepStyle.selectorSettingGroupHeader}>
            <IconSettings size={'s'}/>
            <Text size={'s'} as={'b'}>Настройка источника</Text>
        </div>
        <div className={detailSelectDbDataStepStyle.selectorSettingGroupContent}>
            <div className={detailSelectDbDataStepStyle.selectorBlock}>
                <Select
                    key={'sourceSelector'}
                    label={'Источник:'}
                    labelPosition={'left'}
                    placeholder={'Выберите источник'}
                    form={'round'}
                    view={'clear'}
                    size={'s'}
                    items={sourcesItems ?? []}
                    value={sourceItem}
                    onChange={({value}) => setSourceItem(value)}
                />
                <Select
                    key={'schemaSelector'}
                    label={'Схема/БД:'}
                    labelPosition={'left'}
                    placeholder={'Выберите схему / БД'}
                    form={'round'}
                    view={'clear'}
                    size={'s'}
                    items={schemasItems}
                    value={schemaItem}
                    onChange={({value}) => setSchemaItem(value)}
                    disabled={!sourceItem}
                />
                <Select
                    key={'tableSelector'}
                    label={'Таблица:'}
                    labelPosition={'left'}
                    placeholder={'Выберите таблицу'}
                    form={'round'}
                    view={'clear'}
                    size={'s'}
                    items={tablesItems}
                    value={tableItem}
                    onChange={({value}) => setTableItem(value)}
                    disabled={!sourceItem || !schemaItem}
                />
            </div>
            <Table key={'columnTypes'} dataPreview={columns}/>
        </div>
        <div className={detailSelectDbDataStepStyle.selectorSettingGroupHeader}>
            <IconFilter size={'s'}/>
            <Text size={'s'} as={'b'}>Параметры фильтрации</Text>
        </div>
        <div className={detailSelectDbDataStepStyle.selectorSettingGroupContent}>
            <FilterConfigurator />
        </div>
        {/*<div className={detailSelectDbDataStepStyle.selectorSettingGroupHeader}>
            <IconEye size={'s'}/>
            <Text size={'s'} as={'b'}>Препросмотр данных</Text>
        </div>
        <Table key={'dataPreview'} dataPreview={dataPreview}/>*/}
    </div>
}