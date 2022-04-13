import { setCookie, destroyCookie, parseCookies } from 'nookies'

export default class cookieManagement {
    static setCookiesByObject(object: object) {
        for (const [key, value] of Object.entries(object)) {
            if (['string', 'number'].includes(typeof value)) {
                // cookieは重複して登録できてしまうため、事前に同一キーのcookieを消す。
                destroyCookie(null, key)
                setCookie(null, key, value, {
                    maxAge: 30 * 24 * 60 * 60,
                })
            }
        }
    }

    static getByKey(key: string) {
        const all_cookies = parseCookies()
        return all_cookies[key]
    }

    static getAll() {
        return parseCookies()
    }
}
