import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Header from '../../../../components/organisms/Header'
import Initial, {
    InitialSection,
    InitialLead,
    InitialAttention,
    InitialBtm,
} from '../../../../components/organisms/Initial'
import { NextButton } from '../../../../components/atoms/Button'
import { Box } from '@mui/material'
import formCss from '../../../../components/atoms/Form.module.scss'
import RegistNav from '../../../../components/organisms/RegistNav'
import apiManager from '../../../../utilities/apiManager'
import cookieManagement from '../../../../utilities/cookieManagement'

const RegistPage: NextPage = () => {
    const router = useRouter()
    const [isBtnActive, setBtnActive] = useState(false)
    const [codeValue, setCodeValue] = useState('')
    const [errorStatus, setErrorStatus] = useState('')

    useEffect(() => {
        // 登録コード6桁くらい？
        if (codeValue.length >= 6) {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    }, [codeValue])

    const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        // 数字のみに制限
        val = val.replace(/[^0-9]/g, '')
        if (val.length <= 6) {
            setCodeValue(val)
        }
    }

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        // ピンコードチェック
        let url: string =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/user-registration/check-pin-code'
        apiManager
            .action(
                'POST',
                url,
                {
                    pin_code: codeValue,
                    token: cookieManagement.getByKey('token'),
                },
                {}
            )
            .then((res) => {
                if (res) {
                    cookieManagement.setCookiesByObject({
                        user_registration_token:
                            res.data.user_registration_token,
                    })
                }
                router.push('/register/input')
            })
            .catch((error) => {
                setErrorStatus(
                    '登録コードが確認できませんでした。\nお確かめの上もう一度ご入力ください。'
                )
            })
    }

    return (
        <>
            <DefaultLayout>
                <Header
                    title="登録コード入力"
                    prevURL="back"
                    isHomeBtn={false}
                />
                {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                    <RegistNav step={1} total={4} app="KHA" />
                ) : (
                    <RegistNav step={1} total={3} />
                )}
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            登録コードをショートメッセージで送信しました。確認して以下にコードを入力して次へ進んでください。
                        </InitialLead>
                        <Box
                            sx={{
                                py: '15px',
                            }}
                        >
                            <input
                                type="text"
                                value={codeValue}
                                className={`${formCss.formText} ${formCss.textCenter}`}
                                placeholder="登録コードを入力"
                                maxLength={6}
                                pattern="\d*"
                                onChange={onChangeCode}
                                autoComplete="one-time-code"
                            />
                        </Box>
                        <InitialAttention>
                            ※登録コードの有効期限は30分です。
                            <br />
                            有効期限が切れた場合には戻って再度、携帯電話番号をご入力ください。
                        </InitialAttention>
                    </InitialSection>
                    <InitialBtm>
                        <span className={formCss.errorButtonText}>
                            {errorStatus}
                        </span>
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
        </>
    )
}

export default RegistPage
