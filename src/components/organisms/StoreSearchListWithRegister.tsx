import React from 'react'
import Link from 'next/link'
import { TextButton, TextLinkButton } from '../atoms/Button'
import { Box, Stack } from '@mui/material'
import PharmacyList, {
    PharmacyListItem,
    PharmacyListImg,
    PharmacyListInfo,
    PharmacyListInfoName,
    PharmacyListInfoText,
    PharmacyListInfoLink,
    PharmacyListItemWideInner,
} from './PharmacyList'
import { StoreSearch } from '../../types/StoreSearch'
import { PharmacyImageBlankIcon } from '../atoms/Icon'

type Props = {
    stores: StoreSearch[]
    isSearched: boolean
    onSearchClear: () => void
    onSelect: (type: string, storeData: StoreSearch) => void
}

const StoreSearchListWithRegister = ({
    stores,
    isSearched,
    onSearchClear,
    onSelect,
}: Props) => {
    const getStoreImage = (imgData: string | null) => {
        let output
        imgData != null
            ? (output = <img src={imgData} alt="" />)
            : (output = <PharmacyImageBlankIcon />)
        return output
    }

    if (isSearched) {
        return (
            <>
                <Box
                    sx={{
                        my: '10px',
                        textAlign: 'center',
                    }}
                >
                    <TextButton
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            onSearchClear()
                        }}
                    >
                        検索条件をクリア
                    </TextButton>
                </Box>
                <PharmacyList>
                    {stores.map((store: StoreSearch) => (
                        <PharmacyListItem key={store.store_alias}>
                            <PharmacyListItemWideInner>
                                <PharmacyListImg>
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
                                                    onSelect('register', store)
                                                }}
                                                size="smallB"
                                            >
                                                登録する
                                            </TextLinkButton>
                                        </li>
                                        <li>
                                            <TextLinkButton
                                                href="/register/pharmacy/detail/aaaa"
                                                size="smallB"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    onSelect(
                                                        'viewDetail',
                                                        store
                                                    )
                                                }}
                                            >
                                                詳細を見る
                                            </TextLinkButton>
                                        </li>
                                    </PharmacyListInfoLink>
                                </PharmacyListInfo>
                            </PharmacyListItemWideInner>
                        </PharmacyListItem>
                    ))}
                </PharmacyList>
            </>
        )
    } else {
        return (
            <Stack direction="row" justifyContent="center">
                <Box
                    sx={{
                        pt: '10px',
                        fontSize: '16px',
                        lineHeight: '22px',
                        textAlign: 'center',
                    }}
                >
                    エリアやキーワードを入力して
                    <br />
                    店舗を検索してください
                </Box>
            </Stack>
        )
    }
}
export default StoreSearchListWithRegister
