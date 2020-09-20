import { combineReducers } from "redux";
import recipeReducer from "../../features/recipe/recipeReducer";
import { reducer as FormReducer } from 'redux-form';
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";

const rootReducer = combineReducers({
    form: FormReducer,
    modals: modalReducer,
    recipes: recipeReducer,
    auth: authReducer,
    async: asyncReducer
})

export default rootReducer;