import React, {useEffect, useState} from "react";
import appStyle from '../App.module.css';
import {Item} from "./Item";
import {Config} from "../App";


export interface IComplexItem {
    configs: Config[]
}

export const ComplexItem:React.FC<IComplexItem> = (props) => {
    return <span className={appStyle.complexItem}>
        {props.configs.map(configItem =>
            <Item key={configItem.id}
                  detail={configItem.detail ?? {itemDetail: {lable: 'undefined'}}}
            />)}
    </span>
}