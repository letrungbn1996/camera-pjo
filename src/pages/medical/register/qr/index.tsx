import React, { useState, useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../../../../providers/UserProvider'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Header from '../../../../components/organisms/Header'
import Initial, {
    InitialCamera,
    InitialCameraArea,
    InitialBtm,
} from '../../../../components/organisms/Initial'
import { SecondaryButton } from '../../../../components/atoms/Button'
import { Box } from '@mui/material'
// import * as ZXing from '@zxing/library'
// import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser'
// import { Result } from '@zxing/library'

const MedicalRegisterQRPage: React.FC = () => {
    const router = useRouter()
    const userInfo = useContext(UserContext)
    const [isAllowCamera, setAllowCamera] = useState(true)
    let videoStream: MediaStream
    let textArray: any

    // video設定
    const videoRef = useRef<HTMLVideoElement>(null)
    let videoConfig = {
        audio: false,
        video: {
            facingMode: 'environment',
        },
    }
    if (userInfo.userAgent === 'other') {
        videoConfig.video.facingMode = 'user'
    }

    // カメラ許可
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia(videoConfig)
            .then((stream) => {
                videoStream = stream
                videoRef.current!.srcObject = stream
            })
            .catch(function (err) {
                setAllowCamera(false)
            })
    }, [])

    // ページ遷移時の処理
    const handleChangeRoute = () => {
        if (videoStream) {
            videoStream.getVideoTracks().forEach((track) => {
                track.stop()
            })
            videoStream.getAudioTracks().forEach((track) => {
                track.stop()
            })
        }
    }
    useEffect(() => {
        router.events.on('routeChangeComplete', handleChangeRoute)
        return () => {
            router.events.off('routeChangeComplete', handleChangeRoute)
        }
    }, [])

    // useEffect(() => {
    //     if (!videoRef.current) {
    //         return
    //     }
    //     const codeReader = new BrowserQRCodeReader()
    //     codeReader.decodeFromVideoDevice(
    //         undefined,
    //         videoRef.current,
    //         (result, error, controls) => {
    //             if (error) {
    //                 return
    //             }
    //             if (result) {
    //                 console.log(result)
    //                 console.log(result.getRawBytes())
    //                 console.log(result.getRawBytes)
    //                 if ((result.getRawBytes()[0] & 0xf0) == 0x30) {
    //                     let offset = result.getRawBytes()[0] & 0x0f
    //                     let total = (result.getRawBytes()[1] >> 4) + 1
    //                     if (offset <= total) {
    //                         textArray[offset] = result.getText()
    //                     }
    //                 }
    //             }
    //         }
    //     )
    // }, [])

    return (
        <>
            <DefaultLayout>
                <Header
                    title="二次元コード読み取り"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Initial>
                    {isAllowCamera ? (
                        <>
                            <InitialCamera>
                                <InitialCameraArea>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                    ></video>
                                </InitialCameraArea>
                            </InitialCamera>
                            <Box
                                sx={{
                                    mt: '25px',
                                    lineHeight: '24px',
                                }}
                            >
                                登録用二次元コードをスキャンしてください。
                                <br />
                                二次元コードを読み取り範囲に写すと自動的にスキャンします。
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    lineHeight: '24px',
                                }}
                            >
                                カメラ使用が許可されていません。本アプリの全ての機能をお使い頂くために、設定からカメラの仕様を許可してください。
                                <br />
                                詳しい設定変更手順はFAQサイトにて説明しています。
                            </Box>
                            <InitialBtm>
                                <SecondaryButton href="#" external={true}>
                                    FAQサイトへ
                                </SecondaryButton>
                            </InitialBtm>
                        </>
                    )}
                </Initial>
            </DefaultLayout>
        </>
    )
}

export default MedicalRegisterQRPage
