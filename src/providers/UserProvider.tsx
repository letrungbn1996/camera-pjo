import { createContext, useState, useEffect } from 'react'
import { FCProps } from '../types/Props'

export const UserContext = createContext({
    userAgent: '',
})

const getMobile = () => {
    const ua = navigator.userAgent
    if (/android/i.test(ua)) {
        return 'android'
    } else if (/ipad|iphone|ipod/i.test(ua)) {
        return 'ios'
    }
    return 'other'
}

export const UserProvider = ({ children }: FCProps) => {
    const [userAgent, setUserAgent] = useState('')
    useEffect(() => {
        setUserAgent(getMobile())
    }, [])
    return (
        <UserContext.Provider value={{ userAgent }}>
            {children}
        </UserContext.Provider>
    )
}
