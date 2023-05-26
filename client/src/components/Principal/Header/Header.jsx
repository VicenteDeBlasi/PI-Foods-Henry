import React, { Component } from "react";
import {connect} from "react-redux";
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { getRecipesByName, getRecipesBackend, resetRecipes } from "../../../redux/actions";

// * muestra un encabezado con un logotipo y opciones para crear una nueva receta y realizar búsquedas. 
// * Dependiendo de la ubicación actual, se muestran diferentes elementos en el encabezado. 
// * El componente también interactúa con Redux para llamar a las acciones correspondientes cuando se realizan ciertas acciones, 
// * como enviar el formulario de búsqueda o hacer clic en el botón de regreso.
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
        }
    }

// * Esta función se ejecuta cuando hay un cambio en el campo de entrada de búsqueda. 
// * Actualiza el estado inputValue con el valor del campo de entrada.
    changeHandler = (e) => {
        this.setState({...this.state,
                        inputValue: e.target.value})
    }

// * Esta función se ejecuta cuando se envía el formulario de búsqueda. Previene el comportamiento predeterminado del formulario, 
// * verifica si el estado inputValue no está vacío y luego llama a la acción getRecipesByName con el valor de inputValue como argumento. 
// * Luego redirige al usuario a la página de recetas utilizando this.props.history.push('/recipes').
    searchSubmit = (e) => {

        e.preventDefault();

        if (!!this.state.inputValue) {

            this.props.getRecipesByName(this.state.inputValue);
 
            this.props.history.push('/recipes')                                 

        }
        
    }

// * Esta función se ejecuta cuando se hace clic en el botón de regreso o en el logo del encabezado. 
// * Verifica si se está creando una nueva receta (newRecipeCreate es verdadero) y luego llama a la acción 
// * getRecipesBackend si es así, o llama a la acción resetRecipes si no se está creando una nueva receta. 
// * Luego redirige al usuario a la página de recetas utilizando this.props.history.push('/recipes').
    returnPaginate = (e) => {

        e.preventDefault();

        (this.props.newRecipeCreate)? this.props.getRecipesBackend(): this.props.resetRecipes()

        this.props.history.push('/recipes')
    }
    
    render() {
        
        return (
            <div className={style.header}>

                <img className={style.logo} src="https://th.bing.com/th/id/R.424a7b203b03473fdf0e882c6b07d53c?rik=VM4PnPW6CO2SFg&pid=ImgRaw&r=0" alt="logo" />
                    
                <div className={style.inputsContainer}>
                    {
                    (this.props.location.pathname === "/recipes/create")
                                ? 
                        <button onClick={this.returnPaginate} className={style.buttonCreate}>Volver</button>
                        :
                        (<>
                            <NavLink style={{textDecoration: 'none'}} to="/recipes/create">
                                <button className={style.buttonCreate}>Crear Receta</button>
                            </NavLink>
                            <form onSubmit={this.searchSubmit} className={style.search}>
                                <input type="text" value={this.state.inputValue} onChange={this.changeHandler}/>
                                <input className={style.buttonCreate} value={"Buscar"} type="submit" />
                            </form>
                        </>)
                    }
                </div>
            </div>
        )
    }
}

// * Mapea el estado de Redux a las propiedades del componente. En este caso, mapea la propiedad newRecipeCreate del 
// * estado a la propiedad newRecipeCreate del componente.
const mapStateToProps = (state) => {
    return {newRecipeCreate: state.newRecipeCreate} 
}

// * Mapea las acciones de Redux a las propiedades del componente. Mapea las acciones getRecipesByName, 
// * resetRecipes y getRecipesBackend a las propiedades getRecipesByName, resetRecipes y getRecipesBackend del componente, respectivamente.
const mapDispatchToProps = (dispatch) => ({
    getRecipesByName: (name) => dispatch(getRecipesByName(name)),
    resetRecipes: () => dispatch(resetRecipes()),
    getRecipesBackend: () => dispatch(getRecipesBackend())
  })

export default connect(mapStateToProps, mapDispatchToProps)(Header);