import React, { useContext, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { AppContext } from '../../providers/AppProvider'
import { Stack, Box } from '@mui/material'
import { HomeMain, MainBody, MainLead } from './Main'
import HomeNav, { HomeNavHeader, HomeNavBody, NavItem } from './HomeNav'
import { HomeNavButton, ChatBigButton, ChangeButton } from '../atoms/Button'
import {
    NotebookIconWith,
    SendIconWith,
    MessageIconWith,
    ChatBigIconWith,
    CorporateIconWith,
} from '../atoms/Icon'
import router from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

type Props = {
    favoriteStoreName: string | null
    unReadCount: number
}

const HomeMain02 = ({ favoriteStoreName, unReadCount }: Props) => {
    const app = useContext(AppContext)
    const [url, setUrl] = useState('')
    const auth = useSelector((state: RootState) => state.auth)
    const sPatient = useSelector((state: RootState) => state.selectedPatient)

    useEffect(() => {
        //メモ　開発用にもし必要ならここ下にあるlocalhostのurlに変えてください。
        if (process.env.NEXT_PUBLIC_OKP_URL) {
            setUrl(process.env.NEXT_PUBLIC_OKP_URL + '/record')
        }
        // setUrl('http://localhost:3005/record')
    }, [])

    return (
        <main className="main">
            <HomeMain>
                <MainLead>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0 14px',
                        }}
                    >
                        <div className="label">
                            <CorporateIconWith>
                                {favoriteStoreName}
                            </CorporateIconWith>
                        </div>
                        <ChangeButton
                            onClick={(e) => {
                                e.preventDefault()
                                router.push('/my-pharmacy')
                            }}
                        >
                            {favoriteStoreName === '登録はありません'
                                ? '登録'
                                : '薬局切替'}
                        </ChangeButton>
                    </Box>
                </MainLead>
                <MainBody>
                    <Stack spacing="14px">
                        <Box>
                            <HomeNav>
                                <HomeNavHeader>サービス</HomeNavHeader>
                                <HomeNavBody>
                                    <NavItem>
                                        <HomeNavButton
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                router.push({
                                                    pathname: url, //URL
                                                    query: {
                                                        authorized_key:
                                                            auth.authorized_key,
                                                        patient_alias:
                                                            sPatient.patient_alias,
                                                        // 'TnKcjYwm0fvffub9txtTfUPWvLayEJ',
                                                    }, //検索クエリ
                                                })
                                            }}
                                        >
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
                                                {unReadCount > 0 && (
                                                    <div className="unread">
                                                        {unReadCount}
                                                    </div>
                                                )}
                                            </MessageIconWith>
                                        </HomeNavButton>
                                    </NavItem>

                                    {/* TODO: 将来機能 */}
                                    {/* <NavItem>
                                        <HomeNavButton href="#">
                                            <VitalIconWith>
                                                健康管理
                                            </VitalIconWith>
                                        </HomeNavButton>
                                    </NavItem> */}
                                    {/* {app.id === 'KHA' ? (
                                        <>
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
                                        </>
                                    ) : (
                                        <>
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
                                        </>
                                    )} */}
                                </HomeNavBody>
                            </HomeNav>
                        </Box>
                        {/* TODO: 将来機能 */}
                        {/* <Box>
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
                        </Box> */}
                    </Stack>
                </MainBody>

                {app.id === 'KHA' ? (
                    // <ChatBigButton href="#" app="KHA">
                    //     <span className="chatBtnLabel">薬局チャット</span>
                    // </ChatBigButton>
                    <></>
                ) : (
                    <ChatBigButton href="#">
                        <ChatBigIconWith>
                            パレット
                            <br />
                            チャット
                        </ChatBigIconWith>
                    </ChatBigButton>
                )}
            </HomeMain>
        </main>
    )
}

export default HomeMain02
