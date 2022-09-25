import { FC, PropsWithChildren, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { entriesReducer, EntriesContext } from '.'
import { Entry } from '../../interfaces'


export interface EntriesState {
    entries: Entry[]
}



const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: []
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {


    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)



    const addNewEntry = (description: string) => {

        const newEntry: Entry = {
            _id: uuidv4(),
            createdAt: Date.now(),
            status: 'pending',
            description: description
        }

        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry })
    }


    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] - Update Entry', payload: entry })
    }



    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>

    )
}
