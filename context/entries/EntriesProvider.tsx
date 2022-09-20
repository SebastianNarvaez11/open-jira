import { FC, PropsWithChildren, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { entriesReducer, EntriesContext } from '.'
import { Entry } from '../../interfaces'


export interface EntriesState {
    entries: Entry[]
}



const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: ' untur iure cum molestiae tempore asperiores consectetur distinctio adipisci incidunt repellendus fugit repellat saepe facere molestias',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description: 'Ir al supermercado y comprara tres manzanas',
            status: 'finished',
            createdAt: Date.now()
        }
    ]
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {


    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    return (
        <EntriesContext.Provider value={{
            ...state
        }}>
            {children}
        </EntriesContext.Provider>

    )
}
