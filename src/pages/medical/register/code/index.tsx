import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Header from '../../../../components/organisms/Header'
import Initial, { InitialBtm } from '../../../../components/organisms/Initial'
import {
    PharmacyListItem,
    PharmacyListItemInner,
    PharmacyListImg,
    PharmacyListInfo,
    PharmacyListInfoName,
} from '../../../../components/organisms/PharmacyList'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainComment,
    DialogMainNav,
} from '../../../../components/organisms/DialogMain'
import {
    NextButton,
    NextDialogButton,
} from '../../../../components/atoms/Button'
import PinInput from 'react-pin-input'
import { Box } from '@mui/material'

const MedicalRegisterCodePage: React.FC = () => {
    const router = useRouter()
    const [isBtnActive, setBtnActive] = useState(false)
    const [openFinishDialog, setOpenFinishDialog] = useState(false)
    const [openErrorDialog, setOpenErrorDialog] = useState(false)
    let inputElm: any

    // エラー表示（trueにして確認）
    const [isCodeError, setCodeError] = useState(false)

    const onChangePin = (value: string) => {
        if (value.length >= 6) {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    }

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        // 登録コードの照合などの処理がはいる

        // isCodeError: true or false
        if (isCodeError) {
            setOpenErrorDialog(true)
        } else {
            // 【Aルート】ホーム、医療機関・薬局店舗登録追加より
            // 薬局の場合
            router.push('/medical/register/pharmacy/detail/pharmacy-id')
            // 医療機関の場合
            // router.push('/medical/register/hospital/detail/hospital-id')

            // 【Bルート】利用薬局追加より
            // setOpenFinishDialog(true)
        }
    }

    // もう一度登録コードの入力
    const onResetCode = () => {
        setOpenErrorDialog(false)
        inputElm.clear()
        setBtnActive(false)
        setCodeError(false)
    }

    return (
        <>
            <DefaultLayout>
                <Header
                    title="登録コード入力"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Initial>
                    <PinInput
                        length={6}
                        initialValue=""
                        secret
                        onChange={(value, index) => {
                            onChangePin(value)
                        }}
                        type="numeric"
                        inputMode="number"
                        onComplete={(value, index) => {}}
                        autoSelect={true}
                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        ref={(n) => (inputElm = n)}
                    />
                    <Box
                        sx={{
                            mt: '25px',
                            lineHeight: '24px',
                        }}
                    >
                        医療機関・薬局店舗の登録コードを入力してください。
                    </Box>
                    <InitialBtm>
                        <NextButton
                            href="#"
                            onClick={onSubmit}
                            disabled={!isBtnActive}
                        >
                            次へ
                        </NextButton>
                    </InitialBtm>
                </Initial>
            </DefaultLayout>
            <Dialog
                open={openFinishDialog}
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
                        利用薬局の追加が
                        <br />
                        完了しました。
                    </DialogMainText>
                    <Box
                        sx={{
                            mt: '20px',
                            textAlign: 'left',
                        }}
                    >
                        <ul>
                            <PharmacyListItem>
                                <PharmacyListItemInner>
                                    <PharmacyListImg>
                                        <img
                                            src="/img/pharmacy/thumb_001.jpg"
                                            alt=""
                                        />
                                    </PharmacyListImg>
                                    <PharmacyListInfo>
                                        <PharmacyListInfoName>
                                            メディエイド薬局 神田店
                                        </PharmacyListInfoName>
                                    </PharmacyListInfo>
                                </PharmacyListItemInner>
                            </PharmacyListItem>
                        </ul>
                    </Box>
                    <DialogMainNav>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    router.push('/my-pharmacy')
                                }}
                            >
                                OK
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
            <Dialog
                open={openErrorDialog}
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
                        医療機関・薬局店舗の登録に
                        <br />
                        失敗しました。
                    </DialogMainText>
                    <DialogMainComment>
                        登録コードが間違っているようです。
                        <br />
                        登録コードをご確認の上、もう一度お試しください。
                    </DialogMainComment>
                    <DialogMainNav>
                        <li>
                            <NextDialogButton onClick={onResetCode}>
                                OK
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default MedicalRegisterCodePage
