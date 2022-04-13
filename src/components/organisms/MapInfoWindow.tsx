import React from 'react'
import PharmacyList, {
    PharmacyListItem,
    PharmacyListItemWideInner,
    PharmacyListImg,
    PharmacyListInfo,
    PharmacyListInfoName,
    PharmacyListInfoText,
    PharmacyListInfoLink,
    PharmacyInfoWindow,
    PharmacyInfoWindowNav,
} from './PharmacyList'
import { InfoCloseButton, TextLinkButton } from '../atoms/Button'
import { InfoCloseIcon, PharmacyImageBlankIcon } from '../atoms/Icon'
import { StoreSearch } from '../../types/StoreSearch'

type MapInfoWindowProps = {
    index: number
    data: StoreSearch
    open: boolean
    onClose: any
    onSelect: (type: string, storeData: StoreSearch) => void
    type: string // register / select
}

// インフォウィンドウコンポーネント
const MapInfoWindow = ({
    index,
    data,
    open,
    onClose,
    onSelect,
    type,
}: MapInfoWindowProps) => {
    const getStoreImage = (imgData: string | null) => {
        let output
        imgData != null && imgData !== ''
            ? (output = <img src={imgData} alt="" />)
            : (output = <PharmacyImageBlankIcon />)
        return output
    }

    if (index >= 0) {
        return (
            <PharmacyInfoWindow isOpen={open}>
                <PharmacyList>
                    <PharmacyListItem>
                        <PharmacyInfoWindowNav>
                            <InfoCloseButton href="#" onClick={onClose}>
                                <InfoCloseIcon />
                            </InfoCloseButton>
                        </PharmacyInfoWindowNav>
                        <PharmacyListItemWideInner>
                            <PharmacyListImg>
                                {getStoreImage(data.store_image)}
                            </PharmacyListImg>
                            <PharmacyListInfo>
                                <PharmacyListInfoName>
                                    {data && data.store_name}
                                </PharmacyListInfoName>
                                <PharmacyListInfoText>
                                    {data && data.address}
                                </PharmacyListInfoText>
                                <PharmacyListInfoLink>
                                    <li>
                                        <TextLinkButton
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                onSelect(type === 'register' ? 'register' : 'select', data)
                                            }}
                                            size="smallB"
                                        >
                                            {type === 'register'
                                                ? '登録する'
                                                : '選択する'}
                                        </TextLinkButton>
                                    </li>
                                    <li>
                                        <TextLinkButton
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                onSelect('viewDetail', data)
                                            }}
                                            size="smallB"
                                        >
                                            詳細を見る
                                        </TextLinkButton>
                                    </li>
                                </PharmacyListInfoLink>
                            </PharmacyListInfo>
                        </PharmacyListItemWideInner>
                    </PharmacyListItem>
                </PharmacyList>
            </PharmacyInfoWindow>
        )
    } else {
        return <></>
    }
}

export default MapInfoWindow
