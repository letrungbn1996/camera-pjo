import React from 'react'
import { FCProps } from '../../types/Props'
import css from './MessageIcon.module.scss'

export const ArrowLeftIcon = () => {
    return (
        <>
            <img src="/img/message/icon_arrow_left.svg" alt="" />
        </>
    )
}

export const ChatAvatarIcon = () => {
    return (
        <>
            <img src="/img/message/avatar_pharmacist.svg" alt="" />
        </>
    )
}

export const ChatTelBigIconWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.chatTelBigBg}>{children}</div>
        </>
    )
}
