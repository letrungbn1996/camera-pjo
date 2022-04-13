import React from 'react'
import Link from 'next/link'
import { LinkProps, FCProps } from '../../types/Props'
import css from './PharmacyDetail.module.scss'

const PharmacyDetail = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetail}>{children}</div>
}

export const PharmacyDetailName = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetailName}>{children}</div>
}

export const PharmacyDetailHeader = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetailHeader}>{children}</div>
}

export const PharmacyDetailHeaderName = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetailHeaderName}>{children}</div>
}

export const PharmacyDetailHeaderDepartment = ({ children }: FCProps) => {
    return <ul className={css.pharmacyDetailHeaderDepartment}>{children}</ul>
}

export const PharmacyDetailHeaderInfo = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetailHeaderInfo}>{children}</div>
}

export const PharmacyDetailHeaderText = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetailHeaderText}>{children}</div>
}

export const PharmacyDetailHeaderLink = ({ children }: FCProps) => {
    return <ul className={css.pharmacyDetailHeaderLink}>{children}</ul>
}

export const PharmacyDetailAddress = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetailAddress}>{children}</div>
}

export const PharmacyDetailAddressText = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetailAddressText}>{children}</div>
}

export const PharmacyDetailAddressLink = ({ children }: FCProps) => {
    return <ul className={css.pharmacyDetailAddressLink}>{children}</ul>
}

export const PharmacyDetailBody = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetailBody}>{children}</div>
}

export const PharmacyDetailBtm = ({ children }: FCProps) => {
    return <ul className={css.pharmacyDetailBtm}>{children}</ul>
}

export const PharmacyDetailExternalLink = ({ href, children }: LinkProps) => {
    return (
        <Link href={href}>
            <a target="_blank" className={css.pharmacyDetailExternalLink}>
                {children}
            </a>
        </Link>
    )
}

type PharmacyDetailAccordionProps = {
    app?: string
} & FCProps

export const PharmacyDetailAccordion = ({
    children,
    app = 'LINQ',
}: PharmacyDetailAccordionProps) => {
    return (
        <div className={`${css.pharmacyDetailAccordion} ${css[app]}`}>
            {children}
        </div>
    )
}

export const PharmacyDetailAccordionTitle = ({
    href,
    children,
    onClick,
}: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.pharmacyDetailAccordionTitle} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const PharmacyDetailAccordionContent = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetailAccordionContent}>{children}</div>
}

export const PharmacyDetailShare = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetailShare}>{children}</div>
}

export const PharmacyDetailShareItem = ({ children }: FCProps) => {
    return <div className={css.pharmacyDetailShareItem}>{children}</div>
}

export default PharmacyDetail
