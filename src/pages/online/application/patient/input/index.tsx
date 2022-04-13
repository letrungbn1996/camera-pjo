import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../../components/organisms/OriginalHeader'
import Main, {
    MainBody,
    MainBtm,
} from '../../../../../components/organisms/Main'
import {
    RegistInput,
    RegistConfirm,
} from '../../../../../components/organisms/OriginalRegist'
import { Stack, Item } from '../../../../../components/atoms/Stack'
import { NextButton } from '../../../../../components/atoms/OriginalButton'
import BirthdayDrumroll from '../../../../../components/atoms/BirthdayDrumroll'
import { Box } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import formCss from '../../../../../components/atoms/OriginalForm.module.scss'

type Inputs = {
    lastName: string
    firstName: string
    lastNameKana: string
    firstNameKana: string
    birthday: string
    gender: number
    phoneNumber: string
}

const OnlineDetailPage: React.FC = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            lastName: '川野',
            firstName: '裕子',
            lastNameKana: 'カワノ',
            firstNameKana: 'ユウコ',
            birthday: '1980-06-03',
            gender: 0,
        },
    })

    // 性別
    const [gender, setGender] = useState(0)
    const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gender !== Number(e.target.value)) {
            setGender(Number(e.target.value))
            setValue('gender', Number(e.target.value))
        }
    }

    const onSubmit = (data: Inputs) => {
        // console.log(data)
        router.push('/online/application/detail')
    }

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="利用者基本情報"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Main>
                    <MainBody>
                        <Box mb="30px" lineHeight="22px">
                            基本情報を入力してください。
                        </Box>
                        <RegistConfirm>
                            <div className="label">利用者</div>
                            <div className="confirm">ゆうこ(本人)</div>
                        </RegistConfirm>
                        <RegistInput>
                            <div className="label">名前（漢字）</div>
                            <div className="form">
                                <Stack spacing={2}>
                                    <Item>
                                        <input
                                            type="text"
                                            className={`${formCss.formText} ${
                                                formCss.textCenter
                                            } ${
                                                errors.lastName && formCss.error
                                            }`}
                                            placeholder="姓"
                                            {...register('lastName', {
                                                required:
                                                    'この項目の入力は必須です',
                                            })}
                                        />
                                    </Item>
                                    <Item>
                                        <input
                                            type="text"
                                            className={`${formCss.formText} ${
                                                formCss.textCenter
                                            } ${
                                                errors.firstName &&
                                                formCss.error
                                            }`}
                                            placeholder="名"
                                            {...register('firstName', {
                                                required:
                                                    'この項目の入力は必須です',
                                            })}
                                        />
                                    </Item>
                                </Stack>
                                <span className={formCss.errorText}>
                                    {(() => {
                                        if (
                                            errors.lastName &&
                                            !errors.firstName
                                        )
                                            return errors.lastName.message
                                        else if (
                                            !errors.lastName &&
                                            errors.firstName
                                        )
                                            return errors.firstName.message
                                        else if (
                                            errors.lastName &&
                                            errors.firstName
                                        )
                                            return errors.lastName.message
                                    })()}
                                </span>
                            </div>
                        </RegistInput>
                        <RegistInput>
                            <div className="label">名前（カナ）</div>
                            <div className="form">
                                <Stack spacing={2}>
                                    <Item>
                                        <input
                                            type="text"
                                            className={`${formCss.formText} ${
                                                formCss.textCenter
                                            } ${
                                                errors.lastNameKana &&
                                                formCss.error
                                            }`}
                                            placeholder="セイ"
                                            {...register('lastNameKana', {
                                                required: true,
                                                pattern: /^[\u30A0-\u30FF]+$/,
                                            })}
                                        />
                                    </Item>
                                    <Item>
                                        <input
                                            type="text"
                                            className={`${formCss.formText} ${
                                                formCss.textCenter
                                            } ${
                                                errors.firstNameKana &&
                                                formCss.error
                                            }`}
                                            placeholder="メイ"
                                            {...register('firstNameKana', {
                                                required: true,
                                                pattern: /^[\u30A0-\u30FF]+$/,
                                            })}
                                        />
                                    </Item>
                                </Stack>
                                <span className={formCss.errorText}>
                                    {(() => {
                                        if (
                                            errors.lastNameKana &&
                                            !errors.firstNameKana
                                        ) {
                                            if (
                                                errors.lastNameKana?.type ===
                                                'required'
                                            ) {
                                                return 'この項目の入力は必須です'
                                            } else if (
                                                errors.lastNameKana?.type ===
                                                'pattern'
                                            ) {
                                                return 'カナで入力して下さい'
                                            }
                                        } else if (
                                            !errors.lastNameKana &&
                                            errors.firstNameKana
                                        ) {
                                            if (
                                                errors.firstNameKana?.type ===
                                                'required'
                                            ) {
                                                return 'この項目の入力は必須です'
                                            } else if (
                                                errors.firstNameKana?.type ===
                                                'pattern'
                                            ) {
                                                return 'カナで入力して下さい'
                                            }
                                        } else if (
                                            errors.lastNameKana &&
                                            errors.firstNameKana
                                        ) {
                                            if (
                                                errors.firstNameKana?.type ===
                                                'required'
                                            ) {
                                                return 'この項目の入力は必須です'
                                            } else if (
                                                errors.firstNameKana?.type ===
                                                'pattern'
                                            ) {
                                                return 'カナで入力して下さい'
                                            }
                                        }
                                    })()}
                                </span>
                            </div>
                        </RegistInput>
                        <RegistInput>
                            <div className="label">生年月日</div>
                            <div className="form">
                                <Controller
                                    name="birthday"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <BirthdayDrumroll
                                            onChangeBirthday={onChange}
                                            error={errors.birthday}
                                            value={value}
                                        />
                                    )}
                                />
                                <span className={formCss.errorText}>
                                    {errors.birthday &&
                                        'この項目の入力は必須です'}
                                </span>
                            </div>
                        </RegistInput>
                        <RegistInput>
                            <div className="label">性別</div>
                            <div className="form">
                                <Stack spacing={2}>
                                    <Item>
                                        <input
                                            type="checkbox"
                                            name="gender"
                                            className={formCss.formRadioBtn}
                                            id="female"
                                            value="0"
                                            checked={gender === 0}
                                            onChange={onChangeGender}
                                        />
                                        <label htmlFor="female">女性</label>
                                    </Item>
                                    <Item>
                                        <input
                                            type="checkbox"
                                            name="gender"
                                            className={formCss.formRadioBtn}
                                            id="male"
                                            value="1"
                                            checked={gender === 1}
                                            onChange={onChangeGender}
                                        />
                                        <label htmlFor="male">男性</label>
                                    </Item>
                                </Stack>
                            </div>
                        </RegistInput>
                        <RegistInput>
                            <div className="label">携帯電話番号</div>
                            <div className="form">
                                <input
                                    type="tel"
                                    className={`${formCss.formText} ${
                                        formCss.textCenter
                                    } ${errors.phoneNumber && formCss.error}`}
                                    {...register('phoneNumber', {
                                        minLength: 10,
                                        maxLength: 11,
                                        required: true,
                                        pattern: /^[0-9]+$/,
                                    })}
                                />
                                <span className={formCss.errorText}>
                                    {errors.phoneNumber?.type === 'required' &&
                                        'この項目の入力は必須です'}
                                    {errors.phoneNumber?.type === 'minLength' &&
                                        '電話番号の形式が正しくありません'}
                                    {errors.phoneNumber?.type === 'maxLength' &&
                                        '電話番号の形式が正しくありません'}
                                    {errors.phoneNumber?.type === 'pattern' &&
                                        '電話番号の形式が正しくありません'}
                                </span>
                                <Box
                                    mt="10px"
                                    fontSize="14px"
                                    lineHeight="20px"
                                >
                                    ※上記の情報は、本人の基本情報として登録されます。
                                </Box>
                            </div>
                        </RegistInput>
                    </MainBody>
                    <MainBtm>
                        <NextButton href="#" onClick={handleSubmit(onSubmit)}>
                            次へ
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default OnlineDetailPage
