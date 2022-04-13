/**
 * 開発用
 * トークンをハードコーディングをせず、トークンを入力画面
 * 後で削除する必要
 */

import { useRouter } from 'next/router'
import React, { useState, useEffect, useContext } from 'react'
import type { NextPage } from 'next'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Header from '../../../components/organisms/Header'
import { NextButton } from '../../../components/atoms/Button'
import { Box } from '@mui/material'
import formCss from '../../../components/atoms/Form.module.scss'
import authManager from '../../../utilities/authManager'
import ErrorDialog from '../../../components/organisms/ErrorDialog'
import { useDispatch } from 'react-redux'
import { authSlice } from '../../../store/auth'

const OnlineToken: NextPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')
    const [openErrorDialog, setOpenErrorDialog] = useState(false)
    const [passcode, setPasscode] = useState('')

    const onHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        if (passcode) {
            let o = {
                authorized_key: passcode,
            }
            dispatch(authSlice.actions.updateAuth(o))
            router.push('/online')
        }
    }
    const onChangePasscode = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => setPasscode(event.target.value)
    return (
        <>
            <DefaultLayout>
                <Header
                    title="トークンを入力"
                    prevURL="logout"
                    isHomeBtn={false}
                />
                <Box py="150px" px="16px">
                    <Box
                        sx={{
                            py: '15px',
                        }}
                    >
                        <input
                            type="text"
                            value={passcode}
                            className={`${formCss.formText} ${formCss.textCenter}`}
                            placeholder="トークンを入力"
                            onChange={onChangePasscode}
                        />
                    </Box>
                    <NextButton href="#" onClick={onHome}>
                        次へ
                    </NextButton>
                </Box>
                
            </DefaultLayout>
            <ErrorDialog
                isOpen={openErrorDialog}
                errorMessage={errorMessage}
                setDialogOpen={setOpenErrorDialog}
            />
        </>
    )
}

export default OnlineToken
