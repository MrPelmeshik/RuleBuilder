import mainFiledStyle from './MainField.module.css';
import {useEffect, useState} from "react";
import {AlgoritmCreatorMenu} from "./AlgoritmCreator/Menu/AlgoritmCreatorMenu";
import {StepType} from "./AlgoritmCreator/StepType";

export const MainField = () => {
    const [stepsElements, setStepsElements] = useState<JSX.Element[]>([])
    const [steps, setSteps] = useState<StepType[]>([])
    const [deletedStepId, setDeletedStepId] = useState<number | null>()
    const [stepIdForOpenSettings, setStepIdForOpenSettings] = useState<number | null>()

    useEffect(() => {
        setStepsElements([...(stepsElements.filter(x => x.props.id !== deletedStepId))])
        setSteps([...(steps.filter(x => x.id !== deletedStepId))])
        setDeletedStepId(null)
    }, [deletedStepId])

    const addStep = (item:JSX.Element) => {
        setStepsElements([...stepsElements, item])

        const newStep:StepType = {
            id:Number(item.key),
            stepType: item.type,
            position: steps.length,
            detail: 'детализация'
        }
        setSteps([...steps, newStep])
    }
    const getNextStepId = ():number => Math.max(0, ...stepsElements.map(x => Number(x.key))) + 1

    return <div className={mainFiledStyle.mainField}>
        <AlgoritmCreatorMenu addStep={addStep} nextStepId={getNextStepId()} setDeletedStepId={setDeletedStepId}/>
        <div className={mainFiledStyle.algoritmFlow}>
            {stepsElements.length ? stepsElements : <div>В алгоритме еще нет ни одного шага</div>}
        </div>
    </div>
}