import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../components/organisms/OriginalHeader'
import OriginalRegistNav from '../../../components/organisms/OriginalRegistNav'
import { MainLead } from '../../../components/organisms/Main'
import PharmacyList, {
    PharmacyListItem,
    PharmacyListItemInner,
    PharmacyListImg,
    PharmacyListInfo,
    PharmacyListInfoName,
    PharmacyListInfoText,
} from '../../../components/organisms/PharmacyList'
import Regist, {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistConfirm,
} from '../../../components/organisms/OriginalRegist'
import Dialog from '@mui/material/Dialog'
import DialogMain, {
    DialogMainText,
} from '../../../components/organisms/DialogMain'
import { NextButton } from '../../../components/atoms/OriginalButton'
import {
    PatientIconTitleWith,
    ClockIconTitleWith,
    CommentIconTitleWith,
    MedicineTitleWith,
} from '../../../components/atoms/OriginalIcon'
import apiManager from '../../../utilities/apiManager'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import _ from 'lodash'
import { useGenderString } from '../../../hooks/useGenderString'
import { useDateString } from '../../../hooks/useDateString'
import { useSwitchAuthKeyMethod } from '../../../hooks/useSwitchAuthKeyMethod'
import Lottie from 'react-lottie'
import animationData from '../../../components/atoms/animation_prescription.json'
import { prescriptionSlice } from '../../../store/prescription'
import { slideSlice } from '../../../store/slide'
import { prescriptionQuestionSlice } from '../../../store/prescriptionQuestion'

const ConfirmPage: React.FC = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const slide = useSelector((state: RootState) => state.slide)
    // const auth_key = useSwitchAuthKeyMethod()
    const auth = useSelector((state: RootState) => state.auth)
    const selectedStore = useSelector((state: RootState) => state.selectedStore)
    const prescription = useSelector((state: RootState) => state.prescription)
    const prescriptionQuestion = useSelector(
        (state: RootState) => state.prescriptionQuestion
    )
    const [openSendingDialog, setOpenSendingDialog] = useState(false)
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    const onSubmit = () => {
        // ????????????????????????????????????
        setOpenSendingDialog(true)

        let url: string =
            process.env.NEXT_PUBLIC_NLP_API_URL +
            '/mpp/order-registration/store'
        apiManager
            .action(
                'POST',
                url,
                {
                    store_alias: selectedStore.store_alias,
                    visit_at: prescription.visit_at,
                    phone_number: prescription.phone_number,
                    comment: prescription.comment,
                    first_name: prescription.first_name,
                    last_name: prescription.last_name,
                    first_name_kana: prescription.first_name_kana,
                    last_name_kana: prescription.last_name_kana,
                    birthday: prescription.birthday,
                    gender: prescription.gender,
                    prescription_image: slide.slides,
                    order_question_answers: prescriptionQuestion.questions,
                },
                // TODO: ???????????? ???????????????????????????auth???key
                // { AUTHORIZED_KEY: 'eRmXJ0XZ7PiZ8XUUFZniPWFe0ZsHcL' }
                {
                    // AUTHORIZED_KEY: auth_key
                    AUTHORIZED_KEY: auth.authorized_key,
                }
            )
            .then((res) => {
                if (res) {
                    //???????????????????????????????????????
                    dispatch(prescriptionSlice.actions.reset())
                    dispatch(slideSlice.actions.reset())
                    dispatch(prescriptionQuestionSlice.actions.reset())
                    router.push('/prescription/finish')
                }
            })
            .catch((error) => {
                console.log(error.response)
                setTimeout(() => {
                    setOpenSendingDialog(false)
                }, 2000)
                // TODO: ?????????????????????
            })
    }

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="????????????????????????"
                    prevURL="back"
                    prevDialog={false}
                    isHomeBtn={false}
                />
                <OriginalRegistNav step={3} total={3} />
                <main className="main">
                    <MainLead>??????????????????????????????????????????????????????</MainLead>
                    <PharmacyList>
                        <PharmacyListItem>
                            <PharmacyListItemInner>
                                <PharmacyListImg>
                                    {/* TODO: ???????????? */}
                                    <img
                                        src="/img/pharmacy/thumb_001.jpg"
                                        alt=""
                                    />
                                </PharmacyListImg>
                                <PharmacyListInfo>
                                    <PharmacyListInfoName>
                                        {selectedStore.store_name}
                                    </PharmacyListInfoName>
                                    <PharmacyListInfoText>
                                        {selectedStore.address}
                                    </PharmacyListInfoText>
                                </PharmacyListInfo>
                            </PharmacyListItemInner>
                        </PharmacyListItem>
                    </PharmacyList>
                    <Regist>
                        <RegistSection>
                            <RegistHeader>
                                <PatientIconTitleWith>
                                    <h2 className="headerTitle">
                                        ?????????????????????????????????
                                    </h2>
                                </PatientIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                                <RegistConfirm>
                                    <div className="label">??????????????????</div>
                                    <div className="confirm">
                                        {`${prescription.last_name} ${prescription.first_name}`}
                                    </div>
                                </RegistConfirm>
                                <RegistConfirm>
                                    <div className="label">??????????????????</div>
                                    <div className="confirm">
                                        {`${prescription.last_name_kana} ${prescription.first_name_kana}`}
                                    </div>
                                </RegistConfirm>
                                <RegistConfirm>
                                    <div className="label">??????????????????</div>
                                    <div className="confirm">
                                        {prescription.phone_number}
                                    </div>
                                </RegistConfirm>
                                <RegistConfirm>
                                    <div className="label">????????????</div>
                                    <div className="confirm">
                                        {useDateString(prescription.birthday)}
                                    </div>
                                </RegistConfirm>
                                <RegistConfirm>
                                    <div className="label">??????</div>
                                    <div className="confirm">
                                        {useGenderString(prescription.gender)}
                                    </div>
                                </RegistConfirm>
                            </RegistBody>
                        </RegistSection>
                        <RegistSection>
                            <RegistHeader>
                                <ClockIconTitleWith>
                                    <h2 className="headerTitle">????????????</h2>
                                </ClockIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                                <RegistConfirm>
                                    <div className="confirm">
                                        {prescription.visit_at}
                                    </div>
                                </RegistConfirm>
                            </RegistBody>
                        </RegistSection>
                        <RegistSection>
                            <RegistBody>
                                {prescriptionQuestion &&
                                    prescriptionQuestion.questions.map(
                                        (question: any) => (
                                            <RegistConfirm>
                                                <div className="label">
                                                    {question.question_content}
                                                </div>
                                                <div className="confirm">
                                                    {question.question_answer ===
                                                    '1'
                                                        ? '??????'
                                                        : '?????????'}
                                                </div>
                                            </RegistConfirm>
                                        )
                                    )}
                            </RegistBody>
                        </RegistSection>
                        {/* TODO: ???????????? */}
                        {/* <RegistSection>
                            <RegistHeader>
                                <h2 className="headerTitle">?????????</h2>
                            </RegistHeader>
                            <RegistBody>
                                <RegistConfirm>
                                    <div className="label">
                                        ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                        <br />
                                        ?????????????????????????????????
                                    </div>
                                    <div className="confirm">{question}</div>
                                </RegistConfirm>
                            </RegistBody>
                        </RegistSection> */}
                        <RegistSection>
                            <RegistHeader>
                                <CommentIconTitleWith>
                                    <h2 className="headerTitle">
                                        ????????????????????????
                                    </h2>
                                </CommentIconTitleWith>
                            </RegistHeader>
                            <RegistBody>
                                <RegistConfirm>
                                    <div className="confirm">
                                        {prescription.comment}
                                    </div>
                                </RegistConfirm>
                            </RegistBody>
                        </RegistSection>
                    </Regist>
                    <div className="main-btm">
                        <ul className="main-link">
                            <li>
                                <NextButton
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onSubmit()
                                    }}
                                >
                                    ????????????
                                </NextButton>
                            </li>
                        </ul>
                    </div>
                </main>
            </DefaultLayout>
            <Dialog
                open={openSendingDialog}
                sx={{
                    '& .MuiBackdrop-root': {
                        background: 'rgba(0,0,0,0.8)',
                    },
                    '& .MuiDialog-paper': {
                        width: '100%',
                        margin: '16px',
                    },
                }}
            >
                <DialogMain>
                    <DialogMainText>
                        ????????????
                        <br />
                        ?????????????????????
                    </DialogMainText>
                    <Lottie
                        options={lottieOptions}
                        width={160}
                        height={284}
                        isClickToPauseDisabled={true}
                    />
                </DialogMain>
            </Dialog>
        </>
    )
}

export default ConfirmPage
