import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import MessageHeader from '../../../components/organisms/MessageHeader'
import { MainBody } from '../../../components/organisms/Main'
import MessageList, {
    MessageItem,
    MessageItemHeader,
    MessageItemLink,
} from '../../../components/organisms/MessageList'
import { useDispatch, useSelector } from 'react-redux'
import { messageStoreDataSlice } from '../../../store/messageStoreData'
import { useMessageDate } from '../../../hooks/useMessageDate'
import { Box } from '@mui/system'
import { useSwitchAuthKeyMethod } from '../../../hooks/useSwitchAuthKeyMethod'
import { RootState } from '../../../store'
import apiManager from '../../../utilities/apiManager'
import { selectedPatientSlice } from '../../../store/selectedPatient'
import router from 'next/router'

type MessageProps = {
    nickname: string
    sent_at_last: string
    store_alias: string
    store_name: string
    patient_alias: string
    not_seen_count: number
}

const MessagePrescriptionPage: React.FC = () => {
    const dispatch = useDispatch()
    // const auth_key = useSwitchAuthKeyMethod()
    const auth = useSelector((state: RootState) => state.auth)

    const handleUpdate = (data: MessageProps) => {
        dispatch(messageStoreDataSlice.actions.updateMessageStoreData(data))
        const o = {
            patient_alias: data.patient_alias,
        }
        dispatch(selectedPatientSlice.actions.updateSelectedPatient(o))
        router.push(`/message/prescription/detail/${data.store_alias}`)
    }
    const [messages, setMessages] = useState<MessageProps[]>([])

    // message取得
    const url = process.env.NEXT_PUBLIC_NLP_API_URL + '/mpp/messages/summary'

    useEffect(() => {
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
                <MessageHeader
                    title="あなたへのメッセージ一覧"
                    prevURL="back"
                />
                <main className="main">
                    <MainBody>
                        <MessageList>
                            {messages.map((message: MessageProps) => (
                                <MessageItem>
                                    <MessageItemHeader>
                                        <Box sx={{ fontSize: '13px' }}>
                                            {useMessageDate(
                                                message.sent_at_last
                                            )}
                                        </Box>
                                    </MessageItemHeader>
                                    <MessageItemLink
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleUpdate(message)
                                        }}
                                    >
                                        {message.store_name}
                                        {message.not_seen_count > 0 && (
                                            <div className="unread">
                                                {message.not_seen_count}
                                            </div>
                                        )}
                                    </MessageItemLink>
                                </MessageItem>
                            ))}
                        </MessageList>
                    </MainBody>
                </main>
            </DefaultLayout>
        </>
    )
}

export default MessagePrescriptionPage
