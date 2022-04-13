import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserContext } from '../../providers/UserProvider'
import { AppContext } from '../../providers/AppProvider'
import NavList, { NavListItem } from './NavList'
import {
    HeaderBurgerButton,
    HeaderUserButton,
    DrawerCloseButton,
    NextDialogButton,
    CloseDialogButton,
    FamilyGroupButton,
} from '../atoms/Button'
import { UserIcon, CloseIcon } from '../atoms/Icon'
import Drawer from '@mui/material/Drawer'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../organisms/DialogMain'
import { Box, Menu } from '@mui/material'
import ButtonUnstyled, {
    buttonUnstyledClasses,
    ButtonUnstyledProps,
} from '@mui/base/ButtonUnstyled'
import { styled } from '@mui/system'
import css from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectedPatientSlice } from '../../store/selectedPatient'
import { profileSlice } from '../../store/profile'

type Window = {
    webkit?: any
}

declare const window: Window
declare const request: any

// Material UI CustomButton
const CustomButtonRoot = styled('button')`
    cursor: pointer;
    font-family: inherit;
    background: transparent;
    border: 0;
    border-radius: 0;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &:hover {
        background-color: transparent;
    }

    &.${buttonUnstyledClasses.active} {
        background-color: transparent;
    }

    &.${buttonUnstyledClasses.focusVisible} {
        outline: none;
    }
`
const CustomButton = (props: ButtonUnstyledProps) => {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />
}

type patientProps = {
    nickname: string
    patient_alias: string
    relationship: string | null
}

type Props = {
    patients: patientProps[]
}

const HomeHeader = ({ patients }: Props) => {
    const router = useRouter()
    const userInfo = useContext(UserContext)
    const dispatch = useDispatch()
    const app = useContext(AppContext)

    const [openMenu, setOpenMenu] = useState(false)
    const [openChangeDialog, setOpenChangeDialog] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const openFamily = Boolean(anchorEl)

    // Drawer
    const onOpenMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenMenu(true)
    }
    const onCloseMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenMenu(false)
    }

    const onChangeFamily = (id: string) => {
        const index = patients.findIndex(
            (patient) => patient.patient_alias == id
        )
        setSelectedIndex(index)
        const o = {
            patient_alias: id,
        }
        dispatch(selectedPatientSlice.actions.updateSelectedPatient(o))
        setOpenChangeDialog(false)
        setAnchorEl(null)
    }

    // 名前クリック
    const onOpenFamilyMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const onCloseFamilyMenu = () => {
        setAnchorEl(null)
    }

    // ログアウト
    const onLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        //ログアウト時データ削除
        const o = {
            user_registration_token: '',
            birthday: '',
            nickname: '',
            gender: '',
            is_push_notification: '',
        }
        dispatch(profileSlice.actions.updateProfile(o))
        if (userInfo.userAgent === 'android') {
            request.postMessage(
                JSON.stringify({
                    logout: null,
                })
            )
        } else {
            window.webkit.messageHandlers.request.postMessage(
                JSON.stringify({ logout: null })
            )
        }
    }

    return (
        <>
            <header className={css.header}>
                <div className={css.inner}>
                    <div className={css.headerLeft}>
                        <HeaderBurgerButton onClick={onOpenMenu} />
                    </div>
                    <CustomButton
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={openFamily ? 'true' : undefined}
                        onClick={onOpenFamilyMenu}
                    >
                        <div
                            className={
                                openFamily
                                    ? `${css.headerName} ${css.openFamily}`
                                    : css.headerName
                            }
                        >
                            {patients[selectedIndex] &&
                                patients[selectedIndex].nickname}
                        </div>
                    </CustomButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openFamily}
                        onClose={onCloseFamilyMenu}
                        elevation={0}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        sx={{
                            '& .MuiPopover-paper': {
                                background: 'rgba(0,0,0,0)',
                            },
                        }}
                    >
                        <ul className={css.headerNameMenu}>
                            {patients &&
                                patients.map((item, index) => (
                                    <li key={item.nickname}>
                                        <FamilyGroupButton
                                            active={
                                                selectedIndex === index
                                                    ? true
                                                    : false
                                            }
                                            size="small"
                                            onClick={() => {
                                                onChangeFamily(
                                                    item.patient_alias
                                                )
                                            }}
                                        >
                                            {item.nickname}
                                        </FamilyGroupButton>
                                    </li>
                                ))}
                        </ul>
                    </Menu>
                    <div className={css.headerRight}>
                        <HeaderUserButton
                            onClick={(e) => {
                                e.preventDefault()
                                setOpenChangeDialog(true)
                            }}
                        >
                            <UserIcon />
                        </HeaderUserButton>
                    </div>
                </div>
            </header>
            <Drawer
                open={openMenu}
                onClose={onCloseMenu}
                sx={{
                    '& .css-4t3x6l-MuiPaper-root-MuiDrawer-paper': {
                        backgroundColor: '#f9f9f9',
                    },
                }}
            >
                <div className={css.drawer}>
                    <div className={css.drawerHeader}>
                        <DrawerCloseButton onClick={onCloseMenu}>
                            <CloseIcon />
                        </DrawerCloseButton>
                    </div>
                    <ul className={`${css.drawerList} ${css[app.id]}`}>
                        <li>
                            <Link href="#">
                                <a onClick={onLogout}>ログアウト</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Drawer>
            <Dialog
                open={openChangeDialog}
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
                    <DialogMainText>ユーザー切替</DialogMainText>
                    <Box
                        sx={{
                            pt: '24px',
                        }}
                    >
                        <NavList>
                            {patients &&
                                patients.map((item, index) => (
                                    <NavListItem key={item.nickname}>
                                        <FamilyGroupButton
                                            active={
                                                selectedIndex === index
                                                    ? true
                                                    : false
                                            }
                                            onClick={() => {
                                                onChangeFamily(
                                                    item.patient_alias
                                                )
                                            }}
                                        >
                                            {item.nickname}
                                        </FamilyGroupButton>
                                    </NavListItem>
                                ))}
                        </NavList>
                    </Box>
                    <DialogMainNav>
                        <li>
                            <CloseDialogButton
                                onClick={() => {
                                    setOpenChangeDialog(false)
                                }}
                            >
                                キャンセル
                            </CloseDialogButton>
                        </li>
                        <li>
                            <NextDialogButton
                                onClick={() => {
                                    router.push('/family')
                                }}
                            >
                                家族管理
                            </NextDialogButton>
                        </li>
                    </DialogMainNav>
                </DialogMain>
            </Dialog>
            {/* TODO: 以下のダイアログは不要なので一旦コメントアウト。納品前に削除 */}
            {/* <Dialog
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
                        {patients[selectedIndex] &&
                            patients[selectedIndex].nickname}
                        さんに切り替わりました。
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
            </Dialog> */}
        </>
    )
}

export default HomeHeader
