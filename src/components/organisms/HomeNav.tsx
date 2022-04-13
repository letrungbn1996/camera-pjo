import React from 'react'
import { FCProps } from '../../types/Props'
import css from './HomeNav.module.scss'

const HomeNav = ({ children }: FCProps) => {
    return <div className={css.nav}>{children}</div>
}

export const HomeNavHeader = ({ children }: FCProps) => {
    return <div className={css.navHeader}>{children}</div>
}

export const HomeNavBody = ({ children }: FCProps) => {
    return <div className={css.navBody}>{children}</div>
}

export const NavItem = ({ children }: FCProps) => {
    return <div className={css.navItem}>{children}</div>
}

export default HomeNav
