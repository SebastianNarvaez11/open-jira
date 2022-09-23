import { createContext } from "react";


interface PropsContext {
    sidemenuOpen: boolean,
    isAddingEntry : boolean
    isDragging: boolean,
    // Methods
    openSideMenu: () => void,
    closeSideMenu: () => void,
    setIsAddingEntry: (value: boolean) => void,
    setIsDragging: (value: boolean) => void
}

export const UIContext = createContext({} as PropsContext)