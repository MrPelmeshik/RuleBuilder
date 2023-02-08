import {Text} from "@consta/uikit/Text";
import {Tag} from "@consta/uikit/Tag";
import {IconTest} from "@consta/icons/IconTest";
import React from "react";
import './Header.css'

export const Header = () => {
    return <div className={'header'}>
      <Text as="span" size="l" weight="bold">
        RuleBuilder
      </Text>
      <Tag icon={IconTest} size={'xs'} label={'alpha'} mode={'info'}/>
    </div>
}