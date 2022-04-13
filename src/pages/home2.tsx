import React, { useContext, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AppContext } from '../providers/AppProvider'
import DefaultLayout from '../components/templates/DefaultLayout'
import { HeaderStatus } from '../components/organisms/Header'
import HomeHeader from '../components/organisms/HomeHeader'
import { HomeMain, MainBody } from '../components/organisms/Main'
import HomeNav, {
    HomeNavHeader,
    HomeNavBody,
    NavItem,
} from '../components/organisms/HomeNav'
import HomeInformation, {
    HomeInformationHeader,
    HomeInformationBody,
} from '../components/organisms/HomeInformation'
import {
    ChangeButton,
    HomeNavButton,
    ChatBigButton,
} from '../components/atoms/Button'
import {
    CorporateIconWith,
    NotebookIconWith,
    SendIconWith,
    MessageIconWith,
    VitalIconWith,
    MealIconWith,
    MedicalInstitutionIconWith,
    CalendarIconWith,
    ChatBigIconWith,
} from '../components/atoms/Icon'
import { Stack, Box } from '@mui/material'
import { useDispatch } from 'react-redux'

type PatientProps = {
    lifepalette_id: string
    nickname: string
    patient_alias: string
    relationship: string | null
}

// TODO: 不要ファイル（`organisms/HomeMain01.tsx`コンポーネントとして`home.tsx`にて表示される様になったため。）
// 開発時の表示確認のためだけに残します。

const Home: NextPage = () => {
    const [patients, setPatients] = useState<PatientProps[]>([])
    const router = useRouter()
    const app = useContext(AppContext)

    if (app.id === 'KHA') {
        return (
            <>
                <DefaultLayout>
                    {/* <HomeHeader patients={patients} /> */}
                    <HeaderStatus>
                        <div className="label">
                            <CorporateIconWith>
                                さくら薬局　大手町店
                            </CorporateIconWith>
                        </div>
                        <ChangeButton
                            onClick={(e) => {
                                e.preventDefault()
                                router.push('/my-pharmacy')
                            }}
                        >
                            薬局切替
                        </ChangeButton>
                    </HeaderStatus>
                    <HomeMain>
                        <MainBody>
                            <Stack spacing="14px">
                                <Box>
                                    <HomeNav>
                                        <HomeNavHeader>サービス</HomeNavHeader>
                                        <HomeNavBody>
                                            <NavItem>
                                                <HomeNavButton href="/medication/record">
                                                    <NotebookIconWith>
                                                        お薬手帳
                                                    </NotebookIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                            <NavItem>
                                                <HomeNavButton href="/pharmacy">
                                                    <SendIconWith>
                                                        処方箋送信
                                                    </SendIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                            <NavItem>
                                                <HomeNavButton href="/message">
                                                    <MessageIconWith>
                                                        メッセージ
                                                        <div className="unread">
                                                            5
                                                        </div>
                                                    </MessageIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                            <NavItem>
                                                <HomeNavButton href="#">
                                                    <VitalIconWith>
                                                        健康管理
                                                    </VitalIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                            <NavItem>
                                                <HomeNavButton href="#">
                                                    <CalendarIconWith>
                                                        予約
                                                    </CalendarIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                            <NavItem>
                                                <HomeNavButton href="#">
                                                    <MedicalInstitutionIconWith>
                                                        医療機関
                                                    </MedicalInstitutionIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                        </HomeNavBody>
                                    </HomeNav>
                                </Box>
                                <Box>
                                    <HomeInformation>
                                        <HomeInformationHeader>
                                            お知らせ
                                        </HomeInformationHeader>
                                        <HomeInformationBody>
                                            <ul>
                                                <li>
                                                    2021/08/03
                                                    <br />
                                                    8/28（土）13:00から健康教室を開きます。
                                                </li>
                                            </ul>
                                        </HomeInformationBody>
                                    </HomeInformation>
                                </Box>
                            </Stack>
                        </MainBody>
                        <ChatBigButton href="#" app="KHA">
                            <span className="chatBtnLabel">薬局チャット</span>
                        </ChatBigButton>
                    </HomeMain>
                </DefaultLayout>
            </>
        )
    } else {
        return (
            <>
                <DefaultLayout>
                    <HomeHeader patients={patients} />
                    <HeaderStatus>
                        <div className="label">メディエイド薬局</div>
                        <ChangeButton
                            onClick={(e) => {
                                e.preventDefault()
                                router.push('/medical')
                            }}
                        >
                            切替
                        </ChangeButton>
                    </HeaderStatus>
                    <HomeMain>
                        <MainBody>
                            <Stack spacing="14px">
                                <Box>
                                    <HomeNav>
                                        <HomeNavHeader>サービス</HomeNavHeader>

                                        <HomeNavBody>
                                            <NavItem>
                                                <HomeNavButton href="/medication/record">
                                                    <NotebookIconWith>
                                                        お薬手帳
                                                    </NotebookIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                            <NavItem>
                                                <HomeNavButton href="/pharmacy">
                                                    <SendIconWith>
                                                        処方箋送信
                                                    </SendIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                            <NavItem>
                                                <HomeNavButton href="/message">
                                                    <MessageIconWith>
                                                        メッセージ
                                                        <div className="unread">
                                                            5
                                                        </div>
                                                    </MessageIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                            <NavItem>
                                                <HomeNavButton href="#">
                                                    <VitalIconWith>
                                                        健康管理
                                                    </VitalIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                            <NavItem>
                                                <HomeNavButton href="#">
                                                    <MealIconWith>
                                                        食事
                                                    </MealIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                            <NavItem>
                                                <HomeNavButton href="#">
                                                    <CalendarIconWith>
                                                        予約
                                                    </CalendarIconWith>
                                                </HomeNavButton>
                                            </NavItem>
                                        </HomeNavBody>
                                    </HomeNav>
                                </Box>
                                <Box>
                                    <HomeInformation>
                                        <HomeInformationHeader>
                                            お知らせ
                                        </HomeInformationHeader>
                                        <HomeInformationBody>
                                            <ul>
                                                <li>
                                                    2021/08/03
                                                    <br />
                                                    8/28（土）13:00から健康教室を開きます。
                                                </li>
                                            </ul>
                                        </HomeInformationBody>
                                    </HomeInformation>
                                </Box>
                            </Stack>
                        </MainBody>
                        <ChatBigButton href="#">
                            <ChatBigIconWith>
                                パレット
                                <br />
                                チャット
                            </ChatBigIconWith>
                        </ChatBigButton>
                    </HomeMain>
                </DefaultLayout>
            </>
        )
    }
}

export default Home
