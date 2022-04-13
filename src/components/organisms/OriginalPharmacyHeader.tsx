import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HeaderMedicationButton } from '../atoms/OriginalButton'
import { ArrowLeftIcon } from '../atoms/OriginalIcon'
import css from './Header.module.scss'

type Props = {
    title: string
    prevURL: string
    isAddBtn?: boolean
}

type HeaderBackProps = {
    prevURL: string
}

const HeaderBack = ({ prevURL }: HeaderBackProps) => {
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

const PharmacyHeader = ({ title, prevURL, isAddBtn = false }: Props) => {
    return (
        <>
            <header className={css.header}>
                <div className={css.inner}>
                    <div className={css.headerLeft}>
                        <HeaderBack prevURL={prevURL} />
                    </div>
                    <h1 className={css.title}>{title}</h1>
                    <div className={css.headerRight}>
                        {isAddBtn && (
                            <HeaderMedicationButton href="/my-pharmacy/add">
                                薬局追加
                            </HeaderMedicationButton>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}

export default PharmacyHeader
