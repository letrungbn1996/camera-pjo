import React, { useState, useEffect, useRef } from 'react'
import DefaultLayout from '../../../../../components/templates/DefaultLayout'
import OnlineVideo, {
    OnlineVideoAnnounce,
    OnlineVideoPreview,
    OnlineVideoCamera,
    OnlineVideoNav,
} from '../../../../../components/organisms/OnlineVideo'
import { VideoNavButton } from '../../../../../components/atoms/OnlineButton'
import {
    HangUpIconWith,
    CameraSwitchIconWith,
} from '../../../../../components/atoms/OnlineIcon'

const OnlineVideoTestPage: React.FC = () => {
    const [isRunning, setRunning] = useState(false)
    const [count, setCount] = useState(0)
    const videoRef = useRef(null);
  const photoRef = useRef(null);
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
    useEffect(() => {
      getVideo();
    }, [videoRef]);
    

    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 300 } })
        .then(stream => {
          let video:any = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch(err => {
          console.error("error:", err);
        });
    };
  
    const paintToCanvas = () => {
      let video = videoRef.current;
      let photo: any = photoRef.current;
      let ctx = photo.getContext("2d");
  
      const width = 320;
      const height = 240;
      photo.width = width;
      photo.height = height;
  
      return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
      }, 200);
    };

    return (
        <>
            <DefaultLayout>
                <OnlineVideo>
                    <OnlineVideoAnnounce
                        initial={count <= 1}
                        fadeIn={count === 1}
                        fadeOut={count >= 2}
                    >
                        ビデオ通話テストを開始します。
                        <br />
                        音声が聞こえているかどうかをまずご確認ください。
                    </OnlineVideoAnnounce>
                    <OnlineVideoAnnounce
                        initial={count <= 2}
                        fadeIn={count === 2}
                        fadeOut={count >= 3}
                    >
                        次にお顔を映しながら、何かお話ください。このあと録画された映像・音声が流れます。
                    </OnlineVideoAnnounce>
                    <OnlineVideoAnnounce
                        initial={count <= 3}
                        fadeIn={count === 3}
                        fadeOut={false}
                    >
                        映像と音声は正常に流れましたか?
                        <br />
                        こちらでテストは終了です。通話をお切りください。
                    </OnlineVideoAnnounce>
                    <OnlineVideoPreview>
                        <video
                            // ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                        ></video>
                    </OnlineVideoPreview>
                    <OnlineVideoCamera>
                        <video
                            // ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                        ></video>
                    </OnlineVideoCamera>
                    <OnlineVideoNav>
                        <li>
                            <VideoNavButton
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                <HangUpIconWith>通話終了</HangUpIconWith>
                            </VideoNavButton>
                        </li>
                        <li
                        >
                            <VideoNavButton
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                <CameraSwitchIconWith>
                                    カメラ切替
                                </CameraSwitchIconWith>
                            </VideoNavButton>
                        </li>
                    </OnlineVideoNav>
                    <video onCanPlay={() => paintToCanvas()} ref={videoRef} style={{ width: '100%'}}/>
                </OnlineVideo>
            </DefaultLayout>
        </>
    )
}

export default OnlineVideoTestPage
