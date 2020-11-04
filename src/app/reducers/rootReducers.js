import { combineReducers } from "redux";
import { reducer as FormReducer } from 'redux-form';
import { reducer as ToastrReducer } from 'react-redux-toastr';

import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from 'redux-firestore';
import recipeReducer from "../../features/recipe/recipeReducer";

const rootReducer = combineReducers({
    form: FormReducer,
    toastr: ToastrReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    recipes: recipeReducer
})

export default rootReducer;