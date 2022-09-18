import { createContext } from "react";


interface PropsContext {
    sidemenuOpen: boolean,
    openSideMenu: () => void,
    closeSideMenu: () => void
}

export const UIContext = createContext({} as PropsContext)