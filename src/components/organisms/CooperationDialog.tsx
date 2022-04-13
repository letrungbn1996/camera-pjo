import React from 'react'
import { NextDialogButton, TextLinkButton } from '../atoms/Button'
import {
    TextLinkButton as OriginalTextLinkButton,
    NextDialogButton as OriginalNextDialogButton,
} from '../../components/atoms/OriginalButton'
import { Box, Dialog } from '@mui/material'
import router from 'next/router'
import DialogMain, {
    DialogMainText,
    DialogMainComment,
    DialogMainAttention,
    DialogMainNav,
} from './DialogMain'

type Props = {
    isOpen: boolean
    isInitialRegister: boolean
}

const CooperationDialog = ({ isOpen, isInitialRegister }: Props) => {
    const onDisagree = () => {
        if (isInitialRegister) {
            router.push('finish/all')
        } else {
            router.push('/my-pharmacy')
        }
    }
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
                <DialogMainText>
                    登録した利用薬局と
                    <br />
                    本アプリを連携しますか？
                </DialogMainText>
                <DialogMainComment>
                    薬局と連携すると、今後、お薬情報が自動的に登録されます。
                    <br />
                    ※薬局との連携を行うには、連携を行う利用薬局店舗に直接行く必要があります。
                </DialogMainComment>
                <DialogMainAttention>
                    ※過去のお薬情報については以下の3つの方法から選択できます。
                    <br />
                    お申し出がない場合は&#9312;にてデータを連携のご準備をします。
                    <br />
                    &#9312;過去1年間分
                    <br />
                    &#9313;過去の任意期間（全期間も可能）
                    <br />
                    &#9314;あんしんお薬手帳データの移行
                </DialogMainAttention>
                <Box
                    sx={{
                        mt: '20px',
                        textAlign: 'center',
                    }}
                >
                    {isInitialRegister ? (
                        <TextLinkButton
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                onDisagree()
                            }}
                        >
                            いいえ（あとで登録する）
                        </TextLinkButton>
                    ) : (
                        <OriginalTextLinkButton
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                onDisagree()
                            }}
                        >
                            いいえ（あとで登録する）
                        </OriginalTextLinkButton>
                    )}
                </Box>
                <DialogMainNav>
                    <li>
                        {isInitialRegister ? (
                            <NextDialogButton
                                onClick={() => {
                                    router.push('/register/cooperation')
                                }}
                            >
                                はい
                            </NextDialogButton>
                        ) : (
                            <OriginalNextDialogButton
                                onClick={() => {
                                    router.push('/register/cooperation')
                                }}
                            >
                                はい
                            </OriginalNextDialogButton>
                        )}
                    </li>
                </DialogMainNav>
            </DialogMain>
        </Dialog>
    )
}
export default CooperationDialog
