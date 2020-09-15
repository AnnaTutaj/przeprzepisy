import { combineReducers } from "redux";
import recipeReducer from "../../features/recipe/recipeReducer";
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: FormReducer,
    recipes: recipeReducer
})

export default rootReducer;