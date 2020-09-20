import { applyMiddleware, createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducers";
export const configStore = () =>{
  const middlewares = [thunk];
  const composedEnchancer = composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, composedEnchancer);

  return store;
}