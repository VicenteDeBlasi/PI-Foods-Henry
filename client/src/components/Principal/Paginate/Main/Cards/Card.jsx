import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import style from './Card.module.css';
import {getRecipesBackend} from '../../../../../redux/actions.js'

// * Representa una tarjeta de receta. Renderiza los detalles de la receta, como el nombre, la imagen, 
// * el puntaje de salud y las dietas asociadas. Si el ID de la receta contiene el guión "-", se 
// * muestra un botón de eliminación que permite al usuario eliminar la receta. 
// * Al hacer clic en el botón de eliminación, se realiza una solicitud DELETE a la API y se actualiza la lista de recetas en el estado de Redux.
class Card extends Component {

// * Esta función se encarga de eliminar una receta. Al hacer clic en el botón (X), 
// * se muestra una confirmación mediante window.confirm para asegurarse de que el usuario realmente desea eliminar la receta. 
// * Si el usuario confirma la eliminación, se realiza una solicitud DELETE a la API para eliminar la receta utilizando axios.delete. 
// * Si la eliminación es exitosa, se llama a la acción getRecipesBackend a través del dispatch para 
// * actualizar la lista de recetas en el estado de Redux.
    delete = async (e) => {
        e.preventDefault();

        const sureToDeleted = window.confirm("¿Seguro que quiere eliminar la receta?");
                
        if (sureToDeleted) { 

            const res = await axios.delete(`/recipes/${this.props.id}`)

            if (res.status === 500) return window.alert("no se pudo eliminar la receta");
    
            this.props.dispatch(getRecipesBackend())}

    }

    render() {

        const { name, image, healthScore, id, diets } = this.props;

        return (
            <NavLink to={`/recipes/${id}`}>
                <div className={style.card}>
                    {(!id.toString().includes("-"))?
                                                    null:
                                                    <button className={style.delete}
                                                            onClick={this.delete}>x</button>}
                    <div className={style.nameRecipe} ><h2>{name[0].toUpperCase() + name.substr(1)}</h2></div>
                    <img src={image} alt={`${id}Img`} />
                    <div className={style.scoreConteiner} ><h3 >{`Health Score: ${healthScore}`}</h3></div>
                    <div className={style.dietsConteiner}>
                        {diets.map((diet, i) => <span key={diet}>{diet}</span>)}
                    </div>
                </div>
            </NavLink>
        )
    }
}

export default connect(null,null)(Card);