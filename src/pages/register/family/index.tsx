import React, { useContext } from 'react'
import type { NextPage } from 'next'
import { AppContext } from '../../../providers/AppProvider'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Header from '../../../components/organisms/Header'
import Initial, {
    InitialSection,
    InitialLead,
} from '../../../components/organisms/Initial'
import {
    TextLinkButton,
    RegisterFamilyButton,
} from '../../../components/atoms/Button'
import { FamilyBigIconWith } from '../../../components/atoms/Icon'
import { Box } from '@mui/material'
import RegistNav from '../../../components/organisms/RegistNav'

const RegistPage: NextPage = () => {
    const app = useContext(AppContext)

    return (
        <>
            <DefaultLayout>
                <Header
                    title="ライフパレット会員登録完了"
                    prevURL="back"
                    isHomeBtn={false}
                />
                {app.id === 'KHA' ? (
                    <RegistNav step={3} total={4} app="KHA" />
                ) : (
                    <RegistNav step={3} total={3} />
                )}
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            続けてご家族の情報もこのアプリで管理しますか？
                            <br />
                            最大5人までご家族を登録して管理できます。
                        </InitialLead>
                        <Box
                            sx={{
                                py: '15px',
                            }}
                        >
                            <RegisterFamilyButton href="/register/family/add/1">
                                <FamilyBigIconWith>
                                    家族を登録する
                                </FamilyBigIconWith>
                            </RegisterFamilyButton>
                        </Box>
                        <Box
                            sx={{
                                mt: '5px',
                                textAlign: 'center',
                            }}
                        >
                            <TextLinkButton
                                href={
                                    app.id === 'KHA'
                                        ? '/register/pharmacy'
                                        : '/home'
                                }
                                size="medium"
                            >
                                あとで追加する
                            </TextLinkButton>
                        </Box>
                    </InitialSection>
                </Initial>
            </DefaultLayout>
        </>
    )
}

export default RegistPage
