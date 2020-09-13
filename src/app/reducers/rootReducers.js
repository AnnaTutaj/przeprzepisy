import {combineReducers} from "redux";
import recipeReducer from "../../features/recipe/recipeReducer";

const rootReducer = combineReducers({
    recipes: recipeReducer
})

export default rootReducer;