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

    // ??????????????????0?????????
    const suppressZero = (string: string) => {
        return string.replace(/^0+/, '')
    }

    // ======================================================
    // ????????????
    // ======================================================

    // ????????????????????????????????????
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

    // ????????????????????????
    const Picker = require('better-picker')
    // ??????????????????????????????
    const initialYear = inputBirthdayObj.year
    const initialMonth = inputBirthdayObj.month
    const initialDay = inputBirthdayObj.date
    const [year, setYear] = useState(initialYear)
    const currentYearRef = useRef('')
    currentYearRef.current = year // year?????????????????????
    const [month, setMonth] = useState(initialMonth)
    const currentMonthRef = useRef('')
    currentMonthRef.current = month // month?????????????????????
    const initialYearIndex = years.findIndex(
        (el) => el['value'] === initialYear
    )
    const initialMonthIndex = months.findIndex(
        (el) => el['value'] === initialMonth
    )
    const initialDayIndex = days31.findIndex((el) => el['value'] === initialDay)
    // ????????????????????????
    const picker = useMemo(
        () =>
            new Picker({
                data: [years, months, days31],
                selectedIndex: [
                    initialYearIndex,
                    initialMonthIndex,
                    initialDayIndex,
                ],
                title: '????????????',
            }),
        []
    )

    const birthInputEl = useRef<HTMLInputElement>(null)
    // ????????????????????????????????????????????????
    const onFocusBirthday = () => {
        // ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        birthInputEl?.current?.blur()
        picker.show()
    }
    // ??????????????????
    picker.on(
        'picker.select',
        function (selectedVal: string[], selectedIndex: number[]) {
            // selectedVal : ??????????????????????????????????????????value["1970", "1", "7"]
            // selectedIndex : ????????????????????????????????????????????????[0, 1, 2]
            // ?????????????????????
            setBirthday(
                selectedVal[0] +
                    '-' +
                    ('0' + selectedVal[1]).slice(-2) +
                    '-' +
                    ('0' + selectedVal[2]).slice(-2)
            )
            setDisplayBirthday(
                selectedVal[0] +
                    '???' +
                    ('0' + selectedVal[1]).slice(-2) +
                    '???' +
                    ('0' + selectedVal[2]).slice(-2) +
                    '???'
            )
        }
    )
    // ??????????????????
    picker.on('picker.change', function (index: number, selectedIndex: number) {
        // index : ?????????????????????????????????0 | 1 | 2???
        // selectedIndex : ????????????????????????????????????????????????0 | 1 | 2 ????????????
        // ???????????????????????????????????????????????????
        const getLastDay = () => {
            // ?????????????????????
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
        // ???
        if (index === 0) {
            setYear(years[selectedIndex].value)
            getLastDay()
        }
        // ???
        if (index === 1) {
            setMonth(months[selectedIndex].value)
            getLastDay()
        }
    })
    // ======================================================

    // ??????
    const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gender !== e.target.value) {
            setGender(e.target.value)
        } else {
            setGender('')
        }
    }

    // TODO: ?????????????????????????????????
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
                        // TODO: ?????????authkey??????????????????
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

    // ??????????????????????????????
    useEffect(() => {
        setBirthday(
            `${birthdayObj.year}-${birthdayObj.month}-${birthdayObj.date}`
        )
        setDisplayBirthday(
            `${birthdayObj.year}???${birthdayObj.month}???${birthdayObj.date}???`
        )
        if (patientData) {
            setGender(String(patientData.gender))
        }
    }, [])

    useEffect(() => {
        // ???????????????????????????????????????????????????????????????????????????
        document.querySelectorAll('.mask-hook').forEach(function (mask) {
            mask.addEventListener('click', function () {
                picker.hide()
            })
        })
        // ??????????????????????????????????????? ??? ????????????
        document.querySelectorAll('.cancel-hook').forEach(function (cancel) {
            cancel.innerHTML = '?????????'
        })
        // ??????????????????????????????????????? ??? OK???
        document.querySelectorAll('.confirm-hook').forEach(function (confirm) {
            confirm.innerHTML = 'OK'
        })
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MainLead>???????????????????????????????????????</MainLead>
            <MainBody>
                <RegistSection>
                    <RegistHeader>
                        <h2 className="headerTitle">
                            ???????????????????????????????????????
                        </h2>
                    </RegistHeader>
                    <RegistBody>
                        <RegistInput>
                            <div className="label">
                                ??????????????????
                                <span className="require">?????????</span>
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
                                    ?????????????????????????????????????????????
                                </span>
                            )}
                        </RegistInput>
                        <RegistInput>
                            <div className="label">??????????????????</div>
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
                            <div className="label">??????????????????</div>
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
                                    ???????????????????????????????????????
                                </span>
                            )}
                        </RegistInput>
                        <RegistInput>
                            <div className="label">
                                ????????????
                                <span className="require">?????????</span>
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
                                    ???????????????????????????????????????
                                </span>
                            )}
                        </RegistInput>
                        <RegistInput>
                            <div className="label">
                                ??????
                                <span className="require">?????????</span>
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
                                        <label htmlFor="female">??????</label>
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
                                        <label htmlFor="male">??????</label>
                                    </Item>
                                </Stack>
                            </div>
                            {isSubmit && gender === '' && (
                                <span className={formCss.errorText}>
                                    ?????????????????????????????????
                                </span>
                            )}
                        </RegistInput>
                        <RegistInput>
                            <div className="label">??????</div>
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
                <SubmitButton>????????????</SubmitButton>
            </MainBtm>
        </form>
    )
}
export default EditPatientProfileForm
