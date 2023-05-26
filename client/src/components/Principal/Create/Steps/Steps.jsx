import React, { useState, useEffect } from "react";
import style from './Steps.module.css';

// * el componente Steps representa la sección del formulario donde se pueden agregar y administrar los pasos de una receta. 
// * Permite al usuario ingresar nuevos pasos en un campo de texto, mostrar los pasos actuales en una lista y brinda la 
// * capacidad de eliminar pasos individualmente o eliminar todos los pasos a la vez. También controla la habilitación 
// * o deshabilitación de los botones según las condiciones establecidas en los efectos secundarios (useEffect) y los estados locales.
export default function Steps(props) {

    const { currentSteps, addStep, deleteStep, resetStep, deleteStepByN} = props;
    const [step, setStep] = useState("");
    const [disabledAdd, setDisabledAdd] = useState(true);
    const [disabledRD, setDisabledRD] = useState(false);

// * se utiliza para habilitar o deshabilitar los botones de "Borrar Todo" y 
// * "Borrar Ultima" dependiendo de si existen pasos actuales (currentSteps).
    useEffect(() => {
        
        (currentSteps.length)? setDisabledRD(false): setDisabledRD(true)

    }, [setDisabledRD, currentSteps])

    useEffect(() => {

        ((!/^\s*$/.test(step)))?  setDisabledAdd(false): setDisabledAdd(true)

    }, [step])

// * Esta función se utiliza como controlador de eventos para los cambios en el campo de entrada de texto (textarea). 
// * Actualiza el estado step con el valor ingresado en el campo.
    const changeHandler = (e) => {

        setStep(e.target.value);
    }

// * Esta función se ejecuta cuando se presiona el botón "Agregar" o se presiona la tecla Enter en el campo de entrada de texto (textarea). 
// * Si el campo no está vacío, llama a la función addStep pasando el valor del paso (step) y luego restablece el estado step a una cadena vacía.
    const pressAdd = (e) => {

        e.preventDefault();

        if (step !== "") {

            addStep(step);
            setStep("");

        }
    }

// * Esta función se ejecuta cuando se presiona el botón "Borrar Todo". Llama a la función resetStep para eliminar todos los pasos actuales.
    const pressReset = (e) => {
        e.preventDefault();
        resetStep()
    }

// * Esta función se ejecuta cuando se presiona el botón "Borrar Ultima". Llama a la función deleteStep para eliminar el último paso agregado.
    const pressDelete = (e) => {
        e.preventDefault();
        deleteStep()
    }

// * Esta función se ejecuta cuando se presiona el botón "X" junto a un paso específico de la lista de pasos actuales. 
// * Llama a la función deleteStepByN pasando el valor del número de paso para eliminar ese paso en particular.
    const pressDeleteStep = (e) => {
        e.preventDefault();

        deleteStepByN(e.target.value)

    }

    return (
        <div className={style.stepsConteiner}>
            <label >
                <h3>Pasos</h3>

                <textarea className={style.textarea}
                    value={step}
                    onChange={changeHandler}
                    onKeyDown={e => (e.key === "Enter") ? pressAdd(e) : null}
                />
                <div>
                    <button className={`${style.button} ${!disabledRD? null : style.buttonDisable}`} onClick={pressReset}>Borrar Todo</button>
                    <button className={`${style.button} ${!disabledRD? null : style.buttonDisable}`} disabled={disabledRD} onClick={pressDelete}>Borrar Ultima</button>
                    <button className={`${style.button} ${!disabledAdd? null : style.buttonDisable}`} disabled={disabledAdd} onClick={pressAdd}>Agregar</button>
                </div>

            </label>

            <div className={style.currentSteps}>
                <h3>Lista de pasos:</h3>
                <div >
                    {
                    currentSteps[0]? currentSteps.map(([key, value]) => <span key={key}>
                                                                            <button className={style.buttonSteps} 
                                                                                    value={key} 
                                                                                    onClick={pressDeleteStep}>X
                                                                            </button>
                                                                            {key + " - " + value}
                                                                        </span>):
                                    <span>No hay pasos</span>
                    }
                </div>
            </div>
        </div>
    )
}