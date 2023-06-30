import algorithmCreatorMenuStyle from './AlgorithmCreatorMenu.module.css'
import {Button} from "@consta/uikit/Button";
import {PreviewCheckStep, PreviewSelectDbDataStep} from "../Steps";
import {Text} from "@consta/uikit/Text";
import {IconAdd} from "@consta/icons/IconAdd";
import {Dispatch} from "react";
import {StepsEnum} from "../Steps/StepsEnum";
import {StepType} from "../Steps/StepType";
import {SelectDbDataStepSettingsType} from "../Steps/SelectData/Db/Types/SelectDbDataStepSettingsType";
import {PreviewHierarchyTestStep} from "../Steps/HierarchyTest/Preview/PreviewHierarchyTestStep";
import {CheckStepSettingsType} from "../Steps/Check/Types/CheckStepSettingsType";
import {HierarchyTestStepSettingsType} from "../Steps/HierarchyTest/Types/HierarchyTestStepSettingsType";
import {IconKernFilled} from "@consta/icons/IconKernFilled";
import {IconTable} from "@consta/icons/IconTable";
import {IconStorage} from "@consta/icons/IconStorage";
import {IconDocBlank} from "@consta/icons/IconDocBlank";
import {IconFunnel} from "@consta/uikit/IconFunnel";
import {IconBackward} from "@consta/icons/IconBackward";
import {IconForward} from "@consta/icons/IconForward";
import {IconDown} from "@consta/icons/IconDown";
import {IconTop} from "@consta/icons/IconTop";
import {IconCalculator} from "@consta/icons/IconCalculator";
import {IconWrench} from "@consta/icons/IconWrench";
import {IconSearchStroked} from "@consta/icons/IconSearchStroked";
import {IconGrouping} from "@consta/icons/IconGrouping";
import {IconTest} from "@consta/icons/IconTest";
import {IconEdit} from "@consta/icons/IconEdit";
import {IconLogicalElement} from "@consta/icons/IconLogicalElement";
import {IconRevert} from "@consta/icons/IconRevert";
import {PreviewStepLoop} from "../Steps/Loop/Preview/PreviewStepLoop";


export const AlgorithmCreatorMenu
    :React.FC<{addStep:Function, nextStepId:number, setDeletedStepId:Dispatch<number|null>}>
    = ({addStep, nextStepId, setDeletedStepId}) => {
    const addNextStep = (type: StepsEnum) => {
        let nextStep: StepType | null = null
        switch (type) {
            case StepsEnum.selectDbDataStep:
                nextStep = new StepType(nextStepId, nextStepId, StepsEnum.selectDbDataStep, new SelectDbDataStepSettingsType())
                addStep(<PreviewSelectDbDataStep key={nextStepId}
                                                 id={nextStepId}
                                                 stepSettings={nextStep.settings}
                                                 setDeletedStepId={setDeletedStepId}
                />, nextStep)
                break;
            case StepsEnum.checkStep:
                nextStep = new StepType(nextStepId, nextStepId, StepsEnum.checkStep, new CheckStepSettingsType())
                addStep(<PreviewCheckStep key={nextStepId}
                                          id={nextStepId}
                                          stepSettings={nextStep.settings}
                                          setDeletedStepId={setDeletedStepId}
                />, nextStep)
                break;
            case StepsEnum.hierarchyTest:
                nextStep = new StepType(nextStepId, nextStepId, StepsEnum.hierarchyTest, new HierarchyTestStepSettingsType())
                addStep(<PreviewHierarchyTestStep key={nextStepId}
                                          id={nextStepId}
                                          stepSettings={nextStep.settings}
                                          setDeletedStepId={setDeletedStepId}
                />, nextStep)
                break;
            case StepsEnum.loopStep:
                nextStep = new StepType(nextStepId, nextStepId, StepsEnum.loopStep, new HierarchyTestStepSettingsType())
                addStep(<PreviewStepLoop key={nextStepId}
                                          id={nextStepId}
                                          stepSettings={nextStep.settings}
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
            {/*<div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroup}>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupHeader}>
                    <Text view={'secondary'} size={'xs'}>
                        <IconTest size={'xs'} />
                        Тестовые:
                    </Text>
                </div>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupList}>
                    <Button
                        label={'Иерархия'}
                        title={'Добавить тестовый шаг создания иерархии'}
                        onClick={() => addNextStep(StepsEnum.hierarchyTest)}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconTest}
                    />
                </div>
            </div>*/}
            <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroup}>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupHeader}>
                    <Text view={'secondary'} size={'xs'}>
                        Чтение данных:
                    </Text>
                </div>
                <div className={algorithmCreatorMenuStyle.algorithmCreatorMenuGroupList}>
                    <Button
                        label={'БД'}
                        title={'Добавить шаг считывания данных из БД'}
                        onClick={() => addNextStep(StepsEnum.selectDbDataStep)}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconKernFilled}
                    />
                    <Button
                        label={'API'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconStorage}
                        disabled={true}
                    />
                    <Button
                        label={'JSON'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconDocBlank}
                        disabled={true}
                    />
                    <Button
                        label={'CSV'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconDocBlank}
                        disabled={true}
                    />
                    <Button
                        label={'XML'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconDocBlank}
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
                        view={'secondary'}
                        iconLeft={IconSearchStroked}
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
                        view={'secondary'}
                        iconLeft={IconBackward}
                        // disabled={true}
                    />
                    <Button
                        label={'Правое соединение'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconForward}
                        // disabled={true}
                    />
                    <Button
                        label={'Полное соединение'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconDown}
                        // disabled={true}
                    />
                    <Button
                        label={'Перекрестное соединение'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconTop}
                        // disabled={true}
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
                        label={'Фильтрация'}
                        title={'Добавить шаг фильтрации'}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconFunnel}
                        // disabled={true}
                    />
                    <Button
                        label={'Модифицировать'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconWrench}
                        // disabled={true}
                    />
                    <Button
                        label={'Добавить константу'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconAdd}
                        // disabled={true}
                    />
                    <Button
                        label={'Группировка'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconGrouping}
                        // disabled={true}
                    />
                    <Button
                        label={'Цикл по данным'}
                        title={''}
                        onClick={() => addNextStep(StepsEnum.loopStep)}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconRevert}
                        // disabled={true}
                    />
                    <Button
                        label={'Ветвление (по условию)'}
                        title={''}
                        onClick={() => {
                        }}
                        size={'xs'}
                        view={'secondary'}
                        iconLeft={IconLogicalElement}
                        // disabled={true}
                    />
                </div>
            </div>
        </div>
    </div>
}