import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../components/organisms/OriginalHeader'
import Main, { MainBtm } from '../../../../components/organisms/Main'
import {
    NextButton,
    TextLink,
} from '../../../../components/atoms/OriginalButton'
import { CountDownButton } from '../../../../components/atoms/OnlineButton'
import { Box } from '@mui/material'

const OnlineVideoTestPage: React.FC = () => {
    const router = useRouter()
    const [isTest, setTest] = useState(false)
    const [count, setCount] = useState(5)

    const onTest = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setTest(true)
    }

    useEffect(() => {
        if (isTest) {
            let myInterval = setInterval(() => {
                if (count > 0) {
                    setCount(count - 1)
                }
                if (count === 0) {
                    clearInterval(myInterval)
                    // カウンドダウン終了
                    // 〜〜〜 着信の処理 〜〜〜
                    // ↓ダミーアクション
                    router.push('/online/video/test/call')
                }
            }, 1000)
            return () => {
                clearInterval(myInterval)
            }
        }
    })

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="ビデオ通話テスト"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Main>
                    <Box py="16px" px="14px" fontSize="16px" lineHeight="20px">
                        ビデオ通話テストを行うには画面最下部の「ビデオ通話をテストする」ボタンを押してください。
                        <br />
                        <br />
                        1. ボタンを押して5秒経過すると着信します。
                        <br />
                        <br />
                        2.
                        通話を開始すると音声が流れますので、音量にご注意ください。
                        <br />
                        <br />
                        3.
                        本テストでは、ご自身がカメラに向かう様子を録画した動画を再生して確認していただきます。映像と音声が正常に確認できればテスト終了です。
                        <br />
                        <br />
                        なお正しい動作を行うためには、通知、マイク、カメラの設定が必要です。着信がない場合や、映像・音声を受信できない場合は、
                        <TextLink href="#">こちら</TextLink>を参照ください。
                    </Box>
                    <MainBtm>
                        {isTest ? (
                            <CountDownButton>
                                {count}秒後に着信します
                            </CountDownButton>
                        ) : (
                            <NextButton href="#" onClick={onTest}>
                                ビデオ通話をテストする
                            </NextButton>
                        )}
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default OnlineVideoTestPage
