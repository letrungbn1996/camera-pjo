import React from 'react'
import { FCProps } from '../../types/Props'
import css from './OnlineIcon.module.scss'

export const CalendarPreviousIcon = () => {
    return (
        <>
            <div className={css.calendarPrevious}>
                <img src="/img/icon_calendar_arrow_prev.svg" alt="" />
            </div>
        </>
    )
}

export const CalendarNextIcon = () => {
    return (
        <>
            <div className={css.calendarNext}>
                <img src="/img/icon_calendar_arrow_next.svg" alt="" />
            </div>
        </>
    )
}

export const OnlineAddIconWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.onlineAddBg}>{children}</div>
        </>
    )
}

export const PharmacyIconWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.pharmacyBg}>{children}</div>
        </>
    )
}

export const HangUpIconWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.hangUpBg}>{children}</div>
        </>
    )
}

export const CameraSwitchIconWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.cameraSwitchBg}>{children}</div>
        </>
    )
}

export const AcceptIconWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.acceptSwitchBg}>{children}</div>
        </>
    )
}
