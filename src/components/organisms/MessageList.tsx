import React from 'react'
import Link from 'next/link'
import { FCProps, LinkProps } from '../../types/Props'
import css from './MessageList.module.scss'

const MessageList = ({ children }: FCProps) => {
    return <div className={css.messageList}>{children}</div>
}

export const MessageSection = ({ children }: FCProps) => {
    return <section className={css.messageSection}>{children}</section>
}

export const MessageTitle = ({ children }: FCProps) => {
    return <div className={css.messageTitle}>{children}</div>
}

export const MessageBody = ({ children }: FCProps) => {
    return <div className={css.messageBody}>{children}</div>
}

export const MessageItem = ({ children }: FCProps) => {
    return <div className={css.messageItem}>{children}</div>
}

export const MessageItemHeader = ({ children }: FCProps) => {
    return <div className={css.messageItemHeader}>{children}</div>
}

export const MessageItemLink = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.messageItemLink} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export default MessageList
