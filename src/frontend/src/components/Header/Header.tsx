import {Text} from "@consta/uikit/Text";
import {Tag} from "@consta/uikit/Tag";
import {IconTest} from "@consta/icons/IconTest";
import React from "react";
import headerStyle from './Header.module.css'

export const Header = () => {
    return <div className={headerStyle.header}>
        <Text as="span" size="l" weight="bold" view={'primary'}>
            Конструктор парвил
        </Text>
        <Tag icon={IconTest} size={'xs'} label={'alpha'} mode={'info'} className={headerStyle.headerTag} />
    </div>
}