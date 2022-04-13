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

    // 編集する
    const onEditFamily = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push(
            '/family/[familyid]/edit',
            `/family/${router.query.familyid}/edit`
        )
    }

    // 削除する
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
                    // TODO: 開発用authkey（後で削除）
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

    // 生年月日表示
    const getBirthdayString = (birthday: string) => {
        let birthdayString = ''
        if (birthday) {
            const birthdayArray = birthday.split('-')
            const userBirthday = {
                year: Number(birthdayArray[0]),
                month: Number(birthdayArray[1]),
                date: Number(birthdayArray[2]),
            }
            birthdayString = `${userBirthday.year}年${userBirthday.month}月${userBirthday.date}日`
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
                    // TODO: 開発用authkey（後で削除）
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
                    title={isEdit ? '家族情報編集' : '登録家族情報'}
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
                                        登録家族
                                    </FamilyNavButton>
                                </li>
                                {/* TODO: 将来機能 */}
                                {/* <li>
                                    <FamilyNavButton
                                        href="#"
                                        active={isProfile}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onSelectProfile()
                                        }}
                                    >
                                        プロフィール情報
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
                                                現在登録されているご家族情報
                                            </h2>
                                        </RegistHeader>
                                        <RegistBody>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ライフパレットID
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
                                                    ニックネーム
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                        patient.nickname}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    氏名（漢字）
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                    patient.last_name !==
                                                        null &&
                                                    patient.first_name !== null
                                                        ? `${patient.last_name} ${patient.first_name}`
                                                        : '未登録'}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    氏名（カナ）
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                    patient.last_name_kana !==
                                                        null &&
                                                    patient.first_name_kana !==
                                                        null
                                                        ? `${patient.last_name_kana} ${patient.first_name_kana}`
                                                        : '未登録'}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    生年月日
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                        `${getBirthdayString(
                                                            patient.birthday
                                                        )} （${useCalcAge(
                                                            patient.birthday
                                                        )}）`}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    性別
                                                </div>
                                                <div className="confirm">
                                                    {/* TODO: genderレスポンスの型が揺れているのでNumber変換している。レスポンス修正後変換を削除 */}
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
                                                削除する
                                            </TextLinkButton>
                                        </Box>
                                    </Stack>
                                </MainBody>
                            </>
                        ) : (
                            // TODO: プロフィールタブ内容未実装
                            <>
                                <MainBody>
                                    <RegistSection>
                                        <RegistHeader>
                                            <h2 className="headerTitle">
                                                現在登録されているご家族のプロフィール
                                            </h2>
                                        </RegistHeader>
                                        <RegistBody>
                                            <RegistConfirm>
                                                <div className="label">
                                                    ライフパレットID
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
                                                    ニックネーム
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                        patient.nickname}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    氏名（漢字）
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                    patient.last_name !==
                                                        null &&
                                                    patient.first_name !== null
                                                        ? `${patient.last_name} ${patient.first_name}`
                                                        : '未登録'}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    氏名（カナ）
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                    patient.last_name_kana !==
                                                        null &&
                                                    patient.first_name_kana !==
                                                        null
                                                        ? `${patient.last_name_kana} ${patient.first_name_kana}`
                                                        : '未登録'}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    生年月日
                                                </div>
                                                <div className="confirm">
                                                    {patient !== null &&
                                                        `${getBirthdayString(
                                                            patient.birthday
                                                        )} （${useCalcAge(
                                                            patient.birthday
                                                        )}）`}
                                                </div>
                                            </RegistConfirm>
                                            <RegistConfirm>
                                                <div className="label">
                                                    性別
                                                </div>
                                                <div className="confirm">
                                                    {/* TODO: genderレスポンスの型が揺れているのでNumber変換している。レスポンス修正後変換を削除 */}
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
                                                削除する
                                            </TextLinkButton>
                                        </Box>
                                    </Stack>
                                </MainBody>
                            </>
                        )}
                        {/* TODO: 将来機能「独立する」 */}
                        <MainBtm>
                            <NextButton
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsEdit(true)
                                }}
                            >
                                編集する
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
                                        登録家族
                                    </FamilyNavButton>
                                </li>
                                {/* TODO: 将来機能 */}
                                {/* <li>
                                    <FamilyNavButton
                                        href="#"
                                        active={isProfile}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onSelectProfile()
                                        }}
                                    >
                                        プロフィール情報
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
                登録家族情報（
                {isInfo ? '基本情報' : 'プロフィール情報'}）を ​
                <br />
                変更しました。
            </CompletedDialog>
        </>
    )
}

export default FamilyDetailPage
