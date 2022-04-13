import React from 'react'
import { FCProps } from '../../types/Props'
import css from './Initial.module.scss'

type InitialProps = {
    multiNav?: boolean
} & FCProps
const Initial = ({ children, multiNav = false }: InitialProps) => {
    return (
        <div
            className={
                multiNav ? `${css.initial} ${css.multiNav}` : css.initial
            }
        >
            {children}
        </div>
    )
}

export const InitialSection = ({ children }: FCProps) => {
    return <section className={css.initialSection}>{children}</section>
}

export const InitialLead = ({ children }: FCProps) => {
    return <p className={css.initialLead}>{children}</p>
}

export const InitialAttention = ({ children }: FCProps) => {
    return <p className={css.initialAttention}>{children}</p>
}

export const InitialCamera = ({ children }: FCProps) => {
    return <div className={css.initialCamera}>{children}</div>
}

export const InitialCameraArea = ({ children }: FCProps) => {
    return <div className={css.initialCameraArea}>{children}</div>
}

export const InitialBtm = ({ children }: FCProps) => {
    return <div className={css.initialBtm}>{children}</div>
}

export const InitialBtmCharacter = ({ children }: FCProps) => {
    return <div className={css.initialBtmCharacter}>{children}</div>
}

export const InitialFinishAnimation = ({ children }: FCProps) => {
    return (
        <div className={css.initialFinishAnimation}>
            <div className="animationInner">{children}</div>
        </div>
    )
}

export default Initial
