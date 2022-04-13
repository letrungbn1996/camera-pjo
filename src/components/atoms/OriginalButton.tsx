import React from 'react'
import Link from 'next/link'
import { AnchorProps, LinkProps, ButtonProps } from '../../types/Props'
import { CircularProgress } from '@mui/material'
import css from './OriginalButton.module.scss'

type TextLinkProps = {
    bold?: boolean
} & LinkProps

export const TextLink = ({
    href,
    children,
    bold = false,
    onClick,
}: TextLinkProps) => {
    return (
        <Link href={href}>
            <a
                className={
                    bold ? `${css.textLink} ${css.bold}` : `${css.textLink}`
                }
                onClick={onClick}
            >
                {children}
            </a>
        </Link>
    )
}

export const HeaderHomeButton = ({ children, onClick }: AnchorProps) => {
    return (
        <Link href="#">
            <a className={css.headerHome} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const HeaderMedicationButton = ({
    href,
    children,
    onClick,
}: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.headerMedicationBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const CloseDialogButton = ({ children, ...props }: ButtonProps) => {
    return (
        <button {...props} className={css.closeDialogBtn}>
            {children}
        </button>
    )
}

export const NextDialogButton = ({ children, ...props }: ButtonProps) => {
    return (
        <button {...props} className={css.nextDialogBtn}>
            {children}
        </button>
    )
}

type NextButtonProps = {
    disabled?: boolean
    size?: string
} & LinkProps

export const NextButton = ({
    href,
    children,
    disabled = false,
    size = 'large',
    ...props
}: NextButtonProps) => {
    return (
        <>
            {disabled ? (
                <div className={`${css.nextBtn} ${css.disabled}`}>
                    {children}
                </div>
            ) : (
                <Link href={href}>
                    <a className={`${css.nextBtn} ${css[size]}`} {...props}>
                        {children}
                    </a>
                </Link>
            )}
        </>
    )
}

type PharmacyNavButtonProps = {
    active?: boolean
    disabled?: boolean
} & LinkProps

export const PharmacyNavButton = ({
    href,
    children,
    active = false,
    disabled = false,
    onClick,
}: PharmacyNavButtonProps) => {
    return (
        <>
            {disabled ? (
                <div className={`${css.pharmacyNav} ${css.disabled}`}>
                    {children}
                </div>
            ) : (
                <Link href={href}>
                    <a
                        className={
                            active
                                ? `${css.pharmacyNav} ${css.active}`
                                : `${css.pharmacyNav}`
                        }
                        onClick={onClick}
                    >
                        {children}
                    </a>
                </Link>
            )}
        </>
    )
}

type FamilyNavButtonProps = {
    active?: boolean
} & LinkProps

export const FamilyNavButton = ({
    href,
    children,
    active = false,
    onClick,
}: FamilyNavButtonProps) => {
    return (
        <Link href={href}>
            <a
                className={
                    active
                        ? `${css.familyNav} ${css.active}`
                        : `${css.familyNav}`
                }
                onClick={onClick}
            >
                {children}
            </a>
        </Link>
    )
}

type SearchButtonProps = {
    disabled?: boolean
    loading?: boolean
} & LinkProps

export const SearchButton = ({
    href,
    children,
    disabled = false,
    loading = false,
    onClick,
}: SearchButtonProps) => {
    return (
        <>
            {disabled ? (
                <div className={`${css.searchBtn} ${css.disabled}`}>
                    {children}
                </div>
            ) : loading ? (
                <div className={css.searchBtn}>
                    <div className={css.loading}>
                        <CircularProgress color={'inherit'} size="24px" />
                    </div>
                    {children}
                </div>
            ) : (
                <Link href={href}>
                    <a className={css.searchBtn} onClick={onClick}>
                        {children}
                    </a>
                </Link>
            )}
        </>
    )
}

type TextLinkButtonProps = {
    disabled?: boolean
    size?: string
} & LinkProps
export const TextLinkButton = ({
    href,
    children,
    onClick,
    disabled = false,
    size = 'small',
}: TextLinkButtonProps) => {
    return (
        <>
            {disabled ? (
                <span
                    className={`${css.textLinkBtn} ${css[size]}` + ' disabled'}
                >
                    {children}
                </span>
            ) : (
                <Link href={href}>
                    <a
                        className={`${css.textLinkBtn} ${css[size]}`}
                        onClick={onClick}
                    >
                        {children}
                    </a>
                </Link>
            )}
        </>
    )
}

export const InfoCloseButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.infoCloseBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const TextButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.textBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const MapCurrentButton = ({ children, ...props }: ButtonProps) => {
    return (
        <button {...props} className={css.mapCurrentBtn}>
            {children}
        </button>
    )
}

export const MapSearchButton = ({ children, ...props }: ButtonProps) => {
    return (
        <button {...props} className={css.mapSearchBtn}>
            {children}
        </button>
    )
}

export const NavListButton = ({ children, ...props }: ButtonProps) => {
    return (
        <button {...props} className={css.navListBtn}>
            {children}
        </button>
    )
}

type SubmitButtonProps = {
    disabled?: boolean
    loading?: boolean
} & ButtonProps

export const SubmitButton = ({
    disabled = false,
    children,
    loading = false,
}: SubmitButtonProps) => {
    return (
        <>
            {disabled ? (
                <div className={`${css.nextBtn} ${css.disabled}`}>
                    {children}
                </div>
            ) : loading ? (
                <div className={css.submitBtn}>
                    <div className={css.loading}>
                        <CircularProgress color={'inherit'} size="32px" />
                    </div>
                    {children}
                </div>
            ) : (
                <button type="submit" className={css.submitBtn}>
                    {children}
                </button>
            )}
        </>
    )
}

type DeleteGroupButtonProps = {
    active?: boolean
} & LinkProps

export const DeleteGroupButton = ({
    href,
    children,
    onClick,
    active = false,
}: DeleteGroupButtonProps) => {
    return (
        <>
            <Link href={href}>
                <a
                    className={
                        active
                            ? `${css.deleteGroupBtn}` + ' active'
                            : `${css.deleteGroupBtn}`
                    }
                    onClick={onClick}
                >
                    {children}
                </a>
            </Link>
        </>
    )
}

export const NavListDetailButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.navListDetailBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

type StatusChangeButtonProps = {
    disabled?: boolean
} & LinkProps

export const StatusChangeButton = ({
    href,
    children,
    onClick,
    disabled = false,
}: StatusChangeButtonProps) => {
    return (
        <Link href={href}>
            <a
                className={
                    disabled
                        ? `${css.statusChangeBtn}` + ' disabled'
                        : `${css.statusChangeBtn}`
                }
                onClick={onClick}
            >
                {children}
            </a>
        </Link>
    )
}

export const ChatNavButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.chatNavBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const ChatThumbButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.chatThumbBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

type FamilyGroupButtonProps = {
    active?: boolean
    size?: string
} & ButtonProps

export const FamilyGroupButton = ({
    children,
    active = false,
    size = 'medium',
    ...props
}: FamilyGroupButtonProps) => {
    return (
        <button
            {...props}
            className={
                active
                    ? `${css.familyGroupBtn} ${css[size]}` + ' active'
                    : `${css.familyGroupBtn} ${css[size]}`
            }
        >
            {children}
        </button>
    )
}

type FamilyGroupButtonWithProps = {
    active?: boolean
    disabled?: boolean
} & ButtonProps

export const FamilyGroupButtonWith = ({
    children,
    active = false,
    disabled = false,
    ...props
}: FamilyGroupButtonWithProps) => {
    return (
        <>
            {disabled ? (
                <div
                    className={
                        active
                            ? `${css.familyGroupBtnWith}` +
                              ' active' +
                              ' disabled'
                            : `${css.familyGroupBtnWith}` + ' disabled'
                    }
                >
                    {children}
                </div>
            ) : (
                <button
                    {...props}
                    className={
                        active
                            ? `${css.familyGroupBtnWith}` + ' active'
                            : `${css.familyGroupBtnWith}`
                    }
                >
                    {children}
                </button>
            )}
        </>
    )
}

export const ReleaseButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.releaseBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

type PaginationButtonProps = {
    active?: boolean
} & LinkProps

export const PaginationButton = ({
    href,
    children,
    active = false,
    onClick,
}: PaginationButtonProps) => {
    return (
        <Link href={href}>
            <a
                className={
                    active
                        ? `${css.paginationBtn} ${css.active}`
                        : `${css.paginationBtn}`
                }
                onClick={onClick}
            >
                {children}
            </a>
        </Link>
    )
}
