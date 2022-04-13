import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Header from '../../../components/organisms/Header'
import { MainLead, MainBody } from '../../../components/organisms/Main'
import {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistInput,
} from '../../../components/organisms/Regist'
import { Stack, Item } from '../../../components/atoms/Stack'
import { SearchButton, NextButton } from '../../../components/atoms/Button'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import { ja } from 'date-fns/locale'
import formCss from '../../../components/atoms/Form.module.scss'

const MuiPickers = () => {
    const [birthday, setBirthday] = useState<Date | null>(null)
    const handleChange = (newValue: Date | null) => {
        setBirthday(newValue)
        if (birthday) {
            const y = birthday.getFullYear()
            const m = ('00' + (birthday.getMonth() + 1)).slice(-2)
            const d = ('00' + birthday.getDate()).slice(-2)
            const ymd = y + '年' + m + '月' + d + '日'
            localStorage.setItem('birthday', ymd)
        }
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
            <MobileDatePicker
                inputFormat="yyyy/MM/dd"
                value={birthday}
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                padding: '0',
                                fontFamily: 'inherit',
                                borderRadius: '6px',
                                border: '0',
                            },
                            '& .MuiOutlinedInput-input': {
                                display: 'block',
                                padding: '0 12px',
                                height: 46,
                                fontFamily: 'inherit',
                                fontSize: '16px',
                                lineHeight: '46px',
                                background: '#fff',
                                boxSizing: 'border-box',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: '1px solid #dcdcdc',
                            },
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    )
}

const RequiredInputPage: React.FC = () => {
    const router = useRouter()
    const [firstNameKanji, setFirstNameKanji] = useState('')
    const [lastNameKanji, setLastNameKanji] = useState('')
    const [firstNameKana, setFirstNameKana] = useState('')
    const [lastNameKana, setLastNameKana] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('')
    const [pref, setPref] = useState('')
    const [city, setCity] = useState('')
    const [town, setTown] = useState('')
    const [apartment, setApartment] = useState('')

    const onAddressSearch = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
    }

    // 性別
    const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gender !== e.target.value) {
            setGender(e.target.value)
        } else {
            setGender('')
        }
    }

    // 送信処理
    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push('/user/confirm')
    }

    return (
        <>
            <DefaultLayout>
                <Header title="必要情報入力" prevURL="back" isHomeBtn={false} />
                <main className="main">
                    <MainLead>必要情報を入力してください</MainLead>
                    <MainBody>
                        <RegistSection>
                            <RegistHeader>
                                <h2 className="headerTitle">
                                    処方箋送信する人の情報
                                </h2>
                            </RegistHeader>
                            <RegistBody>
                                <RegistInput>
                                    <div className="label">
                                        氏名（漢字）
                                        <span className="require">（※）</span>
                                    </div>
                                    <div className="form">
                                        <Stack spacing={2}>
                                            <Item>
                                                <input
                                                    type="text"
                                                    // value={firstNameKanji}
                                                    className={`${formCss.formText} ${formCss.textCenter}`}
                                                    placeholder="姓"
                                                />
                                            </Item>
                                            <Item>
                                                <input
                                                    type="text"
                                                    // value={lastNameKanji}
                                                    className={`${formCss.formText} ${formCss.textCenter}`}
                                                    placeholder="名"
                                                />
                                            </Item>
                                        </Stack>
                                    </div>
                                </RegistInput>
                                <RegistInput>
                                    <div className="label">
                                        氏名（カナ）
                                        <span className="require">（※）</span>
                                    </div>
                                    <div className="form">
                                        <Stack spacing={2}>
                                            <Item>
                                                <input
                                                    type="text"
                                                    // value={firstNameKana}
                                                    className={`${formCss.formText} ${formCss.textCenter}`}
                                                    placeholder="セイ"
                                                />
                                            </Item>
                                            <Item>
                                                <input
                                                    type="text"
                                                    // value={lastNameKana}
                                                    className={`${formCss.formText} ${formCss.textCenter}`}
                                                    placeholder="メイ"
                                                />
                                            </Item>
                                        </Stack>
                                    </div>
                                </RegistInput>
                                <RegistInput>
                                    <div className="label">携帯電話番号</div>
                                    <div className="form">
                                        <input
                                            type="text"
                                            // value={phoneNumber}
                                            className={formCss.formText}
                                        />
                                    </div>
                                </RegistInput>
                                <RegistInput>
                                    <div className="label">
                                        生年月日
                                        <span className="require">（※）</span>
                                    </div>
                                    <div className="form">
                                        <MuiPickers />
                                    </div>
                                </RegistInput>
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
                            </RegistBody>
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <h2 className="headerTitle">ご住所</h2>
                            </RegistHeader>
                            <RegistBody>
                                <RegistInput>
                                    <div className="label">郵便番号</div>
                                    <div className="form">
                                        <Stack spacing={0}>
                                            <Item width="76">
                                                <input
                                                    type="text"
                                                    className={
                                                        formCss.formZipText
                                                    }
                                                    placeholder="郵便番号"
                                                />
                                            </Item>
                                            <Item width="24">
                                                <SearchButton
                                                    href="#"
                                                    onClick={onAddressSearch}
                                                >
                                                    検索
                                                </SearchButton>
                                            </Item>
                                        </Stack>
                                    </div>
                                </RegistInput>
                                <RegistInput>
                                    <div className="label">都道府県</div>
                                    <div className="form">
                                        <input
                                            type="text"
                                            // value={pref}
                                            className={formCss.formText}
                                        />
                                    </div>
                                </RegistInput>
                                <RegistInput>
                                    <div className="label">市区町村</div>
                                    <div className="form">
                                        <input
                                            type="text"
                                            // value={city}
                                            className={formCss.formText}
                                        />
                                    </div>
                                </RegistInput>
                                <RegistInput>
                                    <div className="label">町名・番地</div>
                                    <div className="form">
                                        <input
                                            type="text"
                                            // value={town}
                                            className={formCss.formText}
                                        />
                                    </div>
                                </RegistInput>
                                <RegistInput>
                                    <div className="label">
                                        マンション名・号室
                                    </div>
                                    <div className="form">
                                        <input
                                            type="text"
                                            // value={apartment}
                                            className={formCss.formText}
                                        />
                                    </div>
                                </RegistInput>
                            </RegistBody>
                        </RegistSection>
                        <div className="main-btm">
                            <ul className="main-link">
                                <li>
                                    <NextButton href="#" onClick={onSubmit}>
                                        次へ
                                    </NextButton>
                                </li>
                            </ul>
                        </div>
                    </MainBody>
                </main>
            </DefaultLayout>
        </>
    )
}

export default RequiredInputPage
