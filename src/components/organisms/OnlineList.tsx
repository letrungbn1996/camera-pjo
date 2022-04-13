import React from 'react'
import Link from 'next/link'
import { FCProps, LinkProps } from '../../types/Props'
import css from './OnlineList.module.scss'

const OnlineList = ({ children }: FCProps) => {
    return <ul className={css.onlineList}>{children}</ul>
}

export const OnlineListItem = ({ children }: FCProps) => {
    return <li className={css.onlineListItem}>{children}</li>
}

export const OnlineHeader = ({ children }: FCProps) => {
    return <div className={css.onlineHeader}>{children}</div>
}

type OnlineHeaderLabelProps = {
    inactive?: boolean
} & FCProps

export const OnlineHeaderLabel = ({
    children,
    inactive = false,
}: OnlineHeaderLabelProps) => {
    return (
        <div
            className={
                inactive
                    ? `${css.onlineHeaderLabel} ${css.inactive}`
                    : css.onlineHeaderLabel
            }
        >
            {children}
        </div>
    )
}

export const OnlineLink = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.onlineLink} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export default OnlineList
