import { combineReducers, createStore } from 'redux';
import stonksReducer from "./StonksReducer";
let reducers = combineReducers(
    {
        stonksScreen: stonksReducer,
    });

let store = createStore(reducers);

export default store;