import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ArrowLeftIcon } from '../atoms/MessageIcon'
import css from './Header.module.scss'

type Props = {
    title: string
    prevURL: string
}

type HeaderBackProps = {
    prevURL: string
}

const MessageHeaderBack = ({ prevURL }: HeaderBackProps) => {
    const router = useRouter()

    const onHistoryBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.back()
    }

    if (prevURL === 'back') {
        return (
            <Link href="#">
                <a className={css.backBtn} onClick={onHistoryBack}>
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

const MessageHeader = ({ title, prevURL }: Props) => {
    return (
        <>
            <header className={css.header}>
                <div className={css.inner}>
                    <div className={css.headerLeft}>
                        <MessageHeaderBack prevURL={prevURL} />
                    </div>
                    <h1 className={css.title}>{title}</h1>
                </div>
            </header>
        </>
    )
}

export default MessageHeader
