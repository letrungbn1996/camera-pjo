import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../../components/organisms/Header'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../../components/organisms/Initial'
import NavList, { NavListItem } from '../../../components/organisms/NavList'
import {
    TextLinkButton,
    NextButton,
    FamilyGroupButton,
    NextDialogButton,
    CloseDialogButton,
} from '../../../components/atoms/Button'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../../../components/organisms/DialogMain'
import { Stack, Box } from '@mui/material'

const MedicalEditPage: React.FC = () => {
    const router = useRouter()
    const [selectMedical, setSelectMedical] = useState(-1)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openFinishDialog, setOpenFinishDialog] = useState(false)

    // 医療機関選択
    const onSelectMedical = () => {}

    // 削除する
    const onDelete = () => {
        setOpenFinishDialog(true)
    }
    const onTop = () => {
        router.push('/medical')
    }

    return (
        <>
            <DefaultLayout>
                <Header title="登録一覧" prevURL="back" isHomeBtn={false} />
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            現在登録されている医療機関・薬局店舗を削除するには、削除対象を選択して、「削除」を押してください。また新たに追加をする場合には、「追加」を押して、追加してください。
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
                            <TextLinkButton
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setOpenDeleteDialog(true)
                                }}
                                disabled={selectMedical === -1}
                            >
                                削除する
                            </TextLinkButton>
                        </Box>
                    </Stack>
                    <InitialBtm>
                        <NextButton href="/medical/register">
                            追加する
                        </NextButton>
                    </InitialBtm>
                </Initial>
            </DefaultLayout>
            <Dialog
                open={openDeleteDialog}
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
                        を削除してもよろしいですか？
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() => {
                                    setOpenDeleteDialog(false)
                                }}
                            >
                                キャンセル
                            </CloseDialogButton>
                        </li>
                        <li>
                            <NextDialogButton onClick={onDelete}>
                                削除する
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
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
                        神田内科クリニック
                        <br />
                        を削除しました。
                    </DialogMainText>
                    <DialogMainNav>
                        <li>
                            <NextDialogButton onClick={onTop}>
                                OK
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
        </>
    )
}

export default MedicalEditPage
