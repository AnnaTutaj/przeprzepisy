export const objectToArray = (object) => {
    if (object) {
        return Object.entries(object).map(e => Object.assign({}, e[1], { id: e[0] }));
    }
}

export const createNewRecipe = (user, profile, recipe) => {
    return {
        ...recipe,
        createdByUid: user.uid,
        createdBy: profile.nick,
        createdByPictureURL: profile.pictureURL || 'assets/dummyUser.png',
        createdAt: new Date(),
        likedBy: {},
        likedByCount: 0
    }
}