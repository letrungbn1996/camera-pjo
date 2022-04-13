import React, { forwardRef } from 'react'
import { FCProps } from '../../types/Props'
import css from './Chat.module.scss'

const Chat = ({ children }: FCProps) => {
    return <div className={css.chat}>{children}</div>
}

type ChatMainProps = {
    style?: {
        height: string
    }
} & FCProps
export const ChatMain = ({ children, style }: ChatMainProps) => {
    return (
        <div className={css.chatMain} style={style}>
            {children}
        </div>
    )
}

type ChatMessageProps = {
    self?: boolean
} & FCProps

export const ChatMessage = ({ children, self = false }: ChatMessageProps) => {
    return (
        <div
            className={
                self
                    ? `${css.chatMessage} ${css.selfChatMessage}`
                    : `${css.chatMessage}`
            }
        >
            {children}
        </div>
    )
}

type ChatMessageLogoProps = {
    children?: React.ReactNode
}
export const ChatMessageLogo = ({ children }: ChatMessageLogoProps) => {
    return <div className={css.chatMessageLogo}>{children}</div>
}

export const ChatMessageLogoImage = ({ children }: FCProps) => {
    return <div className={css.chatMessageLogoImage}>{children}</div>
}

type ChatMessageAvatarProps = {
    children?: React.ReactNode
}
export const ChatMessageAvatar = ({ children }: ChatMessageAvatarProps) => {
    return <div className={css.ChatMessageAvatar}>{children}</div>
}

export const ChatMessageComment = ({ children }: FCProps) => {
    return <div className={css.chatMessageComment}>{children}</div>
}

export const ChatMessageCommentText = ({ children }: FCProps) => {
    return <div className={css.chatMessageCommentText}>{children}</div>
}

export const ChatMessageCommentTextTitle = ({ children }: FCProps) => {
    return <div className={css.chatMessageCommentTextTitle}>{children}</div>
}

export const ChatMessageCommentTextQuestion = ({ children }: FCProps) => {
    return <ul className={css.chatMessageCommentTextQuestion}>{children}</ul>
}

export const ChatMessageCommentDate = ({ children }: FCProps) => {
    return <div className={css.chatMessageCommentDate}>{children}</div>
}

type ChatBtmProps = React.HTMLProps<HTMLDivElement>
export const ChatBtm = forwardRef<HTMLDivElement, ChatBtmProps>(
    (props, ref) => {
        return (
            <div className={css.chatBtm} ref={ref}>
                {props.children}
            </div>
        )
    }
)

type ChatBtmInputProps = {
    wide: boolean
} & FCProps
export const ChatBtmInput = ({ children, wide }: ChatBtmInputProps) => {
    return (
        <div
            className={
                wide
                    ? `${css.chatBtmInput}` + ' ' + `${css.wide}`
                    : `${css.chatBtmInput}`
            }
        >
            {children}
        </div>
    )
}

type ChatBtmNavProps = {
    narrow: boolean
} & FCProps
export const ChatBtmNav = ({ children, narrow }: ChatBtmNavProps) => {
    return (
        <ul
            className={
                narrow
                    ? `${css.chatBtmNav}` + ' ' + `${css.narrow}`
                    : `${css.chatBtmNav}`
            }
        >
            {children}
        </ul>
    )
}

export default Chat
