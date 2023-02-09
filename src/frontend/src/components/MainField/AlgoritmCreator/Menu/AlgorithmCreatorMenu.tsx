import algorithmCreatorMenuStyle from './AlgorithmCreatorMenu.module.css'
import {Button} from "@consta/uikit/Button";
import {PreviewCheckStep, PreviewSelectDbDataStep} from "../Steps";
import {Text} from "@consta/uikit/Text";
import {IconAdd} from "@consta/icons/IconAdd";
import {Dispatch} from "react";
import {StepsEnum} from "../Steps/StepsEnum";
import {StepType} from "../Steps/StepType";
import {SelectDbDataStepType} from "../Steps/SelectData/Db/Types/SelectDbDataStepType";


export const AlgorithmCreatorMenu
    :React.FC<{addStep:Function, nextStepId:number, setDeletedStepId:Dispatch<number|null>}>
    = ({addStep, nextStepId, setDeletedStepId}) => {
    const addNextStep = (type: StepsEnum) => {
        let nextStep:StepType | null = null
        switch (type) {
            case StepsEnum.selectDbDataStep:
                nextStep = new SelectDbDataStepType(nextStepId, -1)
                addStep(<PreviewSelectDbDataStep key={nextStepId}
                                                 stepType={nextStep}
                                                 setDeletedStepId={setDeletedStepId}
                />, nextStep)
                break;
            case StepsEnum.checkStep:
                nextStep = new SelectDbDataStepType(nextStepId, -1)
                addStep(<PreviewCheckStep key={nextStepId}
                                          stepType={nextStep}
                                          setDeletedStepId={setDeletedStepId}
                />, nextStep)
                break;
            default:
                throw new Error(`Нет такого шага! ${type}`)
        }
    }

    return <div className={algorithmCreatorMenuStyle.algorithmCreatorMenu}>
        <Text as={'b'} view={'primary'} size={'s'}>
            Добаление шага:
        </Text>
        <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuListItem}>
            <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroup}>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupHeader}>
                    <Text view={'secondary'} size={'xs'}>
                        Чтение данных:
                    </Text>
                </div>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupList}>
                    <Button
                        label={' БД'}
                        title={'Добавить шаг считывания данных из БД'}
                        onClick={() => addNextStep(StepsEnum.selectDbDataStep)}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                    />
                    <Button
                        label={'API'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                    <Button
                        label={'JSON'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                    <Button
                        label={'CSV'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                    <Button
                        label={'XML'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                </div>
            </div>
            <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroup}>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupHeader}>
                    <Text view={'secondary'} size={'xs'}>
                        Валидация:
                    </Text>
                </div>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupList}>
                    <Button
                        label={'Проверка'}
                        title={'Добавить шаг проверки'}
                        onClick={() => addNextStep(StepsEnum.checkStep)}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                    />
                </div>
            </div>
            <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroup}>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupHeader}>
                    <Text view={'secondary'} size={'xs'}>
                        Соединение данных:
                    </Text>
                </div>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupList}>
                    <Button
                        label={'Левое соединение'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                    <Button
                        label={'Правое соединение'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                    <Button
                        label={'Полное соединение'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                    <Button
                        label={'Перекрестное соединение'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                </div>
            </div>
            <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroup}>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupHeader}>
                    <Text view={'secondary'} size={'xs'}>
                        Фильтрация:
                    </Text>
                </div>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupList}>
                    <Button
                        label={'Фильтрация'}
                        title={'Добавить шаг фильтрации'}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                </div>
            </div>
            <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroup}>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupHeader}>
                    <Text view={'secondary'} size={'xs'}>
                        Модификация:
                    </Text>
                </div>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupList}>
                    <Button
                        label={'Модифицировать'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                    <Button
                        label={'Добавить столбец'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                    <Button
                        label={'Получить значение'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'ghost'}
                        iconLeft={IconAdd}
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    </div>
}