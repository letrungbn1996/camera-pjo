import React from 'react'
import { FCProps } from '../../types/Props'
import css from './ImageDialog.module.scss'

type ImageDialogProps = {
    isOpen: boolean
} & FCProps

const ImageDialog = ({ children, isOpen }: ImageDialogProps) => {
    return (
        <div
            className={
                isOpen
                    ? `${css.imageDialog}` + ' ' + `${css.fadeIn}`
                    : `${css.imageDialog}`
            }
        >
            {children}
        </div>
    )
}

export const ImageDialogMain = ({ children }: FCProps) => {
    return (
        <div className={css.imageDialogMain}>
            <div className={css.imageDialogMainInner}>{children}</div>
        </div>
    )
}

export const ImageDialogMainNav = ({ children }: FCProps) => {
    return <div className={css.imageDialogMainNav}>{children}</div>
}

export default ImageDialog
