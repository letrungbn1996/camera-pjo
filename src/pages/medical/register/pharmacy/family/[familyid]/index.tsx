import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../../../../../components/organisms/Header'
import DefaultLayout from '../../../../../../components/templates/DefaultLayout'
import Main, {
    MainBody,
    MainBtm,
} from '../../../../../../components/organisms/Main'
import {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistConfirm,
} from '../../../../../../components/organisms/Regist'
import { NextButton } from '../../../../../../components/atoms/Button'
import { Box } from '@mui/material'

const MedicalRegisterPharmacyPage: React.FC = () => {
    const router = useRouter()

    // 選択する
    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        // 選択の処理はさむ
        router.push('/home')
    }

    return (
        <>
            <DefaultLayout>
                <Header
                    title="薬局連携する方を選択する"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Main>
                    <MainBody>
                        <RegistSection>
                            <RegistHeader>
                                <h2 className="headerTitle">ゆうこ（本人）</h2>
                            </RegistHeader>
                            <RegistBody>
                                <RegistConfirm>
                                    <div className="label">
                                        ライフパレットID
                                    </div>
                                    <div className="confirm">
                                        <Box
                                            sx={{
                                                margin: '0 auto',
                                                width: '226px',
                                            }}
                                        >
                                            <img
                                                src="/img/temp/qr_lifepalette_id.png"
                                                alt=""
                                            />
                                        </Box>
                                    </div>
                                </RegistConfirm>
                            </RegistBody>
                        </RegistSection>
                        <Box
                            sx={{
                                mt: '15px',
                                px: '13px',
                                fontSize: '15px',
                                lineHeight: '22px',
                            }}
                        >
                            ※過去のお薬情報については以下の3つの方法から選択できます。
                            <br />
                            お申し出がない場合は&#9312;にてデータ連携の準備を行います。
                            <br />
                            <br />
                            &#9312;過去1年間分
                            <br />
                            &#9313;過去の任意期間（全期間も可能）
                            <br />
                            &#9314;あんしんお薬手帳データの移行
                        </Box>
                    </MainBody>
                    <MainBtm>
                        <NextButton href="#" onClick={onSubmit}>
                            選択する
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default MedicalRegisterPharmacyPage
