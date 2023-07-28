import appStyle from '../App.module.css';
import React, {useState} from "react";
import {ConfigDetail, ItemDetail} from "../App";


export interface IItem {
    detail: ConfigDetail
}

export const Item:React.FC<IItem> = (props) => {
    const [lable, setLable] = useState(props.detail.itemDetail?.lable)

    const click = () => {
        console.log('click')
        if (props.detail.itemDetail) {
            const newLable = lable + "*"
            props.detail.itemDetail.lable = newLable
            setLable(newLable)
        }
    }

    return <span className={appStyle.item}
                onClick={() => click()}
    >
        {lable}
    </span>
}