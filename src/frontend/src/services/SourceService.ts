import {SourceMetaType} from "../components/MainField/AlgoritmCreator/Steps/SelectData/Db/Types/SourceMetaType";
import {SchemaMetaType} from "../components/MainField/AlgoritmCreator/Steps/SelectData/Db/Types/SchemaMetaType";
import {TableType} from "../Types/TableType";
import {TableColumnType} from "../Types/TableColumnType";

// https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples

export const getSources = async ():Promise<SourceMetaType[]> => {
    const response = await fetch('http://127.0.0.1:5000/getSources')
    return await response.json()
}

export const getSchemasBySource = async (sourceId:number):Promise<SchemaMetaType[]> => {
    const response = await fetch(`http://127.0.0.1:5000/getSchemasBySource?sourceId=${sourceId}`)
    return await response.json()
}

export const getTablesBySchema = async (source:string, schemaId:number):Promise<TableType[]> => {
    const response = await fetch(`http://127.0.0.1:5000/getTablesBySchema?schemaId=${schemaId}`)
    return await response.json()
}

export const getColumnsByTable = async (source:string, schema:string, tableId:number):Promise<TableColumnType[]> => {
    const response = await fetch(`http://127.0.0.1:5000/getColumnsByTable?tableId=${tableId}`)
    return await response.json()
}

export const getPreviewDataForTable = async (source:string, schema:string, table:string):Promise<TableType[]> => {
    const response = await fetch(`http://127.0.0.1:5000/getPreviewDataForTable?source=${source}&schema=${schema}&table=${table}`)
    return await response.json()
}