import {Text} from "@consta/uikit/Text";
import {Tag} from "@consta/uikit/Tag";
import {IconTest} from "@consta/icons/IconTest";
import React, {Dispatch} from "react";
import headerStyle from './Header.module.css'
import {ThemeToggler} from "@consta/uikit/ThemeToggler";
import {IconComponent} from "@consta/icons/Icon";
import {IconSun} from "@consta/icons/IconSun";
import {IconMoon} from "@consta/icons/IconMoon";
import {IconLightningBolt} from "@consta/icons/IconLightningBolt";
import {presetGpnDark, presetGpnDefault} from "@consta/uikit/Theme";


export type ThemeItem = 'Default' | 'Dark' | 'Display';
export const themes: ThemeItem[] = ['Default', 'Dark', 'Display'];
const getItemIcon = (item: ThemeItem): IconComponent => {
  if (item === 'Default') {
    return IconSun;
  }
  if (item === 'Dark') {
    return IconMoon;
  }
  return IconLightningBolt;
};
export const getTheme = (item: ThemeItem) => {
  if (item === 'Default') {
    return presetGpnDefault;
  }
  if (item === 'Dark') {
    return presetGpnDark;
  }
  return presetGpnDark;
};

export const Header
    :React.FC<{theme: ThemeItem, setTheme:Dispatch<ThemeItem>}>
    = ({theme, setTheme}) =>
{
    return <div className={headerStyle.header}>
        <div className={headerStyle.headerLeftSide}>
            <Text as="span" size="l" weight="bold" view={'primary'}>
                Конструктор правил проверки данных
            </Text>
            <Tag icon={IconTest} size={'xs'} label={'alpha'} mode={'info'} className={headerStyle.headerTag}/>
        </div>
        <div className={headerStyle.headerRightSide}>
            <ThemeToggler items={themes}
                          value={theme}
                          getItemKey={(item: any) => item}
                          getItemLabel={(item: any) => item}
                          getItemIcon={getItemIcon}
                          size={'s'}
                          onChange={({value}) => setTheme(value)}
                          direction="downStartLeft"
            />
        </div>
    </div>
}