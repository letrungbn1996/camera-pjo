import { useRouter } from 'next/router'
import React, { useState, useEffect, useContext } from 'react'
import type { NextPage } from 'next'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Header from '../../../components/organisms/Header'
import Initial, {
    InitialSection,
    InitialLead,
    InitialAttention,
    InitialBtm,
} from '../../../components/organisms/Initial'
import { NextButton } from '../../../components/atoms/Button'
import { Box } from '@mui/material'
import formCss from '../../../components/atoms/Form.module.scss'
import axios from 'axios'
import apiManager from '../../../utilities/apiManager'
import authManager from '../../../utilities/authManager'
import ErrorDialog from '../../../components/organisms/ErrorDialog'
import { UserContext } from '../../../providers/UserProvider'
import { useDispatch } from 'react-redux'
import { authSlice } from '../../../store/auth'

declare global {
    interface Window {
        request: any
        response: any
        webkit: any
    }
}
declare const request: any
const LoginPage: NextPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')
    const [openErrorDialog, setOpenErrorDialog] = useState(false)
    const [passcode, setPasscode] = useState('')
    const [token, setToken] = useState('')
    const userInfo = useContext(UserContext)
    useEffect(() => {
        console.log(userInfo.userAgent)
        if (userInfo.userAgent) {
            console.log(111)
            if (userInfo.userAgent === 'android') {
                request.postMessage(JSON.stringify({ getPinCode: null }))
            } else {
                console.log('iphone')
                window.webkit.messageHandlers.request.postMessage(
                    JSON.stringify({ getPinCode: null })
                )
                console.log('iphone')
            }
            window.response = function (jsonString: any) {
                let json = JSON.parse(jsonString)
                let tokenString = json.getPinCode.code
                setToken(tokenString)
            }
        }
    }, [userInfo])

    const onHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        let url: string =
            process.env.NEXT_PUBLIC_NLP_API_URL + '/mpp/login/authorize'
        apiManager
            .action(
                'POST',
                url,
                {
                    token: token,
                    pin_code: passcode,
                },
                {}
            )
            .then((res) => {
                if (res) {
                    authManager.setAuthKey(res.data.authorized_key)

                    let o = {
                        authorized_key: res.data.authorized_key,
                    }
                    dispatch(authSlice.actions.updateAuth(o))
                    router.push('/')
                }
            })
            .catch((error) => {
                console.log(error.response)
                setErrorMessage(error.response.data.message)
                setOpenErrorDialog(true)
                // setErrorStatus('????????????????????????????????????????????????')
            })
    }
    const onChangePasscode = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => setPasscode(event.target.value)
    return (
        <>
            <DefaultLayout>
                <Header
                    title="?????????????????????"
                    prevURL="logout"
                    isHomeBtn={false}
                />
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                        </InitialLead>
                        <Box
                            sx={{
                                py: '15px',
                            }}
                        >
                            <input
                                type="text"
                                value={passcode}
                                className={`${formCss.formText} ${formCss.textCenter}`}
                                placeholder="????????????????????????"
                                onChange={onChangePasscode}
                            />
                        </Box>
                        <InitialAttention>
                            ????????????????????????????????????30????????????
                            <br />
                            ?????????????????????????????????????????????????????????????????????????????????????????????????????????
                        </InitialAttention>
                    </InitialSection>
                    <InitialBtm>
                        <NextButton href="#" onClick={onHome}>
                            ??????
                        </NextButton>
                    </InitialBtm>
                </Initial>
            </DefaultLayout>
            <ErrorDialog
                isOpen={openErrorDialog}
                errorMessage={errorMessage}
                setDialogOpen={setOpenErrorDialog}
            />
        </>
    )
}

export default LoginPage
