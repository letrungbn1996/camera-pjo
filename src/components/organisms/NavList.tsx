import React from 'react'
import { FCProps } from '../../types/Props'
import css from './NavList.module.scss'

const NavList = ({ children }: FCProps) => {
    return <ul className={css.navList}>{children}</ul>
}

export const NavListItem = ({ children }: FCProps) => {
    return <li className={css.navListItem}>{children}</li>
}

export const NavListItemSelect = ({ children }: FCProps) => {
    return <div className={css.navListItemSelect}>{children}</div>
}

export const NavListItemLink = ({ children }: FCProps) => {
    return <div className={css.navListItemLink}>{children}</div>
}

export default NavList
