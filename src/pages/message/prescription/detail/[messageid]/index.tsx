import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../../../../components/templates/DefaultLayout'
import { HeaderStatus } from '../../../../../components/organisms/Header'
import MessageHeader from '../../../../../components/organisms/MessageHeader'
import {
    ChatMain,
    ChatMessage,
    ChatMessageAvatar,
    ChatMessageComment,
    ChatMessageCommentText,
    ChatMessageCommentTextTitle,
    ChatMessageCommentDate,
} from '../../../../../components/organisms/Chat'
import { ChatTelBigButton } from '../../../../../components/atoms/MessageButton'
import { CorporateIconWith } from '../../../../../components/atoms/Icon'
import {
    ChatAvatarIcon,
    ChatTelBigIconWith,
} from '../../../../../components/atoms/MessageIcon'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../store'
import { useMessageDate } from '../../../../../hooks/useMessageDate'
import apiManager from '../../../../../utilities/apiManager'

type MessageDetailProps = {
    id: number
    alias: string
    store_alias: string
    staff_alias: string
    user_alias: string
    order_alias: string
    title: string
    content: string
    sent_at: string
    seen_at: string
    created_at: string
    updated_at: string
    patient_alias: string
}

const MessagePrescriptionDetailPage: React.FC = () => {
    const storeData = useSelector((state: RootState) => state.messageStoreData)
    const auth = useSelector((state: RootState) => state.auth)
    const selectedPatient = useSelector(
        (state: RootState) => state.selectedPatient
    )

    const [messages, setMessages] = useState<MessageDetailProps[]>([])

    // message取得
    const storeAlias = storeData.store_alias
    const url =
        process.env.NEXT_PUBLIC_NLP_API_URL +
        '/mpp/messages/stores/' +
        storeAlias

    useEffect(() => {
        apiManager
            .action(
                'GET',
                url,
                {
                    patient_alias: selectedPatient.patient_alias,
                },
                {
                    // TODO: 開発確認用　後に削除
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
                <MessageHeader title="あなたへのメッセージ" prevURL="back" />
                <HeaderStatus>
                    <div className="label">
                        <CorporateIconWith>
                            {storeData.store_name}
                        </CorporateIconWith>
                    </div>
                </HeaderStatus>
                <main className="main">
                    <ChatMain style={{ height: '100%' }}>
                        {messages.map((message: MessageDetailProps) => (
                            <ChatMessage>
                                <ChatMessageAvatar>
                                    <ChatAvatarIcon />
                                </ChatMessageAvatar>
                                <ChatMessageComment>
                                    <ChatMessageCommentText>
                                        <ChatMessageCommentTextTitle>
                                            {message.title}
                                        </ChatMessageCommentTextTitle>
                                        {message.content}
                                    </ChatMessageCommentText>
                                    <ChatMessageCommentDate>
                                        {useMessageDate(message.sent_at)}
                                    </ChatMessageCommentDate>
                                </ChatMessageComment>
                            </ChatMessage>
                        ))}

                        {/* 
                        TODO: 質疑のやりとりは次のフェーズ対応
                        <ChatMessage>
                            <ChatMessageAvatar>
                                <ChatAvatarIcon />
                            </ChatMessageAvatar>
                            <ChatMessageComment>
                                <ChatMessageCommentText>
                                    {
                                        '新しく出たお薬を飲まれて何かありませんか？'
                                    }
                                    <ChatMessageCommentTextQuestion>
                                        <li>
                                            <ChatAnswerButton>
                                                ない
                                            </ChatAnswerButton>
                                        </li>
                                        <li>
                                            <ChatAnswerButton>
                                                ある
                                            </ChatAnswerButton>
                                        </li>
                                    </ChatMessageCommentTextQuestion>
                                </ChatMessageCommentText>
                                <ChatMessageCommentDate>
                                    09/09　09:38
                                </ChatMessageCommentDate>
                            </ChatMessageComment>
                        </ChatMessage>
                        <ChatMessage self={true}>
                            <ChatMessageAvatar></ChatMessageAvatar>
                            <ChatMessageComment>
                                <ChatMessageCommentText>
                                    ある
                                </ChatMessageCommentText>
                                <ChatMessageCommentDate>
                                    09/09　09:40
                                </ChatMessageCommentDate>
                            </ChatMessageComment>
                        </ChatMessage>
                        <ChatMessage>
                            <ChatMessageAvatar>
                                <ChatAvatarIcon />
                            </ChatMessageAvatar>
                            <ChatMessageComment>
                                <ChatMessageCommentText>
                                    {
                                        '気になることがありましたら、薬局までお気軽にお問い合わせください。'
                                    }
                                </ChatMessageCommentText>
                                <ChatMessageCommentDate>
                                    09/09　09:41
                                </ChatMessageCommentDate>
                            </ChatMessageComment>
                        </ChatMessage>
                        <ChatMessage>
                            <ChatMessageAvatar>
                                <ChatAvatarIcon />
                            </ChatMessageAvatar>
                            <ChatMessageComment>
                                <ChatMessageCommentText>
                                    {
                                        'オンライン服薬指導のご利用、ありがとうございました。\nご請求金額は、1,680円となります。領収書と明細書は、お薬の配達時に合わせてお届けします。\n金額をお確かめの上、「お支払いをする」を押してください。登録されたクレジットカードでお支払いされます。\nご不明点などがございましたら、薬局までご連絡くださいませ。'
                                    }
                                    <ChatMessageCommentTextQuestion>
                                        <li>
                                            <ChatAnswerButton>
                                                支払いをする
                                            </ChatAnswerButton>
                                        </li>
                                    </ChatMessageCommentTextQuestion>
                                </ChatMessageCommentText>
                                <ChatMessageCommentDate>
                                    09/09　13:23
                                </ChatMessageCommentDate>
                            </ChatMessageComment>
                        </ChatMessage>
                        <ChatMessage self={true}>
                            <ChatMessageAvatar></ChatMessageAvatar>
                            <ChatMessageComment>
                                <ChatMessageCommentText>
                                    支払いをする
                                </ChatMessageCommentText>
                                <ChatMessageCommentDate>
                                    09/09　14:12
                                </ChatMessageCommentDate>
                            </ChatMessageComment>
                        </ChatMessage>
                        <ChatMessage>
                            <ChatMessageAvatar>
                                <ChatAvatarIcon />
                            </ChatMessageAvatar>
                            <ChatMessageComment>
                                <ChatMessageCommentText>
                                    {
                                        'お支払い処理が完了しました。ご利用、ありがとうございます。'
                                    }
                                </ChatMessageCommentText>
                                <ChatMessageCommentDate>
                                    09/09　14:13
                                </ChatMessageCommentDate>
                            </ChatMessageComment>
                        </ChatMessage> */}
                        {/* TODO: APIに電話番号追加頂き次第反映 */}
                        <ChatTelBigButton href="tel:03-3526-6781">
                            <ChatTelBigIconWith>薬局へTEL</ChatTelBigIconWith>
                        </ChatTelBigButton>
                    </ChatMain>
                </main>
            </DefaultLayout>
        </>
    )
}

export default MessagePrescriptionDetailPage
