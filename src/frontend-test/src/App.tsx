import React, {useEffect, useState} from 'react';
import appStyle from './App.module.css';
import {ComplexItem} from "./components/ComplexItem";

export const App = () => {
  const [configs, setConfigs] = useState<Config[]>([])
  const [complexItem, setComplexItem] = useState<JSX.Element>(<></>)

  const getNextId = (): number => Math.max(...configs.map(x => x.id), 0) + 1;

  const addConfig = () => {
    const nextId = getNextId()
    setConfigs([...configs, {id: nextId, detail: {itemDetail: {lable: `item-${nextId}`}}}])
  }

  const configsViewContent: JSX.Element[] = configs.map(x => <div key={x.id}>{x.detail?.itemDetail?.lable}</div>)

  useEffect(() => {
    setComplexItem(<ComplexItem configs={configs}/>)
  }, [JSON.stringify(configs)])

  return <div className={appStyle.app}>
    <button onClick={() => addConfig()}>add</button>
    <div className={appStyle.main}>
      <div>
        {configsViewContent}
      </div>
      <div>
        {complexItem}
      </div>
    </div>
  </div>
}

export class Config {

  public constructor(id: number,
                     detail: ConfigDetail | null = null
  ) {
    this.id = id;

    if (detail)
      this.detail = detail;
  }

  public id: number
  public detail?: ConfigDetail
}

export class ConfigDetail {
  public constructor(itemDetail: ItemDetail | null = null
  ) {
    if (itemDetail)
      this.itemDetail = itemDetail;
  }

  public itemDetail?: ItemDetail
}

export class ItemDetail {
  public constructor(lable: string | null = null
  ) {
    if (lable)
      this.lable = lable;
  }

  public lable?: string
}
