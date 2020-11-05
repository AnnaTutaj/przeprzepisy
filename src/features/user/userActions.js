import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../async/asyncActions";

export const updateProfile = (user) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        //usuniecie niepotrzebnych pól z formularza
        const { isLoaded, isEmpty, ...updatedUser } = user;

        try {
            await firebase.updateProfile(updatedUser);
            toastr.success("Sukces!", "Twój profil został zaktualizowany");
        }
        catch (error) {
        }
    }
}

export const uploadProfileImage = (file, fileName) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const imageName = cuid();
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: imageName
        };

        try {
            dispatch(asyncActionStart());
            let uploadedFile = await firebase.uploadFile(path, file, null, options);
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            let userDoc = await firestore.get(`users/${user.uid}`);
            if (!userDoc.data().pictureURL) {
                await firebase.updateProfile({
                    pictureURL: downloadURL
                });
                await user.updateProfile({
                    pictureURL: downloadURL
                })
            }
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{ collection: 'photos' }]
            }, {
                name: imageName,
                url: downloadURL
            })
            dispatch(asyncActionFinish());

        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    }

export const deletePhoto = (photo) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{ collection: 'photos', doc: photo.id }]
            })
        }
        catch (error) {
            throw new Error("Nie udało się usunąć zdjęcia");
        }
    }

export const setProfilePhoto = (photo) =>
    async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            return await firebase.updateProfile({
                pictureURL: photo.url
            });
        } catch (error) {
            throw new Error('Nie udało się ustawić zdjęcia profilowego')
        }
    }

export const addFavRecipe = (recipe) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const profile = getState().firebase.profile;

        if (!user) {
            toastr.warning("Jesteś nowy?", "Zaloguj się, żeby móc polubić przepis");
            return;
        }

        const likedBy = {
            createdAt: firestore.FieldValue.serverTimestamp(),
            pictureURL: profile.pictureURL || '',
            nick: profile.nick,
            createdByUser: false
        }

        try {
            await firestore.update(`recipes/${recipe.id}`, {
                [`likedBy.${user.uid}`]: likedBy,
                likedByCount: firestore.FieldValue.increment(1)
            })
            await firestore.set(`recipe_likes/${recipe.id}_${user.uid}`, {
                recipeId: recipe.id,
                userUid: user.uid,
                createdAt: firestore.FieldValue.serverTimestamp()
            });
            toastr.success("Sukces", "Przepis został dodany do ulubionych");
        } catch (error) {
            console.log(error);
            toastr.error("Oops", "Nie udało się dodać przepisu do ulubionych");

        }
    }

export const removeFavRecipe = (recipe) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;

        if (!user) {
            toastr.warning("Ooops", "Coś poszło nie tak");
            return;
        }

        try {
            await firestore.update(`recipes/${recipe.id}`, {
                [`likedBy.${user.uid}`]: firestore.FieldValue.delete(),
                likedByCount: firestore.FieldValue.increment(-1)

            });
            await firestore.delete(`recipe_likes/${recipe.id}_${user.uid}`);
            toastr.success("Sukces", "Przepis został usunięty z ulubionych");
        } catch (error) {
            console.log(error);
            toastr.error("Oops", "Nie udało się usunąć przepisu z ulubionych");
        }

    }
