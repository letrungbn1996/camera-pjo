import React, { useContext } from 'react'
import { AppContext } from '../../../providers/AppProvider'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Header from '../../../components/organisms/OriginalHeader'
import { MainLead, MainBody } from '../../../components/organisms/Main'
import OriginalBanner, {
    OriginalBannerHeader,
    OriginalBannerImage,
    OriginalBannerTitle,
    OriginalBannerText,
} from '../../../components/organisms/OriginalBanner'
import {
    ScanIcon,
    PassCodeIcon,
    MapSearchIcon,
    ListSearchIcon,
} from '../../../components/atoms/OriginalIcon'
import { Stack, Box } from '@mui/material'

const MyPharmacyInitialPage: React.FC = () => {
    const app = useContext(AppContext)

    return (
        <>
            <DefaultLayout>
                <Header title="利用薬局登録" prevURL="back" isHomeBtn={false} />
                <div className="main">
                    <MainLead>利用薬局が登録されていません</MainLead>
                    {app.id === 'KHA' ? (
                        <MainBody>
                            <Box
                                sx={{
                                    mb: '8px',
                                    lineHeight: '24px',
                                }}
                            >
                                利用薬局を登録すると、薬局といつでもメッセージができるようになります。
                                <br />
                                またお薬手帳の情報や、健康情報の情報が、利用薬局と共有されます。
                            </Box>
                            <Box
                                sx={{
                                    mb: '20px',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                }}
                            >
                                ※場合によっては、承認できない場合もございますので、ご了承のほど、よろしくお願いします。
                            </Box>
                            <Stack spacing="14px">
                                <Box>
                                    <OriginalBanner href="/register/pharmacy/map">
                                        <OriginalBannerHeader>
                                            <OriginalBannerImage>
                                                <MapSearchIcon />
                                            </OriginalBannerImage>
                                            <OriginalBannerTitle>
                                                マップから選択する
                                            </OriginalBannerTitle>
                                        </OriginalBannerHeader>
                                        <OriginalBannerText>
                                            現在地などからお近くの薬局を簡単に検索
                                        </OriginalBannerText>
                                    </OriginalBanner>
                                </Box>
                                <Box>
                                    <OriginalBanner href="/register/pharmacy">
                                        <OriginalBannerHeader>
                                            <OriginalBannerImage>
                                                <ListSearchIcon />
                                            </OriginalBannerImage>
                                            <OriginalBannerTitle>
                                                薬局一覧から選択する
                                            </OriginalBannerTitle>
                                        </OriginalBannerHeader>
                                        <OriginalBannerText>
                                            フリーワード、地域から薬局を検索
                                        </OriginalBannerText>
                                    </OriginalBanner>
                                </Box>
                            </Stack>
                        </MainBody>
                    ) : (
                        <MainBody>
                            <Box
                                sx={{
                                    mb: '8px',
                                    lineHeight: '24px',
                                }}
                            >
                                利用薬局を登録すると、薬局といつでもメッセージができるようになります。ご利用には、薬局登録用二次元コードを読み込み、ご利用薬局での承認が必要となります。
                            </Box>
                            <Box
                                sx={{
                                    mb: '20px',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                }}
                            >
                                ※場合によっては、承認できない場合もございますので、ご了承のほど、よろしくお願いします。
                            </Box>
                            <Stack spacing="14px">
                                <Box>
                                    <OriginalBanner href="/medical/register/qr">
                                        <OriginalBannerHeader>
                                            <OriginalBannerImage>
                                                <ScanIcon />
                                            </OriginalBannerImage>
                                            <OriginalBannerTitle>
                                                二次元コードを読取る
                                            </OriginalBannerTitle>
                                        </OriginalBannerHeader>
                                        <OriginalBannerText>
                                            薬局から受け取った二次元コードを読み取る方はこちら
                                        </OriginalBannerText>
                                    </OriginalBanner>
                                </Box>
                                <Box>
                                    <OriginalBanner href="/medical/register/code">
                                        <OriginalBannerHeader>
                                            <OriginalBannerImage>
                                                <PassCodeIcon />
                                            </OriginalBannerImage>
                                            <OriginalBannerTitle>
                                                施設コードを入力する
                                            </OriginalBannerTitle>
                                        </OriginalBannerHeader>
                                        <OriginalBannerText>
                                            薬局から受け取った6桁のコードをお持ちの方はこちら
                                        </OriginalBannerText>
                                    </OriginalBanner>
                                </Box>
                            </Stack>
                        </MainBody>
                    )}
                </div>
            </DefaultLayout>
        </>
    )
}

export default MyPharmacyInitialPage
