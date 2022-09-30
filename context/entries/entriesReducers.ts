import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
    | { type: '[Entry] - Add-Entry', payload: Entry }
    | { type: '[Entry] - Update Entry', payload: Entry }
    | { type: '[Entry] - Fetch Entries', payload: Entry[] }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case '[Entry] - Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }

        case '[Entry] - Update Entry':
            return {
                ...state,
                entries: state.entries.map(entry => entry._id === action.payload._id ? entry = action.payload : entry)
            }

        case '[Entry] - Fetch Entries':
            return {
                ...state,
                entries: action.payload
            }

        default:
            return state;
    }
}