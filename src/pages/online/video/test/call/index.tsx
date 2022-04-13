import React, { useState, useEffect } from 'react'
import DefaultLayout from '../../../../../components/templates/DefaultLayout'
import OnlineVideo, {
    VideoCallText,
    CallVideo,
    OnlineVideoCall,
    TitleCallVideo,
    LabelCallVideo
} from '../../../../../components/organisms/OnlineVideo'
import { VideoNavButton } from '../../../../../components/atoms/OnlineButton'
import {
    HangUpIconWith,
    AcceptIconWith,
} from '../../../../../components/atoms/OnlineIcon'
import { useRouter } from 'next/router'

const OnlineVideoTestPage: React.FC = () => {
    const router = useRouter()
    const [isRunning, setRunning] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (isRunning) {
            let myInterval = setInterval(() => {
                if (count < 3) {
                    setCount(count + 1)
                }
                if (count === 3) {
                    clearInterval(myInterval)
                    setRunning(false)
                }
            }, 7000)
            return () => {
                clearInterval(myInterval)
            }
        }
    })

    useEffect(() => {
        setTimeout(() => {
            setCount(count + 1)
            setRunning(true)
        }, 1000)
    }, [])

    return (
        <>
            <DefaultLayout>
                <CallVideo>
                    <VideoCallText>
                        <TitleCallVideo>医者さん </TitleCallVideo>
                        <LabelCallVideo>昌健康おくすり手帳video...</LabelCallVideo> 
                    </VideoCallText>
                    <OnlineVideoCall>
                        <div
                            onClick={(e) => {
                                router.push('/online/video/test')
                            }}
                        >
                            <VideoNavButton
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                <HangUpIconWith>通話終了</HangUpIconWith>
                            </VideoNavButton>
                        </div>
                        <div
                            onClick={(e) => {
                                router.push('/online/video/test/preview')
                            }}
                        >
                            <VideoNavButton
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                <AcceptIconWith>
                                    受け入れる
                                </AcceptIconWith>
                            </VideoNavButton>
                        </div>
                    </OnlineVideoCall>
                </CallVideo>
            </DefaultLayout>
        </>
    )
}

export default OnlineVideoTestPage
