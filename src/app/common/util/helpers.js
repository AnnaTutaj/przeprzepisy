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
        createdByPictureURL: profile.pictureURL || '',
        createdAt: new Date(),
        likedBy: {},
        likedByCount: 0
    }
}

export const createDataTree = dataset => {
    let hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = { ...a, childNodes: [] });
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) {
            hashTable[a.parentId].childNodes.push(hashTable[a.id])
        }
        else dataTree.push(hashTable[a.id])
    });
    return dataTree
};