import React, { Children } from 'react'
import { NextDialogButton } from '../atoms/Button'
import { NextDialogButton as OriginalNextDialogButton } from '../atoms/OriginalButton'
import { Box, Dialog } from '@mui/material'
import DialogMain, { DialogMainText, DialogMainNav } from './DialogMain'
import {
    PharmacyListItem,
    PharmacyListItemInner,
    PharmacyListImg,
    PharmacyListInfo,
    PharmacyListInfoName,
} from './PharmacyList'

type Props = {
    children: any
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<any>>
    onSubmit: () => void
    isOriginal: boolean
}

const PharmacyRegisteredDialog = ({
    children,
    isOpen,
    setOpen,
    onSubmit,
    isOriginal,
}: Props) => {
    return (
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
                <DialogMainText>{children}</DialogMainText>
                <DialogMainNav>
                    <li>
                        {isOriginal ? (
                            <OriginalNextDialogButton
                                onClick={() => {
                                    setOpen(false)
                                    onSubmit()
                                }}
                            >
                                OK
                            </OriginalNextDialogButton>
                        ) : (
                            <NextDialogButton
                                onClick={() => {
                                    setOpen(false)
                                    onSubmit()
                                }}
                            >
                                OK
                            </NextDialogButton>
                        )}
                    </li>
                </DialogMainNav>
            </DialogMain>
        </Dialog>
    )
}
export default PharmacyRegisteredDialog
