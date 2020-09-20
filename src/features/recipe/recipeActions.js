import { fetchSampleRecipes } from "../../app/data/mockApi"
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../async/asyncActions"
import { CREATE_RECIPE, DELETE_RECIPE, FETCH_RECIPES, UPDATE_RECIPE } from "./recipeConstants"

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

export const loadRecipes = () => {
    return async dispatch => {
        try {
            dispatch(asyncActionStart())
            const recipes = await fetchSampleRecipes();
            dispatch({ type: FETCH_RECIPES, payload: { recipes } });
            dispatch(asyncActionFinish());
        } catch (error) {
            dispatch(asyncActionError());
        }

    }
}