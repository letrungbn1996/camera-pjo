import React from 'react'
import { FCProps } from '../../types/Props'
import css from './Main.module.scss'

type MainProps = {
    bg?: string
    multiNav?: boolean
} & FCProps
const Main = ({
    children,
    bg = 'transparent',
    multiNav = false,
}: MainProps) => {
    return (
        <main
            className={
                multiNav
                    ? `${css.main} ${css[bg]} ${css.multiNav}`
                    : `${css.main} ${css[bg]}`
            }
        >
            {children}
        </main>
    )
}

export const HomeMain = ({ children }: FCProps) => {
    return <div className={css.home}>{children}</div>
}

export const MainBody = ({ children }: FCProps) => {
    return <div className={css.mainBody}>{children}</div>
}

export const MainLead = ({ children }: FCProps) => {
    return <div className={css.mainLead}>{children}</div>
}

export const MainBtm = ({ children }: FCProps) => {
    return <div className={css.mainBtm}>{children}</div>
}

export const MainBtn = ({ children }: FCProps) => {
    return <div className={css.mainBtn}>{children}</div>
}

export const MainFloat = ({ children }: FCProps) => {
    return <div className={css.mainFloat}>{children}</div>
}

export const DivButton = ({ children }: FCProps) => {
    return <div className={css.divBtn}>{children}</div>
}

export default Main
