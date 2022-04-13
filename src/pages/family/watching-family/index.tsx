import React from 'react'
import Header from '../../../components/organisms/OriginalHeader'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Main, {
    MainBody,
    MainLead,
    MainBtm,
} from '../../../components/organisms/Main'
import FamilyNav from '../../../components/organisms/FamilyNav'
import NavList, {
    NavListItem,
    NavListItemSelect,
    NavListItemLink,
} from '../../../components/organisms/NavList'
import {
    FamilyNavButton,
    FamilyGroupButtonWith,
    NavListDetailButton,
    TextLinkButton,
    NextButton,
} from '../../../components/atoms/OriginalButton'
import { Box } from '@mui/material'

const FamilyPage: React.FC = () => {
    return (
        <>
            <DefaultLayout>
                <Header title="登録家族管理" prevURL="back" isHomeBtn={false} />
                <Main multiNav={true}>
                    <MainLead>
                        <FamilyNav>
                            <li>
                                <FamilyNavButton href="/family">
                                    登録家族
                                </FamilyNavButton>
                            </li>
                            <li>
                                <FamilyNavButton
                                    href="/family/watching-family"
                                    active={true}
                                >
                                    見守り家族
                                </FamilyNavButton>
                            </li>
                        </FamilyNav>
                    </MainLead>
                    <MainBody>
                        <NavList>
                            <NavListItem>
                                <NavListItemSelect>
                                    <FamilyGroupButtonWith disabled={true}>
                                        けんじ（見守り）
                                    </FamilyGroupButtonWith>
                                </NavListItemSelect>
                                <NavListItemLink>
                                    <NavListDetailButton href="/family/aaaa">
                                        詳細
                                    </NavListDetailButton>
                                </NavListItemLink>
                            </NavListItem>
                        </NavList>
                        <Box
                            sx={{
                                pt: '24px',
                                textAlign: 'center',
                            }}
                        >
                            <TextLinkButton href="/family/watching-family/push">
                                見守り招待コード登録
                            </TextLinkButton>
                        </Box>
                    </MainBody>
                    <MainBtm>
                        <Box
                            sx={{
                                pb: '15px',
                            }}
                        >
                            <NextButton href="/family/watching-family/lists">
                                あなたを見守る人を確認する
                            </NextButton>
                        </Box>
                        <NextButton href="/family/watching-family/code">
                            見守り招待
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default FamilyPage
