import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useGoogleMap, useMap } from '../../../hooks/useMap'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../components/organisms/OriginalHeader'
import OriginalRegistNav from '../../../components/organisms/OriginalRegistNav'
import { MainLead } from '../../../components/organisms/Main'
import PharmacyDetail, {
    PharmacyDetailName,
    PharmacyDetailAddress,
    PharmacyDetailAddressText,
    PharmacyDetailAddressLink,
    PharmacyDetailHeader,
    PharmacyDetailBody,
    PharmacyDetailBtm,
    PharmacyDetailAccordion,
    PharmacyDetailAccordionTitle,
    PharmacyDetailAccordionContent,
} from '../../../components/organisms/PharmacyDetail'
import MapDialog, {
    MapDialogMain,
    MapDialogMainNav,
} from '../../../components/organisms/MapDialog'
import {
    NextButton,
    CloseDialogButton,
} from '../../../components/atoms/OriginalButton'
import {
    MapIcon,
    PharmacyImageBlankIcon,
    TelIcon,
} from '../../../components/atoms/OriginalIcon'
import apiManager from '../../../utilities/apiManager'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { useSwitchAuthKeyMethod } from '../../../hooks/useSwitchAuthKeyMethod'
import { useCutSeconds } from '../../../hooks/useCutSeconds'
import { StoreDetail } from '../../../types/StoreDetail'

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

const PharmacyDetailPage: React.FC = () => {
    // const app = useContext(AppContext)
    const googleMap = useGoogleMap()
    const mapContainerRef = useRef(null)
    const map = useMap({ googleMap, mapContainerRef, initialConfig })
    const selectedStore = useSelector((state: RootState) => state.selectedStore)
    // const auth_key = useSwitchAuthKeyMethod()
    const auth = useSelector((state: RootState) => state.auth)

    const [openMapDialog, setOpenMapDialog] = useState(false)
    const [store, setStore] = useState<StoreDetail | null>(null)

    // Marker追加
    const addMarker = () => {
        if (googleMap && store) {
            new googleMap.maps.Marker({
                position: {
                    lat: Number(store.latitude),
                    lng: Number(store.longitude),
                },
                map,
                animation: google.maps.Animation.DROP,
                icon: {
                    url: '/img/icon_pin_pharmacy.svg',
                    scaledSize: new google.maps.Size(40, 69),
                },
            })
        }
    }

    const onOpenMap = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenMapDialog(true)
    }

    const onToggleItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const target = e.currentTarget
        const next = e.currentTarget.nextElementSibling
        if (next) {
            target.classList.toggle('active')
            next.classList.toggle('active')
        }
    }

    const getStoreImage = (imgData: string | null) => {
        let output
        imgData != null
            ? (output = <img src={imgData} alt="" />)
            : (output = <PharmacyImageBlankIcon size="full" />)
        return output
    }

    useEffect(() => {
        // store detail
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            `/mpp/order-registration/store-detail/${selectedStore.store_alias}`
        apiManager
            .action(
                'GET',
                url,
                { store_alias: selectedStore.store_alias },
                // TODO: 後で削除 開発中確認用固定値auth＿key
                {
                    // AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg',
                    // AUTHORIZED_KEY: auth_key
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                setStore(res?.data?.store)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, [])

    useEffect(() => {
        map?.setCenter({
            lat: Number(store?.latitude),
            lng: Number(store?.longitude),
        })
        addMarker()
    }, [map])

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="薬局選択"
                    prevURL="back"
                    prevDialog={false}
                    isHomeBtn={true}
                />
                <OriginalRegistNav step={1} total={3} />
                <main className="main">
                    <MainLead>
                        以下の薬局に処方箋を送信してよろしいですか？
                    </MainLead>
                    <PharmacyDetail>
                        {getStoreImage(store && store.store_image)}
                        <PharmacyDetailName>
                            {store && store.store_name}
                        </PharmacyDetailName>
                        <PharmacyDetailHeader>
                            <ul className="main-link">
                                <li>
                                    {/* store_aliasはreduxで保管済 */}
                                    <NextButton href="/prescription">
                                        次へ
                                    </NextButton>
                                </li>
                            </ul>
                        </PharmacyDetailHeader>
                        <PharmacyDetailAccordion app="LINQ">
                            <PharmacyDetailAccordionTitle
                                href="#"
                                onClick={onToggleItem}
                            >
                                薬局詳細情報
                            </PharmacyDetailAccordionTitle>
                            <PharmacyDetailAccordionContent>
                                <PharmacyDetailBody>
                                    <PharmacyDetailAddress>
                                        <PharmacyDetailAddressText>
                                            〒{store && store.postal_code}
                                            <br />
                                            {store && store.address}
                                            <br />
                                            TEL：{store && store.phone_number}
                                        </PharmacyDetailAddressText>
                                        <PharmacyDetailAddressLink>
                                            <li>
                                                <Link href="#">
                                                    <a onClick={onOpenMap}>
                                                        <MapIcon />
                                                    </a>
                                                </Link>
                                            </li>
                                            <li>
                                                {store && store.phone_number ? (
                                                    <Link
                                                        href={`tel: ${store.phone_number}`}
                                                    >
                                                        <a>
                                                            <TelIcon />
                                                        </a>
                                                    </Link>
                                                ) : (
                                                    ''
                                                )}
                                            </li>
                                        </PharmacyDetailAddressLink>
                                    </PharmacyDetailAddress>
                                    <dl>
                                        <dt>FAX</dt>
                                        <dd>{store && store.fax_number}</dd>
                                    </dl>
                                    <dl>
                                        <dt>受付時間</dt>
                                        <dd>
                                            {/* データがない場合表示しない */}
                                            {store &&
                                                store.monday_business_from_time &&
                                                store.monday_business_end_time &&
                                                `月　　${useCutSeconds(
                                                    store.monday_business_from_time
                                                )}　～　${useCutSeconds(
                                                    store.monday_business_end_time
                                                )}`}
                                            <br />
                                            {store &&
                                                store.tuesday_business_from_time &&
                                                store.tuesday_business_end_time &&
                                                `火　　${useCutSeconds(
                                                    store.tuesday_business_from_time
                                                )}　～　${useCutSeconds(
                                                    store.tuesday_business_end_time
                                                )}`}
                                            <br />
                                            {store &&
                                                store.wednesday_business_from_time &&
                                                store.wednesday_business_end_time &&
                                                `水　　${useCutSeconds(
                                                    store.wednesday_business_from_time
                                                )}　～　${useCutSeconds(
                                                    store.wednesday_business_end_time
                                                )}`}
                                            <br />
                                            {store &&
                                                store.thursday_business_from_time &&
                                                store.thursday_business_end_time &&
                                                `木　　${useCutSeconds(
                                                    store.thursday_business_from_time
                                                )}　～　${useCutSeconds(
                                                    store.thursday_business_end_time
                                                )}`}
                                            <br />
                                            {store &&
                                                store.friday_business_from_time &&
                                                store.friday_business_end_time &&
                                                `金　　${useCutSeconds(
                                                    store.friday_business_from_time
                                                )}　～　${useCutSeconds(
                                                    store.friday_business_end_time
                                                )}`}
                                            <br />
                                            {store &&
                                                store.saturday_business_from_time &&
                                                store.saturday_business_end_time &&
                                                `土　　${useCutSeconds(
                                                    store.saturday_business_from_time
                                                )}　～　${useCutSeconds(
                                                    store.saturday_business_end_time
                                                )}`}
                                            <br />
                                            {store &&
                                                store.sunday_business_from_time &&
                                                store.sunday_business_end_time &&
                                                `日　　${useCutSeconds(
                                                    store.sunday_business_from_time
                                                )}　～　${useCutSeconds(
                                                    store.sunday_business_end_time
                                                )}`}
                                            <br />
                                            {store &&
                                                store.national_holiday_business_from_time &&
                                                store.national_holiday_business_end_time &&
                                                `祝　　${useCutSeconds(
                                                    store.national_holiday_business_from_time
                                                )}　～　${useCutSeconds(
                                                    store.national_holiday_business_end_time
                                                )}`}
                                            <br />
                                            <span className="attention">
                                                {store &&
                                                    store.business_time_comment}
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>定休日</dt>
                                        <dd>
                                            {store && store.regular_holiday}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>交通手段</dt>
                                        <dd>{store && store.transportation}</dd>
                                    </dl>
                                    <dl>
                                        <dt>駐車場</dt>
                                        <dd>{store && store.exist_parking}</dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            クレジット
                                            <br />
                                            カード利用
                                        </dt>
                                        <dd>
                                            {store &&
                                                store.can_credit_card != null &&
                                                (store.can_credit_card === 0
                                                    ? `利用不可`
                                                    : `利用可能`)}
                                            <br />
                                            <span className="attention">
                                                {store &&
                                                    store.can_use_credit_card_brands}
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            薬局からの
                                            <br />
                                            お知らせ
                                        </dt>
                                        <dd>
                                            {store && store.news_from_store}
                                        </dd>
                                    </dl>
                                </PharmacyDetailBody>
                                <PharmacyDetailBtm>
                                    <ul className="main-link">
                                        <li>
                                            <NextButton href="/prescription">
                                                次へ
                                            </NextButton>
                                        </li>
                                    </ul>
                                </PharmacyDetailBtm>
                            </PharmacyDetailAccordionContent>
                        </PharmacyDetailAccordion>
                    </PharmacyDetail>
                </main>
            </DefaultLayout>
            <MapDialog isOpen={openMapDialog}>
                <MapDialogMain>
                    <div style={mapStyle} ref={mapContainerRef} />
                    <MapDialogMainNav>
                        <CloseDialogButton
                            onClick={() => {
                                setOpenMapDialog(false)
                            }}
                        >
                            閉じる
                        </CloseDialogButton>
                    </MapDialogMainNav>
                </MapDialogMain>
            </MapDialog>
        </>
    )
}

export default PharmacyDetailPage
