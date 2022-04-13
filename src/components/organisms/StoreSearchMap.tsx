import React, { useEffect, useRef, useState } from 'react'
import { Fade, Box, CircularProgress, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { useGoogleMap, useMap } from '../../hooks/useMap'
import { RootState } from '../../store'
import apiManager from '../../utilities/apiManager'
import { MapSearchButton, MapCurrentButton } from '../atoms/Button'
import { MapCurrentIcon } from '../atoms/Icon'
import { MapC, MapAreaC, MapSearch, MapCurrent } from './Map'
import MapInfoWindow from './MapInfoWindow'
import { StoreSearch } from '../../types/StoreSearch'

// Google Map Settings
const initialConfig = {
    zoom: 16,
    center: { lat: 35.681236, lng: 139.767125 }, // 東京駅
    disableDefaultUI: true,
    zoomControl: true,
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
type Props = {
    stores: StoreSearch[]
    isSearched: boolean
    onSearchClear: () => void
    onSelect: (type: string, storeData: StoreSearch) => void
    loading: boolean
    listNotFound: boolean
    type: string // register / prescription (画面タイプ)
}
const StoreSearchMap = ({
    stores,
    isSearched,
    onSearchClear,
    onSelect,
    loading,
    listNotFound,
    type,
}: Props) => {
    const googleMap = useGoogleMap()
    const mapContainerRef = useRef(null)
    const map = useMap({ googleMap, mapContainerRef, initialConfig })
    const auth = useSelector((state: RootState) => state.auth)
    // Map領域の伸縮取得
    const targetEl = document.querySelector('#mapArea')
    const targetElWidth = document.querySelector('#mapArea')?.clientWidth

    // インフォウィンドウステート
    const [openWindow, setOpenWindow] = useState(false)
    // マップから取得する店舗
    const [storeMap, setStoreMap] = useState<StoreSearch[]>([])
    const [mapNotFound, setMapNotFound] = useState(false)

    // 「このエリアを検索」挙動
    const requestSearch = (requireNotFoundAlert: boolean = true) => {
        // マップ左下: southWestRef.current
        // マップ右上: northEastRef.current
        const url: string =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/order-registration/map-stores'
        apiManager
            .action(
                'GET',
                url,
                {
                    sw_lng: southWestRef.current.lng,
                    sw_lat: southWestRef.current.lat,
                    ne_lng: northEastRef.current.lng,
                    ne_lat: northEastRef.current.lat,
                },
                // TODO: 後で削除 開発中確認用固定値auth＿key
                {
                    // AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg',
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                setStoreMap(res?.data.stores)
                if (requireNotFoundAlert) {
                    if (res?.data.stores.length >= 1 && stores.length >= 1) {
                        setMapNotFound(false)
                    } else {
                        setMapNotFound(true)
                        setTimeout(() => {
                            setMapNotFound(false)
                        }, 2000)
                    }
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    // Mapの左下・右上座標
    const [southWest, setSouthWest] = useState({
        lat: 0,
        lng: 0,
    })
    const southWestRef = useRef({ lat: 0, lng: 0 })
    southWestRef.current = southWest // stateのインスタンス
    const [northEast, setNorthEast] = useState({
        lat: 0,
        lng: 0,
    })
    const northEastRef = useRef({ lat: 0, lng: 0 })
    northEastRef.current = northEast // stateのインスタンス

    // 現在、薬局情報を表示しているマーカー番号（表示していない時は「-1」）
    const [currentMarkerIndex, setCurrentMarkerIndex] = useState(-1)
    const currentRef = useRef(-1)
    const [zoom, setZoom] = useState(16)
    currentRef.current = currentMarkerIndex // stateのインスタンス

    // Marker追加
    let markers: google.maps.Marker[] = []
    const [myMarkers, setMyMarkers] = useState<google.maps.Marker[]>([])

    const addMarkers = (list: StoreSearch[]) => {
        if (googleMap) {
            if (list.length >= 1) {
                list.map((item, index) => {
                    const marker = new googleMap.maps.Marker({
                        position: {
                            lat: Number(item.latitude),
                            lng: Number(item.longitude),
                        },
                        map,
                        animation: google.maps.Animation.DROP,
                        icon: {
                            url: '/img/icon_pin_pharmacy.svg',
                            scaledSize: new google.maps.Size(28, 48),
                        },
                    })
                    marker.addListener(
                        'click',
                        (e: google.maps.MapMouseEvent) => {
                            onClickMarker(e, index, marker)
                        }
                    )
                    markers.push(marker)
                })
                setMyMarkers(markers)
            }
        }
    }

    // マップカスタム追加
    const getSWStore = () => {
        let minLng = 180
        let minLat = 90
        stores.forEach((item) => {
            if (minLng > Number(item.longitude)) {
                minLng = Number(item.longitude)
            }
            if (minLat > Number(item.latitude)) {
                minLat = Number(item.latitude)
            }
        })
        return { minLng: minLng, minLat: minLat }
    }
    const getNEStore = () => {
        let maxLng = 0
        let maxLat = 0
        stores.forEach((item) => {
            if (maxLng < Number(item.longitude)) {
                maxLng = Number(item.longitude)
            }
            if (maxLat < Number(item.latitude)) {
                maxLat = Number(item.latitude)
            }
        })
        return { maxLng: maxLng, maxLat: maxLat }
    }

    const getCenterMarker = () => {
        const centerMarkerLng =
            getSWStore().minLng +
            (getNEStore().maxLng - getSWStore().minLng) / 2
        const centerMarkerLat =
            getSWStore().minLat +
            (getNEStore().maxLat - getSWStore().minLat) / 2
        return {
            centerMarkerLng: centerMarkerLng,
            centerMarkerLat: centerMarkerLat,
        }
    }

    const getMapDim = (target: Element | null) => {
        let _mapDim = { height: 700, width: 1000 }
        if (target != null) {
            _mapDim = {
                height: target?.clientHeight,
                width: target?.clientWidth,
            }
        }
        return _mapDim
    }

    const getZoomLevel = (target: Element | null) => {
        if (googleMap) {
            const _sw = new google.maps.LatLng(
                getSWStore().minLng,
                getSWStore().minLat
            )
            const _ne = new google.maps.LatLng(
                getNEStore().maxLng,
                getNEStore().maxLat
            )
            const _bounds = new google.maps.LatLngBounds(_sw, _ne)

            const WORLD_DIM = { height: 512, width: 512 }
            const ZOOM_MAX = 21

            const latRad = (lat: number): number => {
                var sin = Math.sin((lat * Math.PI) / 180)
                var radX2 = Math.log((1 + sin) / (1 - sin)) / 2
                return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2
            }

            const zoom = (
                mapPx: number,
                worldPx: number,
                fraction: number
            ): number => {
                return Math.floor(
                    Math.log(mapPx / worldPx / fraction) / Math.LN2
                )
            }

            var ne = _bounds.getNorthEast()
            var sw = _bounds.getSouthWest()

            var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI

            var lngDiff = ne.lng() - sw.lng()
            var lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360

            var latZoom = zoom(
                getMapDim(target).height,
                WORLD_DIM.height,
                latFraction
            )
            var lngZoom = zoom(
                getMapDim(target).width,
                WORLD_DIM.width,
                lngFraction
            )
            const zoomValue = Math.min(latZoom, lngZoom, ZOOM_MAX)
            setZoom(zoomValue < 5 ? 5 : zoomValue)
        }
    }

    // 現在地を表示ボタン（上矢印）
    const onMapCurrent = () => {
        onSearchClear()
        removeMarkers()
        setZoom(16)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                    map?.panTo(pos)
                    google.maps.event.trigger(map, 'dragend')
                },
                () => {}
            )
        }
    }

    // このエリアを検索
    const onMapSearch = () => {
        onSearchClear()
        removeMarkers()
        // Marker削除
        setStoreMap([])

        // インフォウィンドウ閉じる
        setCurrentMarkerIndex(-1)
        setOpenWindow(false)

        // 再検索する
        requestSearch(true)
    }

    // Marker削除
    const removeMarkers = () => {
        for (let i = 0; i < myMarkers.length; i++) {
            const marker = myMarkers[i]
            marker.setMap(null)
        }
        markers = []
        setMyMarkers(markers)
    }

    // Markerサイズリセット
    const resetMarkers = () => {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setIcon({
                url: '/img/icon_pin_pharmacy.svg',
                scaledSize: new google.maps.Size(28, 48),
            })
        }
    }

    // Markerクリック
    const onClickMarker = (
        e: google.maps.MapMouseEvent,
        index: number,
        marker: google.maps.Marker
    ) => {
        if (e.latLng) {
            map?.panTo({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            })
            if (currentRef.current !== index) {
                setCurrentMarkerIndex(index)
                resetMarkers()
                setOpenWindow(false)
                setTimeout(() => {
                    setOpenWindow(true)
                }, 200)

                marker.setIcon({
                    url: '/img/icon_pin_pharmacy.svg',
                    scaledSize: new google.maps.Size(40, 69),
                })
            }
        }
    }

    // 表示領域を監視
    const onMapIdle = () => {
        if (map) {
            const latlngBounds = map.getBounds()
            const swLatlng = latlngBounds!.getSouthWest()
            const neLatlng = latlngBounds!.getNorthEast()
            setSouthWest({
                lat: swLatlng.lat(),
                lng: swLatlng.lng(),
            })
            setNorthEast({
                lat: neLatlng.lat(),
                lng: neLatlng.lng(),
            })
        }
    }

    // インフォウィンドウ、閉じるボタン
    const onCloseWindow = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        myMarkers[currentRef.current].setIcon({
            url: '/img/icon_pin_pharmacy.svg',
            scaledSize: new google.maps.Size(28, 48),
        })
        setCurrentMarkerIndex(-1)
        setOpenWindow(false)
    }

    // GPI機能があれば現在地で検索
    // 現在地を中心に
    const initMarkerWithCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                    map?.setCenter(pos)
                    // 現在地移動後エリア検索
                    requestSearch(false)
                },
                () => {
                    // 位置情報の取得の際のエラー
                    requestSearch(false)
                }
            )
        } else {
            // 初期値の場所で検索
            requestSearch(false)
        }
    }

    useEffect(() => {
        // 初期エリア検索
        if (isSearched === false) {
            initMarkerWithCurrentPosition()
        }
        // // マップにイベント設定
        if (map) {
            map.addListener('idle', () => {
                onMapIdle()
            })
        }
    }, [map])

    useEffect(() => {
        map?.setZoom(zoom)
    }, [zoom])

    useEffect(() => {
        if (stores.length >= 1) {
            // 薬局一覧で検索した内容をマップで表示
            removeMarkers()
            addMarkers(stores)
            getZoomLevel(targetEl)
            map &&
                map.setCenter(
                    new google.maps.LatLng(
                        getCenterMarker().centerMarkerLat,
                        getCenterMarker().centerMarkerLng
                    )
                )
        }
    }, [map, stores])

    useEffect(() => {
        if (storeMap.length >= 1) {
            removeMarkers()
            addMarkers(storeMap)
        } else {
            removeMarkers()
        }
    }, [storeMap])

    useEffect(() => {
        getMapDim(targetEl)
    }, [targetElWidth])

    return (
        <MapC id="mapArea" type={type}>
            <MapAreaC>
                <MapSearch>
                    <MapSearchButton onClick={onMapSearch}>
                        このエリアを検索
                    </MapSearchButton>
                </MapSearch>
                <MapCurrent>
                    <MapCurrentButton onClick={onMapCurrent}>
                        <MapCurrentIcon />
                    </MapCurrentButton>
                </MapCurrent>
                <div style={mapStyle} ref={mapContainerRef} />
                <MapInfoWindow
                    index={currentMarkerIndex}
                    data={stores[currentMarkerIndex]}
                    open={openWindow}
                    onClose={onCloseWindow}
                    onSelect={onSelect}
                    type={type === 'register' ? 'register' : 'select'}
                />
                <Fade in={loading}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            zIndex: '9999',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                </Fade>
                <Fade in={mapNotFound || listNotFound}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            zIndex: '9999',
                            pointerEvents: 'none',
                        }}
                    >
                        <Box
                            sx={{
                                px: '12px',
                                py: '8px',
                                fontSize: '14px',
                                backgroundColor: '#e6e6e6',
                                borderRadius: '15px',
                            }}
                        >
                            検索結果がありませんでした
                        </Box>
                    </Stack>
                </Fade>
            </MapAreaC>
        </MapC>
    )
}
export default StoreSearchMap
