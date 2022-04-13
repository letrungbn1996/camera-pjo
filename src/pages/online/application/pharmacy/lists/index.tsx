import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../../components/organisms/OriginalHeader'
import Main, {
    MainBody,
    MainBtm,
} from '../../../../../components/organisms/Main'
import NavList, {
    NavListItem,
} from '../../../../../components/organisms/NavList'
import {
    NextButton,
    FamilyGroupButton,
    TextLinkButton,
} from '../../../../../components/atoms/OriginalButton'
import { Box } from '@mui/material'

const OnlineDetailPage: React.FC = () => {
    const router = useRouter()
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const onSelect = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push('/online/application/pharmacy')
    }

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="利用薬局"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Main>
                    <MainBody>
                        <Box mb="20px" lineHeight="22px">
                            利用薬局は以下の通りです。薬局を選択してください。
                        </Box>
                        <NavList>
                            <NavListItem>
                                <FamilyGroupButton
                                    active={selectedIndex === 0}
                                    size="fontSmall"
                                    onClick={() => {
                                        setSelectedIndex(0)
                                    }}
                                >
                                    ○○薬局　大手町店
                                </FamilyGroupButton>
                            </NavListItem>
                            <NavListItem>
                                <FamilyGroupButton
                                    active={selectedIndex === 1}
                                    size="fontSmall"
                                    onClick={() => {
                                        setSelectedIndex(1)
                                    }}
                                >
                                    △△薬局
                                </FamilyGroupButton>
                            </NavListItem>
                        </NavList>
                        <Box
                            sx={{
                                mt: '15px',
                                textAlign: 'center',
                            }}
                        >
                            <TextLinkButton
                                href="/online/application/pharmacy/search"
                                size="smallB"
                            >
                                上記以外の薬局から選択する
                            </TextLinkButton>
                        </Box>
                    </MainBody>
                    <MainBtm>
                        <NextButton
                            href="#"
                            onClick={onSelect}
                            disabled={selectedIndex < 0}
                        >
                            薬局を選択する
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default OnlineDetailPage
