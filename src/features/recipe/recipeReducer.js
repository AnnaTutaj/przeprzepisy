import { createReducer } from "../../app/common/util/reducerUtils";
import { FETCH_LATEST_RECIPES, FETCH_MOST_LIKED_RECIPES, FETCH_USER_RECIPES, FETCH_USER_FAV_RECIPES, FETCH_RECIPE_LIKES } from "./recipeConstants";

const initialState = {
    latestRecipes: [],
    mostLikedRecipes: [],
    userRecipes: [],
    userFavRecipes: [],
    recipeLikes: []
}

const fetchLatestRecipes = (state, payload) => {
    return { ...state, latestRecipes: payload }
}

const fetchMostLikedRecipes = (state, payload) => {
    return { ...state, mostLikedRecipes: payload }
}

const fetchUserRecipes = (state, payload) => {
    return { ...state, userRecipes: payload }
}

const fetchUserFavRecipes = (state, payload) => {
    return { ...state, userFavRecipes: payload }
}

const fetchRecipeLikes = (state, payload) => {
    return { ...state, recipeLikes: payload }
}

export default createReducer(initialState, {
    [FETCH_LATEST_RECIPES]: fetchLatestRecipes,
    [FETCH_MOST_LIKED_RECIPES]: fetchMostLikedRecipes,
    [FETCH_USER_RECIPES]: fetchUserRecipes,
    [FETCH_USER_FAV_RECIPES]: fetchUserFavRecipes,
    [FETCH_RECIPE_LIKES]: fetchRecipeLikes
});