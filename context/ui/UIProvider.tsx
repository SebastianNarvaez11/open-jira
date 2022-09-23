import { FC, PropsWithChildren, useReducer } from "react"
import { UIContext, uiReducer } from "./"



export interface UIState {
    sidemenuOpen: boolean,
    isAddingEntry: boolean,
    isDragging: boolean
}

// ESTE ES EL ESTADO INICIAL
const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}


export const UIProvider: FC<PropsWithChildren> = ({ children }) => {


    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)



    const openSideMenu = () => {
        dispatch({ type: '[UI] - Open Sidebar' })
    }

    const closeSideMenu = () => {
        dispatch({ type: '[UI] - Close Sidebar' })
    }

    const setIsAddingEntry = (value: boolean) => {
        dispatch({ type: '[UI] - Set isAddingEntry', payload: value })
    }

    const setIsDragging = (value: boolean) => {
        dispatch({ type: "[UI] - Set IsDragging", payload: value })
    }


    return (
        <UIContext.Provider value={{
            ...state,

            //Methods
            openSideMenu,
            closeSideMenu,
            setIsAddingEntry,
            setIsDragging
        }}>
            {children}
        </UIContext.Provider>

    )
}
