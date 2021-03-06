import React, { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../components/organisms/OriginalHeader'
import { MainLead } from '../../../components/organisms/Main'
import OriginalRegistNav from '../../../components/organisms/OriginalRegistNav'
import Regist, {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistInput,
} from '../../../components/organisms/OriginalRegist'
import PharmacyList, {
    PharmacyListItem,
    PharmacyListItemInner,
    PharmacyListImg,
    PharmacyListInfo,
    PharmacyListInfoName,
    PharmacyListInfoText,
} from '../../../components/organisms/PharmacyList'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainComment,
    DialogMainNav,
} from '../../../components/organisms/DialogMain'
import { Stack, Item, ItemInline } from '../../../components/atoms/Stack'
import BirthdayDrumroll from '../../../components/atoms/BirthdayDrumroll'
import { Stack as MuiStack, Box } from '@mui/material'
import {
    CloseDialogButton,
    NextDialogButton,
    SubmitButton,
} from '../../../components/atoms/OriginalButton'
import {
    PatientIconTitleWith,
    ClockIconTitleWith,
    CommentIconTitleWith,
    MedicineTitleWith,
} from '../../../components/atoms/OriginalIcon'
import formCss from '../../../components/atoms/OriginalForm.module.scss'
import { RootState } from '../../../store'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { prescriptionSlice } from '../../../store/prescription'
import { prescriptionQuestionSlice } from '../../../store/prescriptionQuestion'
import apiManager from '../../../utilities/apiManager'
import { useGetDay } from '../../../hooks/useGetDay'
import { format } from 'date-fns'

type UserInfoProps = {
    first_name: string
    last_name: string
    first_name_kana: string
    last_name_kana: string
    phone_number: string
    birthday: string
    gender: number
}

type Inputs = {
    lastName: string
    firstName: string
    lastNameKana: string
    firstNameKana: string
    phoneNumber: string
    birthday: string
    day: string
    hour: string
}

type Question = {
    order_question_alias: string
    question_content: string
    store_alias: string
}

const PrescriptionInputPage: React.FC = () => {
    const dispatch = useDispatch()
    const prescription = useSelector((state: RootState) => state.prescription)
    const router = useRouter()
    const auth = useSelector((state: RootState) => state.auth)
    const selectedStore = useSelector((state: RootState) => state.selectedStore)
    const prescriptionQuestion = useSelector(
        (state: RootState) => state.prescriptionQuestion
    )

    // ?????????????????????
    const now = new Date().toLocaleString()
    // ????????????
    const nowObj = {
        time: '',
    }
    nowObj.time =
        Number(now.split(' ')[1].split(':')[0]) < 10
            ? `0${now.split(' ')[1].split(':')[0]}`
            : `${now.split(' ')[1].split(':')[0]}`

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Inputs>()

    // react-hook-form???????????????
    const phoneNumber = watch('phoneNumber')
    const day = watch('day')
    const hour = watch('hour')
    const firstName = watch('firstName')
    const lastName = watch('lastName')
    const firstNameKana = watch('firstNameKana')
    const lastNameKana = watch('lastNameKana')
    const birthday = watch('birthday')

    // TODO: ????????????
    const [openOutsideHoursDialog, setOpenOutsideHoursDialog] = useState(false)
    const [openOutsideHoursScheduleDialog, setOpenOutsideHoursScheduleDialog] =
        useState(false)
    const [openQuestionDialog, setOpenQuestionDialog] = useState(false)

    const [gender, setGender] = useState(0)
    // TODO: ????????????
    const [generic, setGeneric] = useState(false)
    const [questions, setQuestions] = useState<Question[]>([])
    const [comment, setComment] = useState('')
    const [isToday, setIsToday] = useState(true)
    const [isEmpty, setIsEmpty] = useState(false)
    const [userInfo, setUserInfo] = useState<UserInfoProps>()
    const [todayString, setTodayString] = useState('')
    const [nextdayString, setNextdayString] = useState('')
    const [optionsArray, setOptionsArray] = useState<any>([])
    const [regularHolidays, setRegularHolidays] = useState<any>([])
    const [todayBusinessFrom, setTodayBusinessFrom] = useState<number | null>(
        null
    )
    const [todayBusinessEnd, setTodayBusinessEnd] = useState<number | null>(
        null
    )
    const [nextdayBusinessFrom, setNextdayBusinessFrom] = useState<
        number | null
    >(null)
    const [nextdayBusinessEnd, setNextdayBusinessEnd] = useState<number | null>(
        null
    )
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [questionCheckValues, setQuestionCheckValues] = useState<string[]>([])

    //Get user info
    const getUserInfo = () => {
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/order-registration/get-user'
        apiManager
            .action(
                'GET',
                url,
                { store_alias: selectedStore.store_alias },
                // TODO: ???????????? ???????????????????????????auth???key
                // { AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg' }
                { AUTHORIZED_KEY: auth.authorized_key }
            )
            .then((res) => {
                if (res) {
                    setUserInfo(res.data?.user)
                    setQuestions(res.data?.order_questions)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    // react-hook-form
    const onSubmitForm: SubmitHandler<FormData> = (data: any) => {
        const o = {
            visit_at: `${data.day} ${data.hour}`,
            phone_number: data.phoneNumber,
            comment: comment,
            first_name: data.firstName,
            last_name: data.lastName,
            first_name_kana: data.firstNameKana,
            last_name_kana: data.lastNameKana,
            birthday: data.birthday,
            gender: gender,
            day: data.day,
        }
        // ?????????????????????
        const getQuestionObj = () => {
            const qObjs: any[] = []
            questions.map((question: Question, index: number) => {
                // question.question_content

                const qObj = {
                    question_content: question.question_content,
                    question_answer: questionCheckValues[index],
                }
                qObjs.push(qObj)
            })
            return qObjs
        }
        const qArray = getQuestionObj()

        // ????????????????????????redux
        dispatch(prescriptionSlice.actions.updatePrescription(o))
        // ???????????????redux
        dispatch(
            prescriptionQuestionSlice.actions.updatePrescriptionQuestion(qArray)
        )

        // TODO: ????????????????????????????????????
        //????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

        // ??????????????????????????????????????????
        if (
            Number(nowObj.time) < Number(todayBusinessFrom) ||
            Number(nowObj.time) >= Number(todayBusinessEnd)
        ) {
            setOpenOutsideHoursDialog(true)
        } else {
            router.push('/prescription/confirm')
        }
        // ????????????????????????????????????????????????
        // setOpenOutsideHoursScheduleDialog(true)
    }

    // TODO: ????????????
    // const onChangeGeneric = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setGeneric(e.target.checked)
    // }
    // const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setQuestion(e.target.value)
    // }
    // const onChangeQuestionCheckSame = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setCheckSame(!isCheckSame)
    // }
    // useEffect(() => {
    //     const defaultValue = localStorage.getItem('img1')
    //     console.log(defaultValue)
    // })

    // ??????
    const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gender !== Number(e.target.value)) {
            setGender(Number(e.target.value))
        } else {
            setGender(0)
        }
    }

    const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
    }

    const onChangeQuestionCheck = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.target.checked) {
            setQuestionCheckValues(
                questionCheckValues.map(
                    (questionCheckValue: string, _index: number) =>
                        _index === index ? '1' : questionCheckValue
                )
            )
        } else {
            setQuestionCheckValues(
                questionCheckValues.map(
                    (questionCheckValue: string, _index: number) =>
                        _index === index ? '0' : questionCheckValue
                )
            )
        }
    }

    // ?????????????????????????????????????????????
    // type: 'from' / 'end' ??????????????????????????????????????????
    const getBusinessTime = (day: string, type: string) => {
        let result: string = ''
        const targetArray = Object.keys(selectedStore)
        let fromTimeIndex: number
        let endTimeIndex: number
        if (day === 'today') {
            fromTimeIndex = targetArray.findIndex(
                (item) => item === todayString + '_reception_from_time'
            )
            endTimeIndex = targetArray.findIndex(
                (item) => item === todayString + '_reception_end_time'
            )
        } else {
            fromTimeIndex = targetArray.findIndex(
                (item) => item === nextdayString + '_reception_from_time'
            )
            endTimeIndex = targetArray.findIndex(
                (item) => item === nextdayString + '_reception_end_time'
            )
        }

        // @ts-ignore
        if (selectedStore[targetArray[fromTimeIndex]]) {
            if (type === 'from') {
                // @ts-ignore
                result = selectedStore[targetArray[fromTimeIndex]].split(':')[0]
            } else {
                // @ts-ignore
                result = selectedStore[targetArray[endTimeIndex]].split(':')[0]
            }
        }
        return result
    }

    // ???????????????????????????????????????
    const getOptions = () => {
        setValue('hour', '')
        const optionsArray = []
        let storeStart
        let storeEnd
        let _string = ''
        if (isToday) {
            // ???????????????
            storeStart = todayBusinessFrom
            storeEnd = todayBusinessEnd
            if (storeStart != null && storeEnd != null) {
                for (let i = storeStart; i < storeEnd; i++) {
                    _string = `${i}??????`

                    if (i === storeStart && Number(nowObj.time) < storeStart) {
                        // ?????????????????????????????????????????????????????????????????????????????????
                        optionsArray.push(
                            <option value="">????????????????????????</option>
                        )
                    } else if (
                        // ?????????????????????????????????????????????????????????????????????
                        i === storeStart &&
                        Number(nowObj.time) > storeStart &&
                        Number(nowObj.time) < storeEnd
                    ) {
                        optionsArray.push(
                            <option value="">????????????????????????</option>
                        )
                        optionsArray.push(
                            <option value="60?????????">60??????????????????</option>
                        )
                    }
                    // ???????????????n???????????????60?????????????????????????????????????????????{n+2}?????????????????????????????????
                    // ????????????????????????{??????????????????-1}?????????
                    if (
                        i > Number(nowObj.time) + 1 &&
                        Number(nowObj.time) < storeEnd
                    ) {
                        optionsArray.push(
                            <option value={_string}>{_string}</option>
                        )
                    }
                }
            }
        } else {
            // ?????????????????????
            storeStart = nextdayBusinessFrom
            storeEnd = nextdayBusinessEnd
            if (storeStart != null && storeEnd != null) {
                for (let i = storeStart; i < storeEnd; i++) {
                    _string = `${i}??????`
                    if (i === storeStart) {
                        optionsArray.push(
                            <option value="">????????????????????????</option>
                        )
                    }
                    optionsArray.push(
                        <option value={_string}>{_string}</option>
                    )
                    setIsEmpty(false)
                }
            }
        }
        if (optionsArray.length > 0) {
            setIsEmpty(false)
        } else {
            setIsEmpty(true)
        }
        setOptionsArray(optionsArray)
    }
    // ???????????????????????????
    const getRegularHolidays = () => {
        const array = []
        if (selectedStore.sunday_reception_from_time === null) {
            array.push('sunday')
        }
        if (selectedStore.monday_reception_from_time === null) {
            array.push('monday')
        }
        if (selectedStore.tuesday_reception_from_time === null) {
            array.push('tuesday')
        }
        if (selectedStore.wednesday_reception_from_time === null) {
            array.push('wednesday')
        }
        if (selectedStore.thursday_reception_from_time === null) {
            array.push('thursday')
        }
        if (selectedStore.friday_reception_from_time === null) {
            array.push('friday')
        }
        if (selectedStore.saturday_reception_from_time === null) {
            array.push('saturday')
        }
        setRegularHolidays(array)
    }
    // ?????????????????????
    const getPharmacyOpenDays = () => {
        const now = new Date()
        const dayOfWeek = now.getDay()
        setTodayString(useGetDay(now, dayOfWeek))
        let nextday: string = ''
        let nextdayOfWeek: number
        now.setDate(now.getDate() + 1)
        nextdayOfWeek = now.getDay()
        nextday = useGetDay(now, nextdayOfWeek)
        while (regularHolidays.indexOf(nextday) !== -1) {
            now.setDate(now.getDate() + 1)
            nextdayOfWeek = now.getDay()
            nextday = useGetDay(now, nextdayOfWeek)
        }
        setNextdayString(nextday)
    }

    // ??????????????????????????????
    useEffect(() => {
        getUserInfo()
        getRegularHolidays()
        getPharmacyOpenDays()
    }, [])

    useEffect(() => {
        if (prescription.last_name === '') {
            if (userInfo != undefined) {
                setValue('lastName', userInfo.last_name)
                setValue('firstName', userInfo.first_name)
                setValue('lastNameKana', userInfo.last_name_kana)
                setValue('firstNameKana', userInfo.first_name_kana)
                setValue('birthday', userInfo.birthday)
                setValue('phoneNumber', userInfo.phone_number)
                setGender(userInfo.gender)
            }
        } else {
            setValue('lastName', prescription?.last_name)
            setValue('firstName', prescription.first_name)
            setValue('lastNameKana', prescription.last_name_kana)
            setValue('firstNameKana', prescription.first_name_kana)
            setValue('birthday', prescription.birthday)
            setValue('phoneNumber', prescription.phone_number)
            setGender(Number(prescription.gender))
            setValue('day', prescription.day)
            setComment(String(prescription.comment))
            if (prescription.day === '??????') {
                setIsToday(true)
            } else {
                setIsToday(false)
            }
        }
    }, [prescription, userInfo])

    useEffect(() => {
        if (prescriptionQuestion.questions.length > 0) {
            // redux??????????????????????????????????????????????????????
            let initialQuestionArray: any[] = []
            prescriptionQuestion.questions.map(
                (question: any, index: number) => {
                    initialQuestionArray.push(question.question_answer)
                }
            )
            setQuestionCheckValues(initialQuestionArray)
        } else {
            // ??????????????????????????????????????????
            const checkValueArray = new Array<string>(questions.length).fill(
                '0'
            )
            setQuestionCheckValues(checkValueArray)
        }
    }, [questions, prescriptionQuestion])

    useEffect(() => {
        getOptions()
    }, [
        isToday,
        todayBusinessFrom,
        todayBusinessEnd,
        nextdayBusinessFrom,
        nextdayBusinessEnd,
    ])

    useEffect(() => {
        setTodayBusinessFrom(Number(getBusinessTime('today', 'from')))
        setTodayBusinessEnd(Number(getBusinessTime('today', 'end')))
        setNextdayBusinessFrom(Number(getBusinessTime('nextday', 'from')))
        setNextdayBusinessEnd(Number(getBusinessTime('nextday', 'end')))
    }, [nextdayString])

    useEffect(() => {
        if (
            firstName !== '' &&
            firstName != null &&
            lastName !== '' &&
            lastName != null &&
            firstNameKana !== '' &&
            firstNameKana != null &&
            lastNameKana !== '' &&
            lastNameKana != null &&
            birthday !== '' &&
            birthday != null &&
            phoneNumber !== '' &&
            phoneNumber != null &&
            day !== '' &&
            hour !== ''
        ) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }, [
        firstName,
        lastName,
        firstNameKana,
        lastNameKana,
        birthday,
        phoneNumber,
        day,
        hour,
    ])

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="??????????????????"
                    prevURL="back"
                    prevDialog={false}
                    isHomeBtn={false}
                />
                <OriginalRegistNav step={3} total={3} />
                <main className="main">
                    <MainLead>??????????????????????????????????????????</MainLead>
                    <PharmacyList>
                        <PharmacyListItem>
                            <PharmacyListItemInner>
                                <PharmacyListImg>
                                    {' '}
                                    {/* TODO: ???????????? */}
                                    <img
                                        src="/img/pharmacy/thumb_001.jpg"
                                        alt=""
                                    />
                                </PharmacyListImg>
                                <PharmacyListInfo>
                                    <PharmacyListInfoName>
                                        {selectedStore.store_name}
                                    </PharmacyListInfoName>
                                    <PharmacyListInfoText>
                                        {selectedStore.address}
                                    </PharmacyListInfoText>
                                </PharmacyListInfo>
                            </PharmacyListItemInner>
                        </PharmacyListItem>
                    </PharmacyList>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Regist>
                            <RegistSection>
                                <RegistHeader>
                                    <PatientIconTitleWith>
                                        <h2 className="headerTitle">
                                            ????????????????????????????????? <br />
                                            ????????????????????????????????????????????????????????????????????????
                                        </h2>
                                    </PatientIconTitleWith>
                                </RegistHeader>
                                <RegistBody>
                                    <RegistInput>
                                        <div className="label">
                                            ??????????????????
                                            <span className="require">
                                                ?????????
                                            </span>
                                        </div>
                                        <div className="form">
                                            <Stack spacing={2}>
                                                <Item>
                                                    <input
                                                        type="text"
                                                        className={`${formCss.formText} ${formCss.textCenter}`}
                                                        id="lastName"
                                                        {...register(
                                                            'lastName',
                                                            {
                                                                required: true,
                                                            }
                                                        )}
                                                    />
                                                </Item>
                                                <Item>
                                                    <input
                                                        type="text"
                                                        className={`${formCss.formText} ${formCss.textCenter}`}
                                                        id="firstName"
                                                        {...register(
                                                            'firstName',
                                                            {
                                                                required: true,
                                                            }
                                                        )}
                                                    />
                                                </Item>
                                            </Stack>
                                            {(errors.firstName ||
                                                errors.lastName) && (
                                                <span
                                                    className={
                                                        formCss.errorText
                                                    }
                                                >
                                                    ????????????????????????
                                                </span>
                                            )}
                                        </div>
                                    </RegistInput>
                                    <RegistInput>
                                        <div className="label">
                                            ??????????????????
                                            <span className="require">
                                                ?????????
                                            </span>
                                        </div>
                                        <div className="form">
                                            <Stack spacing={2}>
                                                <Item>
                                                    <input
                                                        type="text"
                                                        className={`${formCss.formText} ${formCss.textCenter}`}
                                                        id="lastNameKana"
                                                        {...register(
                                                            'lastNameKana',
                                                            {
                                                                required: true,
                                                                pattern:
                                                                    /^[\u30A0-\u30FF]+$/,
                                                            }
                                                        )}
                                                    />
                                                </Item>
                                                <Item>
                                                    <input
                                                        type="text"
                                                        className={`${formCss.formText} ${formCss.textCenter}`}
                                                        id="firstNameKana"
                                                        {...register(
                                                            'firstNameKana',
                                                            {
                                                                required: true,
                                                                pattern:
                                                                    /^[\u30A0-\u30FF]+$/,
                                                            }
                                                        )}
                                                    />
                                                </Item>
                                            </Stack>
                                            {(errors.firstNameKana ||
                                                errors.lastNameKana) && (
                                                <span
                                                    className={
                                                        formCss.errorText
                                                    }
                                                >
                                                    ???????????????????????????????????????
                                                </span>
                                            )}
                                        </div>
                                    </RegistInput>
                                    <RegistInput>
                                        <div className="label">
                                            ????????????
                                            <span className="require">
                                                ?????????
                                            </span>
                                        </div>
                                        <div className="form">
                                            <Controller
                                                name="birthday"
                                                control={control}
                                                render={({
                                                    field: { onChange, value },
                                                }) => (
                                                    <BirthdayDrumroll
                                                        onChangeBirthday={
                                                            onChange
                                                        }
                                                        error={errors.birthday}
                                                        value={value}
                                                        initial={format(
                                                            new Date(),
                                                            'yyyy-MM-dd'
                                                        )}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </RegistInput>
                                    <RegistInput>
                                        <div className="label">
                                            ??????
                                            <span className="require">
                                                ?????????
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
                                                        checked={gender === 0}
                                                        onChange={
                                                            onChangeGender
                                                        }
                                                    />
                                                    <label htmlFor="female">
                                                        ??????
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
                                                        checked={gender === 1}
                                                        onChange={
                                                            onChangeGender
                                                        }
                                                    />
                                                    <label htmlFor="male">
                                                        ??????
                                                    </label>
                                                </Item>
                                            </Stack>
                                        </div>
                                    </RegistInput>
                                    <RegistInput>
                                        <div className="label">
                                            <MuiStack
                                                direction="row"
                                                spacing={2}
                                            >
                                                <Box>
                                                    ??????????????????
                                                    <span className="require">
                                                        ?????????
                                                    </span>
                                                </Box>
                                                {/* TODO: ????????????????????????????????????????????????????????? */}
                                                {/* <Box>
                                                    <input
                                                        type="checkbox"
                                                        id="checkSame"
                                                        className={`
                                                        ${formCss.formCheckbox} ${formCss.minimum}`}
                                                        onChange={
                                                            onChangeCheckSame
                                                        }
                                                        checked={isCheckSame}
                                                    />
                                                    <label htmlFor="checkSame">
                                                        ???????????????
                                                    </label>
                                                </Box> */}
                                            </MuiStack>
                                        </div>
                                        <div className="form">
                                            <input
                                                type="tel"
                                                className={`${formCss.formText} ${formCss.textCenter}`}
                                                id="phoneNumber"
                                                {...register('phoneNumber', {
                                                    required: true,
                                                    pattern: /^[0-9]+$/,
                                                })}
                                            />
                                        </div>
                                    </RegistInput>
                                </RegistBody>
                            </RegistSection>
                            <RegistSection>
                                <RegistHeader>
                                    <ClockIconTitleWith>
                                        <h2 className="headerTitle">
                                            ????????????
                                        </h2>
                                    </ClockIconTitleWith>
                                </RegistHeader>
                                <RegistBody>
                                    <RegistInput>
                                        <div className="label">
                                            ?????????????????????????????????2??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                        </div>
                                        <div className="form">
                                            <div
                                                className={
                                                    formCss.selectWrapper
                                                }
                                            >
                                                <select
                                                    id="day"
                                                    className={
                                                        formCss.formSelect
                                                    }
                                                    {...register('day', {
                                                        required: true,
                                                    })}
                                                    onChange={() =>
                                                        setIsToday(!isToday)
                                                    }
                                                >
                                                    <option value="??????">
                                                        ??????
                                                    </option>
                                                    <option value="????????????">
                                                        ????????????
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form">
                                            <div
                                                className={
                                                    formCss.selectWrapper
                                                }
                                            >
                                                <select
                                                    id="hour"
                                                    className={
                                                        formCss.formSelect
                                                    }
                                                    {...register('hour', {
                                                        required: true,
                                                    })}
                                                    disabled={
                                                        isEmpty ? true : false
                                                    }
                                                >
                                                    {optionsArray}
                                                </select>
                                            </div>
                                        </div>
                                        {(errors.day || errors.hour) && (
                                            <span className={formCss.errorText}>
                                                ??????????????????
                                            </span>
                                        )}
                                    </RegistInput>
                                </RegistBody>
                            </RegistSection>
                            {questions.length > 0 && (
                                <RegistSection>
                                    <RegistBody>
                                        {questions &&
                                            questions.map(
                                                (
                                                    question: Question,
                                                    index: number
                                                ) => (
                                                    <RegistInput
                                                        key={
                                                            question.order_question_alias
                                                        }
                                                    >
                                                        <div className="form">
                                                            <input
                                                                type="checkbox"
                                                                name={`question${index}`}
                                                                className={
                                                                    formCss.formCheckbox
                                                                }
                                                                id={`question${index}`}
                                                                value={
                                                                    questionCheckValues[
                                                                        index
                                                                    ]
                                                                }
                                                                checked={
                                                                    questionCheckValues[
                                                                        index
                                                                    ] === '1'
                                                                }
                                                                onChange={(e) =>
                                                                    onChangeQuestionCheck(
                                                                        e,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                htmlFor={`question${index}`}
                                                            >
                                                                {
                                                                    question.question_content
                                                                }
                                                            </label>
                                                        </div>
                                                    </RegistInput>
                                                )
                                            )}
                                    </RegistBody>
                                </RegistSection>
                            )}
                            {/* TODO: ???????????? */}
                            {/* <RegistSection>
                                <RegistHeader>
                                    <h2 className="headerTitle">?????????</h2>
                                </RegistHeader>
                                <RegistBody>
                                    <RegistQuestion>
                                        <Link href="#">
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setOpenQuestionDialog(true)
                                                }}
                                            >
                                                <QuestionIcon />
                                            </a>
                                        </Link>
                                    </RegistQuestion>
                                    <RegistInput>
                                        <div className="label">
                                            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                            <br />
                                            ?????????????????????????????????
                                        </div>
                                        <div className="form">
                                            <Stack>
                                                <ItemInline>
                                                    <input
                                                        type="radio"
                                                        className={
                                                            formCss.formRadio
                                                        }
                                                        id="question1"
                                                        value="yes"
                                                        checked={
                                                            question === 'yes'
                                                        }
                                                        onChange={
                                                            onChangeQuestion
                                                        }
                                                    />
                                                    <label htmlFor="question1">
                                                        ??????
                                                    </label>
                                                </ItemInline>
                                                <ItemInline>
                                                    <input
                                                        type="radio"
                                                        className={
                                                            formCss.formRadio
                                                        }
                                                        id="question2"
                                                        value="no"
                                                        checked={
                                                            question === 'no'
                                                        }
                                                        onChange={
                                                            onChangeQuestion
                                                        }
                                                    />
                                                    <label htmlFor="question2">
                                                        ?????????
                                                    </label>
                                                </ItemInline>
                                            </Stack>
                                        </div>
                                    </RegistInput>
                                </RegistBody>
                            </RegistSection> */}
                            <RegistSection>
                                <RegistHeader>
                                    <CommentIconTitleWith>
                                        <h2 className="headerTitle">
                                            ????????????????????????
                                        </h2>
                                    </CommentIconTitleWith>
                                </RegistHeader>
                                <RegistBody>
                                    <RegistInput>
                                        <div className="form">
                                            <textarea
                                                rows={4}
                                                value={comment}
                                                className={formCss.formTextarea}
                                                placeholder="?????????????????????????????????????????????????????????????????????????????????"
                                                onChange={onChangeComment}
                                            ></textarea>
                                        </div>
                                    </RegistInput>
                                </RegistBody>
                            </RegistSection>
                        </Regist>
                        <div className="main-btm">
                            <ul className="main-link">
                                <li>
                                    <SubmitButton disabled={isButtonDisabled}>
                                        ??????
                                    </SubmitButton>
                                </li>
                            </ul>
                        </div>
                    </form>
                </main>
            </DefaultLayout>
            <Dialog
                open={openOutsideHoursDialog}
                sx={{
                    '& .MuiBackdrop-root': {
                        background: 'rgba(0,0,0,0.8)',
                    },
                    '& .MuiDialog-paper': {
                        width: '100%',
                        margin: '16px',
                    },
                }}
            >
                <DialogMain>
                    <DialogMainText>
                        ??????????????????????????????
                        <br />
                        ???????????????????????????????????????
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() => setOpenOutsideHoursDialog(false)}
                            >
                                ???????????????
                            </CloseDialogButton>
                        </li>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    setOpenOutsideHoursDialog(false)
                                    router.push('/prescription/confirm')
                                }}
                            >
                                OK
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>

            {/* TODO: ????????????????????????????????? */}
            {/* <Dialog
                open={openOutsideHoursScheduleDialog}
                sx={{
                    '& .MuiBackdrop-root': {
                        background: 'rgba(0,0,0,0.8)',
                    },
                    '& .MuiDialog-paper': {
                        width: '100%',
                        margin: '16px',
                    },
                }}
            >
                <DialogMain>
                    <DialogMainText>
                        ????????????????????????????????????????????????????????????????????????????????????
                    </DialogMainText>
                    <Box
                        sx={{
                            mt: '20px',
                        }}
                    >
                        <table className={tableCss.table}>
                            <tbody>
                                <tr>
                                    <td width="12%" className={tableCss.th}>
                                        ???
                                    </td>
                                    <td>19:00 ??? 08:00</td>
                                </tr>
                                <tr>
                                    <td className={tableCss.th}>???</td>
                                    <td>19:00 ??? 08:00</td>
                                </tr>
                                <tr>
                                    <td className={tableCss.th}>???</td>
                                    <td>19:00 ??? 08:00</td>
                                </tr>
                                <tr>
                                    <td className={tableCss.th}>???</td>
                                    <td>19:00 ??? 08:00</td>
                                </tr>
                                <tr>
                                    <td className={tableCss.th}>???</td>
                                    <td>19:00 ??? 08:00</td>
                                </tr>
                                <tr>
                                    <td className={tableCss.th}>???</td>
                                    <td>19:00 ??? 08:00</td>
                                </tr>
                                <tr>
                                    <td className={tableCss.th}>???</td>
                                    <td>??????</td>
                                </tr>
                                <tr>
                                    <td className={tableCss.th}>???</td>
                                    <td>??????</td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() =>
                                    setOpenOutsideHoursScheduleDialog(false)
                                }
                            >
                                ???????????????
                            </CloseDialogButton>
                        </li>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    setOpenOutsideHoursScheduleDialog(false)
                                    onSubmit()
                                }}
                            >
                                ?????????
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog> */}
            {/* <Dialog
                open={openQuestionDialog}
                sx={{
                    '& .MuiBackdrop-root': {
                        background: 'rgba(0,0,0,0.8)',
                    },
                    '& .MuiDialog-paper': {
                        width: '100%',
                        margin: '16px',
                    },
                }}
            >
                <DialogMain>
                    <DialogMainText>
                        ????????????????????????
                        <br />
                        ????????????????????????????????????
                        <br />
                        ????????????????????????????????????
                    </DialogMainText>
                    <DialogMainComment>
                        ??????????????????????????????????????????????????????????????????????????????????????????1????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    </DialogMainComment>
                    <Box
                        sx={{
                            mt: '20px',
                            textAlign: 'center',
                        }}
                    >
                        <TextLinkButton
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                setOpenQuestionDialog(false)
                            }}
                        >
                            ???????????????????????????
                            <br />
                            ??????????????????????????????
                        </TextLinkButton>
                    </Box>
                    <DialogMainNav>
                        <li className="big">
                            <NextDialogButton
                                onClick={() => {
                                    router.push('/question')
                                }}
                            >
                                ????????????????????????
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog> */}
        </>
    )
}

export default PrescriptionInputPage
