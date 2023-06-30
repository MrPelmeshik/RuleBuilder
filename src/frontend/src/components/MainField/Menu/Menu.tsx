import menuStyle from "./Menu.module.css";
import {Text} from "@consta/uikit/Text";
import {Button} from "@consta/uikit/Button";
import {IconBag} from "@consta/icons/IconBag";
import {IconAdd} from "@consta/icons/IconAdd";
import {IconSave} from "@consta/icons/IconSave";

export const Menu = () => {
    return <div className={menuStyle.menuField}>
        <Text as={'b'} view={'primary'} size={'s'}>
            Меню:
        </Text>
        <div className={menuStyle.menuGroup}>
            <div className={menuStyle.menuGroupHeader}>
                <Text view={'primary'} size={'xs'}>
                    Создание алгоритма:
                </Text>
            </div>
            <div className={menuStyle.menuGroupList}>
                <Button
                    label={'Сохранить'}
                    onClick={() => {}}
                    size={'xs'}
                    view={'secondary'}
                    iconLeft={IconSave}
                />
                <Button
                    label={'Создать'}
                    onClick={() => {}}
                    size={'xs'}
                    view={'secondary'}
                    iconLeft={IconAdd}
                />
            </div>
        </div>
        <div className={menuStyle.menuGroup}>
            <div className={menuStyle.menuGroupHeader}>
                <Text view={'primary'} size={'xs'}>
                    Сохраненные алгоритмы:
                </Text>
            </div>
            <div className={menuStyle.menuGroupListShadow}>
                <Text view={'secondary'} size={'xs'}>
                    ID: <b>5</b>
                </Text>
                <Text view={'primary'} size={'xs'}>
                    Имя: <b>test_validate_rule_01</b>
                </Text>
                <Text view={'primary'} size={'xs'}>
                    Версия: <b>1</b>
                </Text>
                <Text view={'primary'} size={'xs'}>
                    Автор: <b>Fedorov.IYu</b>
                </Text>
                <Text view={'primary'} size={'xs'}>
                    Редактирование: <b>11.04.2023 11:13</b>
                </Text>
                <Button
                    label={'Открыть'}
                    onClick={() => {}}
                    size={'xs'}
                    view={'secondary'}
                    iconLeft={IconBag}
                />
            </div>
            <div className={menuStyle.menuGroupListShadow}>
                <Text view={'secondary'} size={'xs'}>
                    ID: <b>14</b>
                </Text>
                <Text view={'primary'} size={'xs'}>
                    Имя: <b>connection_validate</b>
                </Text>
                <Text view={'primary'} size={'xs'}>
                    Версия: <b>2</b>
                </Text>
                <Text view={'primary'} size={'xs'}>
                    Автор: <b>Fedorov.IYu</b>
                </Text>
                <Text view={'primary'} size={'xs'}>
                    Редактирование: <b>20.05.2023 22:27</b>
                </Text>
                <Button
                    label={'Открыть'}
                    onClick={() => {}}
                    size={'xs'}
                    view={'secondary'}
                    iconLeft={IconBag}
                />
            </div>
        </div>
    </div>
}