import { CREATE_RECIPE, DELETE_RECIPE, UPDATE_RECIPE } from "./recipeConstants"

export const createRecipe = (recipe) => {
    return {
        type: CREATE_RECIPE,
        payload: {
            recipe
        }
    }
}

export const updateRecipe = (recipe) => {
    return {
        type: UPDATE_RECIPE,
        payload: {
            recipe
        }
    }
}

export const deleteRecipe = (recipeId) => {
    return {
        type: DELETE_RECIPE,
        payload: {
            recipeId
        }
    }
}