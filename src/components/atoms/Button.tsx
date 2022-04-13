import React from 'react'
import Link from 'next/link'
import { AnchorProps, LinkProps, ButtonProps } from '../../types/Props'
import { CircularProgress } from '@mui/material'
import css from './Button.module.scss'

type HeaderBurgerButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const HeaderBurgerButton = ({ onClick }: HeaderBurgerButtonProps) => {
    return (
        <Link href="#">
            <a className={css.burger} onClick={onClick}>
                <span className={css.burgerTop}></span>
                <span className={css.burgerMid}></span>
                <span className={css.burgerBtm}></span>
            </a>
        </Link>
    )
}

export const HeaderUserButton = ({ children, onClick }: AnchorProps) => {
    return (
        <Link href="#">
            <a className={css.headerUser} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const DrawerCloseButton = ({ children, onClick }: AnchorProps) => {
    return (
        <Link href="#">
            <a className={css.drawerClose} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const ChangeButton = ({ children, onClick }: AnchorProps) => {
    return (
        <Link href="#">
            <a className={css.changeBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const HomeNavButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.homeNavBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

type ChatBigButtonProps = {
    app?: string
} & LinkProps

export const ChatBigButton = ({
    href,
    children,
    onClick,
    app = 'LINQ',
}: ChatBigButtonProps) => {
    return (
        <Link href={href}>
            <a className={`${css.chatBigBtn} ${css[app]}`} onClick={onClick}>
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

export const SelectButton = ({ children, onClick }: AnchorProps) => {
    return (
        <Link href="#">
            <a className={css.selectBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

type PharmacyNavButtonProps = {
    active?: boolean
} & LinkProps

export const PharmacyNavButton = ({
    href,
    children,
    active = false,
    onClick,
}: PharmacyNavButtonProps) => {
    return (
        <Link href={href}>
            <a
                className={
                    active
                        ? `${css.pharmacyNav}` + ' ' + `${css.active}`
                        : `${css.pharmacyNav}`
                }
                onClick={onClick}
            >
                {children}
            </a>
        </Link>
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

type SecondaryButtonProps = {
    external?: boolean
} & LinkProps

export const SecondaryButton = ({
    href,
    children,
    external = false,
    ...props
}: SecondaryButtonProps) => {
    return (
        <Link href={href}>
            {external ? (
                <a className={css.secondaryBtn} target="_blank" {...props}>
                    {children}
                </a>
            ) : (
                <a className={css.secondaryBtn} {...props}>
                    {children}
                </a>
            )}
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
                        <CircularProgress color={'primary'} size="32px" />
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

type PolicyButtonProps = {
    visited?: boolean
} & LinkProps

export const PolicyButton = ({
    href,
    children,
    onClick,
    visited = false,
}: PolicyButtonProps) => {
    return (
        <Link href={href}>
            <a
                className={
                    visited
                        ? `${css.policyBtn}` + ' ' + `${css.visited}`
                        : `${css.policyBtn}`
                }
                onClick={onClick}
            >
                {children}
            </a>
        </Link>
    )
}

export const RegisterFamilyButton = ({ href, children }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.registerFamilyBtn}>{children}</a>
        </Link>
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

export const CalendarBigButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.calendarBigBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

type ListButtonProps = {
    app?: string
} & LinkProps

export const ListButton = ({
    href,
    children,
    onClick,
    app = 'LINQ',
}: ListButtonProps) => {
    return (
        <Link href={href}>
            <a className={`${css.listBtn} ${css[app]}`} onClick={onClick}>
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

export const FamilyDetailButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.familyDetailBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const NavListButton = ({ children, ...props }: ButtonProps) => {
    return (
        <button {...props} className={css.navListBtn}>
            {children}
        </button>
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
                        <CircularProgress color={'primary'} size="24px" />
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
