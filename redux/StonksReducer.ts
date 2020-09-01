import * as Actions from '../ts/actions';
import {StonkType} from "../ts/types";

export interface SetStonksInterface {
    type: Actions.SET_STONKS;
    stonks: StonkType[];
}

export interface SetNewStonkInterface {
    type: Actions.SET_NEW_STONK;
    stonk: StonkType;
}

export interface SetSelectedStonkInterface {
    type: Actions.SET_SELECTED_STONK;
    stonk: StonkType;
}

export type Action =
    | SetStonksInterface
    | SetNewStonkInterface
    | SetSelectedStonkInterface
    ;

export const setStonks = (stonks: StonkType[]): SetStonksInterface => ({
    type: Actions.SET_STONKS,
    stonks,
});
export const setNewStonk = (stonk: StonkType): SetNewStonkInterface => ({
    type: Actions.SET_NEW_STONK,
    stonk,
});
export const setSelectedStonk = (stonk: StonkType): SetSelectedStonkInterface => ({
    type: Actions.SET_SELECTED_STONK,
    stonk,
});

const initStonk: StonkType = {created_at: "", description: "", id: 0, summ: 0, title: ""};

const initState = {
    stonks: [],
    newStonk: {...initStonk},
    selectedStonk: {...initStonk}
};

const stonksReducer = (state = initState, action: Action) => {
    switch (action.type) {
        case Actions.SET_STONKS:
            return {
                ...state,
                stonks: action.stonks,
            };
        case Actions.SET_NEW_STONK: {
            return {
                ...state,
                newStonk: action.stonk
            }
        }
        case Actions.SET_SELECTED_STONK: {
            return {
                ...state,
                selectedStonk: action.stonk
            }
        }
        default:
            return state;
    }
};

export default stonksReducer;