import React, { useState, useEffect, useRef } from 'react'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../components/organisms/OriginalHeader'
import { HeaderStatus } from '../../../../components/organisms/Header'
import Chat, {
    ChatMain,
    ChatMessage,
    ChatMessageLogo,
    ChatMessageLogoImage,
    ChatMessageComment,
    ChatMessageCommentText,
    ChatMessageCommentDate,
    ChatBtm,
    ChatBtmInput,
    ChatBtmNav,
} from '../../../../components/organisms/Chat'
import ImageDialog, {
    ImageDialogMain,
    ImageDialogMainNav,
} from '../../../../components/organisms/ImageDialog'
import {
    ChatNavButton,
    CloseDialogButton,
} from '../../../../components/atoms/OriginalButton'
import {
    PhotoLibraryIcon,
    CameraShotIcon,
    SendMessageIcon,
} from '../../../../components/atoms/OriginalIcon'
import {
    FlexTextarea,
    FlexTextareaDummy,
} from '../../../../components/atoms/FlexTextarea'
import formCss from '../../../../components/atoms/OriginalForm.module.scss'
import apiManager from '../../../../utilities/apiManager'
import { useMessageDate } from '../../../../hooks/useMessageDate'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { useSwitchAuthKeyMethod } from '../../../../hooks/useSwitchAuthKeyMethod'

type MessagesProps = {
    content: string
    created_at: string
    id: 1
    order_alias: string
    prescription_message_alias: string
    seen_at: null
    sent_at: string
    staff_alias: string
    store_alias: string
    title: string
    updated_at: string
    user_alias: string
}

const MyPharmacyChatPage: React.FC = () => {
    const selectedStore = useSelector((state: RootState) => state.selectedStore)
    const auth = useSelector((state: RootState) => state.auth)
    const auth_key = useSwitchAuthKeyMethod()

    const [comment, setComment] = useState('')
    const [isInputText, setInputText] = useState(false)
    const [openImageDialog, setOpenImageDialog] = useState(false)
    const btmRef = useRef<HTMLDivElement>(null)
    const [btmRefHeight, setBtmRefHeight] = useState(0)
    const [chatMainStyle, setChatMainStyle] = useState({
        height: 'calc(100vh - 170px)',
    })
    const [messages, setMessages] = useState([])

    // メッセージを入力
    const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let val = e.target.value
        if (val.length >= 1) {
            setInputText(true)
        } else {
            setInputText(false)
        }
        setComment(val)
    }

    // フォトライブラリボタン
    const onPhotoLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
    }

    // カメラボタン
    const onCameraShot = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
    }

    // サムネイルクリック
    const onOpenImage = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenImageDialog(true)
    }

    const getSentTimeString = (sentAt: string) => {}

    // messages
    useEffect(() => {
        const url =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            `/mpp/messages/stores/${selectedStore.store_alias}`
        // registered stores
        apiManager
            .action(
                'GET',
                url,
                { store_alias: selectedStore.store_alias },
                // TODO: 後で削除 開発中確認用固定値auth＿key
                // { AUTHORIZED_KEY: '3FE2veDsx5DPKwcUSoGOHALJyAQ6Ir' },
                {
                    // AUTHORIZED_KEY: auth_key,
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                if (res) {
                    setMessages(res.data?.messages)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, [])

    // ChatBtmの高さに応じてChatMainの高さを変更
    useEffect(() => {
        if (btmRefHeight > 0) {
            setChatMainStyle({
                height: `calc(100vh - 100px - ${btmRefHeight}px)`,
            })
        }
    }, [btmRefHeight])

    useEffect(() => {
        if (btmRef.current) {
            const height = Number(
                JSON.stringify(btmRef.current.getBoundingClientRect().height)
            )
            setBtmRefHeight(height)
        }
    }, [comment])

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="利用薬局メッセージ"
                    prevURL="back"
                    prevDialog={false}
                    isHomeBtn={false}
                />
                <HeaderStatus>
                    <div className="label">{selectedStore.store_name}</div>
                </HeaderStatus>
                <main className="main">
                    <Chat>
                        <ChatMain style={chatMainStyle}>
                            {messages !== null &&
                                messages.map((item: MessagesProps) => (
                                    <ChatMessage>
                                        <ChatMessageLogo>
                                            <ChatMessageLogoImage>
                                                <img
                                                    src="/img/pharmacy/logo_s_001.png"
                                                    alt=""
                                                />
                                            </ChatMessageLogoImage>
                                        </ChatMessageLogo>
                                        <ChatMessageComment>
                                            <ChatMessageCommentText>
                                                {item.content}
                                            </ChatMessageCommentText>
                                            <ChatMessageCommentDate>
                                                {useMessageDate(item.sent_at)}
                                            </ChatMessageCommentDate>
                                        </ChatMessageComment>
                                    </ChatMessage>
                                ))}
                        </ChatMain>
                        <ChatBtm ref={btmRef}>
                            <ChatBtmInput wide={isInputText}>
                                <FlexTextarea>
                                    <FlexTextareaDummy>
                                        {comment + '\u200b'}
                                    </FlexTextareaDummy>
                                    <textarea
                                        rows={1}
                                        value={comment}
                                        className={formCss.formChatarea}
                                        placeholder="メッセージを入力"
                                        onChange={onChangeComment}
                                    ></textarea>
                                </FlexTextarea>
                            </ChatBtmInput>
                            <ChatBtmNav narrow={isInputText}>
                                {isInputText ? (
                                    <>
                                        <li>
                                            <ChatNavButton
                                                href="#"
                                                onClick={onPhotoLibrary}
                                            >
                                                <span className="icon-send">
                                                    <SendMessageIcon />
                                                </span>
                                            </ChatNavButton>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <ChatNavButton
                                                href="#"
                                                onClick={onPhotoLibrary}
                                            >
                                                <span className="icon-photo">
                                                    <PhotoLibraryIcon size="small" />
                                                </span>
                                            </ChatNavButton>
                                        </li>
                                        <li>
                                            <ChatNavButton
                                                href="#"
                                                onClick={onCameraShot}
                                            >
                                                <span className="icon-photo">
                                                    <CameraShotIcon size="small" />
                                                </span>
                                            </ChatNavButton>
                                        </li>
                                    </>
                                )}
                            </ChatBtmNav>
                        </ChatBtm>
                    </Chat>
                </main>
            </DefaultLayout>
            <ImageDialog isOpen={openImageDialog}>
                <ImageDialogMain>
                    <img
                        src="/img/temp/img_prescription_sample_01.jpg"
                        alt=""
                    />
                    <ImageDialogMainNav>
                        <CloseDialogButton
                            onClick={() => {
                                setOpenImageDialog(false)
                            }}
                        >
                            閉じる
                        </CloseDialogButton>
                    </ImageDialogMainNav>
                </ImageDialogMain>
            </ImageDialog>
        </>
    )
}

export default MyPharmacyChatPage
