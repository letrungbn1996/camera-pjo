import { useContext, useEffect, useState } from 'react'
// import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import DefaultLayout from '../components/templates/DefaultLayout'
import HomeHeader from '../components/organisms/HomeHeader'
import apiManager from '../utilities/apiManager'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import HomeMain02 from '../components/organisms/HomeMain02'
import { useSwitchAuthKeyMethod } from '../hooks/useSwitchAuthKeyMethod'
import { prescriptionSlice } from '../store/prescription'
import { slideSlice } from '../store/slide'
import { prescriptionQuestionSlice } from '../store/prescriptionQuestion'

type PatientProps = {
    nickname: string
    patient_alias: string
    relationship: string | null
}

type StoreProps = {
    store_name: string
    store_alias: string
    is_favorite: string
}

const Home: NextPage = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.auth)
    // const auth_key = useSwitchAuthKeyMethod()

    const [patients, setPatients] = useState<PatientProps[]>([])
    const [favoriteStore, setFavoriteStore] = useState<StoreProps | null>(null)
    const [unread, setUnread] = useState(0)

    useEffect(() => {
        // patients
        // API家族取得
        const patientsUrl = process.env.NEXT_PUBLIC_NLP_API_URL + '/mpp/home'
        apiManager
            .action(
                'GET',
                patientsUrl,
                {},
                {
                    // TODO: 開発用authkey（後で削除）
                    // AUTHORIZED_KEY: 'TnKcjYwm0fvffub9txtTfUPWvLayEJ',
                    AUTHORIZED_KEY: auth.authorized_key,
                    // AUTHORIZED_KEY: auth_key,
                }
            )
            .then((res) => {
                if (res) {
                    setPatients(res.data.patients)
                    setFavoriteStore(res.data.store)
                    setUnread(res.data?.not_seen_count)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })

        //処方箋送信後入力内容クリア
        dispatch(prescriptionSlice.actions.reset())
        dispatch(slideSlice.actions.reset())
        dispatch(prescriptionQuestionSlice.actions.reset())
    }, [])

    return (
        <>
            <DefaultLayout>
                <HomeHeader patients={patients} />
                <HomeMain02
                    favoriteStoreName={
                        favoriteStore != null
                            ? favoriteStore.store_name
                            : '登録はありません'
                    }
                    unReadCount={unread}
                />
            </DefaultLayout>
        </>
    )
}

export default Home
