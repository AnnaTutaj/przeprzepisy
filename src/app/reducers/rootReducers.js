import { combineReducers } from "redux";
import recipeReducer from "../../features/recipe/recipeReducer";
import { reducer as FormReducer } from 'redux-form';
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";

const rootReducer = combineReducers({
    form: FormReducer,
    modals: modalReducer,
    recipes: recipeReducer,
    auth: authReducer
})

export default rootReducer;