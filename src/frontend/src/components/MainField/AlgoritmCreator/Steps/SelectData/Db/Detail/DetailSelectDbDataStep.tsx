import '../../../../../../Old/Items/Item.css'
import detailSelectDbDataStepStyle from './DetailSelectDbDataStep.module.css'
import {Select} from "@consta/uikit/Select";
import React, {useEffect, useState} from "react";
import {
    getSchemasBySource,
    getSources,
    getTablesBySchema, getColumnsByTable,
    getPreviewDataForTable
} from "../../../../../../../services/SourceService";
import {Table} from "./Table/Table";
import {IconFilter} from "@consta/icons/IconFilter";
import {Text} from "@consta/uikit/Text";
import {IconSettings} from "@consta/icons/IconSettings";
import {FilterConfigurator} from "../../../Filter/Core/FilterConfigurator/FilterConfigurator";
import {SourceMetaType} from "../Types/SourceMetaType";
import {SelectItemType} from "../../../../../../../Types/SelectItemType";
import {SelectDbDataStepSettingsType} from "../Types/SelectDbDataStepSettingsType";
import {SchemaMetaType} from "../Types/SchemaMetaType";
import {TableMetaType} from "../Types/TableMetaType";
import {ColumnMetaType} from "../Types/ColumnMetaType";
import {IconComponent} from "@consta/icons/Icon";
import {Tabs} from "@consta/uikit/Tabs";
import {IconFunnel} from "@consta/icons/IconFunnel";
import {FilterConfigType} from "../../../Filter/Core/Type/FilterConfigType";



type PageItem = {
  name: string;
  image?: IconComponent;
};

const pages: PageItem[] = [
  {
    name: 'Источник',
    image: IconSettings,
  },
  {
    name: 'Фильтрация',
    image: IconFunnel,
  }
];

export const DetailSelectDbDataStep
    :React.FC<{stepSettings: SelectDbDataStepSettingsType}>
    = ({stepSettings}) => {
    const [sourceItem, setSourceItem] = useState<SelectItemType | null>()
    const [schemaItem, setSchemaItem] = useState<SelectItemType | null>()
    const [tableItem, setTableItem] = useState<SelectItemType | null>()

    const [sourcesItems, setSourcesItems] = useState<SelectItemType[]>([])
    const [schemasItems, setSchemasItems] = useState<SelectItemType[]>([])
    const [tablesItems, setTablesItems] = useState<SelectItemType[]>([])

    const [sources, setSources] = useState<SourceMetaType[]>([])
    const [schemas, setSchemas] = useState<SchemaMetaType[]>([])
    const [tables, setTables] = useState<TableMetaType[]>([])

    const [dataPreview, setDataPreview] = useState<any[] | null>([])
    const [columns, setColumns] = useState<ColumnMetaType[] | null>([])
    // const [updatedFilterConfig, setUpdatedFilterConfig] = useState<FilterConfigType | null>()

    const [curCurPage, setCurPage] = useState<PageItem>(pages[0])
    const [pageContent, setPageContent] = useState<JSX.Element>(<></>)

    // region get data from API

    useEffect(() => {
        getSources().then(response => setSources(response))
    }, [])

    useEffect(() => {
        if (sourceItem) {
            getSchemasBySource(sourceItem.id).then(response => setSchemas(response))

            stepSettings.source = {
                id: sourceItem.id,
                name: sourceItem.label,
                type: "table"
            }
        }
        setSchemaItem(null)
    }, [sourceItem, sourcesItems])

    useEffect(() => {
        if (sourceItem && schemaItem) {
            getTablesBySchema(sourceItem.label, schemaItem.id).then(response => setTables(response))

            stepSettings.schema = {
                id: schemaItem.id,
                name: schemaItem.label
            }
        }
        setTableItem(null)
    }, [schemaItem, schemasItems])

    useEffect(() => {
        if (sourceItem && schemaItem && tableItem) {

            // getPreviewDataForTable(sourceItem.label, schemaItem.label, tableItem.label)
            //     .then(response => setDataPreview(() => response))

            getColumnsByTable(sourceItem.label, schemaItem.label, tableItem.id)
                .then(response => setColumns(response.map(column => ({
                    columnName: column.columnName,
                    baseType: column.columnType,
                    currentType: column.columnType,
                    isActive: true
                }))))

            stepSettings.table = {
                id: tableItem.id,
                name: tableItem.label
            }
        }
        // setDataPreview(null)
        setColumns(null)
    }, [tableItem, tablesItems])

    // endregion

    // region set itmes for source setting

    useEffect(() => {
        setSourcesItems(sources.map(src => ({label: src.name, id: src.id})))

        if (stepSettings.source && sources.find(source => source.id === stepSettings.source?.id)) {
            setSourceItem({id: stepSettings.source?.id, label: stepSettings.source?.name})
        }
    }, [sources])

    useEffect(() => {
        setSchemasItems(schemas.map(schema => ({label: schema.name, id: schema.id})))

        if (stepSettings.schema && schemas.find(schema => schema.id === stepSettings.schema?.id)) {
            setSchemaItem({id: stepSettings.schema?.id, label: stepSettings.schema?.name})
        }
    }, [schemas])

    useEffect(() => {
        setTablesItems(tables.map(table => ({label: table.name, id: table.id})))

        if (stepSettings.table && tables.find(table => table.id === stepSettings.table?.id)) {
            setTableItem({id: stepSettings.table?.id, label: stepSettings.table?.name})
        }
    }, [tables])

    useEffect(() => {
        if (columns) {
            stepSettings.metaData = columns
        } else {
            stepSettings.metaData = []
        }
    }, [columns])

    // endregion

    // useEffect(() => {
    //     if (updatedFilterConfig) {
    //     }
    //     setUpdatedFilterConfig(null)
    // }, [updatedFilterConfig])

    useEffect(() => {
        let content = <>page not found</>
        if (curCurPage.name === 'Источник') {
            content = <>
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
            </>
        }
        else if (curCurPage.name === 'Фильтрация') {
            content = <FilterConfigurator stepSettings={stepSettings}/>
        }
        setPageContent(content)
    }, [
        curCurPage,
        sourceItem, sourcesItems, //sources,
        schemaItem, schemasItems, //schemas,
        tableItem, tablesItems, //tables,
        columns
    ])

    return <div className={detailSelectDbDataStepStyle.modalField}>
        <div className={detailSelectDbDataStepStyle.selectorSettingGroupHeader}>
            <Tabs
                value={curCurPage}
                onChange={({value}) => setCurPage(value)}
                items={pages}
                size={'s'}
                getItemLabel={(item) => item.name}
                getItemIcon={(item) => item.image}
            />
        </div>
        <div className={detailSelectDbDataStepStyle.selectorSettingGroupContent}>
            {pageContent}
        </div>

        {/*<div className={detailSelectDbDataStepStyle.selectorSettingGroupHeader}>
            <IconSettings size={'s'}/>
            <Text size={'s'} as={'b'}>Настройка источника</Text>
        </div>
        <div className={detailSelectDbDataStepStyle.selectorSettingGroupContent}>

        </div>
        <div className={detailSelectDbDataStepStyle.selectorSettingGroupHeader}>
            <IconFilter size={'s'}/>
            <Text size={'s'} as={'b'}>Параметры фильтрации</Text>
        </div>
        <div className={detailSelectDbDataStepStyle.selectorSettingGroupContent}>
            <FilterConfigurator stepSettings={stepSettings}/>
        </div>*/}
        {/*<div className={detailSelectDbDataStepStyle.selectorSettingGroupHeader}>
            <IconEye size={'s'}/>
            <Text size={'s'} as={'b'}>Препросмотр данных</Text>
        </div>
        <Table key={'dataPreview'} dataPreview={dataPreview}/>*/}
    </div>
}