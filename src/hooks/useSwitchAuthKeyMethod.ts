import { useSelector } from 'react-redux'
import { RootState } from '../store'
import authManager from '../utilities/authManager'

/**
 * PC（PCブラウザ） / スマートフォン・タブレット端末 を判定してauth_key取得方法を分ける
 */
export const useSwitchAuthKeyMethod = () => {
    const auth = useSelector((state: RootState) => state.auth)

    let auth_key
    if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
        // スマホ・タブレット（iOS・Android）の場合の処理を記述
        auth_key = authManager.getKey()
    } else {
        // PCの場合の処理を記述
        auth_key = auth.authorized_key
    }
    return auth_key
}
