import React from 'react'
import { FCProps } from '../../types/Props'
import css from './OnlineBadge.module.scss'

export const OnlineBadge = ({ children }: FCProps) => {
    return <div className={css.onlineBadge}>{children}</div>
}
