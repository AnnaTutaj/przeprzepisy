import { SubmissionError } from 'redux-form';
import firebaseTranslations from '../../app/common/firebaseTranslations';
import { closeModal } from "../modals/modalActions";

export const login = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            dispatch(closeModal());
        }
        catch (error) {
            throw new SubmissionError({
                _error: 'Nieprawidłowy email i/lub hasło'
            })
        }
    }

}

//Inny krótszy zapis - bez {} i return 
// export const registerUser = user =>
//     async (dispatch, getState, { getFirebase, getFirestore }) => {
//     }


export const registerUser = user => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        try {
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            await createdUser.user.updateProfile({
                displayName: user.nick
            })

            let newUser = {
                displayName: user.nick,
                createdAt: firestore.FieldValue.serverTimestamp(),
            }

            await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
            dispatch(closeModal());
        }
        catch (error) {
            //Aktualnie wszystkie błędy mają swoje tłumaczenia, ale gdyby z czasem pojawiły się zmiany, to pokaże się domyślny tekst
            throw new SubmissionError({
                _error: firebaseTranslations[error.code] || 'Coś poszło nie tak... proszę spróbować później',
            })
        }

    }
}

export const federatedLogin = (selectedProvider) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        try {
            dispatch(closeModal());
            await firebase.login({
                provider: selectedProvider,
                type: 'popup'
            })
        }
        catch(error){

        }
    }

}