import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Header from '../../../../components/organisms/Header'
import RegistNav from '../../../../components/organisms/RegistNav'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../../../components/organisms/Initial'
import { NextButton } from '../../../../components/atoms/Button'
import { Box } from '@mui/material'
import formCss from '../../../../components/atoms/Form.module.scss'
import apiManager from '../../../../utilities/apiManager'
import cookieManagement from '../../../../utilities/cookieManagement'

const RegistPage: NextPage = () => {
    const router = useRouter()
    const [isBtnActive, setBtnActive] = useState(false)
    const [phoneValue, setPhoneValue] = useState('')
    const [errorStatus, setErrorStatus] = useState('')

    useEffect(() => {
        if (phoneValue.length >= 11) {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    }, [phoneValue])

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        // 数字のみに制限
        val = val.replace(/[^0-9]/g, '')
        if (val.length <= 11) {
            setPhoneValue(val)
        }
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
                    how_to: 100,
                    phone_number: phoneValue,
                },
                {}
            )
            .then((res) => {
                if (res) {
                    cookieManagement.setCookiesByObject({
                        token: res.data.token,
                    })
                }
                router.push('/register/phone/code')
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
                            携帯電話番号宛に登録コードを送信します。
                        </InitialLead>
                        <Box
                            sx={{
                                pt: '15px',
                                pb: '30px',
                            }}
                        >
                            <input
                                type="text"
                                value={phoneValue}
                                className={`${formCss.formText} ${formCss.textCenter}`}
                                placeholder="携帯電話番号を入力"
                                maxLength={11}
                                pattern="\d*"
                                onChange={onChangePhone}
                            />
                        </Box>
                        {/* TODO: 将来機能 */}
                        {/* <InitialLead>
                            見守り招待コードをお持ちの方はこちら（有効期限がございます）
                        </InitialLead>
                        <Box
                            sx={{
                                py: '15px',
                            }}
                        >
                            <input
                                type="text"
                                className={`${formCss.formText} ${formCss.textCenter}`}
                                placeholder="見守り招待コードを入力"
                            />
                        </Box> */}
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
