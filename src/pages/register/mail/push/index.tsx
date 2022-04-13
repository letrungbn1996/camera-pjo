import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Header from '../../../../components/organisms/Header'
import Initial, {
    InitialSection,
    InitialLead,
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
    const [mailValue, setMailValue] = useState('')
    const [errorStatus, setErrorStatus] = useState('')

    useEffect(() => {
        // メールアドレスのバリデーションの処理がはいる
        const result = mailValue.match(
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
        if (result) {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    }, [mailValue])

    const onChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMailValue(e.target.value)
    }

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        // 登録コード送信の処理がはいる
        let url: string =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/user-registration/issue-pin-code'
        apiManager
            .action(
                'POST',
                url,
                {
                    how_to: 200,
                    email: mailValue,
                },
                {}
            )
            .then((res) => {
                if (res) {
                    console.log(res.data.token)
                    cookieManagement.setCookiesByObject({
                        token: res.data.token,
                    })
                }
                router.push('/register/mail/code')
            })
            .catch((error) => {
                setErrorStatus('登録コードの送信に失敗しました。')
            })
    }

    return (
        <>
            <DefaultLayout>
                <Header
                    title="登録コード送信"
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
                            メールアドレス宛に登録コードを送信します。
                        </InitialLead>
                        <Box
                            sx={{
                                py: '15px',
                            }}
                        >
                            <input
                                type="text"
                                value={mailValue}
                                className={`${formCss.formText} ${formCss.textCenter}`}
                                placeholder="メールアドレスを入力"
                                onChange={onChangeMail}
                                autoCapitalize="off"
                            />
                        </Box>
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
                            送信する
                        </NextButton>
                    </InitialBtm>
                </Initial>
            </DefaultLayout>
        </>
    )
}

export default RegistPage
