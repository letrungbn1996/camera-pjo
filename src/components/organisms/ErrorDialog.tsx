import React, { useState, useContext } from 'react'
import {
    HeaderHomeButton,
    CloseDialogButton,
    NextDialogButton,
} from '../atoms/Button'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../organisms/DialogMain'

// type Props = {
//     title: string
//     prevURL: string
//     isHomeBtn?: boolean
// }

type Props = {
    isOpen?: boolean
    errorMessage: string
    setDialogOpen: React.Dispatch<React.SetStateAction<any>>
}

type Window = {
    webkit?: any
}

declare const window: Window
declare const request: any
declare const requestBackToPrevious: any

// const HeaderBack = ({ prevURL }: HeaderBackProps) => {
//     const router = useRouter()
//     const userInfo = useContext(UserContext)

//     const onHistoryBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
//         e.preventDefault()
//         router.back()
//     }

//     const onLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
//         e.preventDefault()
//         if (userInfo.userAgent === 'android') {
//             request.postMessage(JSON.stringify({ logout: null }))
//         } else {
//             window.webkit.messageHandlers.request.postMessage(
//                 JSON.stringify({ logout: null })
//             )
//         }
//     }

//     const onRootBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
//         e.preventDefault()
//         if (userInfo.userAgent === 'android') {
//             requestBackToPrevious.postMessage('')
//         } else {
//             window.webkit.messageHandlers.requestBackToPrevious.postMessage()
//         }
//     }

//     if (prevURL === 'back') {
//         return (
//             <Link href="#">
//                 <a className={css.backBtn} onClick={onHistoryBack}>
//                     <ArrowLeftIcon />
//                 </a>
//             </Link>
//         )
//     } else if (prevURL === 'logout') {
//         return (
//             <Link href="#">
//                 <a className={css.backBtn} onClick={onLogout}>
//                     <ArrowLeftIcon />
//                 </a>
//             </Link>
//         )
//     } else if (prevURL === 'root') {
//         return (
//             <Link href="#">
//                 <a className={css.backBtn} onClick={onRootBack}>
//                     <ArrowLeftIcon />
//                 </a>
//             </Link>
//         )
//     } else {
//         return (
//             <Link href={prevURL}>
//                 <a className={css.backBtn}>
//                     <ArrowLeftIcon />
//                 </a>
//             </Link>
//         )
//     }
// }

const errorDialog = ({
    isOpen = false,
    errorMessage,
    setDialogOpen,
}: // setDialogOpen,
Props) => {
    const [openDialog, setOpenDialog] = useState(isOpen)

    return (
        <>
            <Dialog
                open={isOpen}
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
                    <DialogMainText>{errorMessage}</DialogMainText>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() => {
                                    setDialogOpen(false)
                                }}
                            >
                                閉じる
                            </CloseDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default errorDialog
