import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import SimpleHeader from '../../../components/organisms/SimpleHeader'
import Initial, {
    InitialSection,
    InitialLead,
    InitialAttention,
    InitialBtm,
} from '../../../components/organisms/Initial'
import { NextButton } from '../../../components/atoms/OriginalButton'
import { Box } from '@mui/material'
import apiManager from '../../../utilities/apiManager'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

const FinishPage: React.FC = () => {
    const router = useRouter()
    const auth = useSelector((state: RootState) => state.auth)
    const selectedStore = useSelector((state: RootState) => state.selectedStore)

    const onHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push('/home')
    }

    const onAddMyPharmacy = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/user-use-stores/store-user-use-store'
        apiManager
            .action(
                'POST',
                url,
                { store_alias: selectedStore.store_alias },
                // TODO: 後で削除 開発中確認用固定値auth＿key
                // { AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg' }
                { AUTHORIZED_KEY: auth.authorized_key }
            )
            .then((res) => {
                router.push('/home')
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    return (
        <>
            <DefaultLayout>
                <SimpleHeader title="送信が完了しました" />
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            ご準備ができましたら、薬局から完了のメッセージが届きますので、処方箋原本を忘れずにご持参ください。
                        </InitialLead>
                        <br />
                        <InitialAttention>
                            ※処方箋原本をお忘れの場合、お薬をお渡しすることができませんので、ご注意ください。
                        </InitialAttention>
                    </InitialSection>
                    <InitialBtm>
                        <Box
                            sx={{
                                pb: '15px',
                            }}
                        >
                            <NextButton href="#" onClick={onHome}>
                                ホーム画面へ
                            </NextButton>
                        </Box>
                        {/* TODO： 薬局一覧で利用薬局かどうかのレスポンスを取得する（作成中） */}
                        <NextButton href="#" onClick={onAddMyPharmacy}>
                            利用薬局として登録してホームへ
                        </NextButton>
                    </InitialBtm>
                </Initial>
            </DefaultLayout>
        </>
    )
}

export default FinishPage
