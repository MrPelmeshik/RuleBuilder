import React, {useState} from 'react';
import addStyle from './App.module.css';
import './variables.css'
import {Theme} from "@consta/uikit/Theme";
import {Layout} from "@consta/uikit/Layout";
import {getTheme, Header, ThemeItem, themes} from './components/Header/Header'
import {MainField} from "./components/MainField/MainField";


export const App = () => {
  const [theme, setTheme] = useState<ThemeItem>(themes[0]);

  return <>
    <Theme preset={getTheme(theme)} className={addStyle.app}>
      <Layout direction={'column'} flex={1}>
        <Header theme={theme} setTheme={setTheme}/>
        <Layout className={addStyle.main}>
          <Layout flex={1} className={addStyle.block}>
            menu
          </Layout>
          <Layout flex={8} className={addStyle.block}>
            <MainField />
          </Layout>
        </Layout>
      </Layout>
    </Theme>
  </>
}
