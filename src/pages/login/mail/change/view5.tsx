import type { NextPage } from 'next'
import React from 'react'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import SimpleHeader from '../../../../components/organisms/SimpleHeader'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../../../components/organisms/Initial'
import { NextButton } from '../../../../components/atoms/Button'
import { Box } from '@mui/material'

const LoginPage: NextPage = () => {
    return (
        <>
            <DefaultLayout>
                <SimpleHeader title="メールアドレス変更完了" />
                <Initial>
                    <InitialSection>
                        <Box
                            sx={{
                                textAlign: 'center',
                            }}
                        >
                            <InitialLead>
                                ご登録のメールアドレスの変更が
                                <br />
                                完了しました。
                            </InitialLead>
                        </Box>
                    </InitialSection>
                    <InitialBtm>
                        <NextButton href="/">ホーム画面へ</NextButton>
                    </InitialBtm>
                </Initial>
            </DefaultLayout>
        </>
    )
}

export default LoginPage
