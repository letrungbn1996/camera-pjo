import React from 'react'
import { FCProps } from '../../types/Props'
import css from './PharmacyStatus.module.scss'

type PharmacyStatusProps = {
    status?: string
} & FCProps

export const PharmacyStatus = ({
    children,
    status = 'public',
}: PharmacyStatusProps) => {
    return (
        <div className={`${css.pharmacyStatus} ${css[status]}`}>{children}</div>
    )
}
