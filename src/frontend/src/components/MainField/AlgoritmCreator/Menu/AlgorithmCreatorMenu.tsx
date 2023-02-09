import algorithmCreatorMenuStyle from './AlgorithmCreatorMenu.module.css'
import {Button} from "@consta/uikit/Button";
import {PreviewCheckStep, PreviewSelectDbDataStep} from "../Steps";
import {Text} from "@consta/uikit/Text";
import {IconAdd} from "@consta/icons/IconAdd";
import {Dispatch} from "react";
import {StepsEnum} from "../Steps/StepsEnum";
import {StepTypeOld} from "../Steps/StepType";


export const AlgorithmCreatorMenu
    :React.FC<{addStep:Function, nextStepId:number, setDeletedStepId:Dispatch<number|null>}>
    = ({addStep, nextStepId, setDeletedStepId}) => {
    const getNewStep = (type: StepsEnum): StepTypeOld => ({
        id: nextStepId,
        type: type,
        position: -1
    })

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
                        onClick={() => {
                            const newType = getNewStep(StepsEnum.selectDbDataStep)
                            addStep(<PreviewSelectDbDataStep key={nextStepId}
                                                             stepType={newType}
                                                             setDeletedStepId={setDeletedStepId}
                            />, newType)
                        }}
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
                        onClick={() => {
                            const newType = getNewStep(StepsEnum.checkStep)
                            addStep(<PreviewCheckStep key={nextStepId}
                                                      stepType={newType}
                                                      setDeletedStepId={setDeletedStepId}
                            />, newType)
                        }}
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