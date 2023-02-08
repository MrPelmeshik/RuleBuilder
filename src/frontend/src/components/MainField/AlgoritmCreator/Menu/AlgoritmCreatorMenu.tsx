import algoritmCreatorMenuStyle from './AlgoritmCreatorMenu.module.css'
import {Button} from "@consta/uikit/Button";
import {PreviewCheckStep, PreviewSelectDbDataStep} from "../Steps";
import {Text} from "@consta/uikit/Text";
import {IconAdd} from "@consta/icons/IconAdd";
import {Dispatch} from "react";


export const AlgoritmCreatorMenu:React.FC<{addStep:Function, nextStepId:number, setDeletedStepId:Dispatch<number|null>}> = ({addStep, nextStepId, setDeletedStepId}) => {
    return <div className={algoritmCreatorMenuStyle.algoritmCreatorMenu}>
        <Text
            view={'primary'}
            size={'s'}
        >
            Добаление шага:
        </Text>
        <Button
            label={'Данные из БД'}
            title={'Добавить шаг считывания данных из БД'}
            onClick={() => {addStep(<PreviewSelectDbDataStep key={nextStepId} id={nextStepId} setDeletedStepId={setDeletedStepId} />)}}
            size={'xs'}
            view={'secondary'}
            iconLeft={IconAdd}
        />
        <Button
            label={'Проверка'}
            title={'Добавить шаг проверки'}
            onClick={() => {addStep(<PreviewCheckStep key={nextStepId} id={nextStepId} setDeletedStepId={setDeletedStepId} />)}}
            size={'xs'}
            view={'secondary'}
            iconLeft={IconAdd}
        />
    </div>
}