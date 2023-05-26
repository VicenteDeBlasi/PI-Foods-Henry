import React from "react";
import {useSelector} from 'react-redux';
import Button from './Button.jsx';
import style from './Buttons.module.css'

const Buttons = () => {
    
// * Obtiene el estado de countRecipes desde el store.
    const {countRecipes} = useSelector((state) => state);

    // * Esta función recibe un número n como argumento y genera un array de elementos Button mediante un bucle for. 
    // * Por cada número desde 1 hasta n, se crea un componente Button con el número como nombre y se agrega al array arrButtons. 
    const impBotton = (n) => {
        
    const arrButtons = [];
    
    for (let i = 1; i <= n; i++) {
        arrButtons.push(<Button key={i} name={i} />)
    }
    
    // * Finalmente, la función devuelve el array arrButtons.
        return arrButtons
    }

    return (
        <div className={style.buttonConteiners}>
          <Button name={"<"} >{"<"}</Button>

          {impBotton(Math.ceil(countRecipes/9))}

          <Button name={">"} >{">"}</Button>
        </div>
    )
}

export default Buttons