import React from 'react'
import { Box, Dialog } from '@mui/material'
import { NextDialogButton } from '../atoms/Button'
import DialogMain, {
    DialogMainText,
    DialogMainComment,
    DialogMainNav,
} from './DialogMain'
import { RegistConfirm } from './OriginalRegist'
import Barcode from './Barcode'

type PatientProps = {
    lifepalette_id: string
    nickname: string
    patient_alias: string
    relationship: string | null
}

type Props = {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<any>>
    patientData: PatientProps
}

const PatientIdDialog = ({ isOpen, setOpen, patientData }: Props) => {
    return (
        <Dialog open={isOpen}>
            <DialogMain>
                <DialogMainText>ご家族情報</DialogMainText>
                <DialogMainComment>
                    薬局スタッフに以下のライフパレットIDをお伝えください。過去のお薬情報を登録します。
                </DialogMainComment>
                <Box
                    sx={{
                        mt: '20px',
                        textAlign: 'left',
                    }}
                >
                    <RegistConfirm>
                        <div className="label">ニックネーム</div>
                        <div className="confirm">
                            {patientData && patientData.nickname}
                        </div>
                    </RegistConfirm>
                    <RegistConfirm>
                        <div className="label">ライフパレットID</div>
                        <div className="confirm">
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {patientData && patientData.lifepalette_id && (
                                    <Barcode
                                        value={patientData.lifepalette_id}
                                    />
                                )}
                            </Box>
                        </div>
                    </RegistConfirm>
                </Box>
                <DialogMainNav>
                    <li>
                        <NextDialogButton
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            閉じる
                        </NextDialogButton>
                    </li>
                </DialogMainNav>
            </DialogMain>
        </Dialog>
    )
}
export default PatientIdDialog
