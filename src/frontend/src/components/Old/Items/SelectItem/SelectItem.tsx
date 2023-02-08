import '../Item.css'
import './SelectItem.css'
import {Select} from "@consta/uikit/Select";
import React, {useEffect, useState} from "react";
import {IconClose} from "@consta/icons/IconClose";
import {
    getAllSchemaBySource,
    getAllSource,
    getAllTableBySchemaAndSource, getColumnsForTable,
    getPreviewDataForTable
} from "../../../../services/SourceService";
import {Table} from "./Table/Table";
import {CollapseGroup} from "@consta/uikit/CollapseGroup";
import {IconFilter} from "@consta/icons/IconFilter";
import {Text} from "@consta/uikit/Text";
import {SelectItemType, CollapseItemType, TableColumnType} from "../../../../types";
import {IconEye} from "@consta/icons/IconEye";
import {IconSettings} from "@consta/icons/IconSettings";
import {Switch} from "@consta/uikit/Switch";
import {FilterConfigurator} from "./FilterConfigurator/FilterConfigurator";


export const SelectItem = () => {
    const [source, setSource] = useState<SelectItemType | null>()
    const [schema, setSchema] = useState<SelectItemType | null>()
    const [table, setTable] = useState<SelectItemType | null>()

    const [sources, setSources] = useState<SelectItemType[]>([])
    const [schemas, setSchemas] = useState<SelectItemType[]>([])
    const [tables, setTables] = useState<SelectItemType[]>([])

    const [dataPreview, setDataPreview] = useState<any[] | null>([])

    const [columns, setColumns] = useState<any[] | null>([])

    const selectorBlock = <div className={'setting-source-block'}>
        <div className={'selector-block'}>
            <Select
            key={'sourceSelector'}
            label={'Источник:'}
            labelPosition={'left'}
            placeholder={'Выберите источник'}
            form={'round'}
            size={'s'}
            items={sources ?? []}
            value={source}
            onChange={({value}) => {
                setSource(value)
            }}
        />
        <Select
            key={'schemaSelector'}
            label={'Схема/БД:'}
            labelPosition={'left'}
            placeholder={'Выберите схему / БД'}
            form={'round'}
            size={'s'}
            items={schemas}
            value={schema}
            onChange={({value}) => {
                setSchema(value)
            }}
            disabled={!source}
        />
        <Select
            key={'tableSelector'}
            label={'Таблица:'}
            labelPosition={'left'}
            placeholder={'Выберите таблицу'}
            form={'round'}
            size={'s'}
            items={tables}
            value={table}
            onChange={({value}) => {
                setTable(value)
            }}
            disabled={!source || !schema}
        />
        </div>
        <Table dataPreview={columns}/>
    </div>

    const collapseItems: CollapseItemType[] = [
        {
            label: <span className={'collapse-row'}>
                <IconSettings size={'s'}/>
                <Text size={'s'} as={'b'}>Настройка источника</Text>
            </span>,
            content: selectorBlock,
            isOpen: true,
        },
        {
            label: <span className={'collapse-row'}>
                <IconFilter size={'s'}/>
                <Text size={'s'} as={'b'}>Дополнительные параметры фильтрации</Text>
            </span>,
            content: <div className={'filter-block'}>
                {/*<input placeholder={'Пример: id = value'} className={'input-filter-parameter'} multiple={true}/>*/}
                <FilterConfigurator />
            </div>,
            isOpen: false,
        },
        {
            label: <span className={'collapse-row'}>
                <IconEye size={'s'}/>
                <Text size={'s'} as={'b'}>{'Препросмотр данных'}</Text>
            </span>,
            content: <Table dataPreview={dataPreview}/>,
            isOpen: false,
        }
    ]

    const [opened, setOpened] = useState<number[] | null>(collapseItems.map((_, index) => collapseItems[index].isOpen ? index : -1));

    useEffect(() => {
        getAllSource().then(response => setSources(response.map(src => ({label: src.name, id: src.id}))))
    }, [])

    useEffect(() => {
        if (source)
            getAllSchemaBySource(source.label).then(response => setSchemas(() => {
                const schemaList: SelectItemType[] = []
                for (let i = 0; i < response.length; i++) {
                    schemaList.push({
                        label: response[i].schemaName,
                        id: i
                    })
                }
                return schemaList
            }))
        else
            setSchema(null)
    }, [source, sources])

    useEffect(() => {
        if (source && schema)
            getAllTableBySchemaAndSource(source.label, schema.label).then(response => setTables(() => {
                const tableList: SelectItemType[] = []
                for (let i = 0; i < response.length; i++) {
                    tableList.push({
                        label: response[i].tableName,
                        id: i
                    })
                }
                return tableList
            }))
        else
            setTable(null)
    }, [schema, schemas])

    useEffect(() => {
        if (source && schema && table) {

            getPreviewDataForTable(source.label, schema.label, table.label)
                .then(response => setDataPreview(() => response))

            getColumnsForTable(source.label, schema.label, table.label)
                .then(response => setColumns(() =>
                    response.map(r => ({'columnName':r.columnName, 'columnType':r.columnType, 'isActive':<Switch size={'s'} checked={true}/>, 'filters':r.filters}))))
        }
        else {
            setDataPreview(null)
            setColumns(null)
        }
    }, [table, tables])

    return <div className={'item'}>
        <div className={'item-header'}>
            <div className={'item-header-left-side'}>Считать данные</div>
            <div className={'item-header-right-side'}><IconClose size={'s'} onClick={() => {
            }}/></div>
        </div>
        <div className={'item-content'}>
            <CollapseGroup
                items={collapseItems}
                size={'s'}
                opened={opened}
                onOpen={({value}) => setOpened(value)}
            />
            {/*<div className={'test'}></div>*/}
        </div>
    </div>
}