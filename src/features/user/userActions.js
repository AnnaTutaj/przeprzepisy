import { toastr } from "react-redux-toastr";

export const updateProfile = (user) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        //usuniecie niepotrzebnych pól z formularza
        const {isLoaded, isEmpty, ...updatedUser} = user;

        try {
            await firebase.updateProfile(updatedUser);
            toastr.success("Sukces!", "Twój profil został zaktualizowany");
        }
        catch (error) {
         
        }
    }

}