import React from 'react'
import { FCProps } from '../../types/Props'
import css from './OnlinePayment.module.scss'

const OnlinePayment = ({ children }: FCProps) => {
    return <div className={css.onlinePayment}>{children}</div>
}

export const OnlinePaymentInput = ({ children }: FCProps) => {
    return <div className={css.onlinePaymentInput}>{children}</div>
}

export const OnlinePaymentSecurity = ({ children }: FCProps) => {
    return <div className={css.onlinePaymentSecurity}>{children}</div>
}

export default OnlinePayment
