import React from 'react';
import './App.css';
import './variables.css'
import {presetGpnDefault, Theme} from "@consta/uikit/Theme";
import {Layout} from "@consta/uikit/Layout";
import {Header} from './components/Header/Header'
import {GridField} from "./components/Old/GridField/GridField";
import {MainField} from "./components/MainField/MainField";

export const App = () => {
  return <>
    <Theme preset={presetGpnDefault} className={'app'}>
      <Layout direction={'column'}>
        <Header />
        <Layout className={'main'}>
          <Layout flex={1} className={'block'}>
            menu
          </Layout>
          <Layout flex={8} className={'block'}>
            <MainField />
          </Layout>
        </Layout>
      </Layout>
    </Theme>
  </>
}
