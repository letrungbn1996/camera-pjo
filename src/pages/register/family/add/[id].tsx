import React, { useState, useEffect, useContext, useMemo, useRef } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AppContext } from '../../../../providers/AppProvider'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Header from '../../../../components/organisms/Header'
import ErrorDialog from '../../../../components/organisms/ErrorDialog'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../../../components/organisms/Initial'
import RegistNav from '../../../../components/organisms/RegistNav'
import { RegistInput } from '../../../../components/organisms/Regist'
import { Stack, Item } from '../../../../components/atoms/Stack'
import {
    NextButton,
    NextDialogButton,
    SecondaryButton,
} from '../../../../components/atoms/Button'
import { Box } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainComment,
    DialogErrorText,
    DialogMainLoading,
    DialogMainNav,
} from '../../../../components/organisms/DialogMain'
import CircularProgress from '@mui/material/CircularProgress'
import formCss from '../../../../components/atoms/Form.module.scss'
import apiManager from '../../../../utilities/apiManager'
import {
    years,
    months,
    days31,
    days30,
    days29,
    days28,
} from '../../../../types/Calendar'
import { useSwitchAuthKeyMethod } from '../../../../hooks/useSwitchAuthKeyMethod'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'

const RegistPage: NextPage = () => {
    const router = useRouter()
    const app = useContext(AppContext)
    // const auth_key = useSwitchAuthKeyMethod()
    const auth = useSelector((state: RootState) => state.auth)

    const [routId, setRoutId] = useState(1)
    const [isBtnActive, setBtnActive] = useState(false)
    const [gender, setGender] = useState('')
    const [nickname, setNickname] = useState('')
    const [relationship, setRelationship] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [error460Message, setError460Message] = useState('')
    const [openErrorDialog, setOpenErrorDialog] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [isError, setIsError] = useState(false)
    // TODO: ?????? ??????????????????????????????????????????
    const [isLoading, setIsLoading] = useState(false)
    const [birthday, setBirthday] = useState('')
    const [displayBirthday, setDisplayBirthday] = useState('')

    // ?????????????????????????????????????????????????????????
    useEffect(() => {
        setBtnActive(false)
        setGender('')
        setNickname('')
        setRelationship('')
        setBirthday('')
        setDisplayBirthday('')
        setIsFinished(false)
        setIsError(false)
        setIsLoading(false)
    }, [router.query.id])

    useEffect(() => {
        if (nickname.length >= 1 && gender !== '' && birthday !== '') {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    }, [nickname, gender])

    // ======================================================
    // ????????????
    // ======================================================
    const Picker = require('better-picker')
    // ??????????????????????????????
    const initialYear = '1970'
    const initialMonth = '1'
    const initialDay = '1'
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

    // ??????????????????
    const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        // 20?????????????????????
        if (val.length <= 20) {
            setNickname(val)
        }
    }

    // ??????????????????
    const onChangeRelationship = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        setRelationship(val)
    }

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setIsLoading(true)
        // API ???????????????
        let url: string =
            process.env.NEXT_PUBLIC_NLP_API_URL + '/mpp/patients/store'
        apiManager
            .action(
                'POST',
                url,
                {
                    birthday: birthday,
                    gender: gender,
                    nickname: nickname,
                    relationship: relationship,
                },
                {
                    // AUTHORIZED_KEY: auth_key,
                    AUTHORIZED_KEY: auth.authorized_key,
                },
                false
            )
            .then((res) => {
                setIsLoading(false)
                setIsFinished(true)
                setOpenDialog(true)
            })
            .catch((error) => {
                console.log(error.response)
                setTimeout(() => {
                    setIsError(true)
                }, 1500)
                setTimeout(() => {
                    setOpenDialog(false)
                    if (error.response.status == 460) {
                        setError460Message(error.response.data.message)
                        setOpenErrorDialog(true)
                    }
                }, 3000)
            })
    }

    const onAgree = () => {
        if (routId <= 4) {
            setOpenDialog(false)
            router.push(`/register/family/add/${routId + 1}`)
        } else {
            router.push(app.id === 'KHA' ? '/register/pharmacy' : '/home')
        }
    }

    let content: JSX.Element
    const getDialogContent = () => {
        if (isFinished) {
            content = (
                <>
                    <DialogMainText>???????????????????????????????????????</DialogMainText>
                    <DialogMainComment>
                        {(routId == undefined || routId <= 4) && (
                            <Box sx={{ textAlign: 'center' }}>
                                ?????????????????????????????????????????????
                            </Box>
                        )}
                    </DialogMainComment>
                </>
            )
        } else if (isError) {
            content = (
                <>
                    <DialogErrorText>
                        ??????????????????????????????
                        <br />
                        ????????????????????????????????????
                    </DialogErrorText>
                </>
            )
        }
        // TODO: ?????? ???????????????????????????????????????????????????????????????
        // else if (isLoading) {
        //     content = (
        //         <>
        //             <DialogMainText>
        //                 ???????????????
        //                 <br />
        //                 ????????????????????????
        //             </DialogMainText>
        //             <DialogMainLoading>
        //                 <CircularProgress />
        //             </DialogMainLoading>
        //         </>
        //     )
        // }
        return content
    }

    useEffect(() => {
        if (router.query.id) {
            setRoutId(Number(router.query.id))
        }
    }, [router.query.id])

    return (
        <>
            <DefaultLayout>
                <Header
                    title={`?????????????????????${router.query.id}?????????`}
                    prevURL="/register/family"
                    isHomeBtn={false}
                />
                {app.id === 'KHA' ? (
                    <RegistNav step={3} total={4} app="KHA" />
                ) : (
                    <RegistNav step={3} total={3} />
                )}
                <Initial multiNav={true}>
                    <InitialSection>
                        <InitialLead>
                            ?????????????????????????????????????????????????????????????????????????????????
                        </InitialLead>

                        <Box
                            sx={{
                                py: '15px',
                            }}
                        >
                            <RegistInput>
                                <div className="label">????????????</div>
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
                                <div className="label">??????</div>
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
                            </RegistInput>
                        </Box>
                        <Box
                            sx={{
                                pb: '15px',
                            }}
                        >
                            <RegistInput>
                                <div className="label">??????????????????</div>
                                <div className="form">
                                    <input
                                        type="text"
                                        value={nickname}
                                        className={formCss.formText}
                                        onChange={onChangeNickname}
                                        placeholder="?????????????????????????????????"
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
                                <div className="label">??????????????????</div>
                                <div className="form">
                                    <input
                                        type="text"
                                        value={relationship}
                                        className={formCss.formText}
                                        onChange={onChangeRelationship}
                                    />
                                </div>
                            </RegistInput>
                        </Box>
                    </InitialSection>
                    <InitialBtm>
                        <Box
                            sx={{
                                pb: '15px',
                            }}
                        >
                            <NextButton
                                href="#"
                                onClick={onSubmit}
                                disabled={!isBtnActive}
                            >
                                ????????????
                            </NextButton>
                        </Box>
                        <SecondaryButton
                            href={
                                app.id === 'KHA'
                                    ? '/register/pharmacy'
                                    : '/home'
                            }
                        >
                            ?????????????????????????????????
                        </SecondaryButton>
                    </InitialBtm>
                </Initial>
            </DefaultLayout>
            {/* <Dialog
                open={openDialog}
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
                <DialogMain></DialogMain>
            </Dialog> */}
            <Dialog
                open={openDialog}
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
                    <DialogMainText>{getDialogContent()}</DialogMainText>
                    <DialogMainNav>
                        <li>
                            <NextDialogButton onClick={() => onAgree()}>
                                ??????
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
            <ErrorDialog
                isOpen={openErrorDialog}
                errorMessage={error460Message}
                setDialogOpen={setOpenErrorDialog}
            />
            {/* <Dialog
                open={openErrorDialog}
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
                    <>
                        <DialogMainText>{error460Message}</DialogMainText>
                        <DialogMainNav>
                            <li>
                                <CloseDialogButton
                                    onClick={() => {
                                        setOpenErrorDialog(false)
                                    }}
                                >
                                    ?????????
                                </CloseDialogButton>
                            </li>
                        </DialogMainNav>
                    </>
                </DialogMain>
            </Dialog> */}
        </>
    )
}

export default RegistPage
