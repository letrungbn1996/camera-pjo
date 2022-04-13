import React from 'react'
import { FCProps } from '../../types/Props'
import css from './OnlineCalendar.module.scss'

const OnlineCalendar = ({ children }: FCProps) => {
    return <div className={css.onlineCalendar}>{children}</div>
}

export const OnlineCalendarHeader = ({ children }: FCProps) => {
    return <div className={css.onlineCalendarHeader}>{children}</div>
}

export const OnlineCalendarBody = ({ children }: FCProps) => {
    return <div className={css.onlineCalendarBody}>{children}</div>
}

export const OnlineCalendarWeek = ({ children }: FCProps) => {
    return <div className={css.onlineCalendarWeek}>{children}</div>
}

export const OnlineCalendarDate = ({ children }: FCProps) => {
    return <div className={css.onlineCalendarDate}>{children}</div>
}

export const OnlineCalendarTimetable = ({ children }: FCProps) => {
    return <div className={css.onlineCalendarTimetable}>{children}</div>
}

export default OnlineCalendar
