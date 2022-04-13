import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../../../../components/organisms/OriginalHeader'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../../../components/organisms/Initial'
import {
    NextButton,
    NextDialogButton,
} from '../../../../components/atoms/OriginalButton'
import { Box } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogErrorText,
    DialogMainLoading,
    DialogMainNav,
} from '../../../../components/organisms/DialogMain'
import CircularProgress from '@mui/material/CircularProgress'
import formCss from '../../../../components/atoms/OriginalForm.module.scss'

const FamilyPage: React.FC = () => {
    const router = useRouter()

    const [registerCode, setRegisterCode] = useState('')
    const [isBtnActive, setBtnActive] = useState(false)
    const [isFinished, setFinished] = useState(false)
    const [isError, setError] = useState(false)
    const [openFinishDialog, setOpenFinishDialog] = useState(false)

    // 家族登録用コード
    // TODO: 登録コードは何桁？？
    useEffect(() => {
        if (registerCode.length >= 6) {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    }, [registerCode])
    const onChangeRegisterCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        // 6文字までに制限
        if (val.length <= 6) {
            setRegisterCode(val)
        }
    }

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        // 入力内容確認などの処理がはいる
        setError(false)
        setOpenFinishDialog(true)

        // 成功時
        setTimeout(() => {
            setFinished(true)
        }, 1500)

        // 失敗時
        // setTimeout(() => {
        //     setError(true)
        // }, 1500)
    }
    const onFamilyTop = () => {
        router.push('/family')
    }

    return (
        <>
            <DefaultLayout>
                <Header
                    title="見守り家族登録"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            家族登録用コードを取得するには、ご家族が見守り家族としてあなたの連絡先を指定する必要があります。
                            <br />
                            <br />
                            あなたがご家族から見守り家族として指定されると招待コードが記載されたショートメッセージ、またはメールがあなたのご連絡先に送信されます。
                            <br />
                            ここに受信した家族登録用コードを入力するとご家族の利用データを閲覧することができます。
                        </InitialLead>
                        <Box
                            sx={{
                                py: '15px',
                            }}
                        >
                            <input
                                type="text"
                                value={registerCode}
                                className={`${formCss.formText} ${formCss.textCenter}`}
                                onChange={onChangeRegisterCode}
                                placeholder="家族登録用コードを入力"
                            />
                        </Box>
                    </InitialSection>
                    <InitialBtm>
                        <NextButton
                            href="#"
                            onClick={onSubmit}
                            disabled={!isBtnActive}
                        >
                            登録する
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
                    {isFinished ? (
                        <>
                            <DialogMainText>
                                見守り家族の登録が
                                <br />
                                完了しました。
                                <br />
                                <br />
                                けんじ
                            </DialogMainText>
                            <DialogMainNav>
                                <li>
                                    <NextDialogButton onClick={onFamilyTop}>
                                        OK
                                    </NextDialogButton>
                                </li>
                            </DialogMainNav>
                        </>
                    ) : isError ? (
                        <>
                            <DialogErrorText>
                                登録に失敗しました。
                                <br />
                                もう一度お試しください。
                            </DialogErrorText>
                            <DialogMainNav>
                                <li>
                                    <NextDialogButton
                                        onClick={() => {
                                            setOpenFinishDialog(false)
                                        }}
                                    >
                                        OK
                                    </NextDialogButton>
                                </li>
                            </DialogMainNav>
                        </>
                    ) : (
                        <>
                            <DialogMainText>見守り家族の登録中</DialogMainText>
                            <DialogMainLoading>
                                <Box color="#468cd2">
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

export default FamilyPage
