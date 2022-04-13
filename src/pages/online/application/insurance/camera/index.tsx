import React, { useState, useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../../../../../providers/UserProvider'
import DefaultLayout from '../../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../../components/organisms/OriginalHeader'
import Main, {
    MainLead,
    MainBtm,
    MainBody,
} from '../../../../../components/organisms/Main'
import {
    OnlineInsuranceCamera,
    OnlineInsuranceCameraArea,
    OnlineInsuranceCameraAnnounce,
    OnlineInsuranceCameraScope,
} from '../../../../../components/organisms/OnlineInsurance'
import {
    NextButton,
    TextLinkButton,
} from '../../../../../components/atoms/OriginalButton'
import { Box } from '@mui/material'

const OnlineInsurancePage: React.FC = () => {
    const router = useRouter()
    const userInfo = useContext(UserContext)
    const [isAllowCamera, setAllowCamera] = useState(true)
    const [isShot, setShot] = useState(false)

    // video設定
    let videoStream: MediaStream
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

    // 撮影する
    const onCameraShot = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
    }

    // 撮り直す
    const onRetake = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
    }

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

    // 登録する
    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push('/online/application/insurance')
    }

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="保険証等登録"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Main>
                    <MainLead>
                        必要に応じて、保険証等を撮影してください。
                    </MainLead>
                    {isAllowCamera ? (
                        <OnlineInsuranceCamera>
                            <OnlineInsuranceCameraArea>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                ></video>
                            </OnlineInsuranceCameraArea>
                            <OnlineInsuranceCameraAnnounce>
                                保険証等全体が入るように
                                <br />
                                撮影してください。
                            </OnlineInsuranceCameraAnnounce>
                            <OnlineInsuranceCameraScope />
                        </OnlineInsuranceCamera>
                    ) : (
                        <MainBody>
                            <Box
                                sx={{
                                    p: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                カメラ使用が許可されていません。
                            </Box>
                        </MainBody>
                    )}
                    {isShot && (
                        <Box
                            sx={{
                                mt: '25px',
                                textAlign: 'center',
                            }}
                        >
                            <TextLinkButton
                                href="#"
                                size="medium"
                                onClick={onRetake}
                            >
                                撮り直す
                            </TextLinkButton>
                        </Box>
                    )}
                    <MainBtm>
                        {isShot ? (
                            <NextButton href="#" onClick={onSubmit}>
                                登録する
                            </NextButton>
                        ) : (
                            <NextButton href="#" onClick={onCameraShot}>
                                撮影する
                            </NextButton>
                        )}
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default OnlineInsurancePage
