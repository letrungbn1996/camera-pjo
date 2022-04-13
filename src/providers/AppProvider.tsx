import { createContext } from 'react'
import { FCProps } from '../types/Props'

export const AppContext = createContext({
    id: '',
})

export const AppProvider = ({ children }: FCProps) => {
    let id = ''
    if (process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA') {
        id = 'KHA'
    } else if (process.env.NEXT_PUBLIC_PRODUCT_ID === 'LINQ') {
        id = 'LINQ'
    } else {
        id = 'LINQ'
    }
    return <AppContext.Provider value={{ id }}>{children}</AppContext.Provider>
}
