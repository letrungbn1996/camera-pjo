import React, { useState, useEffect, useRef, useContext } from 'react'
import Link from 'next/link'
import { useGoogleMap, useMap } from '../../../../hooks/useMap'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Header from '../../../../components/organisms/Header'
import RegistNav from '../../../../components/organisms/RegistNav'
import { MainLead } from '../../../../components/organisms/Main'
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
} from '../../../../components/organisms/PharmacyDetail'
import {
    PharmacyListItem,
    PharmacyListItemInner,
    PharmacyListImg,
    PharmacyListInfo,
    PharmacyListInfoName,
} from '../../../../components/organisms/PharmacyList'
import MapDialog, {
    MapDialogMain,
    MapDialogMainNav,
} from '../../../../components/organisms/MapDialog'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainComment,
    DialogMainAttention,
    DialogMainNav,
} from '../../../../components/organisms/DialogMain'
import Accordion, {
    AccordionTitle,
    AccordionContent,
} from '../../../../components/organisms/Accordion'
import {
    NextButton,
    TextLinkButton,
    NextDialogButton,
    CloseDialogButton,
} from '../../../../components/atoms/Button'
import {
    MapIcon,
    PharmacyImageBlankIcon,
    TelIcon,
} from '../../../../components/atoms/Icon'
import { Box } from '@mui/material'
import apiManager from '../../../../utilities/apiManager'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import CooperationDialog from '../../../../components/organisms/CooperationDialog'
import PharmacyRegisteredDialog from '../../../../components/organisms/PharmacyRegisteredDialog'
import { useSwitchAuthKeyMethod } from '../../../../hooks/useSwitchAuthKeyMethod'
import { UserContext } from '../../../../providers/UserProvider'
import { useCutSeconds } from '../../../../hooks/useCutSeconds'
import { StoreDetail } from '../../../../types/StoreDetail'

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

declare global {
    interface Window {
        request: any
        response: any
        webkit: any
    }
}
declare const request: any

const PharmacyDetailPage: React.FC = () => {
    const googleMap = useGoogleMap()
    const mapContainerRef = useRef(null)
    const map = useMap({ googleMap, mapContainerRef, initialConfig })
    const selectedStore = useSelector((state: RootState) => state.selectedStore)
    // const auth_key = useSwitchAuthKeyMethod()
    const auth = useSelector((state: RootState) => state.auth)

    const [openMapDialog, setOpenMapDialog] = useState(false)
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
    const [openCooperationDialog, setOpenCooperationDialog] = useState(false)
    const [store, setStore] = useState<StoreDetail | null>(null)
    const userInfo = useContext(UserContext)

    const getStoreImage = (imgData: string | null) => {
        let output
        imgData != null
            ? (output = <img src={imgData} alt="" />)
            : (output = <PharmacyImageBlankIcon size="full" />)
        return output
    }

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

    useEffect(() => {
        map?.setCenter({
            lat: Number(store?.latitude),
            lng: Number(store?.longitude),
        })
        addMarker()
    }, [map])

    // 利用薬局登録
    const onRegister = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/user-use-stores/store-user-use-store'
        apiManager
            .action(
                'POST',
                url,
                {
                    store_alias: selectedStore.store_alias,
                },
                // TODO: 後で削除 開発中確認用固定値auth＿key
                {
                    // AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg',
                    // AUTHORIZED_KEY: auth_key
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                setOpenRegisterDialog(true)
            })
            .catch((error) => {
                console.log(error.response)
            })
        setOpenRegisterDialog(true)
    }

    const _onSubmit = () => {
        setOpenCooperationDialog(true)
    }

    const submitCall = (telNumber: number | string) => {
        let data = JSON.stringify({
            callPhone: { number: telNumber },
        })
        try {
            if (userInfo.userAgent === 'android') {
                request.postMessage(data) //MEMO: for android addJavascriptInterface
            } else {
                window.webkit.messageHandlers.request.postMessage(data)
            }
        } catch (err) {
            console.log('' + err)
        }
    }

    useEffect(() => {
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
                console.log(error)
            })
    }, [])

    return (
        <>
            <DefaultLayout>
                <Header
                    title="利用薬局の登録"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <RegistNav step={4} total={4} app="KHA" />
                <main className="main">
                    <MainLead>利用薬局を確認の上、登録してください。</MainLead>
                    <PharmacyDetail>
                        {getStoreImage(store && store.store_image)}
                        <PharmacyDetailName>
                            {store && store.store_name}
                        </PharmacyDetailName>
                        <PharmacyDetailHeader>
                            <ul className="main-link">
                                <li>
                                    <NextButton href="#" onClick={onRegister}>
                                        登録する
                                    </NextButton>
                                </li>
                            </ul>
                        </PharmacyDetailHeader>
                        <PharmacyDetailAccordion app="KHA">
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
                                            {store && store.postal_code}
                                            <br />
                                            {store && store.address}
                                            <br />
                                            {`TEL：${store?.phone_number}`}
                                        </PharmacyDetailAddressText>
                                        <PharmacyDetailAddressLink>
                                            {/* TODO: MAPレスポンスまち */}
                                            <li>
                                                <Link href="#">
                                                    <a onClick={onOpenMap}>
                                                        <MapIcon />
                                                    </a>
                                                </Link>
                                            </li>
                                            {store && store.phone_number && (
                                                <li>
                                                    <a
                                                        href={`tel:${store.phone_number}`}
                                                    >
                                                        <TelIcon
                                                            onClick={() => {
                                                                submitCall(
                                                                    store.phone_number
                                                                )
                                                            }}
                                                        />
                                                    </a>
                                                </li>
                                            )}
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
                                        <dt>駐車場</dt>{' '}
                                        <dd>
                                            {store &&
                                                store.exist_parking !== null &&
                                                (store.exist_parking === 0
                                                    ? `なし`
                                                    : `あり`)}
                                        </dd>
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
                                    {/* TODO: 将来機能 */}
                                    {/* <dl>
                                        <dt>その他</dt>
                                        <dd>
                                            <Accordion app="KHA">
                                                <AccordionTitle
                                                    href="#"
                                                    onClick={onToggleItem}
                                                >
                                                    ・バリアフリー
                                                </AccordionTitle>
                                                <AccordionContent>
                                                    バリアフリーについて、〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
                                                </AccordionContent>
                                            </Accordion>
                                            <Accordion app="KHA">
                                                <AccordionTitle
                                                    href="#"
                                                    onClick={onToggleItem}
                                                >
                                                    ・高度管理医療機器取扱店
                                                </AccordionTitle>
                                                <AccordionContent>
                                                    高度管理医療機器取扱店について、〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
                                                </AccordionContent>
                                            </Accordion>
                                            <Accordion app="KHA">
                                                <AccordionTitle
                                                    href="#"
                                                    onClick={onToggleItem}
                                                >
                                                    ・オンライン服薬指導対応店
                                                </AccordionTitle>
                                                <AccordionContent>
                                                    オンライン服薬指導対応店について、〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
                                                </AccordionContent>
                                            </Accordion>
                                            <Accordion app="KHA">
                                                <AccordionTitle
                                                    href="#"
                                                    onClick={onToggleItem}
                                                >
                                                    ・クレジットカード対応店
                                                </AccordionTitle>
                                                <AccordionContent>
                                                    クレジットカード対応店について、〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
                                                </AccordionContent>
                                            </Accordion>
                                            <Accordion app="KHA">
                                                <AccordionTitle
                                                    href="#"
                                                    onClick={onToggleItem}
                                                >
                                                    ・電子マネー対応店
                                                </AccordionTitle>
                                                <AccordionContent>
                                                    電子マネー対応店について、〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
                                                </AccordionContent>
                                            </Accordion>
                                            <Accordion app="KHA">
                                                <AccordionTitle
                                                    href="#"
                                                    onClick={onToggleItem}
                                                >
                                                    ・バーコード決済対応店
                                                </AccordionTitle>
                                                <AccordionContent>
                                                    バーコード決済対応店について、〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
                                                </AccordionContent>
                                            </Accordion>
                                        </dd>
                                    </dl> */}
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
                                            <NextButton
                                                href="#"
                                                onClick={onRegister}
                                            >
                                                登録する
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
            <PharmacyRegisteredDialog
                isOpen={openRegisterDialog}
                setOpen={setOpenRegisterDialog}
                onSubmit={_onSubmit}
                isOriginal={false}
            >
                利用薬局の登録が
                <br />
                完了しました。
                <br />
                お気に入り薬局として設定されました。
            </PharmacyRegisteredDialog>
            <CooperationDialog
                isOpen={openCooperationDialog}
                isInitialRegister={true}
            />
        </>
    )
}

export default PharmacyDetailPage
