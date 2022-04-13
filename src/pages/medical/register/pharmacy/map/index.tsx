import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useGoogleMap, useMap } from '../../../../../hooks/useMap'
import DefaultLayout from '../../../../../components/templates/DefaultLayout'
import Header from '../../../../../components/organisms/Header'
import { MainLead } from '../../../../../components/organisms/Main'
import PharmacyList, {
    PharmacyListItem,
    PharmacyListItemInner,
    PharmacyListImg,
    PharmacyListInfo,
    PharmacyListInfoName,
    PharmacyListInfoText,
    PharmacyInfoWindow,
} from '../../../../../components/organisms/PharmacyList'
import {
    MapB,
    MapAreaB,
    MapBtm,
    MapBtmInner,
} from '../../../../../components/organisms/Map'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../../../../../components/organisms/DialogMain'
import {
    NextButton,
    NextDialogButton,
    CloseDialogButton,
} from '../../../../../components/atoms/Button'

// Google Map Settings
const initialConfig = {
    zoom: 16,
    center: { lat: 35.681236, lng: 139.767125 }, // 東京駅
    disableDefaultUI: true,
    zoomControl: false,
    scrollwheel: false,
    styles: [
        {
            featureType: 'poi.medical',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
        },
        {
            featureType: 'poi.business',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
        },
        {
            featureType: 'poi.school',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
        },
    ],
}
const mapStyle = {
    height: '100%',
    width: '100%',
}

type MapInfoWindowProps = {
    data: {
        id: string
        image: string
        name: string
        address: string
        location: {
            lat: number
            lng: number
        }
    }
    open: boolean
}
// インフォウィンドウコンポーネント
const MapInfoWindow = ({ data, open }: MapInfoWindowProps) => {
    return (
        <PharmacyInfoWindow isOpen={open}>
            <PharmacyList>
                <PharmacyListItem>
                    <PharmacyListItemInner>
                        <PharmacyListImg>
                            <img src={data.image} alt="" />
                        </PharmacyListImg>
                        <PharmacyListInfo>
                            <PharmacyListInfoName>
                                {data.name}
                            </PharmacyListInfoName>
                            <PharmacyListInfoText>
                                {data.address}
                            </PharmacyListInfoText>
                        </PharmacyListInfo>
                    </PharmacyListItemInner>
                </PharmacyListItem>
            </PharmacyList>
        </PharmacyInfoWindow>
    )
}

const MedicalRegisterPharmacyPage: React.FC = () => {
    const router = useRouter()
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const googleMap = useGoogleMap()
    const mapContainerRef = useRef(null)
    const map = useMap({ googleMap, mapContainerRef, initialConfig })

    // インフォウィンドウステート
    const [openWindow] = useState(true)

    // 薬局データ（ダミー）
    const pharmacyData = {
        id: '01234',
        image: '/img/pharmacy/thumb_001.jpg',
        name: 'メディエイド薬局 神田店',
        address: '東京都内神田3-2-1 喜助内3丁目ビル',
        location: {
            lat: 35.69738658193822,
            lng: 139.7529680719138,
        },
    }

    // Marker追加
    const addMarker = () => {
        if (googleMap) {
            new googleMap.maps.Marker({
                position: pharmacyData.location,
                map,
                animation: google.maps.Animation.DROP,
                icon: {
                    url: '/img/icon_pin_pharmacy.svg',
                    scaledSize: new google.maps.Size(40, 69),
                },
            })
        }
    }

    useEffect(() => {
        map?.setCenter(pharmacyData.location)
        addMarker()
    }, [map])

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenRegisterDialog(true)
    }

    return (
        <>
            <DefaultLayout>
                <Header title="薬局所在地" prevURL="back" isHomeBtn={false} />
                <main className="main">
                    <MainLead>以下の薬局を登録してよろしいですか？</MainLead>
                    <MapB>
                        <MapAreaB>
                            <div style={mapStyle} ref={mapContainerRef} />
                            <MapInfoWindow
                                data={pharmacyData}
                                open={openWindow}
                            />
                        </MapAreaB>
                        <MapBtm>
                            <MapBtmInner>
                                <NextButton
                                    href="#"
                                    onClick={onSubmit}
                                    disabled={!openWindow}
                                >
                                    登録する
                                </NextButton>
                            </MapBtmInner>
                        </MapBtm>
                    </MapB>
                </main>
            </DefaultLayout>
            <Dialog
                open={openRegisterDialog}
                sx={{
                    '& .MuiBackdrop-root': {
                        background: 'rgba(0,0,0,0.8)',
                    },
                    '& .MuiDialog-paper': {
                        width: '100%',
                        margin: '16px',
                    },
                }}
            >
                <DialogMain>
                    <DialogMainText>
                        メディエイド薬局
                        <br />
                        を登録しました
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    setOpenRegisterDialog(false)
                                    setOpenConfirmDialog(true)
                                }}
                            >
                                次へ
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
            <Dialog
                open={openConfirmDialog}
                sx={{
                    '& .MuiBackdrop-root': {
                        background: 'rgba(0,0,0,0.8)',
                    },
                    '& .MuiDialog-paper': {
                        width: '100%',
                        margin: '16px',
                    },
                }}
            >
                <DialogMain>
                    <DialogMainText>
                        登録した利用薬局と 本アプリを連携をしますか？
                        <br />
                        なお連携を行うには、連携を行う利用薬局店舗に直接行く必要があります。
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() => {
                                    router.push('/home')
                                }}
                            >
                                いいえ
                            </CloseDialogButton>
                        </li>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    router.push(
                                        '/medical/register/pharmacy/cooperation'
                                    )
                                }}
                            >
                                はい
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default MedicalRegisterPharmacyPage
