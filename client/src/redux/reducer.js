const initialState = {
    loading: true,
    backupRecipes: [],
    allRecipes: [],
    countRecipes: 0,
    allDiets: {},
    page: 1,
    newRecipeCreate: false
}

const rootReducer = (state = initialState, actions) => {

    switch (actions.type) {
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                backupRecipes: [...actions.payload],
                allRecipes: actions.payload,
                countRecipes: actions.payload.length,
                page: 1,
                newRecipeCreate: false
            }
        case 'GET_ALL_DIETS':
            return {
                ...state,
                loading: false,
                allDiets: actions.payload
            }
        case 'PREVIOUS_PAGE':
            return {
                ...state,
                page: state.page - 1
            }
        case 'CHANGE_PAGE':
            return {
                ...state,
                page: actions.payload
            }
        case 'NEXT_PAGE':
            return {
                ...state,
                page: state.page + 1
            }
        case 'ORDER':

            // ? Extrae las propiedades typeOrder, asc y atribute del payload de la acción.
            const { typeOrder, asc, atribute } = actions.payload;

            // ? Crea una variable newOrder como una lista vacía que contendrá la lista de recetas ordenadas.
            let newOrder = []

            // ? Comprueba si typeOrder es igual a "string" para determinar.
            if (typeOrder === "string") {

                // ? Si typeOrder es "string" (ordena de forma alfabetica), utiliza el método sort() en la lista de recetas (state.allRecipes) 
                // ? para ordenarlas según el valor de la propiedad atribute. 
                // ? Si asc es true, el orden es ascendente; de lo contrario, el orden es descendente.
                // ? guardamos la lista ordenada en la variable newOrder.
                newOrder = asc ? [...state.allRecipes.sort((a, b) => (a[atribute].toLowerCase() > b[atribute].toLowerCase()) ? 1 :
                    (a[atribute].toLowerCase() < b[atribute].toLowerCase()) ? -1 : 0)] :

                    [...state.allRecipes.sort((b, a) => (a[atribute].toLowerCase() > b[atribute].toLowerCase()) ? 1 :
                        (a[atribute].toLowerCase() < b[atribute].toLowerCase()) ? -1 : 0)]
            } else {

                // ? Si typeOrder es diferente de "string", se asume que es un orden numérico (HealthScore) 
                // ? y se utiliza el método sort() de manera similar.
                // ? guardamos la lista ordenada en la variable newOrder.
                newOrder = asc ? [...state.allRecipes.sort((a, b) => (a[atribute] > b[atribute]) ? 1 :
                    (a[atribute] < b[atribute]) ? -1 : 0)] :

                    [...state.allRecipes.sort((b, a) => (a[atribute] > b[atribute]) ? 1 :
                        (a[atribute] < b[atribute]) ? -1 : 0)]
            }

            // ? Devolver un nuevo estado que incluye la lista de recetas ordenadas (newOrder), 
            // ? establecer la página en 1 y mantener las demás propiedades del estado iguales.
            return {
                ...state,
                allRecipes: newOrder,
                page: 1
            }

        case 'FILTER_BY_DIETS':

            const filteredRecipes = state.backupRecipes.filter(recipe => !actions.payload.some(d => !recipe.diets.includes(d)))

            return {
                ...state,
                allRecipes: filteredRecipes,
                countRecipes: filteredRecipes.length,
                page: 1
            }

        case 'RESET_RECIPES':

            return {
                ...state,
                allRecipes: [...state.backupRecipes],
                countRecipes: [...state.backupRecipes].length,
                page: 1
            }

        case 'LOADING':

            return {
                ...state,
                loading: actions.payload
            }

        case 'SAVE_RECIPES':

            return {
                ...state,
                allRecipes: actions.payload,
                countRecipes: actions.payload.length,
                page: 1
            }

        case 'NEW_RECIPE':

            return {
                ...state,
                newRecipeCreate: true
            }

        default: return { ...state };
    }
}

export default rootReducer;