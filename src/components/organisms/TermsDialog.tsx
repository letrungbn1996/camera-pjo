import React from 'react'
import { FCProps } from '../../types/Props'
import css from './TermsDialog.module.scss'

type TermsDialogProps = {
    isOpen: boolean
} & FCProps

const TermsDialog = ({ children, isOpen }: TermsDialogProps) => {
    return (
        <div
            className={
                isOpen
                    ? `${css.termsDialog}` + ' ' + `${css.fadeIn}`
                    : `${css.termsDialog}`
            }
        >
            {children}
        </div>
    )
}

export const TermsDialogMain = ({ children }: FCProps) => {
    return (
        <div className={css.termsDialogMain}>
            <div className={css.termsDialogMainInner}>{children}</div>
        </div>
    )
}

export const TermsDialogMainNav = ({ children }: FCProps) => {
    return <div className={css.termsDialogMainNav}>{children}</div>
}

export default TermsDialog
