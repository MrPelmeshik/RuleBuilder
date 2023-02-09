import mainFiledStyle from './MainField.module.css';
import {useEffect, useState} from "react";
import {AlgorithmCreatorMenu} from "./AlgoritmCreator/Menu/AlgorithmCreatorMenu";
import {StepTypeOld} from "./AlgoritmCreator/Steps/StepType";
import {StepsEnum} from "./AlgoritmCreator/Steps/StepsEnum";

export const MainField = () => {
    const [stepsElements, setStepsElements] = useState<JSX.Element[]>([])
    // const [steps, setSteps] = useState<StepType[]>([])
    const [deletedStepId, setDeletedStepId] = useState<number | null>()

    useEffect(() => {
        if(deletedStepId) {
            setStepsElements([...(stepsElements.filter(x => x.props.stepType.id !== deletedStepId))])
            // setSteps([...(steps.filter(x => x.props.stepType.id !== deletedStepId))])
            setDeletedStepId(null)
        }
    }, [deletedStepId])

    const addStep = (item:JSX.Element, type:StepTypeOld) => {
        setStepsElements([...stepsElements, item])
        // setSteps([...steps, type])
    }
    const getNextStepId = ():number => Math.max(0, ...stepsElements.map(x => Number(x.key))) + 1

    return <div className={mainFiledStyle.mainField}>
        <AlgorithmCreatorMenu addStep={addStep} nextStepId={getNextStepId()} setDeletedStepId={setDeletedStepId}/>
        <div className={mainFiledStyle.algoritmFlow}>
            {stepsElements.length ? stepsElements : <div>В алгоритме еще нет ни одного шага</div>}
        </div>
    </div>
}