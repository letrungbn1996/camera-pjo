import axios from 'axios'
import cookieManagement from './cookieManagement'
export default class apiManager {
    static async action(
        method: string,
        url: string,
        params: object,
        headers: object,
        grantAuthKey: boolean = false
    ) {
        if (!['POST', 'GET', 'DELETE', 'PATCH'].includes(method)) {
            let error_message =
                'メソッド名が正しくありません。' + '"' + method + '"'
            console.error(error_message)
            throw new Error(error_message)
        }

        if (grantAuthKey) {
            Object.assign(headers, {
                AUTHORIZED_KEY: cookieManagement.getByKey('authorized_key'),
            })
        }

        if (method === 'GET') {
            return await axios
                .get(url, { headers: headers, params: params })
                .then((res) => res)
        }

        if (method === 'POST') {
            return axios
                .post(url, params, { headers: headers })
                .then((res) => res)
        }

        if (method === 'DELETE') {
            return axios
                .delete(url, { headers: headers, params: params })
                .then((res) => res)
        }

        if (method === 'PATCH') {
            return axios
                .patch(url, params, { headers: headers })
                .then((res) => res)
        }
    }
}
