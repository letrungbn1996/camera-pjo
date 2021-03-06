import React, { useState, useEffect } from 'react'
import router from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Header from '../../../components/organisms/Header'
import RegistNav from '../../../components/organisms/RegistNav'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../../components/organisms/Initial'
import {
    FamilyGroupButton,
    NextDialogButton,
    SelectButton,
    SubmitButton,
} from '../../../components/atoms/Button'
import { Box, Dialog } from '@mui/material'
import formCss from '../../../components/atoms/Form.module.scss'
import { RegistInput } from '../../../components/organisms/Regist'
import DialogMain, {
    DialogMainText,
    DialogMainComment,
} from '../../../components/organisms/DialogMain'
import NavList, { NavListItem } from '../../../components/organisms/NavList'
import apiManager from '../../../utilities/apiManager'
import cookieManagement from '../../../utilities/cookieManagement'
import authManager from '../../../utilities/authManager'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { authSlice } from '../../../store/auth'
import { useForm, SubmitHandler } from 'react-hook-form'

const RegistSecretPage: React.FC = () => {
    const dispatch = useDispatch()
    const profile = useSelector((state: RootState) => state.profile)
    const auth = useSelector((state: RootState) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [selectedQuestionValue01, setSelectedQuestionValue01] = useState(-1)
    const [selectedQuestionValue02, setSelectedQuestionValue02] = useState(-1)
    const [questionType, setQuestionType] = useState<number>(-1)
    const [openDialog, setOpenDialog] = useState(false)
    const [questionString01, setQuestionString01] = useState('')
    const [questionString02, setQuestionString02] = useState('')
    const [selectedItems, setSelectedItems] = useState<any[]>([])
    const [isBtnActive, setBtnActive] = useState(false)
    const [questions, setQuestions] = useState<any[]>([])

    const onSubmitSecret: SubmitHandler<FormData> = (data: any) => {
        let url: string =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/user-registration/store-user'
        apiManager
            .action(
                'POST',
                url,
                {
                    user_registration_token: profile.user_registration_token,
                    birthday: profile.birthday,
                    gender: profile.gender,
                    nickname: profile.nickname,
                    is_push_notification: profile.is_push_notification,
                    secrets_questions: [
                        {
                            question_content: questionString01,
                            answer: data.answer01,
                        },
                        {
                            question_content: questionString02,
                            answer: data.answer02,
                        },
                    ],
                },
                {}
            )
            .then((res) => {
                if (res) {
                    cookieManagement.setCookiesByObject({
                        authorized_key: res.data.authorized_key,
                    })
                    let o = {
                        authorized_key: res.data.authorized_key,
                    }
                    authManager.setAuthKey(res.data.authorized_key)
                    dispatch(authSlice.actions.updateAuth(o))
                    router.push('/register/finish')
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    const onSelectType = (typeNum: number) => {
        const newState = typeNum
        setQuestionType(newState)
    }
    const onSelectQuestion = (questionType: number, index: number) => {
        if (questionType === 0) {
            setQuestionString01(selectedItems[index])
            setSelectedQuestionValue01(index)
        } else {
            setQuestionString02(selectedItems[index])
            setSelectedQuestionValue02(index)
        }
    }
    const handleActive = (index: number) => {
        if (questionType === 0) {
            if (selectedQuestionValue01 === index) {
                return true
            }
        } else {
            if (selectedQuestionValue02 === index) {
                return true
            }
        }
    }

    useEffect(() => {
        // API????????????
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/secrets-questions/choose-contents'
        apiManager
            .action(
                'GET',
                url,
                {},
                {
                    // TODO: ??????????????????????????????
                    // AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg',
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                setQuestions(res?.data.choose_contents)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, [])

    useEffect(() => {
        // ???????????????6???????????????
        if (questionString01.length >= 1 && questionString02.length >= 1) {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    }, [questionString01, questionString02])

    useEffect(() => {
        if (questionType === -1) {
            return
        } else if (questionType === 0 && questions) {
            setSelectedItems(questions[0])
        } else if (questionType === 1 && questions) {
            setSelectedItems(questions[1])
        }
    }, [questionType])

    return (
        <>
            <DefaultLayout>
                <Header title="???????????????" prevURL="back" isHomeBtn={false} />
                {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                    <RegistNav step={2} total={4} app="KHA" />
                ) : (
                    <RegistNav step={2} total={3} />
                )}
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            ?????????????????????????????????????????????????????????????????????????????????????????????????????????2????????????????????????????????????????????????????????????
                        </InitialLead>
                        <form onSubmit={handleSubmit(onSubmitSecret)}>
                            <Box
                                sx={{
                                    py: '15px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">
                                        ??????1???????????????????????????
                                    </div>
                                    <SelectButton
                                        onClick={(e) => {
                                            e.preventDefault
                                            onSelectType(0)
                                            setOpenDialog(true)
                                        }}
                                    >
                                        {questionString01}
                                    </SelectButton>
                                </RegistInput>
                                <RegistInput>
                                    <div className="label">
                                        ?????? ??????????????????????????????????????????
                                    </div>
                                    <input
                                        type="text"
                                        className={formCss.formText}
                                        id="answer01"
                                        {...register('answer01', {
                                            required: true,
                                            pattern: /^([???-???]|\s|???)+$/,
                                        })}
                                    />
                                </RegistInput>
                                {errors.answer01?.type === 'required' ? (
                                    <span className={formCss.errorText}>
                                        ???????????????????????????????????????
                                    </span>
                                ) : errors.answer01?.type === 'pattern' ? (
                                    <span className={formCss.errorText}>
                                        ???????????????????????????????????????
                                    </span>
                                ) : (
                                    ''
                                )}
                            </Box>
                            <Box
                                sx={{
                                    py: '15px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">
                                        ??????2???????????????????????????
                                    </div>
                                    <SelectButton
                                        onClick={(e) => {
                                            e.preventDefault
                                            onSelectType(1)
                                            setOpenDialog(true)
                                        }}
                                    >
                                        {questionString02}
                                    </SelectButton>
                                </RegistInput>
                                <RegistInput>
                                    <div className="label">
                                        ?????? ??????????????????????????????????????????
                                    </div>
                                    <input
                                        type="text"
                                        className={formCss.formText}
                                        id="answer02"
                                        {...register('answer02', {
                                            required: true,
                                            pattern: /^([???-???]|\s|???)+$/,
                                        })}
                                    />
                                </RegistInput>
                                {errors.answer02?.type === 'required' ? (
                                    <span className={formCss.errorText}>
                                        ???????????????????????????????????????
                                    </span>
                                ) : errors.answer02?.type === 'pattern' ? (
                                    <span className={formCss.errorText}>
                                        ???????????????????????????????????????
                                    </span>
                                ) : (
                                    ''
                                )}
                            </Box>
                            <InitialBtm>
                                <SubmitButton disabled={!isBtnActive}>
                                    ??????
                                </SubmitButton>
                            </InitialBtm>
                        </form>
                    </InitialSection>
                </Initial>
            </DefaultLayout>
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
                    <DialogMainText>??????{questionType + 1}</DialogMainText>
                    <DialogMainComment>
                        ??????????????????????????????????????????????????????????????????????????????
                    </DialogMainComment>
                    <Box
                        sx={{
                            mt: '20px',
                        }}
                    >
                        <NavList>
                            {selectedItems &&
                                selectedItems.map(
                                    (questionString: string, index: number) => (
                                        <NavListItem>
                                            <FamilyGroupButton
                                                active={handleActive(index)}
                                                onClick={(e) => {
                                                    e.preventDefault
                                                    onSelectQuestion(
                                                        questionType,
                                                        index
                                                    )
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    {questionString}
                                                </Box>
                                            </FamilyGroupButton>
                                        </NavListItem>
                                    )
                                )}
                        </NavList>
                    </Box>
                    <Box
                        sx={{
                            mt: '20px',
                        }}
                    >
                        <NextDialogButton
                            onClick={(e) => {
                                e.preventDefault
                                setOpenDialog(false)
                            }}
                        >
                            ??????
                        </NextDialogButton>
                    </Box>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default RegistSecretPage
