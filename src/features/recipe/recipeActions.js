import { toastr } from "react-redux-toastr"
import { createNewRecipe } from "../../app/common/util/helpers"

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
