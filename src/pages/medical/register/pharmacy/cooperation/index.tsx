import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../../../../components/organisms/Header'
import DefaultLayout from '../../../../../components/templates/DefaultLayout'
import Main, {
    MainBody,
    MainBtm,
} from '../../../../../components/organisms/Main'
import NavList, {
    NavListItem,
    NavListItemSelect,
    NavListItemLink,
} from '../../../../../components/organisms/NavList'
import {
    FamilyGroupButtonWith,
    NavListDetailButton,
    NextButton,
    SecondaryButton,
} from '../../../../../components/atoms/Button'
import { Box } from '@mui/material'

const MedicalRegisterPharmacyPage: React.FC = () => {
    const router = useRouter()
    const [selectFamily, setSelectFamily] = useState(0)

    // 選択する
    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        // 選択の処理はさむ
        router.push('/home')
    }

    return (
        <>
            <DefaultLayout>
                <Header
                    title="薬局連携する方を選択する"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <Main multiNav={true}>
                    <MainBody>
                        <Box
                            sx={{
                                mb: '18px',
                                lineHeight: '24px',
                            }}
                        >
                            本アプリの連携薬局(※)と連携させる方を選択してください。薬局と連携すると、今後、お薬情報が自動的に登録され、ご自身で情報を入力する手間が省けます。
                        </Box>
                        <NavList>
                            <NavListItem>
                                <NavListItemSelect>
                                    <FamilyGroupButtonWith
                                        active={
                                            selectFamily === 0 ? true : false
                                        }
                                        onClick={() => {
                                            setSelectFamily(0)
                                        }}
                                    >
                                        ゆうこ（本人）
                                    </FamilyGroupButtonWith>
                                </NavListItemSelect>
                                <NavListItemLink>
                                    <NavListDetailButton href="/medical/register/pharmacy/family/aaaa">
                                        参照
                                    </NavListDetailButton>
                                </NavListItemLink>
                            </NavListItem>
                            <NavListItem>
                                <NavListItemSelect>
                                    <FamilyGroupButtonWith
                                        active={
                                            selectFamily === 1 ? true : false
                                        }
                                        onClick={() => {
                                            setSelectFamily(1)
                                        }}
                                    >
                                        りん（長女）
                                    </FamilyGroupButtonWith>
                                </NavListItemSelect>
                                <NavListItemLink>
                                    <NavListDetailButton href="/medical/register/pharmacy/family/bbbb">
                                        参照
                                    </NavListDetailButton>
                                </NavListItemLink>
                            </NavListItem>
                            <NavListItem>
                                <NavListItemSelect>
                                    <FamilyGroupButtonWith
                                        active={
                                            selectFamily === 2 ? true : false
                                        }
                                        onClick={() => {
                                            setSelectFamily(2)
                                        }}
                                    >
                                        こうた（長男）
                                    </FamilyGroupButtonWith>
                                </NavListItemSelect>
                                <NavListItemLink>
                                    <NavListDetailButton href="/medical/register/pharmacy/family/cccc">
                                        参照
                                    </NavListDetailButton>
                                </NavListItemLink>
                            </NavListItem>
                        </NavList>
                    </MainBody>
                    <MainBtm>
                        <Box
                            sx={{
                                pb: '15px',
                            }}
                        >
                            <NextButton href="#" onClick={onSubmit}>
                                選択する
                            </NextButton>
                        </Box>
                        <SecondaryButton
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                router.push('/home')
                            }}
                        >
                            薬局と連携しない
                        </SecondaryButton>
                    </MainBtm>
                </Main>
            </DefaultLayout>
        </>
    )
}

export default MedicalRegisterPharmacyPage
