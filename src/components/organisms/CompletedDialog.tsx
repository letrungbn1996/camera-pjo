import React, { Children } from 'react'
import { Dialog } from '@mui/material'
import { NextDialogButton } from '../atoms/Button'
import DialogMain, { DialogMainText, DialogMainNav } from './DialogMain'

type Props = {
    isOpen: boolean
    onAgree: () => void
    buttonText: string
    children: any
}

const CompletedDialog = ({ isOpen, onAgree, buttonText, children }: Props) => {
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
                        <NextDialogButton onClick={() => onAgree()}>
                            {buttonText}
                        </NextDialogButton>
                    </li>
                </DialogMainNav>
            </DialogMain>
        </Dialog>
    )
}
export default CompletedDialog
