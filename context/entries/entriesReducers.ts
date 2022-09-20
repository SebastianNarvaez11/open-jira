import { EntriesState } from "./";

type EntriesActionType =
    | { type: 'xxx' }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        // case value:
            
        //     break;
    
        default:
            return state;
    }
}