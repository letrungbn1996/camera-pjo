import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import DefaultLayout from '../../components/templates/DefaultLayout'
import OriginalHeader from '../../components/organisms/OriginalHeader'
import OriginalRegistNav from '../../components/organisms/OriginalRegistNav'
import { MainLead } from '../../components/organisms/Main'
import PharmacyNav, {
    PharmacySearchConsole,
    PharmacySearchConsoleInput,
    PharmacySearchConsoleInputNav,
    PharmacySearchConsoleInputText,
    PharmacySearchConsoleSelect,
    PharmacySearchNav,
} from '../../components/organisms/PharmacyNav'
import formCss from '../../components/atoms/OriginalForm.module.scss'
import {
    PharmacyNavButton,
    SearchButton,
    NextDialogButton,
    CloseDialogButton,
} from '../../components/atoms/OriginalButton'
import apiManager from '../../utilities/apiManager'
import StoreRegisteredList from '../../components/organisms/StoreRegisteredList'
import StoreSearchList from '../../components/organisms/StoreSearchList'
import { prefectures, prefecture } from '../../types/Prefecture'
import router from 'next/router'
import { selectedStoreSlice } from '../../store/selectedStore'
import { useDispatch } from 'react-redux'
import authManager from '../../utilities/authManager'
import { Dialog } from '@mui/material'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../../components/organisms/DialogMain'
import StoreSearchMap from '../../components/organisms/StoreSearchMap'
import { useSwitchAuthKeyMethod } from '../../hooks/useSwitchAuthKeyMethod'
import { useGetDay } from '../../hooks/useGetDay'
import { StoreSearch } from '../../types/StoreSearch'

const PharmacyPage: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    // const auth_key = useSwitchAuthKeyMethod()
    const now = new Date()
    const dayOfWeek = now.getDay()

    const [registeredStores, setRegisteredStores] = useState<StoreSearch[]>([])
    const [searchedStores, setSearchedStores] = useState<StoreSearch[]>([])
    const [isRegistered, setIsRegistered] = useState(true)
    const [isStoreList, setIsStoreList] = useState(false)
    const [isStoreMap, setIsStoreMap] = useState(false)
    const [isSearched, setIsSearched] = useState(false)
    const [prefecture, setPrefecture] = useState('')
    const [freeword, setFreeword] = useState('')
    const [isSearchBtnActive, setSearchBtnActive] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listNotFound, setListNotFound] = useState(false)
    const [prefecturesData, setPrefecturesData] = useState<prefectures>(null)
    const [dayString, setDayString] = useState('')
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)

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
                // TODO: ???????????? ???????????????????????????auth???key
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

    // ???????????????
    const onSearchClear = () => {
        setSearchedStores([])
        setPrefecture('')
        setIsSearched(false)
        setFreeword('')
        const prefSelect = document.querySelector('select')
        if (prefSelect) prefSelect.options[0].selected = true
    }

    // ????????????
    const onChangePref = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPrefecture(e.target.value)
    }

    // ??????????????????
    const onChangeFreeword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        setFreeword(val)
    }

    const handleDisplayStore = (
        e: React.MouseEvent<HTMLAnchorElement>,
        displayType: string
    ) => {
        e.preventDefault()
        if (displayType === 'registeredList') {
            getRegisterStoresData()
            setIsRegistered(true), setIsStoreList(false), setIsStoreMap(false)
        } else if (displayType === 'storeList') {
            setIsRegistered(false), setIsStoreList(true), setIsStoreMap(false)
        } else {
            setIsRegistered(false), setIsStoreList(false), setIsStoreMap(true)
        }
    }

    const onSelect = (type: string, storeData: StoreSearch) => {
        const o = {
            store_alias: storeData.store_alias,
            store_name: storeData.store_name,
            address: storeData.address,
            sunday_reception_from_time: storeData.sunday_reception_from_time,
            sunday_reception_end_time: storeData.sunday_reception_from_time,
            monday_reception_from_time: storeData.monday_reception_from_time,
            monday_reception_end_time: storeData.monday_reception_end_time,
            tuesday_reception_from_time: storeData.tuesday_reception_from_time,
            tuesday_reception_end_time: storeData.tuesday_reception_end_time,
            wednesday_reception_from_time:
                storeData.wednesday_reception_from_time,
            wednesday_reception_end_time:
                storeData.wednesday_reception_end_time,
            thursday_reception_from_time:
                storeData.thursday_reception_from_time,
            thursday_reception_end_time: storeData.thursday_reception_end_time,
            friday_reception_from_time: storeData.friday_reception_from_time,
            friday_reception_end_time: storeData.friday_reception_end_time,
            saturday_reception_from_time:
                storeData.saturday_reception_from_time,
            saturday_reception_end_time: storeData.saturday_reception_end_time,
            national_holiday_reception_from_time:
                storeData.national_holiday_reception_from_time,
            national_holiday_reception_end_time:
                storeData.national_holiday_reception_end_time,
        }
        dispatch(selectedStoreSlice.actions.updateSelectedStore(o))
        if (type === 'viewDetail') {
            router.push(`/pharmacy/detail/${storeData.store_alias}`)
        } else if (type === 'select') {
            router.push('/prescription/')
        }
    }

    // Get registered stores
    const getRegisterStoresData = () => {
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/order-registration/registered-stores'
        apiManager
            .action(
                'GET',
                url,
                {},
                // TODO: ???????????? ???????????????????????????auth???key
                // { AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg' }
                { AUTHORIZED_KEY: auth.authorized_key }
            )
            .then((res) => {
                if (res) {
                    setRegisteredStores(res.data?.stores)
                    if (res.data?.stores.length >= 1) {
                        setIsBtnDisabled(false)
                    } else {
                        setIsBtnDisabled(true)
                    }
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    // ???????????????????????????????????????
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
        setDayString(useGetDay(now, dayOfWeek))
        getRegisterStoresData()
        getPrefecturesData()
    }, [])

    useEffect(() => {
        // ?????????????????????????????????
        if (freeword.length >= 1 || prefecture !== '') {
            setSearchBtnActive(true)
        } else {
            setSearchBtnActive(false)
        }
    }, [freeword, prefecture])

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="????????????"
                    prevURL="back"
                    prevDialog={true}
                    isHomeBtn={true}
                />
                <OriginalRegistNav step={1} total={3} />
                <main className="main">
                    <MainLead>
                        ?????????????????????????????????????????????????????????
                        <PharmacyNav>
                            <li>
                                <PharmacyNavButton
                                    href="#"
                                    onClick={(e) =>
                                        handleDisplayStore(e, 'registeredList')
                                    }
                                    active={isRegistered}
                                    disabled={isBtnDisabled}
                                >
                                    ????????????
                                </PharmacyNavButton>
                            </li>
                            <li>
                                <PharmacyNavButton
                                    href="#"
                                    onClick={(e) =>
                                        handleDisplayStore(e, 'storeMap')
                                    }
                                    active={isStoreMap}
                                >
                                    ???????????????
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
                                    ???????????????
                                </PharmacyNavButton>
                            </li>
                        </PharmacyNav>
                    </MainLead>
                    {!isRegistered && (
                        <PharmacySearchNav>
                            <PharmacySearchConsole>
                                <PharmacySearchConsoleSelect>
                                    <div className={formCss.selectWrapper}>
                                        <select
                                            className={formCss.formSelect}
                                            onChange={onChangePref}
                                        >
                                            <option value="">?????????</option>
                                            {prefecturesData &&
                                                prefecturesData.map(
                                                    (pref: prefecture) => (
                                                        <option
                                                            value={
                                                                pref.prefecture_code
                                                            }
                                                            key={pref.id}
                                                        >
                                                            {
                                                                pref.prefecture_name
                                                            }
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
                                            placeholder="?????????????????????"
                                        />
                                    </PharmacySearchConsoleInputText>
                                    <PharmacySearchConsoleInputNav>
                                        <SearchButton
                                            href="#"
                                            onClick={onSearch}
                                            disabled={!isSearchBtnActive}
                                        >
                                            ??????
                                        </SearchButton>
                                    </PharmacySearchConsoleInputNav>
                                </PharmacySearchConsoleInput>
                            </PharmacySearchConsole>
                        </PharmacySearchNav>
                    )}
                    {isRegistered ? (
                        <StoreRegisteredList
                            stores={registeredStores}
                            onSelect={onSelect}
                            dayString={dayString}
                        />
                    ) : isStoreList ? (
                        <StoreSearchList
                            stores={searchedStores}
                            isSearched={isSearched}
                            onSearchClear={onSearchClear}
                            onSelect={onSelect}
                            type={'select'}
                            dayString={dayString}
                        />
                    ) : (
                        <StoreSearchMap
                            stores={searchedStores}
                            isSearched={isSearched}
                            onSearchClear={onSearchClear}
                            onSelect={onSelect}
                            loading={loading}
                            listNotFound={listNotFound}
                            type={'prescription'}
                        />
                    )}
                </main>
            </DefaultLayout>
            <Dialog
                open={openDialog}
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
                    <DialogMainText>???????????????????????????????????????</DialogMainText>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() => setOpenDialog(false)}
                            >
                                ???????????????
                            </CloseDialogButton>
                        </li>
                        <li>
                            <NextDialogButton
                                onClick={() => router.push('/home')}
                            >
                                OK
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default PharmacyPage
