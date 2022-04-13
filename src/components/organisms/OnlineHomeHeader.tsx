import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HeaderOnlineAddButton } from '../atoms/OnlineButton'
import { ArrowLeftIcon } from '../atoms/OriginalIcon'
import { OnlineAddIconWith } from '../atoms/OnlineIcon'
import css from './Header.module.scss'

type Props = {
    title: string
    prevURL: string
}

type HeaderBackProps = {
    prevURL: string
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const HeaderBack = ({ prevURL, onClick }: HeaderBackProps) => {
    if (prevURL === 'back') {
        return (
            <Link href="#">
                <a className={css.backBtn} onClick={onClick}>
                    <ArrowLeftIcon />
                </a>
            </Link>
        )
    } else {
        return (
            <Link href={prevURL}>
                <a className={css.backBtn}>
                    <ArrowLeftIcon />
                </a>
            </Link>
        )
    }
}

const OnlineHomeHeader = ({ title, prevURL }: Props) => {
    const router = useRouter()
    const onBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.back()
    }

    return (
        <>
            <header className={css.header}>
                <div className={css.inner}>
                    <div className={css.headerLeft}>
                        <HeaderBack prevURL={prevURL} onClick={onBack} />
                    </div>
                    <h1 className={css.title}>{title}</h1>
                    <div className={css.headerRight}>
                        <HeaderOnlineAddButton href="/online/application">
                            <OnlineAddIconWith>新規申込</OnlineAddIconWith>
                        </HeaderOnlineAddButton>
                    </div>
                </div>
            </header>
        </>
    )
}

export default OnlineHomeHeader
