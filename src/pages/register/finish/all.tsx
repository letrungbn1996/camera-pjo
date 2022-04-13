import React from 'react'
import type { NextPage } from 'next'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import SimpleHeader from '../../../components/organisms/SimpleHeader'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
    InitialBtmCharacter,
} from '../../../components/organisms/Initial'
import { NextButton } from '../../../components/atoms/Button'
import { EndingCharacterIconKHA } from '../../../components/atoms/Icon'

import { Box } from '@mui/material'

const RegistPage: NextPage = () => {
    return (
        <>
            <DefaultLayout>
                <SimpleHeader title="登録完了" />
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                }}
                            >
                                すべての登録が完了しました。
                                <br />
                                ご登録、お疲れさまでした。
                                <br />
                                引き続き、本アプリのご利用を
                                <br />
                                お願いします。
                            </Box>
                        </InitialLead>
                    </InitialSection>
                    <InitialBtm>
                        <InitialBtmCharacter>
                            <EndingCharacterIconKHA />
                        </InitialBtmCharacter>
                        <NextButton href="/">ホーム画面へ</NextButton>
                    </InitialBtm>
                </Initial>
            </DefaultLayout>
        </>
    )
}

export default RegistPage
