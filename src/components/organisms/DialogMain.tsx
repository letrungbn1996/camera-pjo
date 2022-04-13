import React from 'react'
import { FCProps } from '../../types/Props'
import css from './DialogMain.module.scss'

const DialogMain = ({ children }: FCProps) => {
    return <div className={css.dialog}>{children}</div>
}

export const DialogMainText = ({ children }: FCProps) => {
    return <div className={css.dialogText}>{children}</div>
}

export const DialogMainComment = ({ children }: FCProps) => {
    return <div className={css.dialogComment}>{children}</div>
}

export const DialogMainAttention = ({ children }: FCProps) => {
    return <div className={css.dialogAttention}>{children}</div>
}

export const DialogErrorText = ({ children }: FCProps) => {
    return <div className={css.dialogError}>{children}</div>
}

export const DialogMainNav = ({ children }: FCProps) => {
    return <ul className={css.dialogNav}>{children}</ul>
}

export const DialogMainLoading = ({ children }: FCProps) => {
    return <div className={css.dialogLoading}>{children}</div>
}

export const DialogMainList = ({ children }: FCProps) => {
    return <ul className={css.dialogList}>{children}</ul>
}

export const DialogLongText = ({ children }: FCProps) => {
    return <div className={css.dialogLongText}>{children}</div>
}

export default DialogMain
