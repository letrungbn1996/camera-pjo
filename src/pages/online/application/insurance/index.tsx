import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../components/organisms/OriginalHeader'
import Main, {
    MainLead,
    MainBody,
    MainBtm,
} from '../../../../components/organisms/Main'
import {
    RegistSection,
    RegistHeader,
    RegistBody,
} from '../../../../components/organisms/OriginalRegist'
import { OnlineInsuranceView } from '../../../../components/organisms/OnlineInsurance'
import { NextButton } from '../../../../components/atoms/OriginalButton'
import {
    UnregisteredButton,
    DeleteImageButton,
} from '../../../../components/atoms/OnlineButton'
import {
    DocumentIconTitleWith,
    InsuranceIconTitleWith,
    DeleteImageIcon,
} from '../../../../components/atoms/OriginalIcon'

const OnlineInsurancePage: React.FC = () => {
    const router = useRouter()
    const [isValidate, setValidate] = useState(false)

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push('/online/application/detail')
    }

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="保険証等登録"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Main>
                    <MainLead>
                        必要に応じて、保険証等を撮影してください。
                    </MainLead>
                    <MainBody>
                        <RegistSection>
                            <RegistHeader>
                                <InsuranceIconTitleWith>
                                    <h2 className="headerTitle">保険証</h2>
                                </InsuranceIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                                <OnlineInsuranceView>
                                    <img
                                        src="/img/temp/img_insurance_sample.jpg"
                                        alt=""
                                    />
                                    <DeleteImageButton href="#">
                                        <DeleteImageIcon />
                                    </DeleteImageButton>
                                </OnlineInsuranceView>
                                <UnregisteredButton href="/online/application/insurance/camera">
                                    撮影する
                                </UnregisteredButton>
                            </RegistBody>
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <InsuranceIconTitleWith>
                                    <h2 className="headerTitle">
                                        公費受給者証
                                    </h2>
                                </InsuranceIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                                <UnregisteredButton href="/online/application/insurance/camera">
                                    撮影する
                                </UnregisteredButton>
                            </RegistBody>
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <DocumentIconTitleWith>
                                    <h2 className="headerTitle">その他</h2>
                                </DocumentIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                                <UnregisteredButton href="/online/application/insurance/camera">
                                    撮影する
                                </UnregisteredButton>
                            </RegistBody>
                        </RegistSection>
                    </MainBody>
                    <MainBtm>
                        <NextButton
                            href="#"
                            onClick={onSubmit}
                            disabled={!isValidate}
                        >
                            登録する
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default OnlineInsurancePage
