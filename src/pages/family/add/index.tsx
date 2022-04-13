import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'
import Header from '../../../components/organisms/OriginalHeader'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Main, {
    MainBody,
    MainLead,
    MainBtm,
} from '../../../components/organisms/Main'
import {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistInput,
} from '../../../components/organisms/OriginalRegist'
import { Stack, Item } from '../../../components/atoms/Stack'
import {
    years,
    months,
    days31,
    days30,
    days29,
    days28,
} from '../../../types/Calendar'
import formCss from '../../../components/atoms/OriginalForm.module.scss'
import { SubmitButton } from '../../../components/atoms/OriginalButton'
import { useForm } from 'react-hook-form'
import apiManager from '../../../utilities/apiManager'
import { useSwitchAuthKeyMethod } from '../../../hooks/useSwitchAuthKeyMethod'
import CompletedDialog from '../../../components/organisms/CompletedDialog'

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

const FamilyAddPage: React.FC = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    // react-hook-form項目の監視
    const nickname = watch('nickname')
    const relationship = watch('relationship')
    const lastName = watch('lastName')
    const firstName = watch('firstName')
    const lastNameKana = watch('lastNameKana')
    const firstNameKana = watch('firstNameKana')

    const auth_key = useSwitchAuthKeyMethod()

    const [birthday, setBirthday] = useState('')
    const [displayBirthday, setDisplayBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    // ======================================================
    // 生年月日
    // ======================================================
    const Picker = require('better-picker')
    // 年・月・日の初期設定
    const initialYear = '1970'
    const initialMonth = '1'
    const initialDay = '1'
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

    const onFamilyTop = () => {
        router.push('/family')
    }

    const onSubmit = (data: formProps) => {
        setIsSubmit(true)
        const url = process.env.NEXT_PUBLIC_NLP_API_URL + `/mpp/patients/store`
        apiManager
            .action(
                'POST',
                url,
                {
                    birthday: birthday,
                    gender: gender,
                    nickname: data.nickname,
                    relationship: data.relationship,
                    last_name: data.lastName,
                    first_name: data.firstName,
                    last_name_kana: data.lastNameKana,
                    first_name_kana: data.firstNameKana,
                },
                {
                    // TODO: 開発用authkey（後で削除）
                    // AUTHORIZED_KEY: 'TnKcjYwm0fvffub9txtTfUPWvLayEJ',
                    AUTHORIZED_KEY: auth_key,
                }
            )
            .then((res) => {
                setOpenDialog(true)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

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

    useEffect(() => {
        if (birthday !== '' && gender != '' && nickname !== '') {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }, [birthday, gender, nickname])

    return (
        <>
            <DefaultLayout>
                <Header title="家族追加" prevURL="back" isHomeBtn={false} />
                <Main>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MainLead>（※）は必須入力項目です。</MainLead>
                        <MainBody>
                            <RegistSection>
                                <RegistHeader>
                                    <h2 className="headerTitle">
                                        追加するご家族情報
                                    </h2>
                                </RegistHeader>
                                <RegistBody>
                                    <RegistInput>
                                        <div className="label">
                                            ニックネーム
                                            <span className="require">
                                                （※）
                                            </span>
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
                                        <div className="label">
                                            氏名（漢字）
                                        </div>
                                        <div className="form">
                                            <Stack spacing={2}>
                                                <Item>
                                                    <input
                                                        type="text"
                                                        className={
                                                            formCss.formText
                                                        }
                                                        // onChange={onChangeAnswer01}
                                                        {...register(
                                                            'lastName'
                                                        )}
                                                    />
                                                </Item>
                                                <Item>
                                                    <input
                                                        type="text"
                                                        className={
                                                            formCss.formText
                                                        }
                                                        // onChange={onChangeAnswer01}
                                                        {...register(
                                                            'firstName'
                                                        )}
                                                    />
                                                </Item>
                                            </Stack>
                                        </div>
                                    </RegistInput>
                                    <RegistInput>
                                        <div className="label">
                                            氏名（カナ）
                                        </div>
                                        <div className="form">
                                            <Stack spacing={2}>
                                                <Item>
                                                    <input
                                                        type="text"
                                                        className={
                                                            formCss.formText
                                                        }
                                                        // onChange={onChangeAnswer01}
                                                        {...register(
                                                            'lastNameKana',
                                                            {
                                                                pattern:
                                                                    /^[\u30A0-\u30FF]+$/,
                                                            }
                                                        )}
                                                    />
                                                </Item>
                                                <Item>
                                                    <input
                                                        type="text"
                                                        className={
                                                            formCss.formText
                                                        }
                                                        // onChange={onChangeAnswer01}
                                                        {...register(
                                                            'firstNameKana',
                                                            {
                                                                pattern:
                                                                    /^[\u30A0-\u30FF]+$/,
                                                            }
                                                        )}
                                                    />
                                                </Item>
                                            </Stack>
                                        </div>
                                        {(errors.firstNameKana ||
                                            errors.lastNameKana) && (
                                            <span className={formCss.errorText}>
                                                カタカナで入力してください
                                            </span>
                                        )}
                                    </RegistInput>
                                    <RegistInput>
                                        <div className="label">
                                            生年月日
                                            <span className="require">
                                                （※）
                                            </span>
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
                                            <span className="require">
                                                （※）
                                            </span>
                                        </div>
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
                                                        onChange={
                                                            onChangeGender
                                                        }
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
                                                        onChange={
                                                            onChangeGender
                                                        }
                                                    />
                                                    <label htmlFor="male">
                                                        男性
                                                    </label>
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
                            <SubmitButton disabled={isButtonDisabled}>
                                追加する
                            </SubmitButton>
                        </MainBtm>
                    </form>
                </Main>
            </DefaultLayout>
            <CompletedDialog
                isOpen={openDialog}
                onAgree={onFamilyTop}
                buttonText={'OK'}
            >
                ご家族の追加が
                <br />
                完了しました。
            </CompletedDialog>
        </>
    )
}

export default FamilyAddPage
