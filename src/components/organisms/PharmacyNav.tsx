import React from 'react'
import { FCProps } from '../../types/Props'
import css from './PharmacyNav.module.scss'

const PharmacyNav = ({ children }: FCProps) => {
    return <ul className={css.pharmacyNav}>{children}</ul>
}

export const PharmacySearchNav = ({ children }: FCProps) => {
    return <div className={css.pharmacySearchNav}>{children}</div>
}

export const PharmacySearchLead = ({ children }: FCProps) => {
    return <div className={css.pharmacySearchLead}>{children}</div>
}

export const PharmacySearchConsole = ({ children }: FCProps) => {
    return <div className={css.pharmacySearchConsole}>{children}</div>
}

export const PharmacySearchConsoleSelect = ({ children }: FCProps) => {
    return <div className={css.pharmacySearchConsoleSelect}>{children}</div>
}

export const PharmacySearchConsoleInput = ({ children }: FCProps) => {
    return <div className={css.pharmacySearchConsoleInput}>{children}</div>
}

export const PharmacySearchConsoleInputText = ({ children }: FCProps) => {
    return <div className={css.pharmacySearchConsoleInputText}>{children}</div>
}

export const PharmacySearchConsoleInputNav = ({ children }: FCProps) => {
    return <div className={css.pharmacySearchConsoleInputNav}>{children}</div>
}

export default PharmacyNav
