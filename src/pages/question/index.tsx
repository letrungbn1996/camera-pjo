import React, { useState } from 'react'
import router from 'next/router'
import OriginalHeader from '../../components/organisms/OriginalHeader'
import DefaultLayout from '../../components/templates/DefaultLayout'
import Main, { MainBody, MainBtm } from '../../components/organisms/Main'
import NavList, { NavListItem } from '../../components/organisms/NavList'
import {
    NavListButton,
    NextButton,
} from '../../components/atoms/OriginalButton'
import { Box } from '@mui/material'

const QuestionPage: React.FC = () => {
    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="質問票に記入"
                    prevURL="back"
                    prevDialog={false}
                    isHomeBtn={false}
                />
                <Main>
                    <MainBody>
                        <Box
                            sx={{
                                mb: '20px',
                                lineHeight: '24px',
                            }}
                        >
                            送信する処方箋のご本人のお名前を選択してください。
                            <br />
                            ご家族などご本人以外の質問シートを送信する場合は、すでに登録済みのご家族を選択するか、「追加」を押してご家族を追加の上で登録してください。
                        </Box>
                        <NavList>
                            <NavListItem>
                                <NavListButton
                                    onClick={() => {
                                        router.push('/question/input/aaaa')
                                    }}
                                >
                                    ゆうこ（本人）
                                </NavListButton>
                            </NavListItem>
                            <NavListItem>
                                <NavListButton
                                    onClick={() => {
                                        router.push('/question/input/bbbb')
                                    }}
                                >
                                    りん（長女）
                                </NavListButton>
                            </NavListItem>
                            <NavListItem>
                                <NavListButton
                                    onClick={() => {
                                        router.push('/question/input/cccc')
                                    }}
                                >
                                    こうた（長男）
                                </NavListButton>
                            </NavListItem>
                        </NavList>
                    </MainBody>
                    <MainBtm>
                        <NextButton href="/family/add">家族を追加</NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default QuestionPage
