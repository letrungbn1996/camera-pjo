import React from 'react'
import { FCProps } from '../../types/Props'
import css from './PharmacyList.module.scss'

const PharmacyList = ({ children }: FCProps) => {
    return <ul className={css.pharmacyList}>{children}</ul>
}

export const PharmacyListItem = ({ children }: FCProps) => {
    return <li className={css.pharmacyItem}>{children}</li>
}

export const PharmacyListBadge = ({ children }: FCProps) => {
    return <div className={css.pharmacyBadge}>{children}</div>
}

export const PharmacyListItemInner = ({ children }: FCProps) => {
    return <div className={css.pharmacyItemInner}>{children}</div>
}

export const PharmacyListItemWideInner = ({ children }: FCProps) => {
    return <div className={css.pharmacyItemWideInner}>{children}</div>
}

export const PharmacyListImg = ({ children }: FCProps) => {
    return <div className={css.pharmacyImg}>{children}</div>
}

export const PharmacyListImgLabel = ({ reception }: { reception: string }) => {
    return (
        <div
            className={`${css.pharmacyImgLabel} ${
                css['reception-' + reception]
            }`}
        />
    )
}

export const PharmacyListInfo = ({ children }: FCProps) => {
    return <div className={css.pharmacyInfo}>{children}</div>
}

export const PharmacyListInfoName = ({ children }: FCProps) => {
    return <div className={css.pharmacyInfoName}>{children}</div>
}

export const PharmacyListInfoNameWithBadge = ({ children }: FCProps) => {
    return <div className={css.pharmacyInfoNameWithBadge}>{children}</div>
}

export const PharmacyListInfoText = ({ children }: FCProps) => {
    return <div className={css.pharmacyInfoText}>{children}</div>
}

export const PharmacyListInfoLink = ({ children }: FCProps) => {
    return <ul className={css.pharmacyInfoLink}>{children}</ul>
}

export const PharmacyListInfoDate = ({ children }: FCProps) => {
    return <div className={css.pharmacyInfoDate}>{children}</div>
}

type PharmacyInfoWindowProps = {
    isOpen: boolean
} & FCProps
export const PharmacyInfoWindow = ({
    children,
    isOpen,
}: PharmacyInfoWindowProps) => {
    return (
        <div
            className={
                isOpen
                    ? `${css.pharmacyInfoWindow}` + ' ' + `${css.fadeIn}`
                    : `${css.pharmacyInfoWindow}`
            }
        >
            {children}
        </div>
    )
}

export const PharmacyInfoWindowNav = ({ children }: FCProps) => {
    return <div className={css.pharmacyInfoWindowNav}>{children}</div>
}

export default PharmacyList
