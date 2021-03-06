import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../../components/organisms/OriginalHeader'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Main, {
    MainBody,
    MainBtm,
    MainLead,
} from '../../../components/organisms/Main'
import {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistConfirm,
} from '../../../components/organisms/OriginalRegist'
import {
    TextLinkButton,
    NextButton,
    FamilyNavButton,
} from '../../../components/atoms/OriginalButton'
import { Stack, Box } from '@mui/material'
import apiManager from '../../../utilities/apiManager'
import Barcode from '../../../components/organisms/Barcode'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { useCalcAge } from '../../../hooks/useCalcAge'
import DeletePatientDialog from '../../../components/organisms/DeletePatientDialog'
import EditPatientForm from '../../../components/organisms/EditPatientForm'
import CompletedDialog from '../../../components/organisms/CompletedDialog'
import { useGenderString } from '../../../hooks/useGenderString'
import { useSwitchAuthKeyMethod } from '../../../hooks/useSwitchAuthKeyMethod'
import FamilyNav from '../../../components/organisms/FamilyNav'
import EditPatientProfileForm from '../../../components/organisms/EditPatientProfileForm'

type PatientDetailProps = {
    birthday: string
    first_name: string
    first_name_kana: string
    gender: number
    last_name: string
    last_name_kana: string
    relationship: string
    lifepalette_id: string
    nickname: string
    patient_alias: string
}

const FamilyDetailPage: React.FC = () => {
    const router = useRouter()
    const selectedPatient = useSelector(
        (state: RootState) => state.selectedPatient
    )
    const auth_key = useSwitchAuthKeyMethod()
    const auth = useSelector((state: RootState) => state.auth)

    const [patient, setPatient] = useState<PatientDetailProps | null>(null)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isCompleteDelete, setIsCompleteDelete] = useState(false)
    const [openFinishDialog, setOpenFinishDialog] = useState(false)
    const [isInfo, setIsInfo] = useState(true)
    const [isProfile, setIsProfile] = useState(false)

    // ????????????
    const onEditFamily = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push(
            '/family/[familyid]/edit',
            `/family/${router.query.familyid}/edit`
        )
    }

    // ????????????
    const onDeleteFamily = () => {
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            `/mpp/patients/delete/${selectedPatient.patient_alias}`
        apiManager
            .action(
                'DELETE',
                url,
                { patient_alias: selectedPatient.patient_alias },
                {
                    // TODO: ?????????authkey??????????????????
                    // AUTHORIZED_KEY: 'TnKcjYwm0fvffub9txtTfUPWvLayEJ',
                    AUTHORIZED_KEY: auth_key,
                }
            )
            .then((res) => {})
            .catch((error) => {
                console.log(error.response)
            })
        setIsCompleteDelete(true)
    }

    // ??????????????????
    const getBirthdayString = (birthday: string) => {
        let birthdayString = ''
        if (birthday) {
            const birthdayArray = birthday.split('-')
            const userBirthday = {
                year: Number(birthdayArray[0]),
                month: Number(birthdayArray[1]),
                date: Number(birthdayArray[2]),
            }
            birthdayString = `${userBirthday.year}???${userBirthday.month}???${userBirthday.date}???`
        }
        return birthdayString
    }

    const onAgree = () => {
        setOpenFinishDialog(false)
        router.push('/family/')
    }

    useEffect(() => {
        // patients
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            `/mpp/patients/show/${selectedPatient.patient_alias}`
        apiManager
            .action(
                'GET',
                url,
                {},
                {
                    // TODO: ?????????authkey??????????????????
                    // AUTHORIZED_KEY: 'TnKcjYwm0fvffub9txtTfUPWvLayEJ',
                    // AUTHORIZED_KEY: auth_key,
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                if (res) {
                    setPatient(res.data.patient)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, [])

    const onSelectInfo = () => {
        setIsInfo(true)
        setIsProfile(false)
    }

    const onSelectProfile = () => {
        setIsInfo(false)
        setIsProfile(true)
    }

    return (
        <>
            <DefaultLayout>
                <Header
                    title={isEdit ? '??????????????????' : '??????????????????'}
                    prevURL="back"
                    prevDialog={false}
                    isHomeBtn={false}
                />
                {!isEdit ? (
                    <Main>
                        <MainLead>
                            <FamilyNav>
                                <li>
                                    <FamilyNavButton
                                        href="#"
                                        active={isInfo}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onSelectInfo()
                                        }}
                                    >
                                        ????????????
                                    </FamilyNavButton>
                                </li>
                                {/* TODO: ???????????? */}
                                {/* <li>
                                    <FamilyNavButton
                                        href="#"
                                        active={isProfile}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onSelectProfile()
                                        }}
                                    >
                                        ????????????????????????
                                    </FamilyNavButton>
                                </li> */}
                            </FamilyNav>
                        </MainLead>
                        {isInfo ? (
                            <>
                                <MainBody>
                                    <RegistSection>
                                        <RegistHeader>
                                            <h2 className="headerTitle">
                                                ??????????????????????????????????????????
                                            </h2>
                                        </RegistHeader>
                                        <RegistBody>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ?????????????????????ID
                                                </div>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                >
                                                    {patient !== null && (
                                                        <Barcode
                                                            value={
                                                                patient.lifepalette_id
                                                            }
                                                        />
                                                    )}
                                                </Box>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ??????????????????
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                        patient.nickname}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ??????????????????
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                    patient.last_name !==
                                                        null &&
                                                    patient.first_name !== null
                                                        ? `${patient.last_name} ${patient.first_name}`
                                                        : '?????????'}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ??????????????????
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                    patient.last_name_kana !==
                                                        null &&
                                                    patient.first_name_kana !==
                                                        null
                                                        ? `${patient.last_name_kana} ${patient.first_name_kana}`
                                                        : '?????????'}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ????????????
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                        `${getBirthdayString(
                                                            patient.birthday
                                                        )} ???${useCalcAge(
                                                            patient.birthday
                                                        )}???`}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ??????
                                                </div>
                                                <div className="confirm">
                                                    {/* TODO: gender?????????????????????????????????????????????Number???????????????????????????????????????????????????????????? */}
                                                    {useGenderString(
                                                        Number(
                                                            String(
                                                                patient?.gender
                                                            )
                                                        )
                                                    )}
                                                </div>
                                            </RegistConfirm>
                                        </RegistBody>
                                    </RegistSection>
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                    >
                                        <Box>
                                            <TextLinkButton
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setOpenDeleteDialog(true)
                                                }}
                                            >
                                                ????????????
                                            </TextLinkButton>
                                        </Box>
                                    </Stack>
                                </MainBody>
                            </>
                        ) : (
                            // TODO: ???????????????????????????????????????
                            <>
                                <MainBody>
                                    <RegistSection>
                                        <RegistHeader>
                                            <h2 className="headerTitle">
                                                ?????????????????????????????????????????????????????????
                                            </h2>
                                        </RegistHeader>
                                        <RegistBody>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ?????????????????????ID
                                                </div>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                >
                                                    {patient !== null && (
                                                        <Barcode
                                                            value={
                                                                patient.lifepalette_id
                                                            }
                                                        />
                                                    )}
                                                </Box>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ??????????????????
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                        patient.nickname}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ??????????????????
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                    patient.last_name !==
                                                        null &&
                                                    patient.first_name !== null
                                                        ? `${patient.last_name} ${patient.first_name}`
                                                        : '?????????'}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ??????????????????
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                    patient.last_name_kana !==
                                                        null &&
                                                    patient.first_name_kana !==
                                                        null
                                                        ? `${patient.last_name_kana} ${patient.first_name_kana}`
                                                        : '?????????'}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ????????????
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                        `${getBirthdayString(
                                                            patient.birthday
                                                        )} ???${useCalcAge(
                                                            patient.birthday
                                                        )}???`}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ??????
                                                </div>
                                                <div className="confirm">
                                                    {/* TODO: gender?????????????????????????????????????????????Number???????????????????????????????????????????????????????????? */}
                                                    {useGenderString(
                                                        Number(
                                                            String(
                                                                patient?.gender
                                                            )
                                                        )
                                                    )}
                                                </div>
                                            </RegistConfirm>
                                        </RegistBody>
                                    </RegistSection>
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                    >
                                        <Box>
                                            <TextLinkButton
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setOpenDeleteDialog(true)
                                                }}
                                            >
                                                ????????????
                                            </TextLinkButton>
                                        </Box>
                                    </Stack>
                                </MainBody>
                            </>
                        )}
                        {/* TODO: ?????????????????????????????? */}
                        <MainBtm>
                            <NextButton
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsEdit(true)
                                }}
                            >
                                ????????????
                            </NextButton>
                        </MainBtm>
                    </Main>
                ) : (
                    <Main>
                        <MainLead>
                            <FamilyNav>
                                <li>
                                    <FamilyNavButton
                                        href="#"
                                        active={isInfo}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onSelectInfo()
                                        }}
                                    >
                                        ????????????
                                    </FamilyNavButton>
                                </li>
                                {/* TODO: ???????????? */}
                                {/* <li>
                                    <FamilyNavButton
                                        href="#"
                                        active={isProfile}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onSelectProfile()
                                        }}
                                    >
                                        ????????????????????????
                                    </FamilyNavButton>
                                </li> */}
                            </FamilyNav>
                        </MainLead>
                        {isInfo ? (
                            <EditPatientForm
                                patientData={patient}
                                setOpenCompleteDialog={setOpenFinishDialog}
                            />
                        ) : (
                            <EditPatientProfileForm
                                patientData={patient}
                                setOpenCompleteDialog={setOpenFinishDialog}
                            />
                        )}
                    </Main>
                )}
            </DefaultLayout>
            <DeletePatientDialog
                isOpen={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                patientData={patient}
                onDeleteFamily={onDeleteFamily}
                isCompleteDelete={isCompleteDelete}
            />
            <CompletedDialog
                isOpen={openFinishDialog}
                onAgree={onAgree}
                buttonText={'OK'}
            >
                ?????????????????????
                {isInfo ? '????????????' : '????????????????????????'}?????? ???
                <br />
                ?????????????????????
            </CompletedDialog>
        </>
    )
}

export default FamilyDetailPage
