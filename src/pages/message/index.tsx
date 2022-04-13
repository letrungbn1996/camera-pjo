import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../providers/AppProvider'
import DefaultLayout from '../../components/templates/DefaultLayout'
import MessageHeader from '../../components/organisms/MessageHeader'
import { MainBody } from '../../components/organisms/Main'
import NavList, { NavListItem } from '../../components/organisms/NavList'
import { MessageButton } from '../../components/atoms/MessageButton'
import { Box } from '@mui/material'
import apiManager from '../../utilities/apiManager'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

type MessageProps = {
    nickname: string
    sent_at_last: string
    store_alias: string
    store_name: string
    patient_alias: string
    not_seen_count: number
}

const MessagePage: React.FC = () => {
    const app = useContext(AppContext)
    const auth = useSelector((state: RootState) => state.auth)
    const [messages, setMessages] = useState<MessageProps[]>([])

    const getCount = () => {
        let count: number = 0
        messages &&
            messages.forEach((message) => {
                count += message.not_seen_count
            })
        return count
    }

    useEffect(() => {
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL + '/mpp/messages/summary'
        apiManager
            .action(
                'GET',
                url,
                {},
                {
                    // TODO: 開発確認用 後に削除
                    // AUTHORIZED_KEY: 'Q8JuRC9QdxALRJKOuY4asw1tdn6VXg',
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                setMessages(res?.data.messages)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, [])

    return (
        <>
            <DefaultLayout>
                <MessageHeader title="メッセージ" prevURL="back" />
                <main className="main">
                    <MainBody>
                        <NavList>
                            <NavListItem>
                                <MessageButton href="/message/prescription">
                                    あなたへのメッセージ
                                    {messages.length > 0 && (
                                        <div className="unread">
                                            {getCount()}
                                        </div>
                                    )}
                                </MessageButton>
                            </NavListItem>
                            {/* <NavListItem>
                                <MessageButton href="#">
                                    お知らせ一覧
                                    <div className="unread">5</div>
                                </MessageButton>
                            </NavListItem> */}
                            {/* {app.id === 'KHA' && (
                                <NavListItem>
                                    <MessageButton href="#">
                                        さくらちゃんに問い合わせ
                                        <div className="unread">1</div>
                                    </MessageButton>
                                </NavListItem>
                            )} */}
                        </NavList>
                    </MainBody>
                    {app.id === 'LINQ' && (
                        <MainBody>
                            <Box
                                sx={{
                                    mb: '14px',
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                現在選択している薬局以外からのメッセージは
                                <br />
                                こちらから確認ください。
                            </Box>
                            <NavList>
                                <NavListItem>
                                    <MessageButton href="#">
                                        ○○薬局
                                        <div className="unread">5</div>
                                    </MessageButton>
                                </NavListItem>
                                <NavListItem>
                                    <MessageButton href="#">
                                        ○×薬局
                                    </MessageButton>
                                </NavListItem>
                            </NavList>
                        </MainBody>
                    )}
                </main>
            </DefaultLayout>
        </>
    )
}

export default MessagePage
