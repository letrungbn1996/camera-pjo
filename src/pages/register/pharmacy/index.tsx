import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Header from '../../../components/organisms/Header'
import ErrorDialog from '../../../components/organisms/ErrorDialog'
import RegistNav from '../../../components/organisms/RegistNav'
import Main, { MainLead, MainBtm } from '../../../components/organisms/Main'
import PharmacyNav, {
    PharmacySearchNav,
    PharmacySearchLead,
    PharmacySearchConsole,
    PharmacySearchConsoleSelect,
    PharmacySearchConsoleInput,
    PharmacySearchConsoleInputText,
    PharmacySearchConsoleInputNav,
} from '../../../components/organisms/PharmacyNav'
import {
    PharmacyNavButton,
    SecondaryButton,
    SearchButton,
} from '../../../components/atoms/Button'
import formCss from '../../../components/atoms/Form.module.scss'
import apiManager from '../../../utilities/apiManager'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { prefectures, prefecture } from '../../../types/Prefecture'
import StoreSearchListWithRegister from '../../../components/organisms/StoreSearchListWithRegister'
import { selectedStoreSlice } from '../../../store/selectedStore'
import CooperationDialog from '../../../components/organisms/CooperationDialog'
import PharmacyRegisteredDialog from '../../../components/organisms/PharmacyRegisteredDialog'
import { useSwitchAuthKeyMethod } from '../../../hooks/useSwitchAuthKeyMethod'
import StoreSearchMap from '../../../components/organisms/StoreSearchMap'
import { StoreSearch } from '../../../types/StoreSearch'

const RegistPage: NextPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    // const auth_key = useSwitchAuthKeyMethod()
    const auth = useSelector((state: RootState) => state.auth)

    const [isSearched, setIsSearched] = useState(false)
    const [isSearchBtnActive, setSearchBtnActive] = useState(false)
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
    const [openCooperationDialog, setOpenCooperationDialog] = useState(false)
    const [prefecture, setPrefecture] = useState('')
    const [freeword, setFreeword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [searchedStores, setSearchedStores] = useState<StoreSearch[]>([])
    const [openErrorDialog, setOpenErrorDialog] = useState(false)
    const [isStoreList, setIsStoreList] = useState(true)
    const [isStoreMap, setIsStoreMap] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listNotFound, setListNotFound] = useState(false)
    const [prefecturesData, setPrefecturesData] = useState<prefectures>(null)

    const onSearch = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setLoading(true)
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/order-registration/store-search'
        apiManager
            .action(
                'GET',
                url,
                {
                    prefecture: prefecture,
                    keyword: freeword,
                },
                // TODO: 後で削除 開発中確認用固定値auth＿key
                // { AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg' }
                { AUTHORIZED_KEY: auth.authorized_key }
            )
            .then((res) => {
                if (res) {
                    setIsSearched(true)
                    setSearchedStores(res.data?.stores)
                }
                setLoading(false)
                if (isSearched) {
                    if (res?.data.stores.length >= 1) {
                        setListNotFound(false)
                    } else {
                        setListNotFound(true)
                        setTimeout(() => {
                            setListNotFound(false)
                        }, 2000)
                    }
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    // 検索クリア
    const onSearchClear = () => {
        setSearchedStores([])
        setPrefecture('')
        setIsSearched(false)
        setFreeword('')
        const prefSelect = document.querySelector('select')
        if (prefSelect) prefSelect.options[0].selected = true
    }

    // 都道府県
    const onChangePref = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPrefecture(e.target.value)
    }

    // フリーワード
    const onChangeFreeword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        setFreeword(val)
    }
    const handleDisplayStore = (
        e: React.MouseEvent<HTMLAnchorElement>,
        displayType: string
    ) => {
        e.preventDefault()
        if (displayType === 'storeList') {
            setIsStoreList(true), setIsStoreMap(false)
        } else {
            setIsStoreList(false), setIsStoreMap(true)
        }
    }

    const onSelect = (type: string, storeData: StoreSearch) => {
        const o = {
            store_alias: storeData.store_alias,
            store_name: storeData.store_name,
            address: storeData.address,
            sunday_reception_from_time: '',
            sunday_reception_end_time: '',
            monday_reception_from_time: '',
            monday_reception_end_time: '',
            tuesday_reception_from_time: '',
            tuesday_reception_end_time: '',
            wednesday_reception_from_time: '',
            wednesday_reception_end_time: '',
            thursday_reception_from_time: '',
            thursday_reception_end_time: '',
            friday_reception_from_time: '',
            friday_reception_end_time: '',
            saturday_reception_from_time: '',
            saturday_reception_end_time: '',
            national_holiday_reception_from_time: '',
            national_holiday_reception_end_time: '',
        }
        dispatch(selectedStoreSlice.actions.updateSelectedStore(o))
        if (type === 'viewDetail') {
            router.push(`/register/pharmacy/detail/${storeData.store_alias}`)
        } else if (type === 'register') {
            // 利用薬局登録
            const url =
                process.env.NEXT_PUBLIC_NLP_API_URL +
                '/mpp/user-use-stores/store-user-use-store'
            apiManager
                .action(
                    'POST',
                    url,
                    {
                        store_alias: storeData.store_alias,
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
    }

    const _onSubmit = () => {
        setOpenCooperationDialog(true)
    }

    // 都道府県選択肢データの取得
    const getPrefecturesData = () => {
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL + '/common/constant-management'
        https: apiManager
            .action(
                'GET',
                url,
                {
                    'constant[0]': 'prefecture_codes',
                },
                {}
            )
            .then((res) => {
                setPrefecturesData(res?.data.prefecture_codes)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    useEffect(() => {
        getPrefecturesData()
    }, [])

    useEffect(() => {
        // 検索ボタンの活性化制御
        if (freeword.length >= 1 || prefecture !== '') {
            setSearchBtnActive(true)
        } else {
            setSearchBtnActive(false)
        }
    }, [freeword, prefecture])

    return (
        <>
            <DefaultLayout>
                <Header
                    title="利用薬局の登録"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <RegistNav step={4} total={4} app="KHA" />
                <Main>
                    <MainLead>
                        よく利用する薬局を選択してください
                        <PharmacyNav>
                            <li>
                                <PharmacyNavButton
                                    href="#"
                                    onClick={(e) =>
                                        handleDisplayStore(e, 'storeMap')
                                    }
                                    active={isStoreMap}
                                >
                                    薬局マップ
                                </PharmacyNavButton>
                            </li>
                            <li>
                                <PharmacyNavButton
                                    href="#"
                                    onClick={(e) =>
                                        handleDisplayStore(e, 'storeList')
                                    }
                                    active={isStoreList}
                                >
                                    薬局リスト
                                </PharmacyNavButton>
                            </li>
                        </PharmacyNav>
                    </MainLead>
                    <PharmacySearchNav>
                        <PharmacySearchLead>
                            よく利用する薬局を設定することができます。薬局を登録しておくと、お役立ち情報の受け取りも可能です。またお薬手帳の情報や、健康情報の情報が、利用薬局と共有されます。
                        </PharmacySearchLead>
                        <PharmacySearchConsole>
                            <PharmacySearchConsoleSelect>
                                <div className={formCss.selectWrapper}>
                                    <select
                                        className={formCss.formSelect}
                                        onChange={onChangePref}
                                    >
                                        <option value="">未選択</option>
                                        {prefecturesData &&
                                            prefecturesData.map(
                                                (pref: prefecture) => (
                                                    <option
                                                        value={
                                                            pref.prefecture_code
                                                        }
                                                        key={pref.id}
                                                    >
                                                        {pref.prefecture_name}
                                                    </option>
                                                )
                                            )}
                                    </select>
                                </div>
                            </PharmacySearchConsoleSelect>
                            <PharmacySearchConsoleInput>
                                <PharmacySearchConsoleInputText>
                                    <input
                                        type="text"
                                        value={freeword}
                                        className={formCss.formZipText}
                                        onChange={onChangeFreeword}
                                        placeholder="○市、○店など"
                                    />
                                </PharmacySearchConsoleInputText>
                                <PharmacySearchConsoleInputNav>
                                    <SearchButton
                                        href="#"
                                        onClick={onSearch}
                                        disabled={!isSearchBtnActive}
                                    >
                                        検索
                                    </SearchButton>
                                </PharmacySearchConsoleInputNav>
                            </PharmacySearchConsoleInput>
                        </PharmacySearchConsole>
                    </PharmacySearchNav>
                    {isStoreList ? (
                        <StoreSearchListWithRegister
                            stores={searchedStores}
                            isSearched={isSearched}
                            onSearchClear={onSearchClear}
                            onSelect={onSelect}
                        />
                    ) : (
                        <StoreSearchMap
                            stores={searchedStores}
                            isSearched={isSearched}
                            onSearchClear={onSearchClear}
                            onSelect={onSelect}
                            loading={loading}
                            listNotFound={listNotFound}
                            type={'register'}
                        />
                    )}
                    <MainBtm>
                        <SecondaryButton href="finish/all">
                            後で登録する
                        </SecondaryButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
            <ErrorDialog
                isOpen={openErrorDialog}
                errorMessage={errorMessage}
                setDialogOpen={setOpenErrorDialog}
            />
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

export default RegistPage
