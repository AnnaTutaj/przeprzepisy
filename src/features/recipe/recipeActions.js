import { toastr } from "react-redux-toastr"
import { fetchSampleRecipes } from "../../app/data/mockApi"
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../async/asyncActions"
import { CREATE_RECIPE, DELETE_RECIPE, FETCH_RECIPES, UPDATE_RECIPE } from "./recipeConstants"

export const createRecipe = (recipe) => {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_RECIPE,
                payload: {
                    recipe
                }
            })
            toastr.success('Sukces!', 'Przepis został dodany');
        }
        catch (error) {
            toastr.success('OOps!', 'Coś poszło nie tak');
        }
    }
}

export const updateRecipe = (recipe) => {
    return async dispatch => {
        try {
            dispatch({
                type: UPDATE_RECIPE,
                payload: {
                    recipe
                }
            })
            toastr.success('Sukces!', 'Przepis został zaktualizowany');
        }
        catch (error) {
            toastr.success('OOps!', 'Coś poszło nie tak');
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