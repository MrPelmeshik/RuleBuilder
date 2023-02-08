import './SetItemModalWindow.css'
import {Text} from "@consta/uikit/Text";
import {Button} from "@consta/uikit/Button";
import {Modal} from "@consta/uikit/Modal";
import React, {Dispatch, useState} from "react";
import {SelectItem} from "../Items/SelectItem/SelectItem";
import {Select} from "@consta/uikit/Select";


type Item = {
  label: string;
  id: number;
};

const itemsType: Item[] = [
  {
    label: 'Считать данные',
    id: 1,
  },
  {
    label: 'ops...',
    id: 2,
  },
  {
    label: 'ops...',
    id: 3,
  },
];

export const SetItemModalWindow
    :React.FC<{isModalOpen:boolean, setIsModalOpen:Dispatch<boolean>, items:JSX.Element[], setItems: Dispatch<JSX.Element[]>}>
    = ({isModalOpen, setIsModalOpen, items, setItems}) =>
{
    const [value, setValue] = useState<Item | null>();

    const addItem = () => {
    }

    return <Modal
        className={'set-item-modal-window'}
        isOpen={isModalOpen}
        hasOverlay
        onClickOutside={() => setIsModalOpen(false)}
        onEsc={() => setIsModalOpen(false)}
    >
        <Select
            items={itemsType}
            value={value}
            onChange={({ value }) => setValue(value)}
        />
        <Text as="p" size="m" view="primary">
            Это содержимое модального окна. Здесь может быть что угодно: текст,
            изображение, форма или таблица. Всё, что хочется вынести из контекста
            и показать поверх основной страницы.
        </Text>
        <div className={'modal-window-'}>
            <Button
                size={'xs'}
                view={'primary'}
                label={'Закрыть'}
                width={'default'}
                onClick={() => setIsModalOpen(false)}
            />
            <Button
                size={'xs'}
                view={'primary'}
                label={'Сохранить'}
                width={'default'}
                onClick={() => setIsModalOpen(false)}
            />
        </div>
    </Modal>
}