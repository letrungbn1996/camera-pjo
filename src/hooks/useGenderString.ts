import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * 0/1の性別データを'女性'/'男性'の文字列に変換する
 */
export const useGenderString = (genderNum: number) => {
    let genderString = ''
    if (genderNum === 0) {
        genderString = '女性'
    } else {
        genderString = '男性'
    }

    return genderString
}
