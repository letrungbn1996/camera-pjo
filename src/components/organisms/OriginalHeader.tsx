import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
    HeaderHomeButton,
    CloseDialogButton,
    NextDialogButton,
} from '../atoms/OriginalButton'
import { ArrowLeftIcon } from '../atoms/OriginalIcon'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../organisms/DialogMain'
import css from './Header.module.scss'

type Props = {
    title: string
    prevURL: string
    prevDialog?: boolean
    isHomeBtn?: boolean
}

type HeaderBackProps = {
    prevURL: string
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const HeaderBack = ({ prevURL, onClick }: HeaderBackProps) => {
    const router = useRouter()

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

const OriginalHeader = ({
    title,
    prevURL,
    prevDialog = false,
    isHomeBtn = false,
}: Props) => {
    const router = useRouter()
    const [openDialog, setOpenDialog] = useState(false)
    const [openBackDialog, setOpenBackDialog] = useState(false)

    const onHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenDialog(true)
    }
    const onBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        // 戻るボタンを押したときに確認ダイアログを表示
        if (prevDialog) {
            setOpenBackDialog(true)
        } else {
            router.back()
        }
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
            <Dialog
                open={openBackDialog}
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
                    <DialogMainText>前の画面へ移動しますか？</DialogMainText>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() => {
                                    setOpenBackDialog(false)
                                }}
                            >
                                キャンセル
                            </CloseDialogButton>
                        </li>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    router.back()
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

export default OriginalHeader
