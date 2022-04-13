import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import PharmacyHeader from '../../../components/organisms/OriginalPharmacyHeader'
import Main, { MainBody, MainBtm } from '../../../components/organisms/Main'
import NavList, {
    NavListItem,
    NavListItemSelect,
    NavListItemLink,
} from '../../../components/organisms/NavList'
import {
    DeleteGroupButton,
    NavListDetailButton,
    NextButton,
    NextDialogButton,
    CloseDialogButton,
} from '../../../components/atoms/OriginalButton'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../../../components/organisms/DialogMain'
import { Box } from '@mui/material'
import apiManager from '../../../utilities/apiManager'
import { useSwitchAuthKeyMethod } from '../../../hooks/useSwitchAuthKeyMethod'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

type StoreProps = {
    address: string
    is_favorite?: number
    prefecture: string
    store_alias: string
    store_name: string
    user_alias?: string
}

const MyPharmacySettingsEditPage: React.FC = () => {
    const router = useRouter()
    // const auth_key = useSwitchAuthKeyMethod()
    const auth = useSelector((state: RootState) => state.auth)

    const [deleteStore, setDeleteStore] = useState('')
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [stores, setStores] = useState<StoreProps[]>([])

    // 削除する
    const onDelete = () => {
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            `/mpp/user-use-stores/store-user-use-store/delete/${deleteStore}`
        // store delete
        apiManager
            .action(
                'DELETE',
                url,
                { store_alias: deleteStore },
                // TODO: 後で削除 開発中確認用固定値auth＿key
                // { AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg' }
                {
                    // AUTHORIZED_KEY: auth_key,
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                // 削除が成功したら再度API取得して画面に反映
                getData()
            })
            .catch((error) => {
                console.log(error.response)
            })

        setOpenDeleteDialog(false)
    }

    const onSelect = (storeAlias: string) => {
        router.push(`/my-pharmacy/detail/${storeAlias}`)
    }

    // get use stores
    const getData = () => {
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/order-registration/registered-stores'
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
    }

    useEffect(() => {
        getData()
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
                            以下の中から薬局を選択して「削除する」ボタンを選択してください。
                        </Box>
                        <NavList>
                            {stores &&
                                stores.map((item: StoreProps) => (
                                    <NavListItem>
                                        <NavListItemSelect>
                                            <DeleteGroupButton
                                                href="#"
                                                active={
                                                    deleteStore ===
                                                    item.store_alias
                                                        ? true
                                                        : false
                                                }
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    deleteStore ===
                                                    item.store_alias
                                                        ? setDeleteStore('')
                                                        : setDeleteStore(
                                                              item.store_alias
                                                          )
                                                }}
                                            >
                                                <div className="label">
                                                    {item.store_name}
                                                </div>
                                                {/* TODO: Phase2機能 */}
                                                {/* <div className="status">
                                                一部公開
                                            </div> */}
                                            </DeleteGroupButton>
                                        </NavListItemSelect>
                                        <NavListItemLink>
                                            <NavListDetailButton
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    onSelect(item.store_alias)
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
                        <NextButton
                            href="#"
                            disabled={deleteStore === ''}
                            onClick={(e) => {
                                e.preventDefault()
                                setOpenDeleteDialog(true)
                            }}
                        >
                            削除する
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
            <Dialog
                open={openDeleteDialog}
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
                        利用薬局から
                        <br />
                        メディエイド薬局 神田店
                        <br />
                        を削除しますか？
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() => {
                                    setOpenDeleteDialog(false)
                                }}
                            >
                                キャンセル
                            </CloseDialogButton>
                        </li>
                        <li>
                            <NextDialogButton onClick={onDelete}>
                                削除する
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default MyPharmacySettingsEditPage
