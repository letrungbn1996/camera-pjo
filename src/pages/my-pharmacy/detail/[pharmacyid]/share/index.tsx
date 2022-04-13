import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../../components/templates/DefaultLayout'
import Header from '../../../../../components/organisms/OriginalHeader'
import Main, { MainBtm } from '../../../../../components/organisms/Main'
import PharmacyDetail, {
    PharmacyDetailName,
    PharmacyDetailShare,
    PharmacyDetailShareItem,
} from '../../../../../components/organisms/PharmacyDetail'
import { PharmacyStatus } from '../../../../../components/atoms/PharmacyStatus'
import {
    NextButton,
    StatusChangeButton,
    NextDialogButton,
} from '../../../../../components/atoms/OriginalButton'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../../../../../components/organisms/DialogMain'

const MyPharmacySettingsPage: React.FC = () => {
    const router = useRouter()
    const [status1, setStatus1] = useState(false)
    const [status2, setStatus2] = useState(false)
    const [status3, setStatus3] = useState(false)
    const [openFinishDialog, setOpenFinishDialog] = useState(false)

    // 保存する
    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        // 保存の処理はさむ
        setOpenFinishDialog(true)
    }

    return (
        <>
            <DefaultLayout>
                <Header title="薬局詳細情報" prevURL="back" isHomeBtn={false} />
                <Main>
                    <PharmacyDetail>
                        <img src="/img/pharmacy/img_001.jpg" alt="" />
                        <PharmacyDetailName>
                            さくら薬局　大手町店
                        </PharmacyDetailName>
                        <PharmacyDetailShare>
                            <PharmacyDetailShareItem>
                                <div className="label">情報共有設定</div>
                                <div className="status">
                                    {status1 && status2 && status3 ? (
                                        <PharmacyStatus>公開</PharmacyStatus>
                                    ) : !status1 && !status2 && !status3 ? (
                                        <PharmacyStatus status="private">
                                            非公開
                                        </PharmacyStatus>
                                    ) : (
                                        <PharmacyStatus>
                                            一部公開
                                        </PharmacyStatus>
                                    )}
                                </div>
                            </PharmacyDetailShareItem>
                            <PharmacyDetailShareItem>
                                <div className="label-sub">
                                    ・お薬手帳データ
                                </div>
                                <div className="status">
                                    <StatusChangeButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setStatus1(true)
                                        }}
                                        disabled={!status1}
                                    >
                                        公開
                                    </StatusChangeButton>
                                    <StatusChangeButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setStatus1(false)
                                        }}
                                        disabled={status1}
                                    >
                                        非公開
                                    </StatusChangeButton>
                                </div>
                            </PharmacyDetailShareItem>
                            <PharmacyDetailShareItem>
                                <div className="label-sub">
                                    ・バイタルデータ
                                </div>
                                <div className="status">
                                    <StatusChangeButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setStatus2(true)
                                        }}
                                        disabled={!status2}
                                    >
                                        公開
                                    </StatusChangeButton>
                                    <StatusChangeButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setStatus2(false)
                                        }}
                                        disabled={status2}
                                    >
                                        非公開
                                    </StatusChangeButton>
                                </div>
                            </PharmacyDetailShareItem>
                            <PharmacyDetailShareItem>
                                <div className="label-sub">・食事データ</div>
                                <div className="status">
                                    <StatusChangeButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setStatus3(true)
                                        }}
                                        disabled={!status3}
                                    >
                                        公開
                                    </StatusChangeButton>
                                    <StatusChangeButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setStatus3(false)
                                        }}
                                        disabled={status3}
                                    >
                                        非公開
                                    </StatusChangeButton>
                                </div>
                            </PharmacyDetailShareItem>
                        </PharmacyDetailShare>
                    </PharmacyDetail>
                    <MainBtm>
                        <NextButton href="#" onClick={onSubmit}>
                            保存する
                        </NextButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
            <Dialog
                open={openFinishDialog}
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
                        共有設定の保存が完了しました。
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    router.back()
                                }}
                            >
                                OK
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default MyPharmacySettingsPage
