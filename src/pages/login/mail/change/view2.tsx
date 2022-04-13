import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Header from '../../../../components/organisms/Header'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../../../components/organisms/Initial'
import { RegistInput } from '../../../../components/organisms/Regist'
import {
    SubmitButton,
    SelectButton,
    NextDialogButton,
    FamilyGroupButton,
    TextLinkButton,
} from '../../../../components/atoms/Button'

import { Box, Dialog } from '@mui/material'
import formCss from '../../../../components/atoms/Form.module.scss'
import swrExecuter from '../../../../utilities/swrExecuter'
// import apiManager from '../../../../utilities/apiManager'
import cookieManagement from '../../../../utilities/cookieManagement'
import DialogMain, {
    DialogMainText,
    DialogMainComment,
} from '../../../../components/organisms/DialogMain'
import NavList, { NavListItem } from '../../../../components/organisms/NavList'

const LoginPage: NextPage = () => {
    const router = useRouter()
    const [selectedQuestionValue01, setSelectedQuestionValue01] = useState(-1)
    const [selectedQuestionValue02, setSelectedQuestionValue02] = useState(-1)
    const [questionType, setQuestionType] = useState<number>(0)
    const [openDialog, setOpenDialog] = useState(false)
    const [questionString01, setQuestionString01] = useState('')
    const [questionString02, setQuestionString02] = useState('')
    // const [errorStatus, setErrorStatus] = useState('')
    const [selectedItems, setSelectedItems] = useState<any[]>([])

    // API質問取得
    const url =
        process.env.NEXT_PUBLIC_NLP_API_URL +
        '/mpp/secrets-questions/choose-contents'
    const { data, error } = swrExecuter.execute(
        url,
        { page: 1 },
        { AUTHORIZED_KEY: cookieManagement.getByKey('AUTHORIZED_KEY') }
    )
    let questions: any = []
    if (data) {
        questions = data.data.choose_contents
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

    const onChangeQuestion = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let val = parseInt(e.target.value)
        setQuestionType(val)
    }

    useEffect(() => {
        if (questionType === -1) {
            return
        } else if (questionType === 0 && questions) {
            setSelectedItems(questions[0])
        } else if (questionType === 1 && questions) {
            setSelectedItems(questions[1])
        }
    }, [questionType, questions])

    // フォームにあるフィールドの型の定義
    type FormData = {
        questionNumber: number
        questionString: string
        answer: string
    }

    // フォームの初期設定
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            questionNumber: questionType,
            questionString: '',
            answer: '',
        },
    })

    // 送信時の処理
    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (questionType === 0) {
            data.questionString = questionString01
        } else {
            data.questionString = questionString02
        }
        console.log(data)
        router.push('/login/mail/change/view3')
    }

    return (
        <>
            <DefaultLayout>
                <Header title="ご本人確認" prevURL="back" isHomeBtn={false} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Initial>
                        <InitialSection>
                            <InitialLead>
                                会員登録時に設定している2つの秘密の質問のうち1つを選択の上、回答してください。
                            </InitialLead>
                            <Box
                                sx={{
                                    pt: '25px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">
                                        質問を選択してください
                                    </div>
                                    <div className={formCss.selectWrapper}>
                                        <select
                                            {...register('questionNumber')}
                                            className={formCss.formSelect}
                                            onChange={onChangeQuestion}
                                        >
                                            <option value="0">質問1</option>
                                            <option value="1">質問2</option>
                                        </select>
                                    </div>
                                </RegistInput>
                                <RegistInput>
                                    <SelectButton
                                        onClick={(e) => {
                                            e.preventDefault
                                            setOpenDialog(true)
                                        }}
                                    >
                                        {questionType === 0 &&
                                            (questionString01 !== ''
                                                ? questionString01
                                                : '質問を選択')}
                                        {questionType === 1 &&
                                            (questionString02 !== ''
                                                ? questionString02
                                                : '質問を選択')}
                                    </SelectButton>
                                </RegistInput>
                            </Box>

                            <Box
                                sx={{
                                    pt: '15px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">
                                        回答 ※ひらがなで入力してください
                                    </div>
                                    <div className="form">
                                        <input
                                            type="text"
                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                            placeholder="回答を入力"
                                            {...register('answer', {
                                                required: true,
                                                pattern: /^[\u3041-\u3096]+$/i,
                                            })}
                                        />
                                        {errors.answer?.type === 'required' && (
                                            <span className={formCss.errorText}>
                                                回答は必須です
                                            </span>
                                        )}
                                        {errors.answer?.type === 'pattern' && (
                                            <span className={formCss.errorText}>
                                                ひらがなで入力してください
                                            </span>
                                        )}
                                    </div>
                                </RegistInput>
                            </Box>
                            <Box
                                sx={{
                                    pt: '24px',
                                    textAlign: 'center',
                                }}
                            >
                                <TextLinkButton href="#">
                                    質問の回答を忘れてしまった
                                </TextLinkButton>
                            </Box>
                        </InitialSection>
                        <InitialBtm>
                            <SubmitButton>次へ</SubmitButton>
                        </InitialBtm>
                    </Initial>
                </form>
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
                    <DialogMainText>質問{questionType + 1}</DialogMainText>
                    <DialogMainComment>
                        以下の中から質問を一つ選択して、回答をしてください。
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
                                        <NavListItem key={index}>
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
                            はい
                        </NextDialogButton>
                    </Box>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default LoginPage
