import React from 'react'
import Link from 'next/link'
import { FCProps, LinkProps } from '../../types/Props'
import css from './HomeBanner.module.scss'

const HomeBanner = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.banner} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const HomeBannerHeader = ({ children }: FCProps) => {
    return <div className={css.bannerHeader}>{children}</div>
}

export const HomeBannerImage = ({ children }: FCProps) => {
    return <div className={css.bannerImage}>{children}</div>
}

export const HomeBannerTitle = ({ children }: FCProps) => {
    return <div className={css.bannerTitle}>{children}</div>
}

export const HomeBannerText = ({ children }: FCProps) => {
    return <div className={css.bannerText}>{children}</div>
}

export default HomeBanner
