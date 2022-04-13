import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGoogleMap, useMap } from '../../../../hooks/useMap'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Header from '../../../../components/organisms/OriginalHeader'
import PharmacyDetail, {
    PharmacyDetailName,
    PharmacyDetailAddress,
    PharmacyDetailAddressText,
    PharmacyDetailAddressLink,
    PharmacyDetailBody,
    PharmacyDetailBtm,
} from '../../../../components/organisms/PharmacyDetail'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../../../../components/organisms/DialogMain'
import MapDialog, {
    MapDialogMain,
    MapDialogMainNav,
} from '../../..//../components/organisms/MapDialog'
import {
    NextButton,
    CloseDialogButton,
} from '../../../../components/atoms/OriginalButton'
import {
    MapIcon,
    PharmacyImageBlankIcon,
    TelIcon,
} from '../../../../components/atoms/OriginalIcon'
import apiManager from '../../../../utilities/apiManager'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { NextDialogButton as OriginalNextDialogButton } from '../../../../components/atoms/OriginalButton'
import CooperationDialog from '../../../../components/organisms/CooperationDialog'
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

const MyPharmacyAddPage: React.FC = () => {
    const router = useRouter()
    const googleMap = useGoogleMap()
    const mapContainerRef = useRef(null)
    const map = useMap({ googleMap, mapContainerRef, initialConfig })
    // const auth_key = useSwitchAuthKeyMethod()
    const selectedStore = useSelector((state: RootState) => state.selectedStore)
    const auth = useSelector((state: RootState) => state.auth)

    const [openMapDialog, setOpenMapDialog] = useState(false)
    const [store, setStore] = useState<StoreDetail | null>(null)
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
    const [openCooperationDialog, setOpenCooperationDialog] = useState(false)
    // TODO レセコン連携判定
    const [isConnected, setIsConnected] = useState(false)

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

    const getStoreImage = (imgData: string | null) => {
        let output
        imgData != null
            ? (output = <img src={imgData} alt="" />)
            : (output = <PharmacyImageBlankIcon size="full" />)
        return output
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

    // 情報共有設定
    const onShare = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push(
            '/my-pharmacy/detail/[pharmacyid]/share',
            `/my-pharmacy/detail/${router.query.pharmacyid}/share`
        )
    }

    const onRegister = () => {
        // 利用薬局登録
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
                if (res) {
                    setOpenRegisterDialog(true)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    // お気に入りに設定する
    const onSetFavorite = () => {
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            `/mpp/user-use-stores/favorite/${selectedStore.store_alias}`
        apiManager
            .action(
                'PATCH',
                url,
                { store_alias: selectedStore.store_alias },
                // TODO: 後で削除 開発中確認用固定値auth＿key
                // { AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg' },
                {
                    // AUTHORIZED_KEY: auth_key,
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                if (isConnected) {
                    setOpenCooperationDialog(true)
                } else {
                    router.push('/my-pharmacy')
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    const onAgree = () => {
        setOpenRegisterDialog(false)
        onSetFavorite()
    }

    const onDisagree = () => {
        setOpenRegisterDialog(false)
        if (isConnected) {
            setOpenCooperationDialog(true)
        } else {
            router.push('/my-pharmacy')
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
                // { AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg' },
                {
                    // AUTHORIZED_KEY: auth_key,
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                if (res) {
                    setStore(res.data?.store)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, [])

    useEffect(() => {
        map?.setCenter(pharmacyData.location)
        addMarker()
    }, [map])

    return (
        <>
            <DefaultLayout>
                <Header title="薬局詳細情報" prevURL="back" isHomeBtn={false} />
                <div className="main">
                    <PharmacyDetail>
                        {getStoreImage(store && store.store_image)}
                        <PharmacyDetailName>
                            {store && store.store_name}
                        </PharmacyDetailName>
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
                                                <TelIcon />
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
                                        {store && store.business_time_comment}
                                    </span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>定休日</dt>
                                <dd>{store && store.regular_holiday}</dd>
                            </dl>
                            <dl>
                                <dt>交通手段</dt>
                                <dd>{store && store.transportation}</dd>
                            </dl>
                            <dl>
                                <dt>駐車場</dt>
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
                                    <Accordion app="LinQ">
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
                                    <Accordion app="LinQ">
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
                                    <Accordion app="LinQ">
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
                                    <Accordion app="LinQ">
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
                                    <Accordion app="LinQ">
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
                                    <Accordion app="LinQ">
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
                                    店舗からの
                                    <br />
                                    お知らせ
                                </dt>
                                <dd>{store && store.news_from_store}</dd>
                            </dl>
                            {/* TODO: Phase2実装機能 */}
                            {/* <dl>
                                <dt>情報共有</dt>
                                <dd>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        mb="8px"
                                    >
                                        <Box>・情報共有設定</Box>
                                        <PharmacyStatus>
                                            一部公開
                                        </PharmacyStatus>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        mb="8px"
                                    >
                                        <Box>・お薬手帳データ</Box>
                                        <PharmacyStatus>公開</PharmacyStatus>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        mb="8px"
                                    >
                                        <Box>・バイタルデータ</Box>
                                        <PharmacyStatus>公開</PharmacyStatus>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Box>・食事データ</Box>
                                        <PharmacyStatus status="private">
                                            非公開
                                        </PharmacyStatus>
                                    </Stack>
                                </dd>
                            </dl> */}
                        </PharmacyDetailBody>
                        <PharmacyDetailBtm>
                            <ul className="main-link">
                                {/* 将来機能 */}
                                {/* <li>
                                    <NextButton href="#" onClick={onShare}>
                                        情報共有設定
                                    </NextButton>
                                </li> */}
                                <li>
                                    <NextButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onRegister()
                                            setOpenRegisterDialog(true)
                                        }}
                                    >
                                        登録する
                                    </NextButton>
                                </li>
                            </ul>
                        </PharmacyDetailBtm>
                    </PharmacyDetail>
                </div>
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
                        利用薬局を登録しました。
                        <br />
                        お気に入り薬局として設定しますか?
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <OriginalNextDialogButton
                                onClick={(e) => {
                                    e.preventDefault()
                                    onAgree()
                                }}
                            >
                                設定する
                            </OriginalNextDialogButton>
                        </li>
                        <li>
                            <OriginalNextDialogButton
                                onClick={(e) => {
                                    e.preventDefault()
                                    onDisagree()
                                }}
                            >
                                設定しない
                            </OriginalNextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
            <CooperationDialog
                isOpen={openCooperationDialog}
                isInitialRegister={false}
            />
        </>
    )
}

export default MyPharmacyAddPage
