import React, { useState, useEffect, useRef, useMemo } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
    years,
    months,
    days31,
    days30,
    days29,
    days28,
} from '../../../types/Calendar'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Header from '../../../components/organisms/Header'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../../components/organisms/Initial'
import { RegistInput } from '../../../components/organisms/Regist'
import { Stack, Item } from '../../../components/atoms/Stack'
import { SubmitButton } from '../../../components/atoms/Button'
import { Box } from '@mui/material'
import formCss from '../../../components/atoms/Form.module.scss'
import RegistNav from '../../../components/organisms/RegistNav'
import cookieManagement from '../../../utilities/cookieManagement'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { profileSlice } from '../../../store/profile'

type Inputs = {
    nickname: string
}

const RegistPage: NextPage = () => {
    const profile = useSelector((state: RootState) => state.profile)
    const router = useRouter()
    const dispatch = useDispatch()

    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [birthday, setBirthday] = useState('')
    const [displayBirthday, setDisplayBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [notification, setNotification] = useState('1')
    const [errorStatus, setErrorStatus] = useState('')

    const userToken = cookieManagement.getByKey('user_registration_token')
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'onChange',
        defaultValues: {
            nickname: profile?.nickname,
        },
    })

    // react-hook-form項目の監視
    const nickname = watch('nickname')

    // ======================================================
    // 生年月日
    // ======================================================
    // 月・日の冒頭0を省略
    const suppressZero = (string: string) => {
        return string.replace(/^0+/, '')
    }
    // 登録済の年・月・日を取得
    const birthdayObj = {
        year: '',
        month: '',
        date: '',
    }
    const inputBirthdayObj = {
        year: '1970',
        month: '1',
        date: '1',
    }
    if (profile.birthday !== '') {
        birthdayObj.year = profile.birthday.split('-')[0]
        birthdayObj.month = profile.birthday.split('-')[1]
        birthdayObj.date = profile.birthday.split('-')[2]
        inputBirthdayObj.year = profile.birthday.split('-')[0]
        inputBirthdayObj.month = suppressZero(profile.birthday.split('-')[1])
        inputBirthdayObj.date = suppressZero(profile.birthday.split('-')[2])
    }

    const Picker = require('better-picker')
    // 年・月・日の初期設定
    const initialYear = inputBirthdayObj.year
    const initialMonth = inputBirthdayObj.month
    const initialDay = inputBirthdayObj.date
    const [year, setYear] = useState(initialYear)
    const currentYearRef = useRef('')
    currentYearRef.current = year // yearのインスタンス
    const [month, setMonth] = useState(initialMonth)
    const currentMonthRef = useRef('')
    currentMonthRef.current = month // monthのインスタンス
    const initialYearIndex = years.findIndex(
        (el) => el['value'] === initialYear
    )
    const initialMonthIndex = months.findIndex(
        (el) => el['value'] === initialMonth
    )
    const initialDayIndex = days31.findIndex((el) => el['value'] === initialDay)
    // ピッカー初期設定
    const picker = useMemo(
        () =>
            new Picker({
                data: [years, months, days31],
                selectedIndex: [
                    initialYearIndex,
                    initialMonthIndex,
                    initialDayIndex,
                ],
                title: '生年月日',
            }),
        []
    )
    useEffect(() => {
        // マスク領域にクリックイベント追加（ピッカーを隠す）
        document.querySelectorAll('.mask-hook').forEach(function (mask) {
            mask.addEventListener('click', function () {
                picker.hide()
            })
        })
        // 日本語にローカライズ（取消 → 閉じる）
        document.querySelectorAll('.cancel-hook').forEach(function (cancel) {
            cancel.innerHTML = '閉じる'
        })
        // 日本語にローカライズ（确定 → OK）
        document.querySelectorAll('.confirm-hook').forEach(function (confirm) {
            confirm.innerHTML = 'OK'
        })
    }, [])
    const birthInputEl = useRef<HTMLInputElement>(null)
    // 生年月日フィールド、フォーカス時
    const onFocusBirthday = () => {
        // フィールドからフォーカスを外す（ウィンドウを切り替えただけで再フォーカスが何度も発生するため）
        birthInputEl?.current?.blur()
        picker.show()
    }
    // ピッカー選択
    picker.on(
        'picker.select',
        function (selectedVal: string[], selectedIndex: number[]) {
            // selectedVal : レーンの左から選択した全てのvalue["1970", "1", "7"]
            // selectedIndex : レーンの左から選択した全ての番号[0, 1, 2]
            // 生年月日、保存
            setBirthday(
                selectedVal[0] +
                    '-' +
                    ('0' + selectedVal[1]).slice(-2) +
                    '-' +
                    ('0' + selectedVal[2]).slice(-2)
            )
            setDisplayBirthday(
                selectedVal[0] +
                    '年' +
                    ('0' + selectedVal[1]).slice(-2) +
                    '月' +
                    ('0' + selectedVal[2]).slice(-2) +
                    '日'
            )
        }
    )
    // ピッカー回転
    picker.on('picker.change', function (index: number, selectedIndex: number) {
        // index : 動かしたレーンの番号（0 | 1 | 2）
        // selectedIndex : 動かしたレーン内の選択した番号（0 | 1 | 2 ・・・）
        // 月によって日にちのレーンを変更する
        const getLastDay = () => {
            // 月末日を求める
            const lastDay = new Date(
                Number(currentYearRef.current),
                Number(currentMonthRef.current),
                0
            ).getDate()
            if (lastDay === 29) {
                picker.refillColumn(2, days29)
                picker.scrollColumn(2, 0)
            } else if (lastDay === 28) {
                picker.refillColumn(2, days28)
                picker.scrollColumn(2, 0)
            } else if (lastDay === 30) {
                picker.refillColumn(2, days30)
                picker.scrollColumn(2, 0)
            } else {
                picker.refillColumn(2, days31)
                picker.scrollColumn(2, 0)
            }
        }
        // 年
        if (index === 0) {
            setYear(years[selectedIndex].value)
            getLastDay()
        }
        // 月
        if (index === 1) {
            setMonth(months[selectedIndex].value)
            getLastDay()
        }
    })
    // ======================================================

    // react-hook-form
    const onSubmitForm: SubmitHandler<FormData> = (data: any) => {
        const o = {
            user_registration_token: userToken,
            birthday: birthday,
            nickname: data.nickname,
            gender: gender,
            is_push_notification: notification,
        }
        dispatch(profileSlice.actions.updateProfile(o))
        router.push('/register/secret')
    }

    // 性別
    const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gender !== e.target.value) {
            setGender(e.target.value)
        } else {
            setGender('')
        }
    }

    // 通知
    const onChangeNotification = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotification(e.target.value)
    }

    // 入力項目の初期値設定
    useEffect(() => {
        if (profile.birthday !== '') {
            setBirthday(
                `${birthdayObj.year}-${birthdayObj.month}-${birthdayObj.date}`
            )
            setDisplayBirthday(
                `${birthdayObj.year}年${birthdayObj.month}月${birthdayObj.date}日`
            )
        }
        if (profile.gender !== '') {
            setGender(String(profile.gender))
        }
        if (profile.is_push_notification !== '') {
            setNotification(String(profile.is_push_notification))
        }
    }, [])

    useEffect(() => {
        if (nickname.length >= 1 && birthday != '') {
            setIsBtnDisabled(false)
        } else {
            setIsBtnDisabled(true)
        }
    }, [nickname, birthday])

    return (
        <>
            <DefaultLayout>
                <Header title="基本情報登録" prevURL="back" isHomeBtn={false} />
                {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                    <RegistNav step={2} total={4} app="KHA" />
                ) : (
                    <RegistNav step={2} total={3} />
                )}
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <Initial>
                        <InitialSection>
                            <InitialLead>
                                登録コードが確認できました。
                                <br />
                                続けてあなたの生年月日、ニックネーム、性別、通知の希望を入力して「次へ」進んでください。
                            </InitialLead>
                            <Box
                                sx={{
                                    py: '15px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">生年月日</div>
                                    <div className="form">
                                        <input
                                            type="text"
                                            value={displayBirthday}
                                            className={formCss.formText}
                                            onFocus={onFocusBirthday}
                                            ref={birthInputEl}
                                        />
                                    </div>
                                </RegistInput>
                            </Box>
                            <Box
                                sx={{
                                    pb: '15px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">性別（任意）</div>
                                    <div className="form">
                                        <Stack spacing={2}>
                                            <Item>
                                                <input
                                                    type="checkbox"
                                                    name="gender"
                                                    className={
                                                        formCss.formRadioBtn
                                                    }
                                                    id="female"
                                                    value="0"
                                                    checked={gender === '0'}
                                                    onChange={onChangeGender}
                                                />
                                                <label htmlFor="female">
                                                    女性
                                                </label>
                                            </Item>
                                            <Item>
                                                <input
                                                    type="checkbox"
                                                    name="gender"
                                                    className={
                                                        formCss.formRadioBtn
                                                    }
                                                    id="male"
                                                    value="1"
                                                    checked={gender === '1'}
                                                    onChange={onChangeGender}
                                                />
                                                <label htmlFor="male">
                                                    男性
                                                </label>
                                            </Item>
                                        </Stack>
                                    </div>
                                </RegistInput>
                            </Box>
                            <Box>
                                <RegistInput>
                                    <div className="label">ニックネーム</div>
                                    <div className="form">
                                        <input
                                            type="text"
                                            placeholder="ニックネームまたは氏名"
                                            className={formCss.formText}
                                            {...register('nickname', {
                                                required: true,
                                                maxLength: 20,
                                            })}
                                        />
                                    </div>
                                    {errors.nickname?.type === 'required' && (
                                        <span className={formCss.errorText}>
                                            必須項目です
                                        </span>
                                    )}
                                    {errors.nickname?.type === 'maxLength' && (
                                        <span className={formCss.errorText}>
                                            20文字以内で入力してください
                                        </span>
                                    )}
                                </RegistInput>
                            </Box>
                        </InitialSection>
                        <InitialSection>
                            <InitialLead>
                                プッシュ通知にてお得な情報などを受け取る場合には「希望する」を選択ください。
                            </InitialLead>
                            <Box
                                sx={{
                                    py: '15px',
                                }}
                            >
                                <Stack spacing={2}>
                                    <Item>
                                        <input
                                            type="radio"
                                            name="notification"
                                            className={formCss.formRadioBtn}
                                            id="notification1"
                                            value="1"
                                            checked={notification === '1'}
                                            onChange={onChangeNotification}
                                        />
                                        <label htmlFor="notification1">
                                            希望する
                                        </label>
                                    </Item>
                                    <Item>
                                        <input
                                            type="radio"
                                            name="notification"
                                            className={formCss.formRadioBtn}
                                            id="notification2"
                                            value="0"
                                            checked={notification === '0'}
                                            onChange={onChangeNotification}
                                        />
                                        <label htmlFor="notification2">
                                            希望しない
                                        </label>
                                    </Item>
                                </Stack>
                            </Box>
                        </InitialSection>
                        <InitialBtm>
                            <span className={formCss.errorButtonText}>
                                {errorStatus}
                            </span>
                            <SubmitButton disabled={isBtnDisabled}>
                                次へ
                            </SubmitButton>
                        </InitialBtm>
                    </Initial>
                </form>
            </DefaultLayout>
        </>
    )
}

export default RegistPage
