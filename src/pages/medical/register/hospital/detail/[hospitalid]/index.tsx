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
    PharmacyDetailHeaderDepartment,
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
} from '../../../../../../components/atoms/Button'
import { MapIcon, TelIcon } from '../../../../../../components/atoms/Icon'

const MedicalRegisterHospitalPage: React.FC = () => {
    const router = useRouter()
    const [isHospitalImage] = useState(true)
    const [isHomepageLink] = useState(true)
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false)

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenRegisterDialog(true)
    }

    return (
        <>
            <DefaultLayout>
                <Header title="医療機関情報" prevURL="back" isHomeBtn={false} />
                <Main bg="white">
                    <MainLead>
                        以下の医療機関を登録してよろしいですか？
                    </MainLead>
                    <PharmacyDetail>
                        {isHospitalImage && (
                            <img src="/img/hospital/img_001.jpg" alt="" />
                        )}
                        <PharmacyDetailHeader>
                            <PharmacyDetailHeaderName>
                                神田内科クリニック
                            </PharmacyDetailHeaderName>
                            <PharmacyDetailHeaderDepartment>
                                <li>内科</li>
                                <li>循環器内科</li>
                                <li>消火器内科</li>
                                <li>糖尿病内科</li>
                            </PharmacyDetailHeaderDepartment>
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
                                        <Link href="/medical/register/hospital/map">
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
                        神田内科クリニック
                        <br />
                        を登録しました
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    router.push('/home3')
                                }}
                            >
                                次へ
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default MedicalRegisterHospitalPage
