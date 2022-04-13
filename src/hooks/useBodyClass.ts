import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * 画面レンダリングの際のフック処理
 */
const app = process.env.NEXT_PUBLIC_PRODUCT_ID
export function useBodyClass() {
    const { pathname } = useRouter()
    useEffect(() => {
        let element = document.getElementById('app_body')
        if (element) {
            if (/\/register|\/login|\/home/i.test(pathname)) {
                let className = app ? app : ''
                element.classList.add(className.toLowerCase())
                element.classList.remove('message')
                element.classList.remove('original')
            } else if (/\/message/i.test(pathname)) {
                element.classList.add('message')
                element.classList.remove('kha')
                element.classList.remove('original')
            } else {
                element.classList.add('original')
                element.classList.remove('kha')
                element.classList.remove('message')
            }
        }
    }, [pathname])
}
