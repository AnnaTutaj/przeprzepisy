import { createReducer } from "../../app/common/util/reducerUtils"
import { ASYNC_ACTION_FERROR, ASYNC_ACTION_FINISH, ASYNC_ACTION_START } from "./asyncConstants"

const initialState = {
    loading: false
}

const asyncActionStarted = (state) => {
    return {
        ...state, loading: true
    }
}

const asyncActionFinished = (state) => {
    return {
        ...state, loading: false
    }
}

const asyncActionError = (state) => {
    return {
        ...state, loading: false
    }
}

export default createReducer(initialState, {
    [ASYNC_ACTION_START]: asyncActionStarted,
    [ASYNC_ACTION_FINISH]: asyncActionFinished,
    [ASYNC_ACTION_FERROR]: asyncActionError,
})

