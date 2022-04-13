import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../components/templates/DefaultLayout'
import PharmacyHeader from '../../components/organisms/OriginalPharmacyHeader'
import Main, { MainBody, MainBtm } from '../../components/organisms/Main'
import NavList, {
    NavListItem,
    NavListItemSelect,
    NavListItemLink,
} from '../../components/organisms/NavList'
import {
    NavListDetailButton,
    NextButton,
} from '../../components/atoms/OriginalButton'
import { FavoriteGroup } from '../../components/atoms/OriginalGroup'
import { Box } from '@mui/material'
import apiManager from '../../utilities/apiManager'
import router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectedStoreSlice } from '../../store/selectedStore'
import { useSwitchAuthKeyMethod } from '../../hooks/useSwitchAuthKeyMethod'
import { RootState } from '../../store'

type StoreProps = {
    address: string
    is_favorite?: number
    prefecture: string
    store_alias: string
    store_name: string
    user_alias?: string
}

const MyPharmacySettingsPage: React.FC = () => {
    const dispatch = useDispatch()
    // const auth_key = useSwitchAuthKeyMethod()
    const auth = useSelector((state: RootState) => state.auth)

    const [stores, setStores] = useState<StoreProps[]>([])

    const onSelect = (storeData: StoreProps) => {
        const o = {
            store_alias: storeData.store_alias,
            store_name: storeData.store_name,
            address: '',
        }
        dispatch(selectedStoreSlice.actions.updateSelectedStore(o))
        router.push(`/my-pharmacy/detail/${storeData.store_alias}`)
    }

    useEffect(() => {
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/order-registration/registered-stores'
        // use stores
        apiManager
            .action(
                'GET',
                url,
                {},
                // TODO: 後で削除 開発中確認用固定値auth＿key
                // { AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg' }
                {
                    // AUTHORIZED_KEY: auth_key
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                if (res) {
                    setStores(res.data?.stores)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, [])

    return (
        <>
            <DefaultLayout>
                <PharmacyHeader
                    title="利用薬局一覧"
                    prevURL="back"
                    isAddBtn={true}
                />
                <Main>
                    <MainBody>
                        <Box
                            sx={{
                                mb: '20px',
                                lineHeight: '24px',
                            }}
                        >
                            お気に入りに設定するには詳細をタップして設定をしてください。
                        </Box>
                        <NavList>
                            {stores &&
                                stores.map((item: StoreProps) => (
                                    <NavListItem>
                                        <NavListItemSelect>
                                            <FavoriteGroup
                                                active={
                                                    item.is_favorite === 1
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <div className="label">
                                                    {item.store_name}
                                                </div>
                                                {/* TODO: Phase2機能 */}
                                                {/* <div className="status">
                                                一部公開
                                            </div> */}
                                            </FavoriteGroup>
                                        </NavListItemSelect>
                                        <NavListItemLink>
                                            <NavListDetailButton
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    onSelect(item)
                                                }}
                                            >
                                                詳細
                                            </NavListDetailButton>
                                        </NavListItemLink>
                                    </NavListItem>
                                ))}
                        </NavList>
                    </MainBody>
                    <MainBtm>
                        <NextButton href="/my-pharmacy/edit">
                            編集する
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default MyPharmacySettingsPage
