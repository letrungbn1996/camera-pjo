import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import type { NextPage } from 'next'
import React from 'react'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Header from '../../../../components/organisms/Header'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../../../components/organisms/Initial'
import { RegistInput } from '../../../../components/organisms/Regist'
import { SubmitButton } from '../../../../components/atoms/Button'

import { Box } from '@mui/material'
import formCss from '../../../../components/atoms/Form.module.scss'
// import swrExecuter from '../../../../utilities/swrExecuter'
// import apiManager from '../../../../utilities/apiManager'
// import cookieManagement from '../../../../utilities/cookieManagement'

const LoginPage: NextPage = () => {
    const router = useRouter()

    // フォームにあるフィールドの型の定義
    type FormData = {
        phoneValue: number
    }

    // フォームの初期設定
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    // 送信時の処理
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)
        router.push('/login/phone/change/view4')
    }

    return (
        <>
            <DefaultLayout>
                <Header
                    title="ご本人確認完了"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Initial>
                        <InitialSection>
                            <InitialLead>
                                ご本人の確認が取れました。変更後の携帯電話番号を入力して、「次へ」を押してください。
                            </InitialLead>
                            <Box
                                sx={{
                                    pt: '25px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">
                                        変更後の携帯電話番号を入力
                                    </div>
                                    <div className="form">
                                        <input
                                            type="number"
                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                            placeholder="変更後の携帯電話番号を入力"
                                            {...register('phoneValue', {
                                                required: true,
                                                minLength: 10,
                                                maxLength: 12,
                                            })}
                                        />
                                        {errors.phoneValue?.type ===
                                            'required' && (
                                            <span className={formCss.errorText}>
                                                変更後の携帯電話番号は必須です
                                            </span>
                                        )}
                                        {errors.phoneValue?.type ===
                                            'minLength' && (
                                            <span className={formCss.errorText}>
                                                文字数が少なすぎます
                                            </span>
                                        )}
                                        {errors.phoneValue?.type ===
                                            'maxLength' && (
                                            <span className={formCss.errorText}>
                                                文字数が多すぎます
                                            </span>
                                        )}
                                    </div>
                                </RegistInput>
                            </Box>
                        </InitialSection>
                        <InitialBtm>
                            <SubmitButton>次へ</SubmitButton>
                        </InitialBtm>
                    </Initial>
                </form>
            </DefaultLayout>
        </>
    )
}

export default LoginPage
