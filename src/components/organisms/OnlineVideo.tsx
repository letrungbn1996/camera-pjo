import React from 'react'
import { FCProps } from '../../types/Props'
import css from './OnlineVideo.module.scss'

const OnlineVideo = ({ children }: FCProps) => {
    return <div className={css.onlineVideo}>{children}</div>
}

type OnlineVideoAnnounceProps = {
    initial: boolean
    fadeIn: boolean
    fadeOut: boolean
} & FCProps

export const OnlineVideoAnnounce = ({
    children,
    initial,
    fadeIn,
    fadeOut,
}: OnlineVideoAnnounceProps) => {
    return (
        <div
            className={(() => {
                if (initial) {
                    if (fadeIn) {
                        return `${css.onlineVideoAnnounce} ${css.initial} ${css.fadeIn}`
                    } else {
                        return `${css.onlineVideoAnnounce} ${css.initial}`
                    }
                } else if (fadeOut) {
                    return `${css.onlineVideoAnnounce} ${css.fadeOut}`
                } else {
                    return `${css.onlineVideoAnnounce}`
                }
            })()}
        >
            {children}
        </div>
    )
}

export const OnlineVideoPreview = ({ children }: FCProps) => {
    return <div className={css.onlineVideoPreview}>{children}</div>
}

export const OnlineVideoCamera = ({ children }: FCProps) => {
    return <div className={css.onlineVideoCamera}>{children}</div>
}

export const OnlineVideoNav = ({ children }: FCProps) => {
    return <ul className={css.onlineVideoNav}>{children}</ul>
}

export const OnlineVideoCall = ({ children }: FCProps) => {
    return <div className={css.onlineVideoCall}>{children}</div>
}

export const VideoCallText = ({ children }: FCProps) => {
    return <div className={css.videoCallText}>{children}</div>
}

export const CallVideo = ({ children }: FCProps) => {
    return <div className={css.callVideo}>{children}</div>
}

export const TitleCallVideo = ({ children }: FCProps) => {
    return <p className={css.titleCallVideo}>{children}</p>
}

export const LabelCallVideo = ({ children }: FCProps) => {
    return <p className={css.labelCallVideo}>{children}</p>
}

export default OnlineVideo
