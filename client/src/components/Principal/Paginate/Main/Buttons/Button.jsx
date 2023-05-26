import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {previousPage, changePage, nextPage } from '../../../../../redux/actions.js';

// * Reresenta un botón de paginación que interactúa con el estado de Redux para realizar acciones de cambio de página.
export default function Button({name}) {

    const dispatch = useDispatch();

// * Obitene el estado de page y countRecipes desde el store.
    const {page, countRecipes} = useSelector(state => state);

// * Esta función se ejecuta cuando se hace clic en el botón. Dependiendo del valor del atributo name del botón, 
// * se ejecutan diferentes acciones. Si el botón tiene el nombre "<", se verifica si la página actual es 1 
// * antes de despachar la acción previousPage, que reduce en 1 la página actual. Si el botón tiene el nombre ">", 
// * se verifica si la página actual es igual al número total de páginas (calculado dividiendo countRecipes por 9 y 
// * redondeando hacia arriba) antes de despachar la acción nextPage, que aumenta en 1 la página actual. 
// * Si el nombre del botón es un número distinto de la página actual, se despacha la acción changePage con el 
// * número del botón como argumento, lo que actualiza la página actual a ese número.
     const onClickButton = (e) => {

        if (e.target.name === '<') {
            
            return (page === 1)? null : dispatch(previousPage());
            
        }
        else if (e.target.name === '>') {

            return (page === (Math.ceil(countRecipes/9)))? null : dispatch(nextPage());

        }
        else if (page !== parseInt(e.target.name)) {

            return dispatch(changePage(parseInt(e.target.name)));
        }
       
    } 

    return (
        <button name={name} disabled={(page === name)} onClick={onClickButton}>{name}</button>
    )

}
