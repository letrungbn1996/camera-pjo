import useSWR from 'swr'
import apiManager from './apiManager'
import cookieManagement from './cookieManagement'

export default class swrExecuter {
    static execute(url: string, params: object = {}, headers: object = {}) {
        headers = this.AddBasicInfoToHeader(headers)
        const fetcher = (url: string) =>
            apiManager.action('GET', url, params, headers)
        return useSWR(url, fetcher)
    }

    // headerの基本的な情報を付与
    static AddBasicInfoToHeader(headers: object) {
        return Object.assign(headers, {
            AppId: '4', // AppIdは固定
            // "AppKey": cookieManagement.getByKey('debug_hashed_keycode'), // AppKeyが必要であるかどうかは聞いてみる。
            'Content-Type': 'application/x-www-form-urlencoded',
            AUTHORIZED_KEY: cookieManagement.getByKey('authorized_key'),
        })
    }
}
