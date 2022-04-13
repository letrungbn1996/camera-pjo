import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import DefaultLayout from '../components/templates/DefaultLayout'

const Home: NextPage = () => {
    const router = useRouter()
    useEffect(() => {
        router.replace('/home')
    })

    return (
        <>
            <DefaultLayout></DefaultLayout>
        </>
    )
}

export default Home
