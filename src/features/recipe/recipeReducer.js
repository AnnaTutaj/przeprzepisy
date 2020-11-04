import { createReducer } from "../../app/common/util/reducerUtils";
import { FETCH_LATEST_RECIPES, FETCH_MOST_LIKED_RECIPES, FETCH_USER_RECIPES } from "./recipeConstants";

const initialState = {
    latestRecipes: [],
    mostLikedRecipes: [],
    userRecipes: []
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

export default createReducer(initialState, {
    [FETCH_LATEST_RECIPES]: fetchLatestRecipes,
    [FETCH_MOST_LIKED_RECIPES]: fetchMostLikedRecipes,
    [FETCH_USER_RECIPES]: fetchUserRecipes
});