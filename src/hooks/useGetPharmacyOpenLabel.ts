import { StoreSearch } from '../types/StoreSearch'

/**
 * 薬局一覧にて薬局サムネの処方箋送信受付中ラベルの表示
 */

const now = new Date()
export const useGetPharmacyOpenLabel = (
    store: StoreSearch,
    dayString: string
) => {
    let output: string
    const targetArray = Object.keys(store)
    const index = targetArray.findIndex(
        (item) => item === dayString + '_reception_from_time'
    )
    // @ts-ignore
    const from = store[targetArray[index]].split(':')[0]
    // @ts-ignore
    const end = store[targetArray[index - 1]].split(':')[0]

    if (String(now.getHours()) > from && String(now.getHours()) < end) {
        output = 'on'
    } else {
        output = 'off'
    }
    // TODO: 受付中止ステータスは将来機能
    return output
}
