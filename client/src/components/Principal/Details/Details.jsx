import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import CardDetails from "./CardDetails";
import style from './Details.module.css';
import Loading from '../Loading/Loading.jsx';
import { useDispatch } from "react-redux";
import { getRecipesBackend } from "../../../redux/actions";

// * El componente Details muestra los detalles de una receta específica. Si se proporciona un id válido, 
// * se realiza una solicitud GET a la API para obtener los datos de la receta. 
// * El componente muestra un botón para volver a la lista de recetas y, si el id es válido (no contiene un guion), 
// * también muestra un botón para eliminar la receta. Si ocurre algún error durante la obtención de datos, se muestra un mensaje de error.
const Details = ({id}) => {

    const [recipe, setRecipe] = useState({});
    const [error, setError] = useState(false);
    const dispatch = useDispatch()

// * Se utiliza para desplazar la ventana hacia arriba al cargar la página. 
// * Se llama a window.scroll() con los valores top y left establecidos en 0 para desplazar la ventana al principio.
    useEffect(()=>{
        
        window.scroll({
            top: 0,
            left: 0
          })

    })

// * Se utiliza para obtener los detalles de la receta mediante una solicitud GET a la API cuando el id de la receta cambia. 
// * Se utiliza la función axios.get() para realizar la solicitud y se establece el estado recipe con los datos de respuesta. 
// * Si ocurre un error durante la solicitud, se establece el estado error en true.
    useEffect(() => {
        
        axios.get(`/recipes/${id}`)
        .then(response => setRecipe(response.data))
        .catch(() => setError(true))

      }, [id])

      const history = useHistory();

// * Esta función se ejecuta cuando se hace clic en el botón de regreso. 
// * Utiliza el objeto history proporcionado por React Router para redirigir al usuario a la página de recetas.
      const buttonOnBack = (e) => {
          e.preventDefault();
          history.push('/recipes')
      }
// * Esta función se ejecuta cuando se hace clic en el botón de eliminar. Muestra un mensaje de confirmación al usuario 
// * para asegurarse de que desea eliminar la receta. Si el usuario confirma, se realiza una solicitud DELETE a la API 
// * utilizando axios.delete() y se verifica el estado de respuesta. Si la eliminación es exitosa, se llama a la acción 
// * getRecipesBackend() para actualizar la lista de recetas en Redux y luego se redirige al usuario a la página de recetas.
      const buttonDelete = async (e) => {
        e.preventDefault();

        const sureToDeleted = window.confirm("¿Seguro que quiere eliminar la receta?");
                
        if (sureToDeleted) { 

            const res = await axios.delete(`/recipes/${id}`)

            if (res.status === 500) return window.alert("no se pudo eliminar la receta");
    
            dispatch(getRecipesBackend())

            history.push('/recipes');}

    }

    return (
        <div className={style.detailsConteiner}>
            <button onClick={buttonOnBack} className={style.onBack}>{"<<<"}</button>
            {(!id.toString().includes("-"))?null:
            <button onClick={buttonDelete} className={style.delete}>{"Eliminar"}</button>}
            {
              (error)? <>ERRORR</> : (Object.entries(recipe).length)? <CardDetails recipe={recipe}/> : <Loading/>
            }
        </div>
    )
    
}

export default Details;