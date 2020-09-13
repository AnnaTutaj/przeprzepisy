import { createReducer } from "../../app/common/util/reducerUtils";
import { CREATE_RECIPE, DELETE_RECIPE, UPDATE_RECIPE } from "./recipeConstants";

const initialState = [
    {
        id: "1",
        title: "Przepyszne Babeczki",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt.",
        createdBy: "Jan Kowalski",
        pictureURL: "https://source.unsplash.com/collection/190727/300x200",
        likedBy: [
            {
                id: "1",
                name: "Anna",
                pictureURL: "https://randomuser.me/api/portraits/women/40.jpg",
            },
            {
                id: "2",
                name: "Jolie",
                pictureURL: "https://randomuser.me/api/portraits/women/42.jpg",
            },
        ],
    },
    {
        id: "2",
        title: "Sałatka owocowa",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt.",
        createdBy: "Jan Nowak",
        pictureURL: "https://source.unsplash.com/collection/190727/300x200",
        likedBy: [
            {
                id: "a",
                name: "Anna",
                pictureURL: "https://randomuser.me/api/portraits/women/40.jpg",
            },
        ],
    },
    {
        id: "3",
        title: "Grillowany łosoś",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt.",
        createdBy: "Julia Kowalska",
        pictureURL: "https://source.unsplash.com/collection/190727/300x200",
        likedBy: [
            {
                id: "1",
                name: "Anna",
                pictureURL: "https://randomuser.me/api/portraits/women/40.jpg",
            },
            {
                id: "2",
                name: "Jolie",
                pictureURL: "https://randomuser.me/api/portraits/women/42.jpg",
            },
        ],
    },
    {
        id: "4",
        title: "Tonkotsu ramen",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt.",
        createdBy: "Katarzyna Nowak",
        pictureURL: "https://source.unsplash.com/collection/190727/300x200",
        likedBy: [
            {
                id: "1",
                name: "Anna",
                pictureURL: "https://randomuser.me/api/portraits/women/40.jpg",
            },
            {
                id: "2",
                name: "Jolie",
                pictureURL: "https://randomuser.me/api/portraits/women/42.jpg",
            },
        ],
    }

]

const createRecipe = (state, payload) =>{
    return [ ...state, payload.recipe];
}

const updateRecipe = (state, payload) =>{
    return  [
        ...state.filter(recipe => recipe.id !== payload.recipe.id), payload.recipe
    ]
}

const deleteRecipe = (state, payload) =>{
    return  [
        ...state.filter(recipe => recipe.id !== payload.recipeId)
    ]
}

export default createReducer(initialState, {
    [CREATE_RECIPE]: createRecipe,
    [UPDATE_RECIPE]: updateRecipe,
    [DELETE_RECIPE]: deleteRecipe
});