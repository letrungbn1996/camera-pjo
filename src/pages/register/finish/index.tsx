import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import SimpleHeader from '../../../components/organisms/SimpleHeader'
import RegistNav from '../../../components/organisms/RegistNav'
import Initial, {
    InitialSection,
    InitialLead,
    InitialBtm,
    InitialFinishAnimation,
} from '../../../components/organisms/Initial'
import { RegistInput } from '../../../components/organisms/Regist'
import { Stack, Item } from '../../../components/atoms/Stack'
import { NextButton } from '../../../components/atoms/Button'
import { Box } from '@mui/material'
import formCss from '../../../components/atoms/Form.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import Lottie from 'react-lottie'
import animationData from '../../../components/atoms/animation_register_completion.json'

const RegistPage: NextPage = () => {
    const router = useRouter()
    const [gender, setGender] = useState('')

    // 未入力の確認
    const [birthdayNotEntered, setBirthdayNotEntered] = useState(false)
    const [genderNotEntered, setGenderNotEntered] = useState(false)
    const profile = useSelector((state: RootState) => state.profile)
    // if (profile.birthday == '') {
    //     setBirthdayNotEntered(true)
    // }
    // if (profile.gender == -1) {
    //     setGenderNotEntered(true)
    // }

    const lottieOptions = {
        loop: false,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    // 性別
    const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gender !== e.target.value) {
            setGender(e.target.value)
        } else {
            setGender('')
        }
    }

    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push('/register/family')
    }

    return (
        <>
            <DefaultLayout>
                <SimpleHeader title="ライフパレット会員登録完了" />
                {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                    <RegistNav step={2} total={4} app="KHA" />
                ) : (
                    <RegistNav step={2} total={3} />
                )}
                <Initial>
                    <InitialSection>
                        <InitialLead>
                            <Box
                                sx={{
                                    mt: '20px',
                                    textAlign: 'center',
                                    fontWeight: 'Bold',
                                }}
                            >
                                会員登録が完了しました。
                            </Box>
                        </InitialLead>
                    </InitialSection>
                    <InitialSection>
                        {birthdayNotEntered === false &&
                            genderNotEntered === false && (
                                <>
                                    <InitialFinishAnimation>
                                        <Lottie
                                            options={lottieOptions}
                                            width={250}
                                            height={444}
                                            isClickToPauseDisabled={true}
                                        />
                                    </InitialFinishAnimation>
                                </>
                            )}
                        <Box
                            sx={{
                                pb: '15px',
                            }}
                        >
                            <InitialLead>
                                {birthdayNotEntered === true &&
                                    genderNotEntered === true &&
                                    '生年月日と性別が未入力のようです。\n携帯電話番号やメールアドレスを変更する場合に、ご本人確認にて必要となりますので設定しておきましょう。'}
                                {birthdayNotEntered === true &&
                                    genderNotEntered === false &&
                                    '生年月日が未入力のようです。\n携帯電話番号やメールアドレスを変更する場合に、ご本人確認にて必要となりますので設定しておきましょう。'}
                                {birthdayNotEntered === false &&
                                    genderNotEntered === true &&
                                    '性別が未入力のようです。\n携帯電話番号やメールアドレスを変更する場合に、ご本人確認にて必要となりますので設定しておきましょう。'}
                            </InitialLead>
                        </Box>
                        {birthdayNotEntered === true && (
                            <Box
                                sx={{
                                    pb: '15px',
                                }}
                            >
                                <RegistInput>
                                    <div className="label">生年月日</div>
                                    <div className="form"></div>
                                </RegistInput>
                            </Box>
                        )}
                        {genderNotEntered === true && (
                            <Box>
                                <RegistInput>
                                    <div className="label">性別</div>
                                    <div className="form">
                                        <Stack spacing={2}>
                                            <Item>
                                                <input
                                                    type="checkbox"
                                                    name="gender"
                                                    className={
                                                        formCss.formRadioBtn
                                                    }
                                                    id="female"
                                                    value="0"
                                                    checked={gender === '0'}
                                                    onChange={onChangeGender}
                                                />
                                                <label htmlFor="female">
                                                    女性
                                                </label>
                                            </Item>
                                            <Item>
                                                <input
                                                    type="checkbox"
                                                    name="gender"
                                                    className={
                                                        formCss.formRadioBtn
                                                    }
                                                    id="male"
                                                    value="1"
                                                    checked={gender === '1'}
                                                    onChange={onChangeGender}
                                                />
                                                <label htmlFor="male">
                                                    男性
                                                </label>
                                            </Item>
                                        </Stack>
                                    </div>
                                </RegistInput>
                            </Box>
                        )}
                    </InitialSection>
                    <InitialBtm>
                        <NextButton href="#" onClick={onSubmit}>
                            次へ
                        </NextButton>
                    </InitialBtm>
                </Initial>
            </DefaultLayout>
        </>
    )
}

export default RegistPage
