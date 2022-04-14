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
    const [imageDataURL, setImageDataURL] = useState<any>()
    const [cameraNumber, setCameraNumber] = useState<any>(0)
    const player = useRef<any>()
    let navigator = window.navigator as any;
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
        // initializeMedia()
    }, [window.navigator])
    

    const initializeMedia = async () => {
        setImageDataURL(null)
        console.log(window.navigator);
        
        if (!("mediaDevices" in window.navigator)) {
          (window.navigator as any).mediaDevices = {};
        }
    
        if (!("getUserMedia" in window.navigator.mediaDevices)) {
            console.log(window.navigator.mediaDevices);
          window.navigator.mediaDevices.getUserMedia = (constraints: any) => {
            var getUserMedia =
            (window.navigator as any).webkitGetUserMedia || (window.navigator as any).mozGetUserMedia;
    
            if (!getUserMedia) {
              return Promise.reject(new Error("getUserMedia Not Implemented"));
            }
    
            return new Promise((resolve, reject) => {
              getUserMedia.call(window.navigator, constraints, resolve, reject);
            });
          };
        }
    
        //Get the details of video inputs of the device
        const videoInputs = await getListOfVideoInputs();
        console.log(videoInputs);
        
        //The device has a camera
        if (videoInputs.length) {
          window.navigator.mediaDevices
            .getUserMedia({
              video: {
                deviceId: {
                  exact: videoInputs[cameraNumber].deviceId,
                },
              },
            })
            .then((stream: any) => {
              player.current.srcObject = stream;
            })
            .catch((error: any) => {
              console.error(error);
            });
        } else {
          alert("The device does not have a camera");
        }
      };
    
      const capturePicture = () => {
        var canvas = document.createElement("canvas");
        canvas.width = player.current.videoWidth;
        canvas.height = player.current.videoHeight;
        var contex: any = canvas.getContext("2d");
        contex.drawImage(player.current, 0, 0, canvas.width, canvas.height);
        player.current.srcObject.getVideoTracks().forEach((track: any) => {
          track.stop();
        });
    
        console.log(canvas.toDataURL());
        setImageDataURL(canvas.toDataURL())
      };
    
      const switchCamera = async () => {
        const listOfVideoInputs = await getListOfVideoInputs();
    
        // The device has more than one camera
        if (listOfVideoInputs.length > 1) {
          if (player.current.srcObject) {
            player.current.srcObject.getVideoTracks().forEach((track: any) => {
              track.stop();
            });
          }
    
          // switch to second camera
          if (cameraNumber === 0) {
            setCameraNumber(1)
          }
          // switch to first camera
          else if (cameraNumber === 1) {
            setCameraNumber(0)
          }
    
          // Restart based on camera input
          initializeMedia();
        } else if (listOfVideoInputs.length === 1) {
          alert("The device has only one camera");
        } else {
          alert("The device does not have a camera");
        }
      };
    
      const getListOfVideoInputs = async () => {
        // Get the details of audio and video output of the device
        console.log(window.navigator.mediaDevices);
        
        const enumerateDevices = await window.navigator.mediaDevices.enumerateDevices();
    
        //Filter video outputs (for devices with multiple cameras)
        return enumerateDevices.filter((device: any) => device.kind === "videoinput");
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
                          ref={player}
                          autoPlay
                      ></video>
                    </OnlineVideoCamera>
                    <OnlineVideoNav>
                        <li onClick={() => initializeMedia()}>
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
                            onClick={() => switchCamera()}
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
                </OnlineVideo>
                
            </DefaultLayout>
        </>
    )
}

export default OnlineVideoTestPage
