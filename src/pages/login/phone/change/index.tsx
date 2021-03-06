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

    // ???????????????
    const InitialDate = useMemo(() => {
        let date = new Date()
        date.setFullYear(date.getFullYear())
        return date
    }, [])

    // ???????????????????????????????????????????????????
    type FormData = {
        phoneValue: number
        nickName: string
        birthday: Date
    }

    // ???????????????????????????
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            nickName: '',
            birthday: InitialDate,
        },
    })

    // ??????????????????
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)
        router.push('/login/phone/change/view2')
    }

    return (
        <>
            <DefaultLayout>
                <Header title="???????????????" prevURL="back" isHomeBtn={false} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Initial>
                        <InitialSection>
                            <InitialLead>
                                ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                            </InitialLead>
                            <Box
                                sx={{
                                    pt: '25px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">
                                        ??????????????????????????????
                                    </div>
                                    <div className="form">
                                        <input
                                            type="number"
                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                            placeholder="??????????????????????????????"
                                            {...register('phoneValue', {
                                                required: true,
                                                minLength: 10,
                                                maxLength: 12,
                                            })}
                                        />
                                        {errors.phoneValue?.type ===
                                            'required' && (
                                            <span className={formCss.errorText}>
                                                ?????????????????????????????????????????????
                                            </span>
                                        )}
                                        {errors.phoneValue?.type ===
                                            'minLength' && (
                                            <span className={formCss.errorText}>
                                                ??????????????????????????????
                                            </span>
                                        )}
                                        {errors.phoneValue?.type ===
                                            'maxLength' && (
                                            <span className={formCss.errorText}>
                                                ???????????????????????????
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
                                        ?????????????????????????????????
                                    </div>
                                    <div className="form">
                                        <input
                                            type="text"
                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                            placeholder="?????????????????????????????????"
                                            {...register('nickName', {
                                                required: true,
                                            })}
                                        />
                                        {errors.nickName?.type ===
                                            'required' && (
                                            <span className={formCss.errorText}>
                                                ????????????????????????????????????????????????
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
                                    <div className="label">????????????</div>
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
                            <SubmitButton>??????</SubmitButton>
                        </InitialBtm>
                    </Initial>
                </form>
            </DefaultLayout>
        </>
    )
}

export default LoginPage
