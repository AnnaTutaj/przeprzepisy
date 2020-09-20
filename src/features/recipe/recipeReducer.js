import { createReducer } from "../../app/common/util/reducerUtils";
import { CREATE_RECIPE, DELETE_RECIPE, FETCH_RECIPES, UPDATE_RECIPE } from "./recipeConstants";

const initialState = [];

const createRecipe = (state, payload) => {
    return [...state, payload.recipe];
}

const updateRecipe = (state, payload) => {
    return [
        ...state.filter(recipe => recipe.id !== payload.recipe.id), payload.recipe
    ]
}

const deleteRecipe = (state, payload) => {
    return [
        ...state.filter(recipe => recipe.id !== payload.recipeId)
    ]
}

const fetchRecipes = (sate, payload) => {
    return payload.recipes

}

export default createReducer(initialState, {
    [CREATE_RECIPE]: createRecipe,
    [UPDATE_RECIPE]: updateRecipe,
    [DELETE_RECIPE]: deleteRecipe,
    [FETCH_RECIPES]: fetchRecipes
});