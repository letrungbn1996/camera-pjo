import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Stack } from '@mui/material'
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
    PharmacyListItemWideInner,
} from './PharmacyList'
import Pagination, { PaginationSeparator } from './Pagination'
import {
    TextButton,
    TextLinkButton,
    PaginationButton,
} from '../atoms/OriginalButton'
import {
    PagerTopIcon,
    PagerPrevIcon,
    PagerNextIcon,
    PagerLastIcon,
    PharmacyImageBlankIcon,
} from '../atoms/OriginalIcon'
import { StoreSearch } from '../../types/StoreSearch'
import { useGetPharmacyOpenLabel } from '../../hooks/useGetPharmacyOpenLabel'

type Props = {
    stores: StoreSearch[]
    isSearched: boolean
    onSearchClear: () => void
    onSelect: (type: string, storeData: StoreSearch) => void
    type: string // TextLinkButtonの2パターン(選択する: 'select' 登録する: 'register')
    dayString?: string
}

const StoreSearchList = ({
    stores,
    isSearched,
    onSearchClear,
    onSelect,
    type,
    dayString,
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
                                            {type === 'register' ? (
                                                <TextLinkButton
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        onSelect(
                                                            'register',
                                                            store
                                                        )
                                                    }}
                                                    size="smallB"
                                                >
                                                    登録する
                                                </TextLinkButton>
                                            ) : (
                                                <TextLinkButton
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        onSelect(
                                                            'select',
                                                            store
                                                        )
                                                    }}
                                                    size="smallB"
                                                >
                                                    選択する
                                                </TextLinkButton>
                                            )}
                                        </li>
                                        <li>
                                            <TextLinkButton
                                                href="#"
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
                            </PharmacyListItemInner>
                        </PharmacyListItem>
                    ))}
                </PharmacyList>
                <Pagination>
                    <li>
                        <PaginationButton href="#">
                            <PagerTopIcon />
                        </PaginationButton>
                    </li>
                    <li>
                        <PaginationButton href="#">
                            <PagerPrevIcon />
                        </PaginationButton>
                    </li>
                    <li>
                        <PaginationButton href="#" active={true}>
                            1
                        </PaginationButton>
                    </li>
                    <li>
                        <PaginationButton href="#">2</PaginationButton>
                    </li>
                    <li>
                        <PaginationButton href="#">3</PaginationButton>
                    </li>
                    <li>
                        <PaginationButton href="#">4</PaginationButton>
                    </li>
                    <li>
                        <PaginationSeparator>…</PaginationSeparator>
                    </li>
                    <li>
                        <PaginationButton href="#">
                            <PagerNextIcon />
                        </PaginationButton>
                    </li>
                    <li>
                        <PaginationButton href="#">
                            <PagerLastIcon />
                        </PaginationButton>
                    </li>
                </Pagination>
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
export default StoreSearchList
