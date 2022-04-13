import React from 'react'
import Link from 'next/link'
import { LinkProps, ButtonProps } from '../../types/Props'
import css from './MessageButton.module.scss'

export const MessageButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.messageBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const ChatTelBigButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.chatTelBigBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const ChatAnswerButton = ({ children, onClick }: ButtonProps) => {
    return (
        <button className={css.chatAnswerButton} onClick={onClick}>
            {children}
        </button>
    )
}
