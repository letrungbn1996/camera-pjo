import type { NextPage } from 'next'
import { HomeMain, MainBody, MainLead } from '../../components/organisms/Main'
import HomeInformation, {
    HomeInformationHeader,
    HomeInformationBody,
} from '../../components/organisms/HomeInformation'
import HomeBanner, {
    HomeBannerHeader,
    HomeBannerImage,
    HomeBannerTitle,
    HomeBannerText,
} from '../../components/organisms/HomeBanner'
import { ScanIcon, PassCodeIcon } from '../../components/atoms/Icon'
import { Stack, Box } from '@mui/material'

const HomeMain01: NextPage = () => {
    return (
        <main className="main">
            <HomeMain>
                <MainLead>
                    <span className="alert">
                        医療機関もしくは薬局を登録してご利用を開始してください
                    </span>
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
                        <Box>
                            <HomeInformation>
                                <HomeInformationHeader>
                                    お知らせ
                                </HomeInformationHeader>
                                <HomeInformationBody>
                                    <ul>
                                        <li>
                                            2021/08/03
                                            <br />
                                            現在、薬局登録キャンペーンを行っています。
                                        </li>
                                    </ul>
                                </HomeInformationBody>
                            </HomeInformation>
                        </Box>
                    </Stack>
                </MainBody>
            </HomeMain>
        </main>
    )
}

export default HomeMain01
