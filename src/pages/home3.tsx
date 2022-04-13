import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
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
import { ChangeButton, HomeNavButton } from '../components/atoms/Button'
import {
    MessageIconWith,
    VitalIconWith,
    CalendarIconWith,
} from '../components/atoms/Icon'
import { Stack, Box } from '@mui/material'

const Home: NextPage = () => {
    const router = useRouter()

    const onChange = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push('/medical')
    }

    // TODO： 医療機関選択時のHOME表示
    // `home.tsx`にHomeMain003コンポーネントとして表示する予定
    // 開発時表示確認の為にhome2.tsx同様残す
    return (
        <>
            <DefaultLayout>
                {/* TODO: コンポーネント化してない場合、HomeHeaderコンポーネントでプロパティが足りずエラーになるのでコメントアウト */}
                {/* <HomeHeader /> */}
                <HeaderStatus>
                    <div className="label">神田内科クリニック</div>
                    <ChangeButton onClick={onChange}>切替</ChangeButton>
                </HeaderStatus>
                <HomeMain>
                    <MainBody>
                        <Stack spacing="14px">
                            <Box>
                                <HomeNav>
                                    <HomeNavHeader>サービス</HomeNavHeader>
                                    <HomeNavBody>
                                        <NavItem>
                                            <HomeNavButton href="#">
                                                <CalendarIconWith>
                                                    予約
                                                </CalendarIconWith>
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
                                                オンライン診療を開始しました。当日診療はお電話にてお問い合わせください。
                                            </li>
                                        </ul>
                                    </HomeInformationBody>
                                </HomeInformation>
                            </Box>
                        </Stack>
                    </MainBody>
                </HomeMain>
            </DefaultLayout>
        </>
    )
}

export default Home
