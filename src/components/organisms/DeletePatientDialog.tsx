import React from 'react'
import { Dialog } from '@mui/material'
import { CloseDialogButton, NextDialogButton } from '../atoms/Button'
import DialogMain, { DialogMainText, DialogMainNav } from './DialogMain'
import router from 'next/router'

type PatientDetailProps = {
    birthday: string
    first_name: string
    first_name_kana: string
    gender: number
    last_name: string
    last_name_kana: string
    relationship: string
    lifepalette_id: string
    nickname: string
}

type Props = {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<any>>
    patientData: PatientDetailProps | null
    onDeleteFamily: () => void
    isCompleteDelete: boolean
}

const DeletePatientDialog = ({
    isOpen,
    setOpen,
    patientData,
    onDeleteFamily,
    isCompleteDelete,
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
                {isCompleteDelete ? (
                    <>
                        <DialogMainText>
                            {` ${patientData?.nickname}さんを削除しました。`}
                        </DialogMainText>
                        <DialogMainNav>
                            <li>
                                <NextDialogButton
                                    onClick={() => {
                                        router.push('/family')
                                    }}
                                >
                                    OK
                                </NextDialogButton>
                            </li>
                        </DialogMainNav>
                    </>
                ) : (
                    <>
                        <DialogMainText>
                            {`${patientData?.nickname}`}
                            さんを削除しますか？
                        </DialogMainText>
                        <DialogMainNav>
                            <li>
                                <CloseDialogButton
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                                >
                                    キャンセル
                                </CloseDialogButton>
                            </li>
                            <li>
                                <NextDialogButton
                                    onClick={() => onDeleteFamily()}
                                >
                                    削除する
                                </NextDialogButton>
                            </li>
                        </DialogMainNav>
                    </>
                )}
            </DialogMain>
        </Dialog>
    )
}
export default DeletePatientDialog
