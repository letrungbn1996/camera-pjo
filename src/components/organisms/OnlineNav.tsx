import React from 'react'
import { FCProps } from '../../types/Props'
import css from './OnlineNav.module.scss'

const OnlineNav = ({ children }: FCProps) => {
    return <ul className={css.onlineNav}>{children}</ul>
}

export const OnlineLead = ({ children }: FCProps) => {
    return <div className={css.onlineLead}>{children}</div>
}

export const OnlineLeadText = ({ children }: FCProps) => {
    return <div className={css.onlineLeadText}>{children}</div>
}

type OnlineLeadLabelProps = {
    inactive?: boolean
} & FCProps

export const OnlineLeadLabel = ({
    children,
    inactive = false,
}: OnlineLeadLabelProps) => {
    return (
        <div
            className={
                inactive
                    ? `${css.onlineLeadLabel} ${css.inactive}`
                    : css.onlineLeadLabel
            }
        >
            {children}
        </div>
    )
}

export default OnlineNav
