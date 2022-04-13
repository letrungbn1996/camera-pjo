import { setCookie, destroyCookie, parseCookies } from 'nookies'
import { UserContext } from '../providers/UserProvider'
import { useContext } from 'react'
import cookieManagement from './cookieManagement'

declare global {
    interface Window {
        request: any
        response: any
    }
}
declare const request: any
export default class authManager {
    static setAuthKey(key: string) {
        const ua = navigator.userAgent
        let agent = ''
        if (/android/i.test(ua)) {
            agent = 'android'
        } else if (/ipad|iphone|ipod/i.test(ua)) {
            agent = 'ios'
        }
        // for (const [key, value] of Object.entries(object)) {
        //     if (['string', 'number'].includes(typeof value)) {
        //         // cookieは重複して登録できてしまうため、事前に同一キーのcookieを消す。
        //         destroyCookie(null, key)
        //         setCookie(null, key, value, {
        //             maxAge: 30 * 24 * 60 * 60,
        //         })
        //     }
        // }
        if (agent === 'android' || agent === 'ios') {
            if (agent === 'android') {
                request.postMessage(
                    JSON.stringify({
                        setAuthorizedKey: { authorized_key: key },
                    })
                )
            } else if (agent === 'ios') {
                console.log('iphone')
                window.webkit.messageHandlers.request.postMessage(
                    JSON.stringify({
                        setAuthorizedKey: { authorized_key: key },
                    })
                )
                console.log('iphone')
            }
            window.response = function (jsonString: any) {
                let json = JSON.parse(jsonString)
                let tokenString = json.getPinCode.code
            }
        } else {
            cookieManagement.setCookiesByObject({
                authorized_key: key,
            })
        }
    }

    static getKey() {
        const ua = navigator.userAgent
        let agent = ''
        if (/android/i.test(ua)) {
            agent = 'android'
        } else if (/ipad|iphone|ipod/i.test(ua)) {
            agent = 'ios'
        }
        let authKey = ''
        if (agent === 'android' || agent === 'ios') {
            if (agent === 'android') {
                request.postMessage(
                    JSON.stringify({
                        getAuthorizedKey: null,
                    })
                )
            } else if (agent === 'ios') {
                console.log('iphone')
                window.webkit.messageHandlers.request.postMessage(
                    JSON.stringify({
                        getAuthorizedKey: null,
                    })
                )
                console.log('iphone')
            }
            window.response = function (jsonString: any) {
                let json = JSON.parse(jsonString)
                authKey = json.getAuthorizedKey.authorized_key
            }
        } else {
            authKey = cookieManagement.getByKey('authorized_key')
        }
        return authKey
    }
}
