import React from 'react'
import { FCProps } from '../../types/Props'
import css from './MapDialog.module.scss'

type MapDialogProps = {
    isOpen: boolean
} & FCProps

const MapDialog = ({ children, isOpen }: MapDialogProps) => {
    return (
        <div
            className={
                isOpen
                    ? `${css.mapDialog}` + ' ' + `${css.fadeIn}`
                    : `${css.mapDialog}`
            }
        >
            {children}
        </div>
    )
}

export const MapDialogMain = ({ children }: FCProps) => {
    return (
        <div className={css.mapDialogMain}>
            <div className={css.mapDialogMainInner}>{children}</div>
        </div>
    )
}

export const MapDialogMainNav = ({ children }: FCProps) => {
    return <div className={css.mapDialogMainNav}>{children}</div>
}

export default MapDialog
