import React, { useState } from 'react'
import Header from '../../../../components/organisms/OriginalHeader'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Initial, {
    InitialSection,
    InitialLead,
} from '../../../../components/organisms/Initial'
import WatchingFamilyList, {
    WatchingFamilyListItem,
    WatchingFamilyListItemInner,
    WatchingFamilyListItemOption,
} from '../../../../components/organisms/WatchingFamilyList'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../../../../components/organisms/DialogMain'
import { Box } from '@mui/material'
import {
    ReleaseButton,
    CloseDialogButton,
    NextDialogButton,
} from '../../../../components/atoms/OriginalButton'

const FamilyPage: React.FC = () => {
    const [isFinished, setFinished] = useState(false)
    const [openFinishDialog, setOpenFinishDialog] = useState(false)

    // 解除する
    const onReleaseFamily = () => {
        // 成功時
        setTimeout(() => {
            setFinished(true)
        }, 200)
    }

    return (
        <>
            <DefaultLayout>
                <Header
                    title="あなたを見守るご家族一覧"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            この一覧に追加したご家族にあなたのご利用データを見てもらうことができます。見守り家族には4人のご家族を登録可能です。
                        </InitialLead>
                        <Box
                            sx={{
                                pt: '24px',
                            }}
                        >
                            <WatchingFamilyList>
                                <WatchingFamilyListItem>
                                    <WatchingFamilyListItemInner>
                                        ゆうこ
                                        <br />
                                        <small>yuko@xxx.ne.jp</small>
                                    </WatchingFamilyListItemInner>
                                    <WatchingFamilyListItemOption>
                                        <ReleaseButton
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setFinished(false)
                                                setOpenFinishDialog(true)
                                            }}
                                        >
                                            解除する
                                        </ReleaseButton>
                                    </WatchingFamilyListItemOption>
                                </WatchingFamilyListItem>
                                <WatchingFamilyListItem>
                                    <WatchingFamilyListItemInner>
                                        雅文
                                        <br />
                                        <small>090-1234-5678</small>
                                    </WatchingFamilyListItemInner>
                                    <WatchingFamilyListItemOption>
                                        <ReleaseButton
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setFinished(false)
                                                setOpenFinishDialog(true)
                                            }}
                                        >
                                            解除する
                                        </ReleaseButton>
                                    </WatchingFamilyListItemOption>
                                </WatchingFamilyListItem>
                            </WatchingFamilyList>
                        </Box>
                    </InitialSection>
                </Initial>
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
                    {isFinished ? (
                        <>
                            <DialogMainText>
                                見守り家族から
                                <br />
                                解除しました。
                            </DialogMainText>
                            <DialogMainNav>
                                <li>
                                    <NextDialogButton
                                        onClick={() => {
                                            setOpenFinishDialog(false)
                                        }}
                                    >
                                        OK
                                    </NextDialogButton>
                                </li>
                            </DialogMainNav>
                        </>
                    ) : (
                        <>
                            <DialogMainText>
                                雅文さんがあなたの健康状態を確認できなくなりますがよろしいですか？
                            </DialogMainText>
                            <DialogMainNav>
                                <li>
                                    <CloseDialogButton
                                        onClick={() => {
                                            setOpenFinishDialog(false)
                                        }}
                                    >
                                        キャンセル
                                    </CloseDialogButton>
                                </li>
                                <li>
                                    <NextDialogButton onClick={onReleaseFamily}>
                                        解除する
                                    </NextDialogButton>
                                </li>
                            </DialogMainNav>
                        </>
                    )}
                </DialogMain>
            </Dialog>
        </>
    )
}

export default FamilyPage
