import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Header from '../../../components/organisms/Header'
import RegistNav from '../../../components/organisms/RegistNav'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../../components/organisms/Initial'
import NavList, { NavListItem } from '../../../components/organisms/NavList'
import { RegistConfirm } from '../../../components/organisms/Regist'
import {
    NavListButton,
    NextButton,
    NextDialogButton,
} from '../../../components/atoms/Button'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
    DialogMainComment,
    DialogMainNav,
} from '../../../components/organisms/DialogMain'
import { Stack, Box } from '@mui/material'
import formCss from '../../../components/atoms/Form.module.scss'
import apiManager from '../../../utilities/apiManager'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import PatientIdDialog from '../../../components/organisms/PatientIdDialog'
import { useSwitchAuthKeyMethod } from '../../../hooks/useSwitchAuthKeyMethod'

type PatientProps = {
    lifepalette_id: string
    nickname: string
    patient_alias: string
    relationship: string | null
}

const RegistPage: NextPage = () => {
    // const auth_key = useSwitchAuthKeyMethod()
    const auth = useSelector((state: RootState) => state.auth)

    const [isAgreementCheck, setAgreementCheck] = useState(false)
    const [isBtnActive, setBtnActive] = useState(false)
    const [openIdDialog, setOpenIdDialog] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [patients, setPatients] = useState<PatientProps[]>([])

    useEffect(() => {
        if (isAgreementCheck) {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    }, [isAgreementCheck])

    const onChangeAgreement = () => {
        setAgreementCheck(!isAgreementCheck)
    }

    useEffect(() => {
        // patients
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/user-registration/patients'
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
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, [])

    return (
        <>
            <DefaultLayout>
                <Header
                    title="薬局連携する方の選択"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <RegistNav step={4} total={4} app="KHA" />
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            選択した利用薬局と連携させる方のIDを表示して、薬局でお見せください。
                            薬局と連携すると、今後、お薬情報が自動的にアプリに登録されます。
                        </InitialLead>
                        <Box
                            sx={{
                                pt: '15px',
                            }}
                        >
                            <NavList>
                                {patients &&
                                    patients.map((item, index) => (
                                        <NavListItem>
                                            <NavListButton
                                                onClick={() => {
                                                    setCurrentIndex(index)
                                                    setOpenIdDialog(true)
                                                }}
                                            >
                                                {item.nickname}
                                            </NavListButton>
                                        </NavListItem>
                                    ))}
                            </NavList>
                        </Box>
                    </InitialSection>
                    <InitialSection>
                        <InitialLead>
                            連携する方については全員分、IDを薬局に提示し、以下をチェックをして「次へ」を押してください。
                        </InitialLead>
                    </InitialSection>
                    <InitialBtm>
                        <Stack direction="row" justifyContent="center">
                            <Box>
                                <input
                                    type="checkbox"
                                    id="agreement"
                                    className={formCss.formCheckbox}
                                    onChange={onChangeAgreement}
                                    checked={isAgreementCheck}
                                />
                                <label htmlFor="agreement">
                                    連携する方については全員分のIDを薬局に提示済み
                                </label>
                            </Box>
                        </Stack>
                        <NextButton
                            href="/register/finish/all"
                            disabled={!isBtnActive}
                        >
                            次へ
                        </NextButton>
                    </InitialBtm>
                </Initial>
            </DefaultLayout>
            <PatientIdDialog
                isOpen={openIdDialog}
                setOpen={setOpenIdDialog}
                patientData={patients[currentIndex]}
            />
        </>
    )
}

export default RegistPage
