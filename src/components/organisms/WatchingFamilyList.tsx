import React from 'react'
import { FCProps } from '../../types/Props'
import css from './WatchingFamilyList.module.scss'

const WatchingFamilyList = ({ children }: FCProps) => {
    return <ul className={css.watchingFamilyList}>{children}</ul>
}

export const WatchingFamilyListItem = ({ children }: FCProps) => {
    return <li className={css.watchingFamilyListItem}>{children}</li>
}

export const WatchingFamilyListItemInner = ({ children }: FCProps) => {
    return <div>{children}</div>
}

export const WatchingFamilyListItemOption = ({ children }: FCProps) => {
    return <div className={css.watchingFamilyListItemOption}>{children}</div>
}

export default WatchingFamilyList
