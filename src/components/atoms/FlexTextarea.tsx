import React from 'react'
import { FCProps } from '../../types/Props'
import css from './FlexTextarea.module.scss'

export const FlexTextarea = ({ children }: FCProps) => {
    return <div className={css.flexTextarea}>{children}</div>
}

export const FlexTextareaDummy = ({ children }: FCProps) => {
    return (
        <div className={css.flexTextareaDummy} aria-hidden="true">
            {children}
        </div>
    )
}
