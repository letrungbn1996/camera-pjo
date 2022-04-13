import { useRouter } from 'next/router'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import type { NextPage } from 'next'
import React, { useMemo } from 'react'
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
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import { ja } from 'date-fns/locale'
import formCss from '../../../../components/atoms/Form.module.scss'

type MobileDatePickerProps = {
    onChange: () => void
    value: Date
}

const MuiPickers: React.FC<MobileDatePickerProps> = ({ onChange, value }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
            <MobileDatePicker
                inputFormat="yyyy/MM/dd"
                onChange={onChange}
                value={value}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                padding: '0',
                                fontFamily: 'inherit',
                                borderRadius: '6px',
                                border: '0',
                            },
                            '& .MuiOutlinedInput-input': {
                                display: 'block',
                                padding: '0 12px',
                                height: 46,
                                fontFamily: 'inherit',
                                fontSize: '16px',
                                lineHeight: '46px',
                                background: '#fff',
                                boxSizing: 'border-box',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: '1px solid #dcdcdc',
                            },
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    )
}

const LoginPage: NextPage = () => {
    const router = useRouter()

    // 日付を取得
    const InitialDate = useMemo(() => {
        let date = new Date()
        date.setFullYear(date.getFullYear())
        return date
    }, [])

    // フォームにあるフィールドの型の定義
    type FormData = {
        emailAddress: string
        nickName: string
        birthday: Date
    }

    // フォームの初期設定
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            emailAddress: '',
            nickName: '',
            birthday: InitialDate,
        },
    })

    // 送信時の処理
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)
        router.push('/login/mail/change/view2')
    }

    return (
        <>
            <DefaultLayout>
                <Header title="ご本人確認" prevURL="back" isHomeBtn={false} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Initial>
                        <InitialSection>
                            <InitialLead>
                                登録されているメールアドレスを変更するためには、以下をご入力ください。ご本人確認完了後に、メールアドレスを変更できます。
                            </InitialLead>
                            <Box
                                sx={{
                                    pt: '25px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">
                                        変更前のメールアドレス
                                    </div>
                                    <div className="form">
                                        <input
                                            type="text"
                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                            placeholder="変更前のメールアドレス"
                                            {...register('emailAddress', {
                                                required: true,
                                                pattern:
                                                    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            })}
                                        />
                                        {errors.emailAddress?.type ===
                                            'required' && (
                                            <span className={formCss.errorText}>
                                                変更前のメールアドレスは必須です
                                            </span>
                                        )}
                                        {errors.emailAddress?.type ===
                                            'pattern' && (
                                            <span className={formCss.errorText}>
                                                メールアドレスを正しく入力してください
                                            </span>
                                        )}
                                    </div>
                                </RegistInput>
                            </Box>
                            <Box
                                sx={{
                                    pt: '15px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">
                                        ニックネームまたは氏名
                                    </div>
                                    <div className="form">
                                        <input
                                            type="text"
                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                            placeholder="ニックネームまたは氏名"
                                            {...register('nickName', {
                                                required: true,
                                            })}
                                        />
                                        {errors.nickName?.type ===
                                            'required' && (
                                            <span className={formCss.errorText}>
                                                ニックネームまたは氏名は必須です
                                            </span>
                                        )}
                                    </div>
                                </RegistInput>
                            </Box>

                            <Box
                                sx={{
                                    pt: '15px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">生年月日</div>
                                    <div className="form">
                                        <Controller
                                            name="birthday"
                                            control={control}
                                            render={({
                                                field: { value, onChange },
                                            }) => (
                                                <MuiPickers
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )}
                                        />
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
