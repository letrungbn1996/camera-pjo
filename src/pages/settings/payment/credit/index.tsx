import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../components/organisms/OriginalHeader'
import Main, {
    MainLead,
    MainBody,
    MainBtm,
} from '../../../../components/organisms/Main'
import OnlinePayment, {
    OnlinePaymentInput,
    OnlinePaymentSecurity,
} from '../../../../components/organisms/OnlinePayment'
import {
    RegistSection,
    RegistHeader,
    RegistBody,
} from '../../../../components/organisms/OriginalRegist'
import {
    NextButton,
    NextDialogButton,
} from '../../../../components/atoms/OriginalButton'
import { PaymentIconTitleWith } from '../../../../components/atoms/OriginalIcon'
import { Dialog, CircularProgress, Box } from '@mui/material'
import DialogMain, {
    DialogMainText,
    DialogErrorText,
    DialogMainLoading,
    DialogMainNav,
} from '../../../../components/organisms/DialogMain'
import formCss from '../../../../components/atoms/OriginalForm.module.scss'

const SettingsPaymentPage: React.FC = () => {
    const router = useRouter()
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
    const [isRegisterFinished, setRegisterFinished] = useState(false)
    const [isRegisterError, setRegisterError] = useState(false)

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setRegisterError(false)
        setOpenRegisterDialog(true)

        // 登録成功
        setTimeout(() => {
            setRegisterFinished(true)
        }, 1500)

        // 登録失敗
        // setTimeout(() => {
        //     setRegisterError(true)
        // }, 1500)
    }

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="クレジットカード情報入力"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Main>
                    <MainLead>
                        クレジットカード情報を入力してください。
                    </MainLead>
                    <MainBody>
                        <RegistSection>
                            <RegistHeader>
                                <PaymentIconTitleWith>
                                    <h2 className="headerTitle">
                                        クレジットカード情報
                                    </h2>
                                </PaymentIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                                <OnlinePayment>
                                    <OnlinePaymentInput>
                                        <div className="label">
                                            クレジットカード番号
                                        </div>
                                        <div className="form">
                                            <input
                                                type="text"
                                                className={`${formCss.formText} formTextS`}
                                                placeholder="1234 5678 9012 3456"
                                            />
                                        </div>
                                    </OnlinePaymentInput>
                                    <OnlinePaymentInput>
                                        <div className="label">有効期限</div>
                                        <div className="form">
                                            <input
                                                type="text"
                                                className={`${formCss.formText} formTextS`}
                                                placeholder="月/年"
                                            />
                                        </div>
                                    </OnlinePaymentInput>
                                    <OnlinePaymentInput>
                                        <div className="label">
                                            名義（ローマ字で入力）
                                        </div>
                                        <div className="form">
                                            <input
                                                type="text"
                                                className={`${formCss.formText} formTextS`}
                                                placeholder="HANAKO YAMADA"
                                            />
                                        </div>
                                    </OnlinePaymentInput>
                                    <OnlinePaymentInput>
                                        <div className="label">
                                            セキュリティコード
                                        </div>
                                        <div className="form">
                                            <input
                                                type="text"
                                                className={`${formCss.formText} formTextS`}
                                                placeholder="123"
                                            />
                                        </div>
                                    </OnlinePaymentInput>
                                    <OnlinePaymentSecurity>
                                        <div className="securityText">
                                            セキュリティコードはカードに記載されている3桁または4桁のコードをご記入ください。
                                        </div>
                                        <div className="securityCode">
                                            <img
                                                src="/img/online/img_security_code.png"
                                                alt=""
                                            />
                                        </div>
                                    </OnlinePaymentSecurity>
                                    <OnlinePaymentInput>
                                        <div className="label">
                                            登録可能なカード
                                        </div>
                                        <div className="creditCard">
                                            <img
                                                src="/img/online/img_credit_card.png"
                                                alt="登録可能なカード"
                                            />
                                        </div>
                                    </OnlinePaymentInput>
                                </OnlinePayment>
                            </RegistBody>
                        </RegistSection>
                    </MainBody>
                    <MainBtm>
                        <NextButton href="#" onClick={onSubmit}>
                            次へ
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
            <Dialog
                open={openRegisterDialog}
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
                    {isRegisterFinished ? (
                        <>
                            <DialogMainText>
                                クレジットカード情報の
                                <br />
                                変更が完了しました。
                            </DialogMainText>
                            <DialogMainNav>
                                <li>
                                    <NextDialogButton
                                        onClick={() => {
                                            router.push('/settings/payment')
                                        }}
                                    >
                                        次へ
                                    </NextDialogButton>
                                </li>
                            </DialogMainNav>
                        </>
                    ) : isRegisterError ? (
                        <>
                            <DialogErrorText>
                                変更に失敗しました。
                                <br />
                                もう一度お試しください。
                            </DialogErrorText>
                            <DialogMainNav>
                                <li>
                                    <NextDialogButton
                                        onClick={() => {
                                            setOpenRegisterDialog(false)
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
                                カード情報を
                                <br />
                                登録しています。
                            </DialogMainText>
                            <DialogMainLoading>
                                <Box
                                    sx={{
                                        color: '#468cd2',
                                    }}
                                >
                                    <CircularProgress color={'inherit'} />
                                </Box>
                            </DialogMainLoading>
                        </>
                    )}
                </DialogMain>
            </Dialog>
        </>
    )
}

export default SettingsPaymentPage
