import React, { useState, useRef, useCallback, useContext, useEffect } from 'react'
import { AppContext } from '../../providers/AppProvider'
import DefaultLayout from '../../components/templates/DefaultLayout'
import OriginalHeader from '../../components/organisms/OriginalHeader'
import OriginalRegistNav from '../../components/organisms/OriginalRegistNav'
import PhotoArea from '../../components/organisms/PhotoArea'
import { NextButton } from '../../components/atoms/OriginalButton'
import { useRouter } from 'next/router'
import cookieManagement from '../../utilities/cookieManagement'
import { setCookie } from 'nookies'

const PrescriptionPage: React.FC = () => {
    const router = useRouter()
    const app = useContext(AppContext)
    const [photo1, setPhoto1] = useState<string>('')
    const [photo2, setPhoto2] = useState<string | null>(null)
    const [photo3, setPhoto3] = useState<string | null>(null)
    const [photo4, setPhoto4] = useState<string | null>(null)
    const [photo5, setPhoto5] = useState<string | null>(null)
    const [photoSlides, setPhotoSlides] = useState<any[]>([])
    const [isBtnActive, setBtnActive] = useState(false)

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push({
            pathname: '/prescription/input',
        })
    }

    //ボタン制御
    useEffect(() => {
        if (photoSlides.length > 0) {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    })

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="処方箋画像撮影"
                    prevURL="back"
                    prevDialog={false}
                    isHomeBtn={true}
                />
                <OriginalRegistNav step={2} total={3} />
                <PhotoArea setPhotoSlides={setPhotoSlides}></PhotoArea>
                <div className="main-btm">
                    <ul className="main-link">
                        <li>
                            <NextButton
                                href="#"
                                onClick={onSubmit}
                                disabled={!isBtnActive}
                            >
                                次へ
                            </NextButton>
                        </li>
                    </ul>
                </div>
            </DefaultLayout>
        </>
    )
}

export default PrescriptionPage
