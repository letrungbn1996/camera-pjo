import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../../../../../../components/organisms/Header'
import DefaultLayout from '../../../../../../components/templates/DefaultLayout'
import Main, {
    MainLead,
    MainBtm,
} from '../../../../../../components/organisms/Main'
import PharmacyDetail, {
    PharmacyDetailHeader,
    PharmacyDetailHeaderName,
    PharmacyDetailHeaderInfo,
    PharmacyDetailHeaderText,
    PharmacyDetailHeaderLink,
    PharmacyDetailExternalLink,
} from '../../../../../../components/organisms/PharmacyDetail'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../../../../../../components/organisms/DialogMain'
import {
    NextButton,
    NextDialogButton,
    CloseDialogButton,
} from '../../../../../../components/atoms/Button'
import { MapIcon, TelIcon } from '../../../../../../components/atoms/Icon'

const MedicalRegisterPharmacyPage: React.FC = () => {
    const router = useRouter()
    const [isPharmacyImage] = useState(true)
    const [isHomepageLink] = useState(true)
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenRegisterDialog(true)
    }

    return (
        <>
            <DefaultLayout>
                <Header title="薬局店舗情報" prevURL="back" isHomeBtn={false} />
                <Main bg="white">
                    <MainLead>以下の薬局を登録してよろしいですか？</MainLead>
                    <PharmacyDetail>
                        {isPharmacyImage && (
                            <img src="/img/pharmacy/img_001.jpg" alt="" />
                        )}
                        <PharmacyDetailHeader>
                            <PharmacyDetailHeaderName>
                                メディエイド薬局 神田店
                            </PharmacyDetailHeaderName>
                            <PharmacyDetailHeaderInfo>
                                <PharmacyDetailHeaderText>
                                    〒101-0047
                                    <br />
                                    東京都内神田3-2-1 喜助内神田3丁目ビル
                                    <br />
                                    TEL：03-3526-6781
                                </PharmacyDetailHeaderText>
                                <PharmacyDetailHeaderLink>
                                    <li>
                                        <Link href="/medical/register/pharmacy/map">
                                            <a>
                                                <MapIcon />
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="tel:03-3526-6781">
                                            <TelIcon />
                                        </a>
                                    </li>
                                </PharmacyDetailHeaderLink>
                            </PharmacyDetailHeaderInfo>
                        </PharmacyDetailHeader>
                        {isHomepageLink && (
                            <PharmacyDetailExternalLink href="https://mediaid.co.jp/">
                                ホームページはこちら
                            </PharmacyDetailExternalLink>
                        )}
                    </PharmacyDetail>
                    <MainBtm>
                        <NextButton href="#" onClick={onSubmit}>
                            登録する
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
            <Dialog
                open={openRegisterDialog}
                sx={{
                    '& .MuiBackdrop-root': {
                        background: 'rgba(0,0,0,0.8)',
                    },
                    '& .MuiDialog-paper': {
                        width: '100%',
                        margin: '16px',
                    },
                }}
            >
                <DialogMain>
                    <DialogMainText>
                        メディエイド薬局
                        <br />
                        を登録しました
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    setOpenRegisterDialog(false)
                                    setOpenConfirmDialog(true)
                                }}
                            >
                                次へ
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
            <Dialog
                open={openConfirmDialog}
                sx={{
                    '& .MuiBackdrop-root': {
                        background: 'rgba(0,0,0,0.8)',
                    },
                    '& .MuiDialog-paper': {
                        width: '100%',
                        margin: '16px',
                    },
                }}
            >
                <DialogMain>
                    <DialogMainText>
                        登録した利用薬局と 本アプリを連携をしますか？
                        <br />
                        なお連携を行うには、連携を行う利用薬局店舗に直接行く必要があります。
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() => {
                                    router.push('/home')
                                }}
                            >
                                いいえ
                            </CloseDialogButton>
                        </li>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    router.push(
                                        '/medical/register/pharmacy/cooperation'
                                    )
                                }}
                            >
                                はい
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default MedicalRegisterPharmacyPage
