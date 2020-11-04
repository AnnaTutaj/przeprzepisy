import firebase from '../../app/config/firebase';
import { toastr } from "react-redux-toastr"
import { createNewRecipe } from "../../app/common/util/helpers"
import { FETCH_LATEST_RECIPES, FETCH_MOST_LIKED_RECIPES, FETCH_USER_RECIPES } from './recipeConstants';
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../async/asyncActions';

export const createRecipe = (recipe) => {
    return async (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const profile = getState().firebase.profile;
        const newRecipe = createNewRecipe(user, profile, recipe);
        try {
            let createdRecipe = await firestore.add('recipes', newRecipe);
            toastr.success('Sukces!', 'Przepis został dodany');
            return createdRecipe;
        }
        catch (error) {
            toastr.error('Oops!', 'Coś poszło nie tak');
        }
    }
}

export const updateRecipe = (recipe) => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        try {
            await firestore.update(`recipes/${recipe.id}`, recipe);
            toastr.success('Sukces!', 'Przepis został zaktualizowany');
        }
        catch (error) {
            toastr.error('Oops!', 'Coś poszło nie tak');
        }
    }
}

export const hideRecipeToggle = (hide, recipeId) =>
    async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const message = hide ? "Czy na pewno chcesz ukryć przepis?" : "Czy na pewno chcesz pokazać przepis?";
        try {
            toastr.confirm(message, {
                onOk: async () => await firestore.update(`recipes/${recipeId}`, {
                    hide: hide
                }),
                okText: 'Tak',
                cancelText: 'Anuluj'
            })
        } catch (error) {
            toastr.error('Oops!', 'Coś poszło nie tak');
        }
    }


export const deleteRecipe = (recipeId) => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        try {
            await firestore.delete({ collection: 'recipes', doc: recipeId });
            //todo przemyśleć dodatkowe usuwanie z ulubionych (recipe_likes collection)
            toastr.success('Sukces!', 'Przepis został usunięty');
        }
        catch (error) {
            toastr.error('Oops!', 'Nie udało się usunąć przepisu');
        }
    }
}

export const getLatestRecipes = () =>
    async (dispatch, getState) => {
        const firestore = firebase.firestore();
        const latestRecipesQuery = firestore.collection('recipes').orderBy('createdAt', 'desc').limit(8);
        try {
            dispatch(asyncActionStart())
            let querySnap = await latestRecipesQuery.get();
            let latestRecipes = [];

            for (let i = 0; i < querySnap.docs.length; i++) {
                let recipe = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
                latestRecipes.push(recipe);
            }
            dispatch({ type: FETCH_LATEST_RECIPES, payload: latestRecipes });
            dispatch(asyncActionFinish());
        } catch (error) {
            dispatch(asyncActionError());
        }
    }

export const getMostLikedRecipes = () =>
    async (dispatch, getState) => {
        const firestore = firebase.firestore();
        const mostLikedRecipesQuery = firestore.collection('recipes').orderBy('likedByCount', 'desc').limit(8);
        try {
            dispatch(asyncActionStart())
            let querySnap = await mostLikedRecipesQuery.get();
            let mostLikedRecipes = [];

            for (let i = 0; i < querySnap.docs.length; i++) {
                let recipe = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
                mostLikedRecipes.push(recipe);
            }
            dispatch({ type: FETCH_MOST_LIKED_RECIPES, payload: mostLikedRecipes });
            dispatch(asyncActionFinish());
        } catch (error) {
            dispatch(asyncActionError());
        }
    }


export const getUserRecipes = (userId, lastFetchedRecipe) =>
    async (dispatch, getState) => {
        const firestore = firebase.firestore();
        const userRecipesQueryRef = firestore.collection('recipes');
        try {
            dispatch(asyncActionStart());
            let startAfter = lastFetchedRecipe && await firestore.collection('recipes').doc(lastFetchedRecipe.id).get();
            let query = lastFetchedRecipe ? userRecipesQueryRef.where('createdByUid', '==', userId).orderBy('createdAt', 'desc').startAfter(startAfter).limit(4) : userRecipesQueryRef.where('createdByUid', '==', userId).orderBy('createdAt', 'desc').limit(4);
            let querySnap = await query.get();

            if (querySnap.docs.length === 0) {
                dispatch(asyncActionFinish());
                return querySnap;
            }

            let userRecipes = [];

            for (let i = 0; i < querySnap.docs.length; i++) {
                let recipe = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
                userRecipes.push(recipe);
            }
            dispatch({ type: FETCH_USER_RECIPES, payload: userRecipes });
            dispatch(asyncActionFinish());
            return querySnap;
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    }

export const clearUserRecipes = () =>
    async (dispatch) => {
        dispatch({ type: FETCH_USER_RECIPES, payload: [] });
    }





