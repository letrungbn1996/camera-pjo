import React from 'react'
import Link from 'next/link'
import { FCProps, LinkProps, ButtonProps } from '../../types/Props'
import css from './OnlineButton.module.scss'

export const HeaderOnlineAddButton = ({
    href,
    children,
    onClick,
}: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.headerOnlineAddBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

type OnlineNavButtonProps = {
    active?: boolean
} & LinkProps

export const OnlineNavButton = ({
    href,
    children,
    active = false,
    onClick,
}: OnlineNavButtonProps) => {
    return (
        <Link href={href}>
            <a
                className={
                    active
                        ? `${css.onlineNav} ${css.active}`
                        : `${css.onlineNav}`
                }
                onClick={onClick}
            >
                {children}
            </a>
        </Link>
    )
}

export const CountDownButton = ({ children }: FCProps) => {
    return <div className={css.countDownBtn}>{children}</div>
}

export const VideoNavButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.videoNavBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

type PharmacySelectButtonProps = {
    selected?: boolean
} & LinkProps

export const PharmacySelectButton = ({
    href,
    children,
    onClick,
    selected = false,
}: PharmacySelectButtonProps) => {
    return (
        <>
            {selected ? (
                <div className={css.pharmacySelectBtn}>{children}</div>
            ) : (
                <Link href={href}>
                    <a className={css.pharmacySelectBtn} onClick={onClick}>
                        {children}
                    </a>
                </Link>
            )}
        </>
    )
}

export const UnregisteredButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.unregisteredBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

type CalendarPreviousButtonProps = {
    disabled?: boolean
} & LinkProps

export const CalendarPreviousButton = ({
    href,
    children,
    disabled = false,
    onClick,
}: CalendarPreviousButtonProps) => {
    return (
        <>
            {disabled ? (
                <div className={`${css.calendarPreviousBtn} disabled`}>
                    {children}
                </div>
            ) : (
                <Link href={href}>
                    <a className={css.calendarPreviousBtn} onClick={onClick}>
                        {children}
                    </a>
                </Link>
            )}
        </>
    )
}

export const CalendarNextButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.calendarNextBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const TimetableButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.timetableBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const DeleteImageButton = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.deleteImageBtn} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}
