import React from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../components/organisms/OriginalHeader'
import Main, { MainBody, MainBtm } from '../../../components/organisms/Main'
import {
    RegistSection,
    RegistHeader,
    RegistLink,
} from '../../../components/organisms/OriginalRegist'
import { NextButton } from '../../../components/atoms/OriginalButton'
import { PaymentIconTitleWith } from '../../../components/atoms/OriginalIcon'

const SettingsPaymentPage: React.FC = () => {
    const router = useRouter()

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="お支払い情報"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Main>
                    <MainBody>
                        <RegistSection>
                            <RegistHeader>
                                <PaymentIconTitleWith>
                                    <h2 className="headerTitle">
                                        登録クレジットカード情報
                                    </h2>
                                </PaymentIconTitleWith>
                            </RegistHeader>
                            <RegistLink href="/settings/payment/credit">
                                末尾 1100
                                <br />
                                有効期限：09/2024
                            </RegistLink>
                        </RegistSection>
                    </MainBody>
                    <MainBtm>
                        <NextButton
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                router.push('/settings/payment/credit')
                            }}
                        >
                            クレジットカードを変更
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default SettingsPaymentPage
