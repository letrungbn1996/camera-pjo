import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../components/organisms/OriginalHeader'
import Main, { MainBtm } from '../../../../components/organisms/Main'
import Regist, {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistLink,
    RegistInput,
} from '../../../../components/organisms/OriginalRegist'
import {
    OnlineLead,
    OnlineLeadText,
    OnlineLeadLabel,
} from '../../../../components/organisms/OnlineNav'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainComment,
    DialogMainNav,
} from '../../../../components/organisms/DialogMain'
import {
    NextButton,
    CloseDialogButton,
    NextDialogButton,
} from '../../../../components/atoms/OriginalButton'
import {
    DocumentIconTitleWith,
    PharmacyIconTitleWith,
    PatientIconTitleWith,
    ClockIconTitleWith,
    PaymentIconTitleWith,
    InsuranceIconTitleWith,
} from '../../../../components/atoms/OriginalIcon'
import { OnlineBadge } from '../../../../components/atoms/OnlineBadge'
import { Box, Typography } from '@mui/material'
import formCss from '../../../../components/atoms/OriginalForm.module.scss'
import apiManager from '../../../../utilities/apiManager'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { useBookingStatus } from '../../../../hooks/useBookingStatus'
import { useGenderString } from '../../../../hooks/useGenderString'
import { useGetDayJa, format } from '../../../../hooks/date'
import { useImageType } from '../../../../hooks/useImageType'

const OnlineDetailPage: React.FC = () => {
    const router = useRouter()
    const auth = useSelector((state: RootState) => state.auth)
    const [openCancelDialog, setOpenCancelDialog] = useState(false)
    const [isErrorText, setIsErrorText] = useState(false)
    const [openCancelFinishDialog, setOpenCancelFinishDialog] = useState(false)
    const [dataReservation, setDataReservation] = useState<any>({})
    const [reason, setReason] = useState<any>()

    useEffect(() => {
        if (router.query?.applicationId) {
            const url =
                process.env.NEXT_PUBLIC_NLP_API_URL +
                '/mpp/omi/reservations/' +
                router.query?.applicationId
            apiManager
                .action(
                    'GET',
                    url,
                    {},
                    {
                        AUTHORIZED_KEY: auth.authorized_key,
                    }
                )
                .then((res) => {
                    if (res?.data?.reservation) {
                        const convertData = useBookingStatus(res.data.reservation)
                        console.log(convertData)
                        setDataReservation(convertData)
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                })
        }
    }, [router.query?.applicationId])


    // 予約をキャンセル
    const onCancel = () => {
        console.log(reason);
        
        const url =
                process.env.NEXT_PUBLIC_NLP_API_URL +
                '/mpp/omi/reservations/cancel/' +
                router.query?.applicationId
            apiManager
                .action(
                    'POST',
                    url,
                    {
                        cancel_reason: reason
                    },
                    {
                        AUTHORIZED_KEY: auth.authorized_key,
                    }
                )
                .then((res) => {
                    console.log(res);
                    if (res?.status === 200) {
                        setOpenCancelDialog(false)
                        setOpenCancelFinishDialog(true)
                        setIsErrorText(false)
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                })
        
    }

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="お申込み情報"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Main>
                    <OnlineLead>
                        <OnlineLeadText>
                            {format(dataReservation.reserve_at, "jaDate")} ({useGetDayJa(dataReservation.reserve_at)})
                        </OnlineLeadText>
                        <OnlineLeadLabel>{dataReservation.status}</OnlineLeadLabel>
                    </OnlineLead>
                    <Box py="16px" px="14px">
                        お申し込み情報をご確認ください
                    </Box>
                    <Regist>
                        <RegistSection>
                            <RegistHeader>
                                <DocumentIconTitleWith>
                                    <h2 className="headerTitle">
                                        お申込み内容
                                    </h2>
                                </DocumentIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                                <Box textAlign="center">オンライン服薬指導</Box>
                            </RegistBody>
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <PharmacyIconTitleWith>
                                    <h2 className="headerTitle">利用薬局</h2>
                                </PharmacyIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                                <Box textAlign="center">
                                    {dataReservation.store_name}
                                </Box>
                            </RegistBody>
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <PatientIconTitleWith>
                                    <h2 className="headerTitle">利用者</h2>
                                </PatientIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                                <RegistInput>
                                    <div className="label">利用者</div>
                                    <Box lineHeight="24px">
                                        {dataReservation.first_name}{' '}
                                        {dataReservation.last_name} (
                                        {dataReservation.relationship})
                                        <br />
                                        {dataReservation.birthday}生　
                                        {useGenderString(dataReservation.gender)}
                                    </Box>
                                </RegistInput>
                            </RegistBody>
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <ClockIconTitleWith>
                                    <h2 className="headerTitle">
                                        予約希望日時
                                    </h2>
                                </ClockIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                            {dataReservation.start_schedule_at ?
                                (<RegistLink href="/online/application/calendar">
                                    {format(dataReservation.start_schedule_at, "jaDate")}
                                    ({useGetDayJa(dataReservation.start_schedule_at)})
                                    <br />
                                    {format(dataReservation.start_schedule_at, "hm")}～
                                    {format(dataReservation.finish_schedule_at, "hm")}
                                </RegistLink>) :
                                <Box textAlign="center">データがありません</Box>
                            }
                            </RegistBody>
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <PaymentIconTitleWith>
                                    <h2 className="headerTitle">支払方法</h2>
                                </PaymentIconTitleWith>
                            </RegistHeader>
                            <RegistLink href="/online/application/payment">
                                クレジットカード
                                <br />
                                **** **** **** {dataReservation.credit_card_number_last_4_digits}
                                <br />
                            </RegistLink>
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <InsuranceIconTitleWith>
                                    <h2 className="headerTitle">保険証等</h2>
                                </InsuranceIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                                { dataReservation.evidence_images && dataReservation.evidence_images.length ? 
                                    (
                                        dataReservation.evidence_images.map((img:any)=> {
                                            return (
                                            <Box>
                                                <OnlineBadge>{useImageType(img.evidence_kind)?.label}</OnlineBadge>
                                                <Box pt="10px" pb="5px" width="160px">
                                                    <img
                                                        src={img.image}
                                                        alt={useImageType(img.evidence_kind)?.label}
                                                    />
                                                </Box>
                                            </Box>
                                            )
                                        })
                                    ) :
                                    <Box textAlign="center">データがありません</Box>
                                }
                            </RegistBody>
                        </RegistSection>
                    </Regist>
                    {
                     (dataReservation.status == "予約確定" || dataReservation.status == "予約確認中") &&
                        <MainBtm>
                        <NextButton
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                setOpenCancelDialog(true)
                            }}
                        >
                            キャンセルする
                        </NextButton>
                    </MainBtm>
                    }
                </Main>
            </DefaultLayout>
            <Dialog
                open={openCancelDialog}
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
                        お申し込みを
                        <br />
                        キャンセルしますか？
                    </DialogMainText>
                    <DialogMainComment>
                        <textarea
                            rows={8}
                            className={formCss.formTextarea}
                            placeholder="キャンセルする理由をご入力くください。"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            onInput={(e: any) => {
                                if (e.target.value.length > 200) {
                                    setIsErrorText(true);
                                } else {
                                    setIsErrorText(false);
                                }
                            }}
                        ></textarea>
                        {isErrorText && <Typography sx={{ fontStyle: 'italic', fontSize: '0.875rem', color: 'red', mt: 1}}>200文字以内ご入力ください。</Typography>}
                    </DialogMainComment>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() => {
                                    setIsErrorText(false)
                                    setOpenCancelDialog(false)
                                }}
                            >
                                閉じる
                            </CloseDialogButton>
                        </li>
                        <li>
                            <NextDialogButton onClick={() => onCancel()}>
                                キャンセルする
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
            <Dialog
                open={openCancelFinishDialog}
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
                        お申し込みを
                        <br />
                        キャンセルしました。
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    router.push('/online')
                                }}
                            >
                                閉じる
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default OnlineDetailPage
