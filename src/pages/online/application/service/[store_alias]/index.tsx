import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../../components/organisms/OriginalHeader'
import OriginalRegistNav from '../../../../../components/organisms/OriginalRegistNav'
import Main, {
    MainBody,
    MainBtm,
} from '../../../../../components/organisms/Main'
import {
    RegistSection,
    RegistHeader,
    RegistBody,
} from '../../../../../components/organisms/OriginalRegist'
import {
    NextButton,
    TextLink,
} from '../../../../../components/atoms/OriginalButton'
import { DocumentIconTitleWith } from '../../../../../components/atoms/OriginalIcon'
import { Stack, Box } from '@mui/material'
import apiManager from '../../../../../utilities/apiManager'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../store'

const liStyle = {
    marginLeft: '1em',
    textIndent: '-1em',
}

const OnlineDetailPage: React.FC = () => {
    const router = useRouter()
    const [service, setService] = useState<any>({})
    const {store_alias}: any = router.query;
    const auth = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (store_alias) {
            getDetailService(store_alias);
        }
    }, [store_alias]);

    const getDetailService = (store_alias: string) => {
        const url =
                process.env.NEXT_PUBLIC_NLP_API_URL +
                '/mpp/omi/store/' + store_alias + '/service';
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
            if (res?.data?.omi_service) {
                setService(res?.data?.omi_service)
            } else {
                setService({})
            }
        })
        .catch((error) => {
            console.log(error.response)
        })
    }
    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="お申込み内容"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <OriginalRegistNav step={2} total={4} />
                <Main>
                    <MainBody>
                        <Stack spacing="14px">
                            <Box
                                pb="14px"
                                lineHeight="22px"
                                borderBottom="1px solid #dcdcdc"
                            >
                                <div dangerouslySetInnerHTML={{__html: service?.overview_description}}/>
                            </Box>
                            <Box
                                pb="14px"
                                lineHeight="22px"
                                borderBottom="1px solid #dcdcdc"
                            >
                                <strong>利用料</strong>
                                <br />
                                <div dangerouslySetInnerHTML={{__html: service?.fee_description}}/>
                            </Box>
                            <Box pb="14px" lineHeight="22px">
                                <strong>その他</strong>
                                <div dangerouslySetInnerHTML={{__html: service?.other_description}}/>
                            </Box>
                        </Stack>
                    </MainBody>
                    <MainBtm>
                        <NextButton
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                router.push('/online/application/patient')
                            }}
                        >
                            次へ
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default OnlineDetailPage
