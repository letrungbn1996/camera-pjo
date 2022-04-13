import React from 'react'
import { FCProps } from '../../types/Props'
import css from './OnlineInsurance.module.scss'

export const OnlineInsuranceView = ({ children }: FCProps) => {
    return <div className={css.onlineInsuranceView}>{children}</div>
}

export const OnlineInsuranceCamera = ({ children }: FCProps) => {
    return <div className={css.onlineInsuranceCamera}>{children}</div>
}

export const OnlineInsuranceCameraArea = ({ children }: FCProps) => {
    return <div className={css.onlineInsuranceCameraArea}>{children}</div>
}

export const OnlineInsuranceCameraAnnounce = ({ children }: FCProps) => {
    return <div className={css.onlineInsuranceCameraAnnounce}>{children}</div>
}

export const OnlineInsuranceCameraScope = () => {
    return (
        <div className={css.onlineInsuranceCameraScope}>
            <div className="lb"></div>
            <div className="rt"></div>
        </div>
    )
}
