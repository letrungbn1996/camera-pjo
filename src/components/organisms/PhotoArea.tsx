import React, { useState, useEffect, useRef, useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '../../providers/UserProvider'
import {
    DeleteImageIcon,
    PhotoLibraryIcon,
    CameraShotIcon,
    SlideNextArrowIcon,
    SlidePrevArrowIcon,
} from '../atoms/OriginalIcon'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import css from './PhotoArea.module.scss'
import cookieManagement from '../../utilities/cookieManagement'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { slideSlice } from '../../store/slide'

const NextArrow = (props: any) => {
    const { className, onClick } = props
    return (
        <div className={`${css.nextNav} ${className}`} onClick={onClick}>
            <SlideNextArrowIcon />
        </div>
    )
}

const PrevArrow = (props: any) => {
    const { className, onClick } = props
    return (
        <div className={`${css.prevNav} ${className}`} onClick={onClick}>
            <SlidePrevArrowIcon />
        </div>
    )
}

declare global {
    interface Window {
        huga: any
        request: any
        response: any
        hoge: any
        closeMiniApp: any
        webkit: any
        getAccessToken: any
    }
}
declare const request: any

type Props = {
    setPhotoSlides: React.Dispatch<React.SetStateAction<any[]>>
}
const PhotoArea = ({ setPhotoSlides }: Props) => {
    const dispatch = useDispatch()
    const slide = useSelector((state: RootState) => state.slide)
    const handleConfirm = () => {
        // eslint-disable-next-line
        console.log(slide)
    }
    const handleAddSlide = (s: string) => {
        dispatch(slideSlice.actions.addSlide(s))
    }
    const handleDelSlide = (s: string) => {
        dispatch(slideSlice.actions.delSlide(s))
    }
    const [slides, setSlides] = useState<any[]>([])

    const [photoTotal, setPhotoTotal] = useState(slides.length)
    const [slideIndex, setSlideIndex] = useState(0)
    const userInfo = useContext(UserContext)
    const sliderRef = useRef<Slider>(null)
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current: number, next: number) => {
            setSlideIndex(next)
        },
    }

    const onShowPhoto = (e: React.MouseEvent<HTMLAnchorElement>, n: number) => {
        e.preventDefault()
        sliderRef.current?.slickGoTo(n)
    }

    // 画像削除
    const onDeleteImg = (
        e: React.MouseEvent<HTMLAnchorElement>,
        n: number,
        s: string
    ) => {
        e.preventDefault()
        // 指定した要素を削除
        let newSlides = [...slides]
        newSlides.splice(n, 1)
        setSlides(newSlides)
        setPhotoTotal(newSlides.length)
        handleDelSlide(s)
    }

    // ライブラリ
    const onPhotoLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        let data = JSON.stringify({
            getImagesFromPhotoLibrary: {
                type: 'jpeg',
                limit: 5,
                selected: photoTotal,
            },
        })
        let slidesCopy = slides
        let photoTotalCopy = photoTotal
        try {
            if (userInfo.userAgent === 'android') {
                request.postMessage(data) //MEMO: for android addJavascriptInterface
            } else {
                window.webkit.messageHandlers.request.postMessage(data)
            }
            window.response = function (jsonString: any) {
                var json = JSON.parse(jsonString)
                var base64imgs = json.getImagesFromPhotoLibrary.images
                base64imgs.forEach(function (value: string) {
                    if (photoTotalCopy < 5) {
                        var base64img = 'data:image/jpeg;base64,' + value
                        // localStorage.setItem(
                        //     'slide' + photoTotalCopy,
                        //     base64img
                        // )
                        localStorage.setItem('slideTest', base64img)
                        setSlides([...slides, base64img])
                        setSlides(slidesCopy.concat(base64img))
                        slidesCopy = slidesCopy.concat(base64img)
                        setPhotoTotal(slidesCopy.length)
                        photoTotalCopy = photoTotalCopy + 1
                        setPhotoSlides(slidesCopy)
                        handleAddSlide(base64img)
                    }
                })
            }
        } catch (err) {
            console.log('' + err)
        }
    }

    // 撮影する
    const onCameraShot = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        let data = JSON.stringify({
            getImagesFromCamera: {
                type: 'jpeg',
                limit: 5,
                selected: photoTotal,
            },
        })
        let slidesCopy = slides
        let photoTotalCopy = photoTotal
        try {
            if (userInfo.userAgent === 'android') {
                request.postMessage(data) //MEMO: for android addJavascriptInterface
            } else {
                window.webkit.messageHandlers.request.postMessage(data)
            }
            window.response = function (jsonString: any) {
                var json = JSON.parse(jsonString)
                var base64imgs = json.getImagesFromCamera.images
                base64imgs.forEach(function (value: string) {
                    if (photoTotalCopy < 5) {
                        // let base64imgData = 'data:image/png;base64,' + value
                        // let mimeType = 'png'
                        // let base64img = {data: base64imgData,type: mimeType}
                        var base64img = 'data:image/jpeg;base64,' + value
                        // var base64img =
                        //     'data:image/png;base64,0ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-'
                        cookieManagement.setCookiesByObject({
                            slideTest: base64img,
                        })
                        // localStorage.setItem(
                        //     'slide' + photoTotalCopy,
                        //     base64img
                        // )
                        localStorage.setItem('slideTest', base64img)
                        var base64img = 'data:image/jpeg;base64,' + value
                        // var base64img =
                        //     'data:image/png;base64,0ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-'
                        setSlides([...slides, base64img])
                        setSlides(slidesCopy.concat(base64img))
                        slidesCopy = slidesCopy.concat(base64img)
                        setPhotoTotal(slidesCopy.length)
                        photoTotalCopy = photoTotalCopy + 1
                        setPhotoSlides(slidesCopy)
                        handleAddSlide(base64img)
                    }
                })
            }
        } catch (err) {
            console.log('' + err)
        }
    }

    // 撮影する
    const onCameraShotTest = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        let data = JSON.stringify({
            getImagesFromCamera: {
                type: 'png',
                limit: 3,
            },
        })
        let slidesCopy = slides
        let photoTotalCopy = photoTotal
        try {
            // if (userInfo.userAgent === 'android') {
            //     request.postMessage(data) //MEMO: for android addJavascriptInterface
            // } else {
            //     window.webkit.messageHandlers.request.postMessage(data)
            // }
            // window.response = function (jsonString: any) {
            //     var json = JSON.parse(jsonString)
            //     var base64imgs = json.getImagesFromCamera.images
            //     base64imgs.forEach(function (value: string) {
            //         if (photoTotalCopy < 5) {
            //             // let base64imgData = 'data:image/png;base64,' + value
            //             // let mimeType = 'png'
            //             // let base64img = {data: base64imgData,type: mimeType}
            //             var base64img = 'data:image/png;base64,' + value
            //             setSlides([...slides, base64img])
            //             setSlides(slidesCopy.concat(base64img))
            //             slidesCopy = slidesCopy.concat(base64img)
            //             setPhotoTotal(slidesCopy.length)
            //             photoTotalCopy = photoTotalCopy + 1
            //             setPhotoSlides(slidesCopy)
            //         }
            //     })
            // }
            var base64img =
                'data:image/jpeg;base64,0ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-'
            setSlides([...slides, base64img])
            setSlides(slidesCopy.concat(base64img))
            slidesCopy = slidesCopy.concat(base64img)
            setPhotoTotal(slidesCopy.length)
            photoTotalCopy = photoTotalCopy + 1
            setPhotoSlides(slidesCopy)
            handleAddSlide(base64img)
        } catch (err) {
            console.log('' + err)
        }
    }

    useEffect(() => {
        setSlides(slide.slides)
        setPhotoSlides(slide.slides)
        setPhotoTotal(slide.slides.length)
    }, [])

    return (
        <>
            <div className={css.photo}>
                <div className={css.photoArea}>
                    {photoTotal === 0 ? (
                        <div className={css.photoAreaBlank}>
                            処方箋の画像を
                            <br />
                            撮影してください
                        </div>
                    ) : (
                        <div className={css.slider}>
                            <Slider {...sliderSettings} ref={sliderRef}>
                                {slides.map((slide: string) => (
                                    <div className={css.slideItem} key={slide}>
                                        <img src={slide} alt="" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                </div>
                <ul className={css.thumb}>
                    {slides.map((slide: string, index: number) => (
                        <li
                            key={slide}
                            className={slideIndex === index ? css.current : ''}
                        >
                            <Link href="#">
                                <a onClick={(e) => onShowPhoto(e, index)}>
                                    <img src={slide} alt="" />
                                </a>
                            </Link>
                            <Link href="#">
                                <a
                                    className={css.deleteBtn}
                                    onClick={(e) =>
                                        onDeleteImg(e, index, slide)
                                    }
                                >
                                    <DeleteImageIcon />
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <ul className={css.appNav}>
                {photoTotal >= 5 ? (
                    <>
                        {/* 写真が5枚になったらボタン無効 */}
                        <li>
                            <div className={`${css.appNavBtn} ${css.disabled}`}>
                                <PhotoLibraryIcon />
                                <div className={css.btnText}>ライブラリ</div>
                            </div>
                        </li>
                        <li>
                            <div className={`${css.appNavBtn} ${css.disabled}`}>
                                <CameraShotIcon />
                                <div className={css.btnText}>撮影する</div>
                            </div>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="#">
                                <a
                                    className={css.appNavBtn}
                                    onClick={onPhotoLibrary}
                                >
                                    <PhotoLibraryIcon />
                                    <div className={css.btnText}>
                                        ライブラリ
                                    </div>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a
                                    className={css.appNavBtn}
                                    onClick={onCameraShot}
                                >
                                    <CameraShotIcon />
                                    <div className={css.btnText}>撮影する</div>
                                </a>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="#">
                                <a
                                    className={css.appNavBtn}
                                    onClick={onCameraShotTest}
                                >
                                    <CameraShotIcon />
                                    <div className={css.btnText}>
                                        てstore撮影する
                                    </div>
                                </a>
                            </Link>
                        </li> */}
                    </>
                )}
            </ul>
        </>
    )
}

export default PhotoArea
