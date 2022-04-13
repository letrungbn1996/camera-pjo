import React from 'react'
import router from 'next/router'
import PharmacyList, {
    PharmacyListItem,
    PharmacyListItemInner,
    PharmacyListImg,
    PharmacyListImgLabel,
    PharmacyListInfo,
    PharmacyListInfoName,
    PharmacyListInfoText,
    PharmacyListInfoLink,
} from './PharmacyList'
import { TextLinkButton } from '../atoms/OriginalButton'
import { StoreSearch } from '../../types/StoreSearch'
import { useGetPharmacyOpenLabel } from '../../hooks/useGetPharmacyOpenLabel'
import { PharmacyImageBlankIcon } from '../atoms/OriginalIcon'

type Props = {
    stores: StoreSearch[]
    onSelect: (type: string, storeData: StoreSearch) => void
    dayString: string
}

const StoreRegisteredList = ({ stores, onSelect, dayString }: Props) => {
    const getStoreImage = (imgData: string | null) => {
        let output
        imgData != null
            ? (output = <img src={imgData} alt="" />)
            : (output = <PharmacyImageBlankIcon />)
        return output
    }

    return (
        <PharmacyList>
            {stores &&
                stores.map((store: StoreSearch) => (
                    <PharmacyListItem key={store.store_alias}>
                        <PharmacyListItemInner>
                            <PharmacyListImg>
                                {dayString != null && (
                                    <PharmacyListImgLabel
                                        reception={useGetPharmacyOpenLabel(
                                            store,
                                            dayString
                                        )}
                                    />
                                )}
                                {getStoreImage(store.store_image)}
                            </PharmacyListImg>
                            <PharmacyListInfo>
                                <PharmacyListInfoName>
                                    {store.store_name}
                                </PharmacyListInfoName>
                                <PharmacyListInfoText>
                                    {store.address}
                                </PharmacyListInfoText>
                                <PharmacyListInfoLink>
                                    <li>
                                        <TextLinkButton
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                onSelect('select', store)
                                            }}
                                            size="smallB"
                                        >
                                            選択する
                                        </TextLinkButton>
                                    </li>
                                    <li>
                                        <TextLinkButton
                                            href="/register/pharmacy/detail/aaaa"
                                            size="smallB"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                onSelect('viewDetail', store)
                                            }}
                                        >
                                            詳細を見る
                                        </TextLinkButton>
                                    </li>
                                </PharmacyListInfoLink>
                            </PharmacyListInfo>
                        </PharmacyListItemInner>
                    </PharmacyListItem>
                ))}
        </PharmacyList>
    )
}
export default StoreRegisteredList
