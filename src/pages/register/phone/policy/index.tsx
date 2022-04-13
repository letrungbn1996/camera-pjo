import React, { useState, useEffect, useContext } from 'react'
import type { NextPage } from 'next'
import { AppContext } from '../../../../providers/AppProvider'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import Header from '../../../../components/organisms/Header'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
} from '../../../../components/organisms/Initial'
import {
    NextButton,
    CloseDialogButton,
    PolicyButton,
} from '../../../../components/atoms/Button'
import TermsDialog, {
    TermsDialogMain,
    TermsDialogMainNav,
} from '../../../../components/organisms/TermsDialog'
import { Stack, Box } from '@mui/material'
import KHATerms from '../../../../components/organisms/KHATerms'
import LifePaletteTerms from '../../../../components/organisms/LifePaletteTerms'
import formCss from '../../../../components/atoms/Form.module.scss'

const RegistPage: NextPage = () => {
    const app = useContext(AppContext)

    const [isAgreementCheck, setAgreementCheck] = useState(false)
    const [isBtnActive, setBtnActive] = useState(false)

    const [isKHATermsVisited, setKHATermsVisited] = useState(false)
    const [openKHATermsDialog, setOpenKHATermsDialog] = useState(false)
    const [isLifePaletteTermsVisited, setLifePaletteTermsVisited] =
        useState(false)
    const [openLifePaletteTermsDialog, setOpenLifePaletteTermsDialog] =
        useState(false)

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

    return (
        <>
            <DefaultLayout>
                <Header title="利用規約" prevURL="root" isHomeBtn={false} />
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            本アプリを利用するためには、以下の規約に同意していただく必要があります。
                            <br />
                            内容を確認して「全ての利用規約に同意する」にチェックを入れて次へ進んでください。
                        </InitialLead>
                        {app.id === 'KHA' ? (
                            <>
                                <Box
                                    sx={{
                                        mt: '30px',
                                        pb: '15px',
                                    }}
                                >
                                    <PolicyButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setOpenKHATermsDialog(true)
                                            setKHATermsVisited(true)
                                        }}
                                        visited={
                                            isKHATermsVisited ? true : false
                                        }
                                    >
                                        さくら健康お薬手帳利用規約
                                    </PolicyButton>
                                </Box>
                                <Box
                                    sx={{
                                        pb: '15px',
                                    }}
                                >
                                    <PolicyButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setOpenLifePaletteTermsDialog(true)
                                            setLifePaletteTermsVisited(true)
                                        }}
                                        visited={
                                            isLifePaletteTermsVisited
                                                ? true
                                                : false
                                        }
                                    >
                                        ライフパレット会員規約
                                    </PolicyButton>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        mt: '30px',
                                        pb: '15px',
                                    }}
                                >
                                    <PolicyButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setOpenLifePaletteTermsDialog(true)
                                            setLifePaletteTermsVisited(true)
                                        }}
                                        visited={
                                            isLifePaletteTermsVisited
                                                ? true
                                                : false
                                        }
                                    >
                                        ライフパレット会員規約​
                                    </PolicyButton>
                                </Box>
                                {/* <Box
                                    sx={{
                                        pb: '15px',
                                    }}
                                >
                                    <PolicyButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setOpenLifePaletteTermsDialog(true)
                                            setPolicy1Visited(true)
                                        }}
                                        visited={
                                            isPolicy1Visited ? true : false
                                        }
                                    >
                                        メディカル・パレット利用規約​
                                    </PolicyButton>
                                </Box>
                                <Box
                                    sx={{
                                        pb: '15px',
                                    }}
                                >
                                    <PolicyButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setOpenLifePaletteTermsDialog(true)
                                            setPolicy2Visited(true)
                                        }}
                                        visited={
                                            isPolicy2Visited ? true : false
                                        }
                                    >
                                        薬局向けパレットライン利用規約​
                                    </PolicyButton>
                                </Box>
                                <Box
                                    sx={{
                                        pb: '15px',
                                    }}
                                >
                                    <PolicyButton
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setOpenLifePaletteTermsDialog(true)
                                            setPolicy5Visited(true)
                                        }}
                                        visited={
                                            isPolicy5Visited ? true : false
                                        }
                                    >
                                        医療機関向けパレットライン利用規約​
                                    </PolicyButton>
                                </Box> */}
                            </>
                        )}
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
                                    全ての利用規約に同意する
                                </label>
                            </Box>
                        </Stack>
                        <NextButton
                            href="/register/phone/push"
                            disabled={!isBtnActive}
                        >
                            次へ
                        </NextButton>
                    </InitialBtm>
                </Initial>
            </DefaultLayout>

            {/* さくら健康お薬手帳利用規約​ */}
            <TermsDialog isOpen={openKHATermsDialog}>
                <TermsDialogMain>
                    <KHATerms />
                    <TermsDialogMainNav>
                        <CloseDialogButton
                            onClick={() => {
                                setOpenKHATermsDialog(false)
                            }}
                        >
                            閉じる
                        </CloseDialogButton>
                    </TermsDialogMainNav>
                </TermsDialogMain>
            </TermsDialog>

            {/* ライフパレット会員規約​ */}
            <TermsDialog isOpen={openLifePaletteTermsDialog}>
                <TermsDialogMain>
                    <LifePaletteTerms />
                    <TermsDialogMainNav>
                        <CloseDialogButton
                            onClick={() => {
                                setOpenLifePaletteTermsDialog(false)
                            }}
                        >
                            閉じる
                        </CloseDialogButton>
                    </TermsDialogMainNav>
                </TermsDialogMain>
            </TermsDialog>
        </>
    )
}

export default RegistPage
