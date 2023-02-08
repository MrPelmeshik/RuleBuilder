import {SourceType} from "../types/SourceType";
import {SchemaType} from "../types/SchemaType";
import {TableType} from "../types/TableType";
import {TableColumnType} from "../types";

// https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples

export const getAllSource = async ():Promise<SourceType[]> => {
    const response = await fetch('http://127.0.0.1:5000/getAllSource')
    return await response.json()
}

export const getAllSchemaBySource = async (source:string):Promise<SchemaType[]> => {
    const response = await fetch(`http://127.0.0.1:5000/getAllSchemaBySource?source=${source}`)
    return await response.json()
}

export const getAllTableBySchemaAndSource = async (source:string, schema:string):Promise<TableType[]> => {
    const response = await fetch(`http://127.0.0.1:5000/getAllTableBySchemaAndSource?source=${source}&schema=${schema}`)
    return await response.json()
}

export const getPreviewDataForTable = async (source:string, schema:string, table:string):Promise<TableType[]> => {
    const response = await fetch(`http://127.0.0.1:5000/getPreviewDataForTable?source=${source}&schema=${schema}&table=${table}`)
    return await response.json()
}

export const getColumnsForTable = async (source:string, schema:string, table:string):Promise<TableColumnType[]> => {
    const response = await fetch(`http://127.0.0.1:5000/getColumnsForTable?source=${source}&schema=${schema}&table=${table}`)
    return await response.json()
}