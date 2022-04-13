import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import OriginalHeader from '../../components/organisms/OriginalHeader'
import DefaultLayout from '../../components/templates/DefaultLayout'
import Main, {
    MainBody,
    MainLead,
    MainBtm,
} from '../../components/organisms/Main'
import FamilyNav from '../../components/organisms/FamilyNav'
import NavList, {
    NavListItem,
    NavListItemSelect,
    NavListItemLink,
} from '../../components/organisms/NavList'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainNav,
} from '../../components/organisms/DialogMain'
import {
    FamilyNavButton,
    FamilyGroupButtonWith,
    NavListDetailButton,
    TextLinkButton,
    NextButton,
    NextDialogButton,
} from '../../components/atoms/OriginalButton'
import { Box } from '@mui/material'
import apiManager from '../../utilities/apiManager'
import { useDispatch, useSelector } from 'react-redux'
import { selectedPatientSlice } from '../../store/selectedPatient'
import { useSwitchAuthKeyMethod } from '../../hooks/useSwitchAuthKeyMethod'
import { RootState } from '../../store'

type PatientProps = {
    lifepalette_id: string
    nickname: string
    patient_alias: string
    relationship: string | null
}

const FamilyPage: React.FC = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const auth_key = useSwitchAuthKeyMethod()
    const auth = useSelector((state: RootState) => state.auth)

    const [patients, setPatients] = useState<PatientProps[]>([])
    const [_selectedPatient, _setSelectedPatient] = useState(-1)
    const [openFinishDialog, setOpenFinishDialog] = useState(false)

    const onSelect = (patientAlias: string) => {
        router.push(`/family/${patientAlias}`)
        const o = {
            patient_alias: patientAlias,
        }
        dispatch(selectedPatientSlice.actions.updateSelectedPatient(o))
    }
    useEffect(() => {
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/user-registration/patients'
        // patients
        apiManager
            .action(
                'GET',
                url,
                {},
                {
                    // TODO: 開発用authkey（後で削除）
                    // AUTHORIZED_KEY: 'TnKcjYwm0fvffub9txtTfUPWvLayEJ',
                    // AUTHORIZED_KEY: auth_key,
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                if (res) {
                    setPatients(res.data.patients)
                }
                // setApiLoaded01(true)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, [])

    // デフォルト表示を変更する
    const onSetFamily = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenFinishDialog(true)
    }

    const onHome = () => {
        router.push('/')
    }

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="家族管理"
                    prevURL="/"
                    isHomeBtn={false}
                />
                <Main>
                    <MainLead>
                        <FamilyNav>
                            <li>
                                <FamilyNavButton href="/family" active={true}>
                                    登録家族
                                </FamilyNavButton>
                            </li>
                            {/* <li>
                                将来機能 `/family/watching-family`
                                <FamilyNavButton href="#">
                                    見守り家族
                                </FamilyNavButton>
                            </li> */}
                        </FamilyNav>
                    </MainLead>
                    <MainBody>
                        <NavList>
                            {patients &&
                                patients.map((item, index) => (
                                    <NavListItem>
                                        <NavListItemSelect>
                                            <FamilyGroupButtonWith
                                                onClick={() =>
                                                    _selectedPatient === index
                                                        ? _setSelectedPatient(
                                                              -1
                                                          )
                                                        : _setSelectedPatient(
                                                              index
                                                          )
                                                }
                                                active={
                                                    _selectedPatient === index
                                                        ? true
                                                        : false
                                                }
                                            >
                                                {item.nickname}
                                            </FamilyGroupButtonWith>
                                        </NavListItemSelect>
                                        <NavListItemLink>
                                            <NavListDetailButton
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    onSelect(item.patient_alias)
                                                }}
                                            >
                                                参照
                                            </NavListDetailButton>
                                        </NavListItemLink>
                                    </NavListItem>
                                ))}
                        </NavList>
                        <Box
                            sx={{
                                pt: '24px',
                                textAlign: 'center',
                            }}
                        >
                            <TextLinkButton href="/family/add">
                                家族を追加する
                            </TextLinkButton>
                        </Box>
                    </MainBody>
                    <MainBtm>
                        {/* TODO: 将来機能 */}
                        {/* <NextButton href="#" onClick={onSetFamily}> */}
                        <NextButton
                            href="#"
                            disabled={_selectedPatient === -1 ? true : false}
                        >
                            デフォルト表示を変更する
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
                        {_selectedPatient !== -1 &&
                            patients[_selectedPatient].nickname}
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
            </Dialog>
        </>
    )
}

export default FamilyPage
