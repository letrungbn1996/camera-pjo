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
import { NextButton } from '../../../../components/atoms/OriginalButton'
import { PharmacySelectButton } from '../../../../components/atoms/OnlineButton'
import { DocumentIconTitleWith } from '../../../../components/atoms/OriginalIcon'
import { Box } from '@mui/material'

const OnlineDetailPage: React.FC = () => {
    const router = useRouter()
    const [isSelected, setSelected] = useState(false)
    // TODO: need to get store alias after intergrate api get store detail
    const [storeAlias, setStoreAlias] = useState("a0366c136fb4d98b100f0ba2e28c588728814447")

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="薬局選択"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <OriginalRegistNav step={2} total={4} />
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
                        <Box mb="20px" pt="10px" lineHeight="22px">
                            薬局を選択してください。
                        </Box>
                        <PharmacySelectButton
                            href="/online/application/pharmacy/lists"
                            selected={isSelected}
                        >
                            {isSelected ? '○○薬局　大手町店' : '薬局を選択'}
                        </PharmacySelectButton>
                        <Box mt="20px" lineHeight="22px">
                            ※薬局によっては、提供していないケースがあります。
                        </Box>
                    </MainBody>
                    <MainBtm>
                        <NextButton
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                router.push(`/online/application/service/${storeAlias}`)
                            }}
                            // TODO: comment out after get store from api
                            // disabled={!isSelected}
                            disabled={false}
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
