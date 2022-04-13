import React from 'react'
import Link from 'next/link'
import { FCProps, LinkProps } from '../../types/Props'
import css from './OriginalBanner.module.scss'

const OriginalBanner = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.banner} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const OriginalBannerHeader = ({ children }: FCProps) => {
    return <div className={css.bannerHeader}>{children}</div>
}

export const OriginalBannerImage = ({ children }: FCProps) => {
    return <div className={css.bannerImage}>{children}</div>
}

export const OriginalBannerTitle = ({ children }: FCProps) => {
    return <div className={css.bannerTitle}>{children}</div>
}

export const OriginalBannerText = ({ children }: FCProps) => {
    return <div className={css.bannerText}>{children}</div>
}

export default OriginalBanner
