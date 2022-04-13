import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/organisms/Header'
import DefaultLayout from '../../components/templates/DefaultLayout'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../components/organisms/Initial'
import NavList, { NavListItem } from '../../components/organisms/NavList'
import {
    TextLinkButton,
    NextButton,
    FamilyGroupButton,
    NextDialogButton,
} from '../../components/atoms/Button'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../../components/organisms/DialogMain'
import { Stack, Box } from '@mui/material'

const MedicalPage: React.FC = () => {
    const router = useRouter()
    const [selectMedical, setSelectMedical] = useState(1)
    const [openFinishDialog, setOpenFinishDialog] = useState(false)

    // 医療機関選択
    const onSelectMedical = () => {}

    // 選択する
    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenFinishDialog(true)
    }
    const onHome = () => {
        router.push('/')
    }

    return (
        <>
            <DefaultLayout>
                <Header title="登録一覧" prevURL="back" isHomeBtn={false} />
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            医療機関・薬局店舗を切り替える場合は、切替先を選択した上で「選択」を押してください。
                            <br />
                            新たな医療機関・薬局を追加する場合は「追加」を押して、追加をしてください。
                        </InitialLead>
                    </InitialSection>
                    <NavList>
                        <NavListItem>
                            <FamilyGroupButton
                                active={selectMedical === 0 ? true : false}
                                onClick={() => {
                                    setSelectMedical(0)
                                    onSelectMedical()
                                }}
                            >
                                神田内科クリニック
                            </FamilyGroupButton>
                        </NavListItem>
                        <NavListItem>
                            <FamilyGroupButton
                                active={selectMedical === 1 ? true : false}
                                onClick={() => {
                                    setSelectMedical(1)
                                    onSelectMedical()
                                }}
                            >
                                メディエイド薬局
                            </FamilyGroupButton>
                        </NavListItem>
                    </NavList>
                    <Stack direction="row" justifyContent="center">
                        <Box
                            sx={{
                                pt: '24px',
                            }}
                        >
                            <TextLinkButton href="/medical/edit">
                                編集する
                            </TextLinkButton>
                        </Box>
                    </Stack>
                    <InitialBtm>
                        <NextButton
                            href="#"
                            onClick={onSubmit}
                            disabled={selectMedical === 1}
                        >
                            選択する
                        </NextButton>
                    </InitialBtm>
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
                    <DialogMainText>
                        神田内科クリニックに切り替わりました。
                        <br />
                        ホーム画面へ戻ります。
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <NextDialogButton onClick={onHome}>
                                OK
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default MedicalPage
