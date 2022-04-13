import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../components/organisms/OriginalHeader'
import OriginalRegistNav from '../../../../components/organisms/OriginalRegistNav'
import Main, { MainBody, MainBtm } from '../../../../components/organisms/Main'
import {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistLink,
    RegistInput,
} from '../../../../components/organisms/OriginalRegist'
import { NextButton } from '../../../../components/atoms/OriginalButton'
import { UnregisteredButton } from '../../../../components/atoms/OnlineButton'
import {
    DocumentIconTitleWith,
    PharmacyIconTitleWith,
    PatientIconTitleWith,
    ClockIconTitleWith,
    PaymentIconTitleWith,
    InsuranceIconTitleWith,
} from '../../../../components/atoms/OriginalIcon'
import { OnlineBadge } from '../../../../components/atoms/OnlineBadge'
import { Box } from '@mui/material'

const OnlineDetailPage: React.FC = () => {
    const router = useRouter()
    const [isValidateCalendar, setValidateCalendar] = useState(false)
    const [isValidatePayment, setValidatePayment] = useState(false)
    const [isValidateInsurance, setValidateInsurance] = useState(false)
    const [isValidateAll, setValidateAll] = useState(false)

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="予約・申込み情報"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <OriginalRegistNav step={4} total={4} />
                <Main>
                    <MainBody>
                        <Box mb="20px" lineHeight="22px">
                            お申し込み情報をご確認ください
                        </Box>
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
                                <Box textAlign="center">○○薬局　大手町店</Box>
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
                                        川野 裕子（本人）
                                        <br />
                                        1973年02月02日生　女性
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
                            {isValidateCalendar ? (
                                <RegistLink href="/online/application/calendar">
                                    2021年11月25日（木）
                                    <br />
                                    10:30～11:00
                                </RegistLink>
                            ) : (
                                <RegistBody>
                                    <UnregisteredButton href="/online/application/calendar">
                                        未登録
                                    </UnregisteredButton>
                                </RegistBody>
                            )}
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <PaymentIconTitleWith>
                                    <h2 className="headerTitle">支払方法</h2>
                                </PaymentIconTitleWith>
                            </RegistHeader>
                            {isValidatePayment ? (
                                <RegistLink href="/online/application/payment">
                                    クレジットカード
                                    <br />
                                    **** **** **** 1234
                                    <br />
                                    07/2022
                                </RegistLink>
                            ) : (
                                <RegistBody>
                                    <UnregisteredButton href="/online/application/payment">
                                        未登録
                                    </UnregisteredButton>
                                </RegistBody>
                            )}
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <InsuranceIconTitleWith>
                                    <h2 className="headerTitle">保険証等</h2>
                                </InsuranceIconTitleWith>
                            </RegistHeader>
                            {isValidateInsurance ? (
                                <RegistLink href="/online/application/insurance">
                                    <OnlineBadge>保険証</OnlineBadge>
                                    <Box pt="10px" pb="5px" width="160px">
                                        <img
                                            src="/img/temp/img_insurance_sample.jpg"
                                            alt=""
                                        />
                                    </Box>
                                    <Box fontSize="13px">
                                        ※保険証等のおもて面を撮影してください。
                                    </Box>
                                </RegistLink>
                            ) : (
                                <RegistBody>
                                    <UnregisteredButton href="/online/application/insurance">
                                        未登録
                                    </UnregisteredButton>
                                </RegistBody>
                            )}
                        </RegistSection>
                    </MainBody>
                    <MainBtm>
                        <NextButton
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                router.push('/online/application/finish')
                            }}
                            disabled={!isValidateAll}
                        >
                            次へ
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default OnlineDetailPage
