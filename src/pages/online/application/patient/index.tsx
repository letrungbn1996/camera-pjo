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
} from '../../../../components/organisms/OriginalRegist'
import NavList, { NavListItem } from '../../../../components/organisms/NavList'
import {
    NextButton,
    FamilyGroupButton,
} from '../../../../components/atoms/OriginalButton'
import {
    DocumentIconTitleWith,
    PharmacyIconTitleWith,
} from '../../../../components/atoms/OriginalIcon'
import { Box } from '@mui/material'

const OnlineDetailPage: React.FC = () => {
    const router = useRouter()
    const [selectedPatient, setSelectedPatient] = useState(-1)

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="利用者選択"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <OriginalRegistNav step={3} total={4} />
                <Main>
                    <MainBody>
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
                        <Box mb="20px" pt="10px" lineHeight="22px">
                            利用される方を選択してください。
                        </Box>
                        <NavList>
                            <NavListItem>
                                <FamilyGroupButton
                                    active={selectedPatient === 0}
                                    onClick={() => {
                                        setSelectedPatient(0)
                                    }}
                                >
                                    川野 裕子（本人）
                                </FamilyGroupButton>
                            </NavListItem>
                            <NavListItem>
                                <FamilyGroupButton
                                    active={selectedPatient === 1}
                                    onClick={() => {
                                        setSelectedPatient(1)
                                    }}
                                >
                                    りん（長女）
                                </FamilyGroupButton>
                            </NavListItem>
                            <NavListItem>
                                <FamilyGroupButton
                                    active={selectedPatient === 2}
                                    onClick={() => {
                                        setSelectedPatient(2)
                                    }}
                                >
                                    ひろと（長男）
                                </FamilyGroupButton>
                            </NavListItem>
                        </NavList>
                    </MainBody>
                    <MainBtm>
                        <NextButton
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                router.push('/online/application/patient/input')
                            }}
                            disabled={selectedPatient < 0}
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
