import React from 'react'
import Header from '../../../components/organisms/Header'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import { MainLead, MainBody } from '../../../components/organisms/Main'
import HomeBanner, {
    HomeBannerHeader,
    HomeBannerImage,
    HomeBannerTitle,
    HomeBannerText,
} from '../../../components/organisms/HomeBanner'
import { ScanIcon, PassCodeIcon } from '../../../components/atoms/Icon'
import { Stack, Box } from '@mui/material'

const MedicalRegisterPage: React.FC = () => {
    return (
        <>
            <DefaultLayout>
                <Header title="追加登録" prevURL="back" isHomeBtn={false} />
                <main className="main">
                    <MainLead>
                        医療機関または薬局店舗を以下の方法から追加登録できます。
                    </MainLead>
                    <MainBody>
                        <Stack spacing="14px">
                            <Box>
                                <HomeBanner href="/medical/register/qr">
                                    <HomeBannerHeader>
                                        <HomeBannerImage>
                                            <ScanIcon />
                                        </HomeBannerImage>
                                        <HomeBannerTitle>
                                            二次元コードを読取る
                                        </HomeBannerTitle>
                                    </HomeBannerHeader>
                                    <HomeBannerText>
                                        医療機関や薬局から受け取った二次元コードを読み取る方はこちら
                                    </HomeBannerText>
                                </HomeBanner>
                            </Box>
                            <Box>
                                <HomeBanner href="/medical/register/code">
                                    <HomeBannerHeader>
                                        <HomeBannerImage>
                                            <PassCodeIcon />
                                        </HomeBannerImage>
                                        <HomeBannerTitle>
                                            施設コードを入力する
                                        </HomeBannerTitle>
                                    </HomeBannerHeader>
                                    <HomeBannerText>
                                        医療機関や薬局から受け取った6桁のコードをお持ちの方はこちら
                                    </HomeBannerText>
                                </HomeBanner>
                            </Box>
                        </Stack>
                    </MainBody>
                </main>
            </DefaultLayout>
        </>
    )
}

export default MedicalRegisterPage
