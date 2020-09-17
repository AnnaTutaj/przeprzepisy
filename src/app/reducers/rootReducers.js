import { combineReducers } from "redux";
import recipeReducer from "../../features/recipe/recipeReducer";
import { reducer as FormReducer } from 'redux-form';
import modalReducer from "../../features/modals/modalReducer";

const rootReducer = combineReducers({
    form: FormReducer,
    modals: modalReducer,
    recipes: recipeReducer
})

export default rootReducer;