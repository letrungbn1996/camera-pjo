import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../components/organisms/OriginalHeader'
import OriginalRegistNav from '../../../components/organisms/OriginalRegistNav'
import Main, { MainBody, MainBtm } from '../../../components/organisms/Main'
import NavList, { NavListItem } from '../../../components/organisms/NavList'
import {
    NextButton,
    FamilyGroupButton,
} from '../../../components/atoms/OriginalButton'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import apiManager from '../../../utilities/apiManager'
import cookieManagement from '../../../utilities/cookieManagement'
import { selectedServiceSlice } from '../../../store/selectedService'
import ErrorDialog from '../../../components/organisms/ErrorDialog'
import { RootState } from '../../../store'

const OnlineDetailPage: React.FC = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [service, setService] = useState<any>()
    const [services, setServices] = useState<any>([])
    const [errorMessage, setErrorMessage] = useState('')
    const [openErrorDialog, setOpenErrorDialog] = useState(false)
    const auth = useSelector((state: RootState) => state.auth)
    useEffect(() => {
        getListService();
        clearServiceStore();
    }, []);

    const clearServiceStore = () => {
        dispatch(selectedServiceSlice.actions.clearStore())
    }

    const getListService = () => {
        const url =
                process.env.NEXT_PUBLIC_NLP_API_URL +
                '/mpp/omi/services';
        apiManager
        .action(
            'GET',
            url,
            {},
            {
                AUTHORIZED_KEY: auth.authorized_key,
            }
        )
        .then((res) => {
            console.log(res);
            
            if (res?.data?.omi_services?.length) {
                setServices(res?.data?.omi_services)
            } else {
                setServices([])
            }
        })
        .catch((error) => {
            console.log(error.response)
        })
    };

    const registerService = (e: any) => {
        e.preventDefault();
        
        router.push(
            `/online/application/pharmacy`
        )
        dispatch(selectedServiceSlice.actions.updateSelectedService({omi_service_alias: services[0].omi_service_alias}))
    };

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="お申込み内容"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <OriginalRegistNav step={1} total={4} />
                <Main>
                    <MainBody>
                        <Box mb="20px" lineHeight="22px">
                            お申込み内容を選択してください。
                        </Box>
                        <NavList>
                            {/* 今回のフェーズは固定で表示　*/}
                            <NavListItem>
                                <FamilyGroupButton
                                    active={service}
                                    size="fontSmall"
                                    onClick={() => {
                                        setService(true)
                                    }}
                                >
                                    オンライン服薬指導
                                </FamilyGroupButton>
                            </NavListItem>
                            {/* TODO: Using after have more 1 service */}
                            {/* {services.map((s: any) => {
                                return (
                                    <NavListItem>
                                        <FamilyGroupButton
                                            active={service?.omi_service_alias === s.omi_service_alias}
                                            size="fontSmall"
                                            onClick={() => {
                                                setService(s)
                                            }}
                                        >
                                            オンライン服薬指導
                                        </FamilyGroupButton>
                                    </NavListItem>
                                )
                            })} */}
                        </NavList>
                    </MainBody>
                    <MainBtm>
                        <NextButton
                            href="#"
                            onClick={(e) => registerService(e)}
                            disabled={!service}
                        >
                            次へ
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
            <ErrorDialog
                isOpen={openErrorDialog}
                errorMessage={errorMessage}
                setDialogOpen={setOpenErrorDialog}
            />
        </>
    )
}

export default OnlineDetailPage
