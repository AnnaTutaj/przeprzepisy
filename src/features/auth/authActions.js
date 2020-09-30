import { SubmissionError } from 'redux-form';
import { closeModal } from "../modals/modalActions";
import { SIGN_OUT_USER } from "./authConstants";

export const login = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.login, credentials.password);
            dispatch(closeModal());
        }
        catch (error) {
            throw new SubmissionError({
                _error: 'Nieprawidłowy email i/lub hasło'
            })
        }
    }

}

export const logout = () => {
    return {
        type: SIGN_OUT_USER
    }

} 