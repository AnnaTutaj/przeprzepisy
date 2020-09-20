import sampleRecipes from "./sampleRecipes"

const delay = (ms) => {
    return new Promise (resolve => setTimeout(resolve, ms))
}

export const fetchSampleRecipes = () =>{
    return delay (1000).then(() =>{
        return Promise.resolve(sampleRecipes)
    })
}