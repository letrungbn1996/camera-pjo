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
        passCode: number
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
        router.push('/login/mail/change/view5')
    }

    return (
        <>
            <DefaultLayout>
                <Header
                    title="パスコードの入力"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Initial>
                        <InitialSection>
                            <InitialLead>
                                変更後のメールアドレス宛にパスコードを送信しました。（パスコードの有効期限は30分です。有効期限が切れた場合には戻って、再度、携帯電話番号をご入力ください）
                                <br />
                                <br />
                                パスコードをご入力頂くことで、メールアドレスの変更が完了します。
                            </InitialLead>
                            <Box
                                sx={{
                                    pt: '25px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">
                                        パスコードを入力
                                    </div>
                                    <div className="form">
                                        <input
                                            type="number"
                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                            placeholder="パスコードを入力"
                                            {...register('passCode', {
                                                required: true,
                                            })}
                                        />
                                        {errors.passCode?.type ===
                                            'required' && (
                                            <span className={formCss.errorText}>
                                                パスコードは必須です
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
