import React from 'react'
import Header from '../../../../components/organisms/OriginalHeader'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Main, { MainBody, MainBtm } from '../../../../components/organisms/Main'
import {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistConfirm,
} from '../../../../components/organisms/OriginalRegist'
import { NextButton } from '../../../../components/atoms/OriginalButton'
import { Box } from '@mui/material'

const FamilyPage: React.FC = () => {
    return (
        <>
            <DefaultLayout>
                <Header title="見守り招待" prevURL="back" isHomeBtn={false} />
                <Main>
                    <MainBody>
                        <RegistSection>
                            <RegistHeader>
                                <h2 className="headerTitle">
                                    見守り招待コード
                                </h2>
                            </RegistHeader>
                            <RegistBody>
                                <RegistConfirm>
                                    <Box
                                        sx={{
                                            mb: '12px',
                                            fontSize: '22px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        123456
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize: '15px',
                                            lineHeight: '22px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        （2021年12月16日21:36まで有効）
                                    </Box>
                                </RegistConfirm>
                                <RegistConfirm>
                                    <Box
                                        sx={{
                                            fontSize: '15px',
                                            lineHeight: '22px',
                                        }}
                                    >
                                        見守り招待をされた方は、会員登録をする時に、この招待コードを入れることで、ご家族が管理している健康データをあなたが参照することができるようになります。
                                    </Box>
                                </RegistConfirm>
                            </RegistBody>
                        </RegistSection>
                    </MainBody>
                    <MainBtm>
                        <NextButton href="#">
                            ご家族に招待コードを送る
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default FamilyPage
