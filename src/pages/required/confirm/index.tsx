import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import Header from '../../../components/organisms/Header'
import { MainLead, MainBody } from '../../../components/organisms/Main'
import {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistConfirm,
} from '../../../components/organisms/Regist'
import { NextButton } from '../../../components/atoms/Button'

const RequiredConfirmPage: React.FC = () => {
    const router = useRouter()

    // 送信処理
    const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push('/pharmacy')
    }

    return (
        <>
            <DefaultLayout>
                <Header title="必要情報入力" prevURL="back" isHomeBtn={false} />
                <main className="main">
                    <MainLead>入力内容を確認してください</MainLead>
                    <MainBody>
                        <RegistSection>
                            <RegistHeader>
                                <h2 className="headerTitle">
                                    処方箋送信する人の情報
                                </h2>
                            </RegistHeader>
                            <RegistBody>
                                <RegistConfirm>
                                    <div className="label">氏名（漢字）</div>
                                    <div className="confirm">森田 裕子</div>
                                </RegistConfirm>
                                <RegistConfirm>
                                    <div className="label">氏名（カナ）</div>
                                    <div className="confirm">モリタ ユウコ</div>
                                </RegistConfirm>
                                <RegistConfirm>
                                    <div className="label">携帯電話番号</div>
                                    <div className="confirm">09012345678</div>
                                </RegistConfirm>
                                <RegistConfirm>
                                    <div className="label">生年月日</div>
                                    <div className="confirm">1990年9月4日</div>
                                </RegistConfirm>
                                <RegistConfirm>
                                    <div className="label">性別</div>
                                    <div className="confirm">女性</div>
                                </RegistConfirm>
                            </RegistBody>
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <h2 className="headerTitle">ご住所</h2>
                            </RegistHeader>
                            <RegistBody>
                                <RegistConfirm>
                                    <div className="label">郵便番号</div>
                                    <div className="confirm">1010047</div>
                                </RegistConfirm>
                                <RegistConfirm>
                                    <div className="label">ご住所</div>
                                    <div className="confirm">
                                        東京都千代田区内神田3-2-1
                                        <br />
                                        喜助内神田3丁目ビル3F
                                    </div>
                                </RegistConfirm>
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

export default RequiredConfirmPage
