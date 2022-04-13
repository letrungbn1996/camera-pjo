import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'
import { MainBody, MainLead, MainBtm } from './Main'
import {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistInput,
} from './OriginalRegist'
import { SubmitButton } from '../atoms/OriginalButton'
import { Stack, Item } from '../atoms/Stack'
import {
    years,
    months,
    days31,
    days30,
    days29,
    days28,
} from '../../types/Calendar'
import formCss from '../../components/atoms/OriginalForm.module.scss'
import { useForm } from 'react-hook-form'
import apiManager from '../../utilities/apiManager'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

type PatientDetailProps = {
    birthday: string
    first_name: string
    first_name_kana: string
    gender: number
    last_name: string
    last_name_kana: string
    relationship: string
    lifepalette_id: string
    nickname: string
    patient_alias: string
}

type Props = {
    patientData: PatientDetailProps | null
    setOpenCompleteDialog: React.Dispatch<React.SetStateAction<any>>
}

type formProps = {
    patient_alias: string
    birthday: string
    gender: number
    nickname: string
    relationship: string
    firstName: string
    lastName: string
    firstNameKana: string
    lastNameKana: string
}

const EditPatientProfileForm = ({
    patientData,
    setOpenCompleteDialog,
}: Props) => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nickname: patientData?.nickname,
            lastName: patientData?.last_name,
            firstName: patientData?.first_name,
            lastNameKana: patientData?.last_name_kana,
            firstNameKana: patientData?.first_name_kana,
            relationship: patientData?.relationship,
        },
    })
    const auth = useSelector((state: RootState) => state.auth)

    const [birthday, setBirthday] = useState('')
    const [displayBirthday, setDisplayBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [isBtnActive, setIsBtnActive] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)

    // 月・日の冒頭0を省略
    const suppressZero = (string: string) => {
        return string.replace(/^0+/, '')
    }

    // ======================================================
    // 生年月日
    // ======================================================

    // 登録済の年・月・日を取得
    const birthdayObj = {
        year: '',
        month: '',
        date: '',
    }
    const inputBirthdayObj = {
        year: '',
        month: '',
        date: '',
    }
    if (patientData?.birthday) {
        birthdayObj.year = patientData.birthday.split('-')[0]
        birthdayObj.month = patientData.birthday.split('-')[1]
        birthdayObj.date = patientData.birthday.split('-')[2]
        inputBirthdayObj.year = patientData.birthday.split('-')[0]
        inputBirthdayObj.month = suppressZero(
            patientData.birthday.split('-')[1]
        )
        inputBirthdayObj.date = suppressZero(patientData.birthday.split('-')[2])
    }

    // ピッカーロジック
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

    // 性別
    const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gender !== e.target.value) {
            setGender(e.target.value)
        } else {
            setGender('')
        }
    }

    // TODO: プロフィール編集未実装
    const onSubmit = (data: formProps) => {
        setIsSubmit(true)
        if (patientData) {
            const url =
                process.env.NEXT_PUBLIC_NLP_API_URL +
                `/mpp/patients/update/${patientData.patient_alias}`
            apiManager
                .action(
                    'POST',
                    url,
                    {
                        // patient_alias: patientData.patient_alias,
                        // birthday: birthday,
                        // gender: gender,
                        // nickname: data.nickname,
                        // relationship: data.relationship,
                        // last_name: data.lastName,
                        // first_name: data.firstName,
                        // last_name_kana: data.lastNameKana,
                        // first_name_kana: data.firstNameKana,
                    },
                    {
                        // TODO: 開発用authkey（後で削除）
                        // AUTHORIZED_KEY: 'TnKcjYwm0fvffub9txtTfUPWvLayEJ',
                        AUTHORIZED_KEY: auth.authorized_key,
                    }
                )
                .then((res) => {
                    setOpenCompleteDialog(true)
                })
                .catch((error) => {
                    console.log(error.response)
                })
        }
    }

    // 入力項目の初期値設定
    useEffect(() => {
        setBirthday(
            `${birthdayObj.year}-${birthdayObj.month}-${birthdayObj.date}`
        )
        setDisplayBirthday(
            `${birthdayObj.year}年${birthdayObj.month}月${birthdayObj.date}日`
        )
        if (patientData) {
            setGender(String(patientData.gender))
        }
    }, [])

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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MainLead>（※）は必須入力項目です。</MainLead>
            <MainBody>
                <RegistSection>
                    <RegistHeader>
                        <h2 className="headerTitle">
                            編集するご家族プロフィール
                        </h2>
                    </RegistHeader>
                    <RegistBody>
                        <RegistInput>
                            <div className="label">
                                ニックネーム
                                <span className="require">（※）</span>
                            </div>
                            <div className="form">
                                <input
                                    type="text"
                                    className={formCss.formText}
                                    // onChange={onChangeAnswer01}
                                    {...register('nickname', {
                                        required: true,
                                    })}
                                />
                            </div>
                            {errors.nickname && (
                                <span className={formCss.errorText}>
                                    ニックネームを入力してください
                                </span>
                            )}
                        </RegistInput>
                        <RegistInput>
                            <div className="label">氏名（漢字）</div>
                            <div className="form">
                                <Stack spacing={2}>
                                    <Item>
                                        <input
                                            type="text"
                                            className={formCss.formText}
                                            // onChange={onChangeAnswer01}
                                            {...register('lastName')}
                                        />
                                    </Item>
                                    <Item>
                                        <input
                                            type="text"
                                            className={formCss.formText}
                                            // onChange={onChangeAnswer01}
                                            {...register('firstName')}
                                        />
                                    </Item>
                                </Stack>
                            </div>
                        </RegistInput>
                        <RegistInput>
                            <div className="label">氏名（カナ）</div>
                            <div className="form">
                                <Stack spacing={2}>
                                    <Item>
                                        <input
                                            type="text"
                                            className={formCss.formText}
                                            // onChange={onChangeAnswer01}
                                            {...register('lastNameKana', {
                                                pattern: /^[\u30A0-\u30FF]+$/,
                                            })}
                                        />
                                    </Item>
                                    <Item>
                                        <input
                                            type="text"
                                            className={formCss.formText}
                                            // onChange={onChangeAnswer01}
                                            {...register('firstNameKana', {
                                                pattern: /^[\u30A0-\u30FF]+$/,
                                            })}
                                        />
                                    </Item>
                                </Stack>
                            </div>
                            {(errors.firstNameKana || errors.lastNameKana) && (
                                <span className={formCss.errorText}>
                                    カタカナで入力してください
                                </span>
                            )}
                        </RegistInput>
                        <RegistInput>
                            <div className="label">
                                生年月日
                                <span className="require">（※）</span>
                            </div>
                            <div className="form">
                                <input
                                    type="text"
                                    value={displayBirthday}
                                    className={formCss.formText}
                                    onFocus={onFocusBirthday}
                                    ref={birthInputEl}
                                />
                            </div>
                            {isSubmit && displayBirthday === '' && (
                                <span className={formCss.errorText}>
                                    生年月日を入力してください
                                </span>
                            )}
                        </RegistInput>
                        <RegistInput>
                            <div className="label">
                                性別
                                <span className="require">（※）</span>
                            </div>
                            <div className="form">
                                <Stack spacing={2}>
                                    <Item>
                                        <input
                                            type="checkbox"
                                            name="gender"
                                            className={formCss.formRadioBtn}
                                            id="female"
                                            value="0"
                                            checked={gender === '0'}
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
                                            checked={gender === '1'}
                                            onChange={onChangeGender}
                                        />
                                        <label htmlFor="male">男性</label>
                                    </Item>
                                </Stack>
                            </div>
                            {isSubmit && gender === '' && (
                                <span className={formCss.errorText}>
                                    性別を入力してください
                                </span>
                            )}
                        </RegistInput>
                        <RegistInput>
                            <div className="label">続柄</div>
                            <div className="form">
                                <input
                                    type="text"
                                    className={formCss.formText}
                                    // onChange={onChangeAnswer01}
                                    {...register('relationship')}
                                />
                            </div>
                        </RegistInput>
                    </RegistBody>
                </RegistSection>
            </MainBody>
            <MainBtm>
                <SubmitButton>保存する</SubmitButton>
            </MainBtm>
        </form>
    )
}
export default EditPatientProfileForm
