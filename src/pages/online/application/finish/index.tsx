import React from 'react'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import SimpleHeader from '../../../../components/organisms/SimpleHeader'
import Main, { MainBody, MainBtm } from '../../../../components/organisms/Main'
import { NextButton } from '../../../../components/atoms/OriginalButton'
import { Box } from '@mui/material'

const OnlineDetailPage: React.FC = () => {
    return (
        <>
            <DefaultLayout>
                <SimpleHeader title="お申込み完了" />
                <Main>
                    <MainBody>
                        <Box
                            sx={{
                                pt: '50px',
                                lineHeight: '22px',
                                textAlign: 'center',
                            }}
                        >
                            お申込みが完了しました。
                            <br />
                            <br />
                            確認が取れましたら、
                            <br />
                            確認完了のメッセージが届きますので、
                            <br />
                            しばらくお待ちください。
                        </Box>
                    </MainBody>
                    <MainBtm>
                        <NextButton href="/home">ホームへ</NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default OnlineDetailPage
