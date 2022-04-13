import React, { useState, useContext } from 'react'
import { UserContext } from '../../providers/UserProvider'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FCProps } from '../../types/Props'
import {
    HeaderHomeButton,
    CloseDialogButton,
    NextDialogButton,
} from '../atoms/Button'
import { ArrowLeftIcon } from '../atoms/Icon'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../organisms/DialogMain'
import css from './Header.module.scss'

type Props = {
    title: string
    prevURL: string
    isHomeBtn?: boolean
}

type HeaderBackProps = {
    prevURL: string
}

type Window = {
    webkit?: any
}

declare const window: Window
declare const request: any
declare const requestBackToPrevious: any

const HeaderBack = ({ prevURL }: HeaderBackProps) => {
    const router = useRouter()
    const userInfo = useContext(UserContext)

    const onHistoryBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.back()
    }

    const onLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        if (userInfo.userAgent === 'android') {
            request.postMessage(JSON.stringify({ logout: null }))
        } else {
            window.webkit.messageHandlers.request.postMessage(
                JSON.stringify({ logout: null })
            )
        }
    }

    const onRootBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        if (userInfo.userAgent === 'android') {
            request.postMessage(
                JSON.stringify({ displayRegistrationMethod: null })
            )
        } else {
            window.webkit.messageHandlers.request.postMessage(
                JSON.stringify({ displayRegistrationMethod: null })
            )
        }
    }

    if (prevURL === 'back') {
        return (
            <Link href="#">
                <a className={css.backBtn} onClick={onHistoryBack}>
                    <ArrowLeftIcon />
                </a>
            </Link>
        )
    } else if (prevURL === 'logout') {
        return (
            <Link href="#">
                <a className={css.backBtn} onClick={onLogout}>
                    <ArrowLeftIcon />
                </a>
            </Link>
        )
    } else if (prevURL === 'root') {
        return (
            <Link href="#">
                <a className={css.backBtn} onClick={onRootBack}>
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

const Header = ({ title, prevURL, isHomeBtn = false }: Props) => {
    const router = useRouter()
    const [openDialog, setOpenDialog] = useState(false)

    const onHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenDialog(true)
    }

    return (
        <>
            <header className={css.header}>
                <div className={css.inner}>
                    <div className={css.headerLeft}>
                        {prevURL === 'home' ? (
                            <Link href="#">
                                <a className={css.backBtn} onClick={onHome}>
                                    <ArrowLeftIcon />
                                </a>
                            </Link>
                        ) : (
                            <HeaderBack prevURL={prevURL} />
                        )}
                    </div>
                    <h1 className={css.title}>{title}</h1>
                    <div className={css.headerRight}>
                        {isHomeBtn && (
                            <HeaderHomeButton onClick={onHome}>
                                ホーム
                            </HeaderHomeButton>
                        )}
                    </div>
                </div>
            </header>
            <Dialog
                open={openDialog}
                sx={{
                    '& .MuiBackdrop-root': {
                        background: 'rgba(0,0,0,0.8)',
                    },
                    '& .MuiDialog-paper': {
                        width: '100%',
                        margin: '16px',
                    },
                }}
            >
                <DialogMain>
                    <DialogMainText>ホーム画面へ移動しますか？</DialogMainText>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() => {
                                    setOpenDialog(false)
                                }}
                            >
                                キャンセル
                            </CloseDialogButton>
                        </li>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    router.push('/')
                                }}
                            >
                                OK
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export const HeaderStatus = ({ children }: FCProps) => {
    return <div className={`${css.status} header-status`}>{children}</div>
}

export default Header
