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
    const [facingMode, setFacingMode] = useState('user')
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
    }, [videoRef, facingMode]);
    

    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 300 , facingMode} })
        .then(stream => {
            console.log(stream);
            
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
                        ?????????????????????????????????????????????
                        <br />
                        ????????????????????????????????????????????????????????????????????????
                    </OnlineVideoAnnounce>
                    <OnlineVideoAnnounce
                        initial={count <= 2}
                        fadeIn={count === 2}
                        fadeOut={count >= 3}
                    >
                        ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    </OnlineVideoAnnounce>
                    <OnlineVideoAnnounce
                        initial={count <= 3}
                        fadeIn={count === 3}
                        fadeOut={false}
                    >
                        ??????????????????????????????????????????????
                        <br />
                        ????????????????????????????????????????????????????????????????????????
                    </OnlineVideoAnnounce>
                    <OnlineVideoPreview>
                        <video onCanPlay={() => paintToCanvas()} ref={videoRef} style={{ width: '100%', height: '100%'}}/>

                    </OnlineVideoPreview>
                    <OnlineVideoCamera>
                        <video onCanPlay={() => paintToCanvas()} ref={videoRef} style={{ width: '100%', height: '100%'}}/>

                    </OnlineVideoCamera>
                    <OnlineVideoNav>
                        <li>
                            <VideoNavButton
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                <HangUpIconWith>????????????</HangUpIconWith>
                            </VideoNavButton>
                        </li>
                        <li
                            onClick={() => {
                                if (facingMode === 'user') {
                                    setFacingMode('environment')
                                } else {
                                    setFacingMode('user')
                                }
                            }}
                        >
                            <VideoNavButton
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                <CameraSwitchIconWith>
                                    ???????????????
                                </CameraSwitchIconWith>
                            </VideoNavButton>
                        </li>
                    </OnlineVideoNav>
                </OnlineVideo>
            </DefaultLayout>
        </>
    )
}

export default OnlineVideoTestPage
