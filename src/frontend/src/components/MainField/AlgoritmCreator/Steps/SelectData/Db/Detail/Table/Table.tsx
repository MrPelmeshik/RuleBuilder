import React, {useEffect, useState} from "react";
import tableStyle from './Table.module.css'

export const Table:React.FC<{dataPreview:any[] | null}> = ({dataPreview}) => {
    const [tableHeaders, setTableHeaders] = useState<string[]>(['title'])
    const [tableData, setTableData] = useState<any[]>([{'title': 'Предпросмотр данных'}])

    const [data, setData] = useState<JSX.Element[]>()
    const [header, setHeader] = useState<JSX.Element[]>()

    useEffect(() => {
        if (dataPreview !== undefined
            && dataPreview !== null
            && dataPreview.length > 0) {
            setTableHeaders(Object.keys(dataPreview[0]))
            setTableData(dataPreview)
        } else {
            setTableHeaders(['Предпросмотр данных'])
            setTableData([{'Предпросмотр данных': 'Выберите источник'}])
        }
    }, [dataPreview])

    useEffect(() => {
        setHeader(() => tableHeaders?.map(hdr => <th key={hdr}>{hdr}</th>))
        setData(() => tableData?.map(row => <tr>{tableHeaders?.map(hdr =>
            <td>{row[hdr]}</td>)}</tr>))
    }, [tableHeaders, tableData])

    return <div className={tableStyle.tableBlock}>
        <table className={tableStyle.tableDataPreview}>
            <tbody className={tableStyle.tableDataBody}>
            <tr>{header}</tr>
            {data}
            </tbody>
        </table>
    </div>
}